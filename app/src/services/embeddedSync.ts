import type { ModuleKey } from "../types";
import { requireSupabase } from "./supabase";

export const FRETES_STORAGE_KEY = "gestao_fretes_solicitacoes_v1";
export const FRETES_FORM_STORAGE_KEY = "gestao_fretes_formulario_config_v1";

export const FROTA_VEHICLES_STORAGE_KEY = "frota_veiculos_v4_importacao_inicial";
export const FROTA_FINES_STORAGE_KEY = "frota_multas_v4_importacao_inicial";
export const FROTA_MEASUREMENTS_STORAGE_KEY = "frota_medicoes_v4_integracoes";
export const FROTA_MANAGER_STORAGE_KEY = "frota_responsavel_v4";

export const ESTOQUE_STATE_STORAGE_KEY = "obrastock_clean_state_v1";

export const AVALIACAO_DB_STORAGE_KEY = "seel_supplier_evaluation_db_v10";

export const CONTRATOS_FORM_STORAGE_KEY = "seel_form_google_forms_v8_sem_mapa_sem_un";
export const CONTRATOS_REQUESTS_STORAGE_KEY = "seel_requests_google_forms_exato_v1";

export type EmbeddedStorageSnapshot = Record<string, unknown>;

const sharedStateKeysByModule: Partial<Record<ModuleKey, string[]>> = {
  contratos: [CONTRATOS_FORM_STORAGE_KEY, CONTRATOS_REQUESTS_STORAGE_KEY],
  fretes: [FRETES_FORM_STORAGE_KEY],
  frota: [FROTA_VEHICLES_STORAGE_KEY, FROTA_FINES_STORAGE_KEY, FROTA_MEASUREMENTS_STORAGE_KEY, FROTA_MANAGER_STORAGE_KEY],
  estoque_obras: [ESTOQUE_STATE_STORAGE_KEY],
  avaliacao_fornecedores: [AVALIACAO_DB_STORAGE_KEY],
};

export function getEmbeddedStorageKeysForModule(moduleKey: ModuleKey) {
  const keys = sharedStateKeysByModule[moduleKey] || [];
  if (moduleKey === "fretes") return [FRETES_STORAGE_KEY, ...keys];
  return keys;
}

export async function loadEmbeddedStorageSnapshot(moduleKey: ModuleKey): Promise<EmbeddedStorageSnapshot> {
  const snapshot: EmbeddedStorageSnapshot = {};
  const stateKeys = sharedStateKeysByModule[moduleKey] || [];

  if (stateKeys.length) {
    Object.assign(snapshot, await listEmbeddedAppState(stateKeys));
    fillMissingKeysFromLocalStorage(snapshot, stateKeys);
  }

  if (moduleKey === "fretes") {
    const fretes = await listFretePayloads();
    const localFretes = readLocalStorageArray(FRETES_STORAGE_KEY);
    if (fretes?.length) snapshot[FRETES_STORAGE_KEY] = fretes;
    else if (localFretes.length) snapshot[FRETES_STORAGE_KEY] = localFretes;
  }

  if (moduleKey === "estoque_obras") {
    const orders = await listEstoqueOrderPayloads();
    if (orders) {
      const state = asObject(snapshot[ESTOQUE_STATE_STORAGE_KEY]) || {};
      snapshot[ESTOQUE_STATE_STORAGE_KEY] = { ...state, orders };
    }
  }

  if (moduleKey === "avaliacao_fornecedores") {
    const evaluations = await listSupplierEvaluationPayloads();
    if (evaluations) {
      const db = asObject(snapshot[AVALIACAO_DB_STORAGE_KEY]) || { cycles: [], suppliers: [] };
      snapshot[AVALIACAO_DB_STORAGE_KEY] = { ...db, evaluations };
    }
  }

  return snapshot;
}

export async function listFretePayloads() {
  return listPayloads("fretes_solicitacoes", "updated_at", "desc");
}

export async function listEstoqueOrderPayloads() {
  return listPayloads("estoque_obras_pedidos", "updated_at", "desc");
}

export async function listSupplierEvaluationPayloads() {
  return listPayloads("avaliacao_fornecedores_avaliacoes", "updated_at", "desc");
}

export async function listEmbeddedStateValue<T = unknown>(storageKey: string): Promise<T | null> {
  try {
    const client = requireSupabase();
    const { data, error } = await client.from("embedded_app_state").select("payload").eq("storage_key", storageKey).maybeSingle();
    if (error) throw error;
    return (data?.payload as T | undefined) ?? null;
  } catch (error) {
    console.warn("Nao foi possivel carregar estado compartilhado.", error);
    return null;
  }
}

async function listEmbeddedAppState(keys: string[]): Promise<EmbeddedStorageSnapshot> {
  if (!keys.length) return {};

  try {
    const client = requireSupabase();
    const { data, error } = await client.from("embedded_app_state").select("storage_key,payload").in("storage_key", keys);

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

async function listPayloads(table: "fretes_solicitacoes" | "estoque_obras_pedidos" | "avaliacao_fornecedores_avaliacoes", orderColumn: string, direction: "asc" | "desc") {
  try {
    const client = requireSupabase();
    const { data, error } = await client.from(table).select("payload").order(orderColumn, { ascending: direction === "asc" });

    if (error) throw error;
    return (data || [])
      .map((row) => (row as { payload?: unknown }).payload)
      .filter((payload): payload is Record<string, unknown> => Boolean(payload) && typeof payload === "object" && !Array.isArray(payload));
  } catch (error) {
    console.warn(`Nao foi possivel carregar dados compartilhados de ${table}. Usando cache local quando existir.`, error);
    return null;
  }
}

function fillMissingKeysFromLocalStorage(snapshot: EmbeddedStorageSnapshot, keys: string[]) {
  keys.forEach((key) => {
    if (snapshot[key] !== undefined) return;
    const localValue = readLocalStorageValue(key);
    if (localValue !== null) snapshot[key] = localValue;
  });
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

function asObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}
