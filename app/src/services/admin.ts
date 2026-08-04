import type { ModulePermissions, Obra, Profile, UserRole } from "../types";
import { requireSupabase, supabaseAnonKey, supabaseUrl } from "./supabase";

export async function listProfiles(): Promise<Profile[]> {
  const client = requireSupabase();
  const { data, error } = await client.from("profiles").select("*").order("nome", { ascending: true });
  if (error) throw error;
  return (data || []) as Profile[];
}

export async function listUserObraLinks(): Promise<{ user_id: string; obra_id: string }[]> {
  const client = requireSupabase();
  const { data, error } = await client.from("user_obras").select("user_id, obra_id");
  if (error) throw error;
  return (data || []) as { user_id: string; obra_id: string }[];
}

export async function listObras(): Promise<Obra[]> {
  const client = requireSupabase();
  const { data, error } = await client.from("obras").select("*").order("nome", { ascending: true });
  if (error) throw error;
  return (data || []) as Obra[];
}

export async function upsertObra(obra: Partial<Obra>) {
  const client = requireSupabase();
  const { error } = await client.from("obras").upsert(obra);
  if (error) throw error;
}

export async function deleteObra(id: string) {
  const client = requireSupabase();
  const { error } = await client.from("obras").delete().eq("id", id);
  if (error) throw error;
}

export async function updateProfile(id: string, patch: Partial<Profile>) {
  const client = requireSupabase();
  const { error } = await client.from("profiles").update(patch).eq("id", id);
  if (error) throw error;
}

export async function setUserObras(userId: string, obraIds: string[]) {
  const client = requireSupabase();
  const { error: deleteError } = await client.from("user_obras").delete().eq("user_id", userId);
  if (deleteError) throw deleteError;
  if (!obraIds.length) return;
  const { error } = await client.from("user_obras").insert(obraIds.map((obra_id) => ({ user_id: userId, obra_id })));
  if (error) throw error;
}

export async function createUser(input: {
  nome: string;
  email: string;
  role: UserRole;
  ativo: boolean;
  obraIds: string[];
  password?: string;
  module_permissions?: ModulePermissions | null;
}) {
  return callEdgeFunction<{ id: string; temporary_password?: string }>("create-user", input, "Falha ao criar usuario.");
}

export async function deleteUser(userId: string) {
  return callEdgeFunction<{ success: true }>("manage-user", { action: "delete", userId }, "Falha ao remover usuario.");
}

export async function resetUserPassword(userId: string) {
  return callEdgeFunction<{ success: true; temporary_password: string }>(
    "manage-user",
    { action: "reset_password", userId },
    "Falha ao redefinir senha."
  );
}

async function callEdgeFunction<T>(functionName: string, body: unknown, fallbackError: string): Promise<T> {
  const client = requireSupabase();
  if (!supabaseUrl || !supabaseAnonKey) throw new Error("Supabase nao configurado.");

  const {
    data: { session },
    error: sessionError,
  } = await client.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.access_token) throw new Error("Sessao expirada. Faca login novamente.");

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/functions/v1/${functionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${session.access_token}`,
        "x-client-info": "supply-flow-seel",
      },
      body: JSON.stringify(body),
    });

    const payload = await parseFunctionResponse(response);
    if (!response.ok) throw new Error(getPayloadError(payload, fallbackError));
    return payload as T;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Nao foi possivel conectar a Edge Function. Atualize a pagina e tente novamente.");
    }
    throw error;
  }
}

async function parseFunctionResponse(response: Response) {
  try {
    return await response.clone().json();
  } catch {
    return { error: await response.text() };
  }
}

function getPayloadError(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const body = payload as { error?: unknown; message?: unknown; details?: unknown };
    return String(body.error || body.message || body.details || fallback);
  }
  return fallback;
}
