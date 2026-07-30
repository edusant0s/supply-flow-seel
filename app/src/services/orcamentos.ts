import type { Orcamento } from "../types";
import { requireSupabase } from "./supabase";

export async function appendOrcamentoComment(orcamentoId: string, text: string): Promise<Orcamento> {
  const client = requireSupabase();
  const { data, error } = await client.rpc("append_orcamento_comment", {
    p_orcamento_id: orcamentoId,
    p_text: text,
  });
  if (error) throw error;
  return data as Orcamento;
}

export async function updateOrcamentoRequesterFields(
  orcamentoId: string,
  fields: { dataEntregaCotacoes: string | null; atribuidoA: string | null }
): Promise<Orcamento> {
  const client = requireSupabase();
  const { data, error } = await client.rpc("update_orcamento_requester_fields", {
    p_orcamento_id: orcamentoId,
    p_data_entrega_cotacoes: fields.dataEntregaCotacoes || null,
    p_atribuido_a: fields.atribuidoA || null,
  });
  if (error) throw error;
  return data as Orcamento;
}
