import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

type Role = "super_admin" | "admin_suprimentos" | "admin_orcamentos" | "admin_contratos" | "viewer_global" | "viewer";

const allowedRoles: Role[] = [
  "super_admin",
  "admin_suprimentos",
  "admin_orcamentos",
  "admin_contratos",
  "viewer_global",
  "viewer",
];

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

function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  return Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
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
    return jsonResponse(req, { error: "Apenas super_admin pode criar usuarios." }, 403);
  }

  const body = (await req.json()) as {
    nome?: string;
    email?: string;
    role?: Role;
    ativo?: boolean;
    obraIds?: string[];
    password?: string;
  };

  const nome = String(body.nome || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const role = body.role || "viewer";
  const ativo = body.ativo ?? true;
  const obraIds = Array.isArray(body.obraIds) ? body.obraIds.filter((id) => typeof id === "string" && id.length <= 80) : [];
  const temporaryPassword = body.password?.trim() || randomPassword();

  if (!nome || !email) {
    return jsonResponse(req, { error: "Nome e e-mail sao obrigatorios." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(req, { error: "E-mail invalido." }, 400);
  }

  if (!allowedRoles.includes(role)) {
    return jsonResponse(req, { error: "Perfil invalido." }, 400);
  }

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password: temporaryPassword,
    email_confirm: true,
    user_metadata: { nome },
  });

  if (createError || !created.user) {
    return jsonResponse(req, { error: createError?.message || "Falha ao criar usuario." }, 400);
  }

  const { error: profileUpsertError } = await adminClient.from("profiles").upsert({
    id: created.user.id,
    nome,
    email,
    role,
    ativo,
  });

  if (profileUpsertError) {
    return jsonResponse(req, { error: profileUpsertError.message }, 400);
  }

  await adminClient.from("user_obras").delete().eq("user_id", created.user.id);
  if (obraIds.length) {
    const { error: obraError } = await adminClient
      .from("user_obras")
      .insert(obraIds.map((obra_id) => ({ user_id: created.user.id, obra_id })));

    if (obraError) {
      return jsonResponse(req, { error: obraError.message }, 400);
    }
  }

  return jsonResponse(req, { id: created.user.id, temporary_password: temporaryPassword });
});
