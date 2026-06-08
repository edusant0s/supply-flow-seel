import type { Session } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type React from "react";
import type { Obra, Profile } from "../types";
import { supabase, supabaseConfigured } from "../services/supabase";

type AuthContextValue = {
  session: Session | null;
  profile: Profile | null;
  obras: Obra[];
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (currentSession: Session | null) => {
    if (!supabase || !currentSession?.user) {
      setProfile(null);
      setObras([]);
      return;
    }

    const userId = currentSession.user.id;
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) throw profileError;
    setProfile((profileData as Profile | null) ?? null);

    const { data: obraLinks, error: obraError } = await supabase
      .from("user_obras")
      .select("obra:obras(*)")
      .eq("user_id", userId);

    if (obraError) throw obraError;
    setObras(((obraLinks || []) as unknown as { obra: Obra | null }[]).map((link) => link.obra).filter(Boolean) as Obra[]);
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile(session);
  }, [loadProfile, session]);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      try {
        await loadProfile(data.session);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    boot();

    const subscription = supabase?.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setLoading(true);
      try {
        await loadProfile(nextSession);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.data.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      profile,
      obras,
      loading,
      configured: supabaseConfigured,
      signIn: async (email, password) => {
        if (!supabase) throw new Error("Supabase não configurado.");
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },
      signOut: async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
      },
      refreshProfile,
    }),
    [loading, obras, profile, refreshProfile, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
