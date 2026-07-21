import type { ModuleKey } from "../types";
import { requireSupabase } from "./supabase";

export const FRETES_STORAGE_KEY = "gestao_fretes_solicitacoes_v1";
export const FRETES_FORM_STORAGE_KEY = "gestao_fretes_formulario_config_v1";

export type EmbeddedStorageSnapshot = Record<string, unknown>;

const sharedStateKeysByModule: Partial<Record<ModuleKey, string[]>> = {
  fretes: [FRETES_FORM_STORAGE_KEY],
};

export async function loadEmbeddedStorageSnapshot(moduleKey: ModuleKey): Promise<EmbeddedStorageSnapshot> {
  if (moduleKey !== "fretes") return {};

  const snapshot: EmbeddedStorageSnapshot = {};
  const [fretes, state] = await Promise.all([listFretePayloads(), listEmbeddedAppState(moduleKey)]);
  const localFretes = readLocalStorageArray(FRETES_STORAGE_KEY);
  const localFormConfig = readLocalStorageValue(FRETES_FORM_STORAGE_KEY);

  if (fretes?.length) snapshot[FRETES_STORAGE_KEY] = fretes;
  else if (localFretes.length) snapshot[FRETES_STORAGE_KEY] = localFretes;
  Object.assign(snapshot, state);
  if (snapshot[FRETES_FORM_STORAGE_KEY] === undefined && localFormConfig !== null) {
    snapshot[FRETES_FORM_STORAGE_KEY] = localFormConfig;
  }

  return snapshot;
}

export async function listFretePayloads() {
  try {
    const client = requireSupabase();
    const { data, error } = await client
      .from("fretes_solicitacoes")
      .select("payload")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return (data || [])
      .map((row) => (row as { payload?: unknown }).payload)
      .filter((payload): payload is Record<string, unknown> => Boolean(payload) && typeof payload === "object" && !Array.isArray(payload));
  } catch (error) {
    console.warn("Nao foi possivel carregar fretes compartilhados. Usando cache local.", error);
    return null;
  }
}

async function listEmbeddedAppState(moduleKey: ModuleKey): Promise<EmbeddedStorageSnapshot> {
  const keys = sharedStateKeysByModule[moduleKey] || [];
  if (!keys.length) return {};

  try {
    const client = requireSupabase();
    const { data, error } = await client
      .from("embedded_app_state")
      .select("storage_key,payload")
      .in("storage_key", keys);

    if (error) throw error;

    return Object.fromEntries(
      (data || []).map((row) => {
        const typed = row as { storage_key: string; payload: unknown };
        return [typed.storage_key, typed.payload];
      })
    );
  } catch (error) {
    console.warn("Nao foi possivel carregar estado compartilhado dos modulos.", error);
    return {};
  }
}

function readLocalStorageValue(key: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readLocalStorageArray(key: string): Array<Record<string, unknown>> {
  const value = readLocalStorageValue(key);
  return Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item))
    : [];
}
