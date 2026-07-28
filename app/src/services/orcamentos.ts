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
