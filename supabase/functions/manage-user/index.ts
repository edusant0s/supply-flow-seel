import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const DEFAULT_PASSWORD = "Senha@123";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://supply-flow-seel.vercel.app",
  "https://supply-flow-seel-py97vh9sl-edusant0s-projects.vercel.app",
  "https://edusant0s.github.io",
];

function getAllowedOrigins() {
  return (Deno.env.get("ALLOWED_ORIGINS") || defaultAllowedOrigins.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedOrigin(origin: string) {
  if (!origin) return false;
  if (getAllowedOrigins().includes(origin)) return true;

  try {
    const url = new URL(origin);
    const isLocalDev = url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname);
    const isVercel = url.protocol === "https:" && url.hostname.endsWith(".vercel.app");
    const isGithubPages = url.protocol === "https:" && url.hostname === "edusant0s.github.io";
    return isLocalDev || isVercel || isGithubPages;
  } catch {
    return false;
  }
}

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const requestedHeaders = req.headers.get("Access-Control-Request-Headers");
  const allowedOrigin = isAllowedOrigin(origin) ? origin : defaultAllowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": requestedHeaders || "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: getCorsHeaders(req) });
  if (req.method !== "POST") return jsonResponse(req, { error: "Metodo nao permitido." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("Authorization");

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return jsonResponse(req, { error: "Funcao sem variaveis de ambiente obrigatorias." }, 500);
  }

  if (!authHeader) {
    return jsonResponse(req, { error: "Sem Authorization header." }, 401);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const adminClient = createClient(supabaseUrl, serviceRoleKey);

  const {
    data: { user: caller },
    error: callerError,
  } = await userClient.auth.getUser();

  if (callerError || !caller) {
    return jsonResponse(req, { error: "Sessao invalida." }, 401);
  }

  const { data: callerProfile, error: profileError } = await adminClient
    .from("profiles")
    .select("role, ativo")
    .eq("id", caller.id)
    .maybeSingle();

  if (profileError || !callerProfile?.ativo || callerProfile.role !== "super_admin") {
    return jsonResponse(req, { error: "Apenas super_admin pode gerenciar usuarios." }, 403);
  }

  const body = (await req.json().catch(() => ({}))) as { action?: string; userId?: string };
  const action = body.action;
  const userId = String(body.userId || "");

  if (!UUID_RE.test(userId)) {
    return jsonResponse(req, { error: "userId invalido." }, 400);
  }

  if (action === "delete") {
    if (userId === caller.id) {
      return jsonResponse(req, { error: "Nao e possivel remover a propria conta." }, 400);
    }

    const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId);
    if (deleteError) {
      return jsonResponse(req, { error: deleteError.message }, 400);
    }

    return jsonResponse(req, { success: true });
  }

  if (action === "reset_password") {
    const { error: updateError } = await adminClient.auth.admin.updateUserById(userId, { password: DEFAULT_PASSWORD });
    if (updateError) {
      return jsonResponse(req, { error: updateError.message }, 400);
    }

    const { error: profileUpdateError } = await adminClient
      .from("profiles")
      .update({ must_change_password: true, password_changed_at: null })
      .eq("id", userId);

    if (profileUpdateError) {
      return jsonResponse(req, { error: profileUpdateError.message }, 400);
    }

    return jsonResponse(req, { success: true, temporary_password: DEFAULT_PASSWORD });
  }

  return jsonResponse(req, { error: "Acao invalida." }, 400);
});
