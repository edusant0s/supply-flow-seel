import type { Obra, Profile, UserRole } from "../types";
import { requireSupabase } from "./supabase";

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
}) {
  const client = requireSupabase();
  const { data, error } = await client.functions.invoke("create-user", { body: input });
  if (error) throw new Error(await getFunctionErrorMessage(error));
  return data as { id: string; temporary_password?: string };
}

async function getFunctionErrorMessage(error: unknown) {
  const fallback = error instanceof Error && error.message ? error.message : "Falha ao criar usuario.";
  const context = (error as { context?: { clone?: () => Response } })?.context;
  if (!context?.clone) return fallback;

  try {
    const body = await context.clone().json();
    if (body && typeof body === "object") {
      const payload = body as { error?: unknown; message?: unknown; details?: unknown };
      return String(payload.error || payload.message || payload.details || fallback);
    }
  } catch {
    // The Edge Function may return plain text instead of JSON.
  }

  try {
    const text = await context.clone().text();
    return text || fallback;
  } catch {
    return fallback;
  }
}
