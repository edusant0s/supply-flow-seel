import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Role = "super_admin" | "admin_suprimentos" | "admin_orcamentos" | "admin_contratos" | "viewer_global" | "viewer";

function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  return Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método não permitido." }), { status: 405, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Sem Authorization header." }), { status: 401, headers: corsHeaders });
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
    return new Response(JSON.stringify({ error: "Sessão inválida." }), { status: 401, headers: corsHeaders });
  }

  const { data: callerProfile, error: profileError } = await adminClient
    .from("profiles")
    .select("role, ativo")
    .eq("id", caller.id)
    .maybeSingle();

  if (profileError || !callerProfile?.ativo || callerProfile.role !== "super_admin") {
    return new Response(JSON.stringify({ error: "Apenas super_admin pode criar usuários." }), { status: 403, headers: corsHeaders });
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
  const obraIds = Array.isArray(body.obraIds) ? body.obraIds : [];
  const temporaryPassword = body.password?.trim() || randomPassword();

  if (!nome || !email) {
    return new Response(JSON.stringify({ error: "Nome e e-mail são obrigatórios." }), { status: 400, headers: corsHeaders });
  }

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password: temporaryPassword,
    email_confirm: true,
    user_metadata: { nome },
  });

  if (createError || !created.user) {
    return new Response(JSON.stringify({ error: createError?.message || "Falha ao criar usuário." }), { status: 400, headers: corsHeaders });
  }

  const { error: profileUpsertError } = await adminClient.from("profiles").upsert({
    id: created.user.id,
    nome,
    email,
    role,
    ativo,
  });

  if (profileUpsertError) {
    return new Response(JSON.stringify({ error: profileUpsertError.message }), { status: 400, headers: corsHeaders });
  }

  await adminClient.from("user_obras").delete().eq("user_id", created.user.id);
  if (obraIds.length) {
    const { error: obraError } = await adminClient
      .from("user_obras")
      .insert(obraIds.map((obra_id) => ({ user_id: created.user.id, obra_id })));

    if (obraError) {
      return new Response(JSON.stringify({ error: obraError.message }), { status: 400, headers: corsHeaders });
    }
  }

  return new Response(JSON.stringify({ id: created.user.id, temporary_password: temporaryPassword }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
