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
  contratos: [CONTRATOS_FORM_STORAGE_KEY],
  fretes: [FRETES_FORM_STORAGE_KEY],
  frota: [FROTA_VEHICLES_STORAGE_KEY, FROTA_FINES_STORAGE_KEY, FROTA_MEASUREMENTS_STORAGE_KEY, FROTA_MANAGER_STORAGE_KEY],
  estoque_obras: [ESTOQUE_STATE_STORAGE_KEY],
  avaliacao_fornecedores: [AVALIACAO_DB_STORAGE_KEY],
};

export function getEmbeddedStorageKeysForModule(moduleKey: ModuleKey) {
  const keys = sharedStateKeysByModule[moduleKey] || [];
  if (moduleKey === "contratos") return [CONTRATOS_REQUESTS_STORAGE_KEY, ...keys];
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

  if (moduleKey === "contratos") {
    const contratos = await listContratoRequestPayloads();
    if (contratos) {
      if (contratos.length) {
        snapshot[CONTRATOS_REQUESTS_STORAGE_KEY] = contratos;
      } else {
        const legacy = await listEmbeddedStateValue<unknown>(CONTRATOS_REQUESTS_STORAGE_KEY);
        snapshot[CONTRATOS_REQUESTS_STORAGE_KEY] = Array.isArray(legacy) ? legacy : [];
      }
    } else {
      const legacy = await listEmbeddedStateValue<unknown>(CONTRATOS_REQUESTS_STORAGE_KEY);
      const localContratos = readLocalStorageArray(CONTRATOS_REQUESTS_STORAGE_KEY);
      snapshot[CONTRATOS_REQUESTS_STORAGE_KEY] = Array.isArray(legacy) ? legacy : localContratos;
    }
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

export async function listContratoRequestPayloads() {
  try {
    const client = requireSupabase();
    const pageSize = 1000;
    const rows: ContractRow[] = [];

    for (let from = 0; ; from += pageSize) {
      const { data, error } = await client
        .from("contratos")
        .select(
          "id,codigo_embutido,obra_id,solicitante,email_solicitante,centro_custo,tipo_documento,urgencia,prazo_urgencia,status,fase_compor,payload,created_at,updated_at"
        )
        .order("updated_at", { ascending: false })
        .range(from, from + pageSize - 1);

      if (error) throw error;
      rows.push(...((data || []) as ContractRow[]));
      if (!data || data.length < pageSize) break;
    }

    return rows.map(contractRowToEmbeddedRequest);
  } catch (error) {
    console.warn("Nao foi possivel carregar contratos compartilhados. Usando cache local quando existir.", error);
    return null;
  }
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

type ContractRow = {
  id: string;
  codigo_embutido: string | null;
  obra_id: string | null;
  solicitante: string | null;
  email_solicitante: string | null;
  centro_custo: string | null;
  tipo_documento: string | null;
  urgencia: string | null;
  prazo_urgencia: string | null;
  status: string | null;
  fase_compor: string | null;
  payload: Record<string, unknown> | null;
  created_at: string | null;
  updated_at: string | null;
};

function contractRowToEmbeddedRequest(row: ContractRow): Record<string, unknown> {
  const payload = asObject(row.payload) || {};
  const embedded = asObject(payload.__embedded_contract_request) || payload;
  const embeddedData = asObject(embedded.data) || asObject(payload.data) || {};
  const createdAt = firstString(embedded.createdAt, row.created_at, row.updated_at, new Date().toISOString());
  const updatedAt = firstString(embedded.updatedAt, row.updated_at, createdAt);
  const dataSolicitacao = firstDateString(embedded.dataSolicitacao, embeddedData.data_solicitacao, row.created_at);
  const dataLimite = firstDateString(embedded.dataLimite, embeddedData.data_limite_atendimento, row.prazo_urgencia);
  const tipo = firstString(row.tipo_documento, embedded.tipo, embeddedData.tipo_documento_obra, embeddedData.tipo_documento_departamento, "Solicitacao");
  const centro = firstString(row.centro_custo, embedded.centro, embeddedData.centro_obra, embeddedData.centro_departamento);
  const urgencia = firstString(row.urgencia, embedded.urgencia, embeddedData.prazo_urgencia, "NORMAL - 5 DIAS UTEIS");
  const solicitante = firstString(row.solicitante, embedded.solicitante, embeddedData.solicitante);
  const email = firstString(row.email_solicitante, embedded.email, embeddedData.email);
  const status = detailedContractStatus(firstString(row.status, row.fase_compor, embedded.status));

  return {
    ...embedded,
    id: firstString(row.codigo_embutido, embedded.id, `SC-${row.id.slice(0, 8).toUpperCase()}`),
    __supplyContratoDbId: row.id,
    __supplyObraId: row.obra_id || "",
    codigo_embutido: firstString(row.codigo_embutido, embedded.codigo_embutido),
    createdAt,
    updatedAt,
    dataSolicitacao,
    status,
    tipo,
    solicitante,
    email,
    centro,
    urgencia,
    dataLimite,
    phaseStartedAt: firstString(embedded.phaseStartedAt, row.updated_at, createdAt),
    phaseHistory: Array.isArray(embedded.phaseHistory) ? embedded.phaseHistory : [],
    data: {
      ...embeddedData,
      solicitante,
      email,
      centro_obra: firstString(embeddedData.centro_obra, centro),
      centro_departamento: firstString(embeddedData.centro_departamento),
      tipo_documento_obra: firstString(embeddedData.tipo_documento_obra, tipo),
      tipo_documento_departamento: firstString(embeddedData.tipo_documento_departamento),
      prazo_urgencia: firstString(embeddedData.prazo_urgencia, urgencia),
      data_limite_atendimento: dataLimite,
      data_solicitacao: dataSolicitacao,
      fornecedor_parte_envolvida: firstString(embeddedData.fornecedor_parte_envolvida, payload.fornecedor),
      objeto_resumo_demanda: firstString(embeddedData.objeto_resumo_demanda, payload.objeto),
      observacoes: firstString(embeddedData.observacoes, payload.observacoes),
    },
  };
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (text) return text;
  }
  return "";
}

function firstDateString(...values: unknown[]) {
  const value = firstString(...values);
  if (!value) return "";
  const isoMatch = value.match(/^\d{4}-\d{2}-\d{2}/);
  if (isoMatch) return isoMatch[0];
  return value;
}

function detailedContractStatus(value: string) {
  const status = normalizeStatusText(value);
  if (!status) return "N\u00e3o Iniciado";
  if (status.includes("aprovado") || status.includes("finalizado")) return "Aprovado no Compor";
  if (status.includes("compor") || status.includes("cadastro")) return "Em Cadastro no Compor";
  if (status.includes("assinado")) return "Contrato Assinado";
  if (status.includes("assinatura")) return "Enviado para Assinatura";
  if (status.includes("validacao") || status.includes("analise") || status.includes("aguardando")) return "Aguardando Valida\u00e7\u00e3o";
  if (status.includes("elaboracao") || status.includes("compor")) return "Em Elabora\u00e7\u00e3o";
  if (status.includes("solicitado") || status.includes("iniciado")) return "N\u00e3o Iniciado";
  return value;
}

function normalizeStatusText(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
