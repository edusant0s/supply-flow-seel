type Role = "super_admin" | "admin_suprimentos" | "admin_orcamentos" | "admin_contratos" | "viewer_global" | "viewer";
type ModuleKey =
  | "dashboard"
  | "alertas"
  | "requisicoes"
  | "orcamentos"
  | "contratos"
  | "fretes"
  | "nota_fiscal"
  | "estoque_obras"
  | "frota"
  | "fornecedores"
  | "avaliacao_fornecedores"
  | "importacoes";

type ModulePermissions = Partial<Record<ModuleKey, { view?: boolean; manage?: boolean }>>;

const allowedRoles: Role[] = [
  "super_admin",
  "admin_suprimentos",
  "admin_orcamentos",
  "admin_contratos",
  "viewer_global",
  "viewer",
];

const allowedModuleKeys: ModuleKey[] = [
  "dashboard",
  "alertas",
  "requisicoes",
  "orcamentos",
  "contratos",
  "fretes",
  "nota_fiscal",
  "estoque_obras",
  "frota",
  "fornecedores",
  "avaliacao_fornecedores",
  "importacoes",
];

const defaultAllowedOrigins = [
  "https://supply-flow.seeleng.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://supply-flow-seel.vercel.app",
  "https://supply-flow-seel-py97vh9sl-edusant0s-projects.vercel.app",
  "https://edusant0s.github.io",
];

class HttpError extends Error {
  constructor(message: string, readonly status = 500) {
    super(message);
  }
}

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

function supabaseApiUrl(supabaseUrl: string, path: string) {
  return `${supabaseUrl.replace(/\/$/, "")}${path}`;
}

function serviceHeaders(serviceRoleKey: string, extra: Record<string, string> = {}) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    ...extra,
  };
}

async function readPayload(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
}

function getPayloadError(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const body = payload as { error?: unknown; message?: unknown; details?: unknown; msg?: unknown };
    return String(body.error || body.message || body.details || body.msg || fallback);
  }
  return fallback;
}

async function expectOk(response: Response, fallback: string, status = 400) {
  const payload = await readPayload(response);
  if (!response.ok) throw new HttpError(getPayloadError(payload, fallback), status);
  return payload;
}

function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  return Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function sanitizeModulePermissions(value: unknown): ModulePermissions {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const sanitized: ModulePermissions = {};
  for (const key of allowedModuleKeys) {
    const rawPermission = (value as Record<string, unknown>)[key];
    if (!rawPermission || typeof rawPermission !== "object" || Array.isArray(rawPermission)) continue;
    const view = (rawPermission as { view?: unknown }).view;
    const manage = (rawPermission as { manage?: unknown }).manage;
    const normalizedManage = manage === true;
    const normalizedView = normalizedManage || view === true;
    sanitized[key] = { view: normalizedView, manage: normalizedView ? normalizedManage : false };
  }
  return sanitized;
}

async function getCallerId(supabaseUrl: string, anonKey: string, authHeader: string) {
  const payload = await expectOk(
    await fetch(supabaseApiUrl(supabaseUrl, "/auth/v1/user"), {
      headers: { apikey: anonKey, Authorization: authHeader },
    }),
    "Sessao invalida.",
    401,
  );

  const user = (payload as { user?: { id?: string }; id?: string } | null)?.user || payload;
  const id = (user as { id?: string } | null)?.id;
  if (!id) throw new HttpError("Sessao invalida.", 401);
  return id;
}

async function getCallerProfile(supabaseUrl: string, serviceRoleKey: string, callerId: string) {
  const payload = await expectOk(
    await fetch(
      supabaseApiUrl(
        supabaseUrl,
        `/rest/v1/profiles?select=role,ativo&id=eq.${encodeURIComponent(callerId)}&limit=1`,
      ),
      { headers: serviceHeaders(serviceRoleKey) },
    ),
    "Falha ao validar permissao.",
    500,
  );

  const profile = Array.isArray(payload) ? payload[0] : null;
  return profile as { role?: Role; ativo?: boolean } | null;
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response("ok", { headers: getCorsHeaders(req) });
    if (req.method !== "POST") return jsonResponse(req, { error: "Metodo nao permitido." }, 405);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const authHeader = req.headers.get("Authorization");

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      throw new HttpError("Funcao sem variaveis de ambiente obrigatorias.", 500);
    }

    if (!authHeader) {
      throw new HttpError("Sem Authorization header.", 401);
    }

    const callerId = await getCallerId(supabaseUrl, anonKey, authHeader);
    const callerProfile = await getCallerProfile(supabaseUrl, serviceRoleKey, callerId);

    if (!callerProfile?.ativo || callerProfile.role !== "super_admin") {
      throw new HttpError("Apenas super_admin pode criar usuarios.", 403);
    }

    const body = (await req.json()) as {
      nome?: string;
      email?: string;
      role?: Role;
      ativo?: boolean;
      obraIds?: string[];
      password?: string;
      module_permissions?: unknown;
    };

    const nome = String(body.nome || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const role = body.role || "viewer";
    const ativo = body.ativo ?? true;
    const obraIds = Array.isArray(body.obraIds)
      ? body.obraIds.filter((id) => typeof id === "string" && id.length <= 80)
      : [];
    const modulePermissions = sanitizeModulePermissions(body.module_permissions);
    const temporaryPassword = body.password?.trim() || randomPassword();

    if (!nome || !email) {
      throw new HttpError("Nome e e-mail sao obrigatorios.", 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new HttpError("E-mail invalido.", 400);
    }

    if (!allowedRoles.includes(role)) {
      throw new HttpError("Perfil invalido.", 400);
    }

    if (role === "viewer" && !obraIds.length) {
      throw new HttpError("Viewer precisa estar vinculado a pelo menos uma obra ou usar viewer_global.", 400);
    }

    const scopedObraIds = role === "viewer_global" ? [] : obraIds;
    const createdPayload = await expectOk(
      await fetch(supabaseApiUrl(supabaseUrl, "/auth/v1/admin/users"), {
        method: "POST",
        headers: serviceHeaders(serviceRoleKey, { "Content-Type": "application/json" }),
        body: JSON.stringify({
          email,
          password: temporaryPassword,
          email_confirm: true,
          user_metadata: { nome },
        }),
      }),
      "Falha ao criar usuario.",
      400,
    );

    const createdUser =
      (createdPayload as { user?: { id?: string }; id?: string } | null)?.user || (createdPayload as { id?: string });
    if (!createdUser?.id) {
      throw new HttpError("Falha ao criar usuario.", 400);
    }

    await expectOk(
      await fetch(supabaseApiUrl(supabaseUrl, "/rest/v1/profiles"), {
        method: "POST",
        headers: serviceHeaders(serviceRoleKey, {
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        }),
        body: JSON.stringify({
          id: createdUser.id,
          nome,
          email,
          role,
          ativo,
          module_permissions: modulePermissions,
          must_change_password: true,
          password_changed_at: null,
        }),
      }),
      "Falha ao salvar perfil do usuario.",
      400,
    );

    await expectOk(
      await fetch(
        supabaseApiUrl(supabaseUrl, `/rest/v1/user_obras?user_id=eq.${encodeURIComponent(createdUser.id)}`),
        { method: "DELETE", headers: serviceHeaders(serviceRoleKey) },
      ),
      "Falha ao atualizar obras do usuario.",
      400,
    );

    if (scopedObraIds.length) {
      await expectOk(
        await fetch(supabaseApiUrl(supabaseUrl, "/rest/v1/user_obras"), {
          method: "POST",
          headers: serviceHeaders(serviceRoleKey, { "Content-Type": "application/json" }),
          body: JSON.stringify(scopedObraIds.map((obra_id) => ({ user_id: createdUser.id, obra_id }))),
        }),
        "Falha ao vincular obras do usuario.",
        400,
      );
    }

    return jsonResponse(req, { id: createdUser.id, temporary_password: temporaryPassword });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message = error instanceof Error ? error.message : "Erro inesperado na Edge Function.";
    return jsonResponse(req, { error: message }, status);
  }
});
