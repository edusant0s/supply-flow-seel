import type { Contrato, Fornecedor, ImportKind, Importacao, Orcamento, Requisicao } from "../types";
import { requireSupabase } from "./supabase";
import type { RawRow } from "../lib/spreadsheet";
import { FROTA_VEHICLES_STORAGE_KEY } from "./embeddedSync";

export type EntityName = "requisicoes" | "orcamentos" | "contratos" | "fornecedores";

export type EntityMap = {
  requisicoes: Requisicao;
  orcamentos: Orcamento;
  contratos: Contrato;
  fornecedores: Fornecedor;
};

const orderField: Record<EntityName | "importacoes", string> = {
  requisicoes: "updated_at",
  orcamentos: "updated_at",
  contratos: "updated_at",
  fornecedores: "updated_at",
  importacoes: "created_at",
};

export async function listEntities<K extends EntityName>(table: K): Promise<EntityMap[K][]> {
  const client = requireSupabase();
  const pageSize = 1000;
  const rows: EntityMap[K][] = [];

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await client
      .from(table)
      .select("*")
      .order(orderField[table], { ascending: false })
      .range(from, from + pageSize - 1);

    if (error) throw error;
    rows.push(...((data || []) as EntityMap[K][]));
    if (!data || data.length < pageSize) break;
  }

  return rows;
}

export async function updateEntity<K extends EntityName>(table: K, id: string, patch: Partial<EntityMap[K]>) {
  const client = requireSupabase();
  const { error } = await client.from(table).update(patch as never).eq("id", id);
  if (error) throw error;
}

export async function deleteEntity(table: EntityName, id: string) {
  const client = requireSupabase();
  const { error } = await client.from(table).delete().eq("id", id);
  if (error) throw error;
}

export async function clearEntityTable(table: EntityName) {
  const client = requireSupabase();
  const { error } = await client.from(table).delete().not("id", "is", null);
  if (error) throw error;
}

export async function insertEntity<K extends EntityName>(table: K, row: Partial<EntityMap[K]>) {
  const client = requireSupabase();
  const { error } = await client.from(table).insert(row as never);
  if (error) throw error;
}

export async function listImportacoes(): Promise<Importacao[]> {
  const client = requireSupabase();
  const { data, error } = await client.from("importacoes").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as Importacao[];
}

export async function upsertImportedRows(kind: ImportKind, records: RawRow[], arquivoNome: string, errors: unknown[]) {
  const client = requireSupabase();
  if (!records.length) throw new Error("Nenhum registro valido para importar.");
  const preparedRecords = prepareRecordsForWrite(kind, records);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (kind === "frota") {
    const { error } = await client.from("embedded_app_state").upsert(
      {
        storage_key: FROTA_VEHICLES_STORAGE_KEY,
        module_key: "frota",
        payload: preparedRecords,
        updated_by: user?.id || null,
      },
      { onConflict: "storage_key" }
    );
    if (error) throw error;

    await insertImportLog(kind, arquivoNome, user?.id || null, records.length, errors);
    return;
  }

  if (kind === "contratos") {
    const { error } = await client.from(kind).insert(preparedRecords);
    if (error) throw error;
  } else {
    type EntityImportKind = Exclude<ImportKind, "contratos" | "frota">;
    const entityKind = kind as EntityImportKind;
    const conflict: Record<EntityImportKind, string> = {
      requisicoes: "numero_rm",
      orcamentos: "numero_proposta",
      fornecedores: "codigo",
    };
    const { error } = await client.from(entityKind).upsert(preparedRecords, { onConflict: conflict[entityKind] });
    if (error) throw error;
  }

  await insertImportLog(kind, arquivoNome, user?.id || null, records.length, errors);
}

function prepareRecordsForWrite(kind: ImportKind, records: RawRow[]) {
  if (kind === "contratos") return records;
  if (kind === "frota") return prepareFleetRecords(records);

  type EntityImportKind = Exclude<ImportKind, "contratos" | "frota">;
  const entityKind = kind as EntityImportKind;
  const keyByKind: Record<EntityImportKind, string> = {
    requisicoes: "numero_rm",
    orcamentos: "numero_proposta",
    fornecedores: "codigo",
  };
  const key = keyByKind[entityKind];
  const grouped = new Map<string, RawRow>();
  const withoutKey: RawRow[] = [];

  for (const record of records) {
    const keyValue = String(record[key] ?? "").trim();
    if (!keyValue) {
      withoutKey.push(record);
      continue;
    }

    const existing = grouped.get(keyValue);
    grouped.set(keyValue, existing ? mergeDuplicateRecord(entityKind, existing, record) : record);
  }

  return [...grouped.values(), ...withoutKey];
}

function prepareFleetRecords(records: RawRow[]) {
  const grouped = new Map<string, RawRow>();

  records.forEach((record) => {
    const key = String(record.placaVeiculo || record.codigoVeiculo || record.id || "").trim();
    if (!key) return;
    const existing = grouped.get(key);
    grouped.set(key, existing ? mergeFleetRecord(existing, record) : record);
  });

  return [...grouped.values()];
}

function mergeFleetRecord(base: RawRow, next: RawRow): RawRow {
  const basePayload = asPayload(base.payload);
  const nextPayload = asPayload(next.payload);
  const importedRows = Array.isArray(basePayload._linhas_importadas) ? (basePayload._linhas_importadas as RawRow[]) : [basePayload];

  return {
    ...base,
    ...Object.fromEntries(Object.entries(next).filter(([, value]) => value !== "" && value !== null && value !== undefined)),
    payload: {
      ...basePayload,
      _linhas_importadas: [...importedRows, nextPayload],
    },
  };
}

function mergeDuplicateRecord(kind: Exclude<ImportKind, "contratos" | "frota">, base: RawRow, next: RawRow): RawRow {
  const basePayload = asPayload(base.payload);
  const nextPayload = asPayload(next.payload);
  const itemRows = [
    ...(Array.isArray(basePayload._linhas_importadas) ? basePayload._linhas_importadas : [basePayload]),
    nextPayload,
  ];

  if (kind === "requisicoes") {
    return {
      ...base,
      status: base.status === "PENDENTE_ASSINATURA" || next.status === "PENDENTE_ASSINATURA" ? "PENDENTE_ASSINATURA" : base.status,
      comprador: base.comprador || next.comprador,
      categoria: uniqueText([base.categoria, next.categoria]).join(", "),
      payload: {
        ...basePayload,
        _linhas_importadas: itemRows,
        _total_itens_agrupados: itemRows.length,
      },
    };
  }

  return {
    ...base,
    ...Object.fromEntries(Object.entries(next).filter(([, value]) => value !== "" && value !== null && value !== undefined)),
    payload: {
      ...basePayload,
      _linhas_importadas: itemRows,
      _total_itens_agrupados: itemRows.length,
    },
  };
}

function asPayload(value: unknown): RawRow {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRow) : {};
}

function uniqueText(values: unknown[]) {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean)));
}

async function insertImportLog(kind: ImportKind, arquivoNome: string, usuarioId: string | null, totalLinhas: number, errors: unknown[]) {
  const client = requireSupabase();
  const { error } = await client.from("importacoes").insert({
    tipo: kind,
    arquivo_nome: arquivoNome,
    usuario_id: usuarioId,
    total_linhas: totalLinhas,
    sucesso: errors.length === 0,
    erros: errors,
  });
  if (error) throw error;
}
