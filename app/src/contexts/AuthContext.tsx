import type { Session } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import type { Obra, Profile } from "../types";
import { supabase, supabaseConfigured } from "../services/supabase";

type AuthContextValue = {
  session: Session | null;
  profile: Profile | null;
  obras: Obra[];
  loading: boolean;
  error: string | null;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_PROFILE_TIMEOUT_MS = 15000;
const AUTH_LOADING_WATCHDOG_MS = AUTH_PROFILE_TIMEOUT_MS + 5000;

function authErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Nao foi possivel validar usuario e permissoes.";
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserIdRef = useRef<string | null>(null);
  const loadedUserIdRef = useRef<string | null>(null);
  const hydrationRunRef = useRef(0);
  const mountedRef = useRef(true);
  const authRecoveryAttemptsRef = useRef(0);

  const fetchProfile = useCallback(async (currentSession: Session | null) => {
    if (!supabase || !currentSession?.user) {
      return { profile: null, obras: [] };
    }

    const userId = currentSession.user.id;
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) throw profileError;

    const { data: obraLinks, error: obraError } = await supabase
      .from("user_obras")
      .select("obra:obras(*)")
      .eq("user_id", userId);

    if (obraError) throw obraError;
    return {
      profile: (profileData as Profile | null) ?? null,
      obras: ((obraLinks || []) as unknown as { obra: Obra | null }[]).map((link) => link.obra).filter(Boolean) as Obra[],
    };
  }, []);

  const hydrateAuth = useCallback(
    async (nextSession: Session | null, options: { showLoading?: boolean } = {}) => {
      const runId = ++hydrationRunRef.current;
      const nextUserId = nextSession?.user.id ?? null;

      currentUserIdRef.current = nextUserId;
      if (mountedRef.current) {
        setSession(nextSession);
        setError(null);
        if (options.showLoading !== false) setLoading(true);
      }

      try {
        const result = await withTimeout(
          fetchProfile(nextSession),
          AUTH_PROFILE_TIMEOUT_MS,
          "Tempo excedido ao validar usuario e permissoes. Verifique sua conexao e tente novamente."
        );

        if (!mountedRef.current || hydrationRunRef.current !== runId) return;
        loadedUserIdRef.current = nextUserId;
        authRecoveryAttemptsRef.current = 0;
        setProfile(result.profile);
        setObras(result.obras);
        setError(null);
      } catch (err) {
        if (!mountedRef.current || hydrationRunRef.current !== runId) return;
        console.warn("Falha ao validar usuario e permissoes.", err);
        loadedUserIdRef.current = null;
        setProfile(null);
        setObras([]);
        setError(authErrorMessage(err));
      } finally {
        if (mountedRef.current && hydrationRunRef.current === runId) setLoading(false);
      }
    },
    [fetchProfile]
  );

  const refreshProfile = useCallback(async () => {
    await hydrateAuth(session, { showLoading: false });
  }, [hydrateAuth, session]);

  useEffect(() => {
    let mounted = true;
    mountedRef.current = true;

    async function boot() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: sessionError } = await withTimeout(
          supabase.auth.getSession(),
          AUTH_PROFILE_TIMEOUT_MS,
          "Tempo excedido ao restaurar a sessao. Verifique sua conexao e tente novamente."
        );
        if (sessionError) throw sessionError;
        if (mounted) await hydrateAuth(data.session, { showLoading: true });
      } catch (err) {
        if (!mounted) return;
        console.warn("Falha ao restaurar sessao.", err);
        setError(authErrorMessage(err));
        setSession(null);
        setProfile(null);
        setObras([]);
        setLoading(false);
      }
    }

    boot();

    const subscription = supabase?.auth.onAuthStateChange((event, nextSession) => {
      setTimeout(() => {
        if (!mounted) return;
        const nextUserId = nextSession?.user.id ?? null;
        const sameUser = currentUserIdRef.current === nextUserId;
        const profileAlreadyLoaded = loadedUserIdRef.current === nextUserId;

        if (nextUserId && (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") && sameUser && profileAlreadyLoaded) {
          setSession(nextSession);
          return;
        }

        void hydrateAuth(nextSession, { showLoading: event !== "TOKEN_REFRESHED" });
      }, 0);
    });

    return () => {
      mounted = false;
      mountedRef.current = false;
      subscription?.data.subscription.unsubscribe();
    };
  }, [hydrateAuth]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      if (!mountedRef.current) return;
      console.warn("Validacao de sessao demorou demais e foi destravada pelo watchdog.");
      const shouldRetry = authRecoveryAttemptsRef.current < 2;
      authRecoveryAttemptsRef.current += 1;
      setError(
        shouldRetry
          ? "Tempo excedido ao validar a sessao. Tentando recuperar automaticamente."
          : "Tempo excedido ao validar a sessao. Saia e entre novamente se o problema persistir."
      );
      setLoading(false);
      if (shouldRetry) {
        setTimeout(() => {
          if (mountedRef.current) void hydrateAuth(session, { showLoading: true });
        }, 300);
      }
    }, AUTH_LOADING_WATCHDOG_MS);

    return () => clearTimeout(timer);
  }, [hydrateAuth, loading, session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      profile,
      obras,
      loading,
      error,
      configured: supabaseConfigured,
      signIn: async (email, password) => {
        if (!supabase) throw new Error("Supabase não configurado.");
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },
      signOut: async () => {
        if (!supabase) return;
        loadedUserIdRef.current = null;
        await supabase.auth.signOut();
      },
      changePassword: async (password) => {
        if (!supabase) throw new Error("Supabase nao configurado.");
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
        const { error: profileError } = await supabase.rpc("mark_own_password_changed");
        if (profileError) throw profileError;
        await refreshProfile();
      },
      refreshProfile,
    }),
    [error, loading, obras, profile, refreshProfile, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
