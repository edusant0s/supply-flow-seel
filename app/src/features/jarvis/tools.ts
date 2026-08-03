import { normalizeText, slaColorByDueDate } from "../../lib/format";
import { listEntities } from "../../services/entities";
import { loadEmbeddedStorageSnapshot, listSupplierEvaluationPayloads } from "../../services/embeddedSync";
import type { Contrato, Fornecedor, Orcamento, Requisicao } from "../../types";
import { buildCriticalInsights, buildDashboardRows } from "../dashboard/dashboardModel";
import { buildOrcamentoCriticalAnalysis } from "../orcamentos/OrcamentosCriticalAnalysis";

export type JarvisToolName = "get_overview_summary" | "get_module_records" | "get_module_insights" | "compare_suppliers";

/**
 * Tool definitions in Anthropic Messages API format. Kept intentionally small (v1 scope):
 * a handful of generic, well-tested tools instead of one bespoke tool per module.
 */
export const JARVIS_TOOL_DEFINITIONS = [
  {
    name: "get_overview_summary",
    description:
      "Retorna um resumo executivo cruzando todos os principais modulos do Supply Flow (Requisicoes, Orcamentos, Contratos, Fornecedores, Fretes, Frota, Estoque de Obras, Avaliacao de Fornecedores): indicadores por modulo e os alertas/insights automaticos mais criticos, ja priorizados. Use esta ferramenta para perguntas amplas como 'existe algum gargalo?', 'faca um resumo executivo', 'quais obras tem maior risco?'.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_module_records",
    description:
      "Lista registros reais de um modulo especifico (Requisicoes, Orcamentos, Contratos ou Fornecedores), com filtros opcionais por status, atraso de prazo ou responsavel. Use para perguntas concretas como 'quais requisicoes estao atrasadas?' ou 'liste os contratos urgentes'.",
    input_schema: {
      type: "object",
      properties: {
        module: { type: "string", enum: ["requisicoes", "orcamentos", "contratos", "fornecedores"] },
        status: { type: "string", description: "Filtro textual parcial pelo campo status do registro." },
        atrasado: { type: "boolean", description: "Se true, retorna apenas registros com prazo vencido." },
        atribuido: { type: "string", description: "Filtro textual parcial por comprador/solicitante/responsavel." },
        limit: { type: "number", description: "Quantidade maxima de registros (padrao 15, maximo 50)." },
      },
      required: ["module"],
    },
  },
  {
    name: "get_module_insights",
    description:
      "Retorna a analise critica automatica detalhada (indice de controle, exposicao financeira, cards de risco/gargalo) de um modulo. Nesta versao, disponivel apenas para 'orcamentos' — para outros modulos, use get_overview_summary.",
    input_schema: {
      type: "object",
      properties: { module: { type: "string", enum: ["orcamentos"] } },
      required: ["module"],
    },
  },
  {
    name: "compare_suppliers",
    description:
      "Compara fornecedores pela nota media das avaliacoes reais registradas em Avaliacao de Fornecedores, retornando os melhores e os piores. Use para 'quais fornecedores tem pior desempenho?' ou 'compare os fornecedores da obra X'.",
    input_schema: {
      type: "object",
      properties: {
        obra: { type: "string", description: "Filtra avaliacoes de uma obra especifica (texto parcial)." },
        limit: { type: "number", description: "Quantos fornecedores retornar em cada extremo (padrao 10, maximo 30)." },
      },
      required: [],
    },
  },
];

export async function runJarvisTool(name: JarvisToolName, input: Record<string, unknown>): Promise<unknown> {
  try {
    switch (name) {
      case "get_overview_summary":
        return await getOverviewSummary();
      case "get_module_records":
        return await getModuleRecords(input);
      case "get_module_insights":
        return await getModuleInsights(input);
      case "compare_suppliers":
        return await compareSuppliers(input);
      default:
        return { error: `Ferramenta desconhecida: ${name}` };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Falha ao executar a ferramenta." };
  }
}

async function getOverviewSummary() {
  const [requisicoes, orcamentos, contratos, fornecedores, fretesState, frotaState, estoqueState, avaliacaoState] = await Promise.all([
    listEntities("requisicoes"),
    listEntities("orcamentos"),
    listEntities("contratos"),
    listEntities("fornecedores"),
    loadEmbeddedStorageSnapshot("fretes"),
    loadEmbeddedStorageSnapshot("frota"),
    loadEmbeddedStorageSnapshot("estoque_obras"),
    loadEmbeddedStorageSnapshot("avaliacao_fornecedores"),
  ]);

  const rows = buildDashboardRows({ requisicoes, orcamentos, contratos, fornecedores, fretesState, frotaState, estoqueState, avaliacaoState });
  const insights = buildCriticalInsights(rows);

  return {
    gerado_em: new Date().toISOString(),
    modulos: rows.map((row) => ({
      modulo: row.processo,
      demanda: row.demanda,
      em_aberto: row.emAberto,
      finalizados: row.finalizados,
      risco_sla: row.riscoSla,
      indicador: row.indicador,
    })),
    principais_alertas: insights.slice(0, 12).map((insight) => ({
      categoria: insight.category,
      titulo: insight.title,
      valor: insight.value,
      contexto: insight.meta,
      descricao: insight.description,
      acao_recomendada: insight.action,
      severidade: insight.tone,
    })),
    nota: "Fretes, Frota, Estoque de Obras e Avaliacao de Fornecedores aparecem aqui em nivel de indicador. NF Simples Remessa, Cadastro de Materiais e Cadastro de Fornecedores nao estao cobertos nesta versao.",
  };
}

type ModuleRecordsModule = "requisicoes" | "orcamentos" | "contratos" | "fornecedores";
const SUPPORTED_MODULES: ModuleRecordsModule[] = ["requisicoes", "orcamentos", "contratos", "fornecedores"];

const DUE_DATE_FIELD: Record<ModuleRecordsModule, string | null> = {
  requisicoes: "data_necessidade",
  orcamentos: "data_entrega_cotacoes",
  contratos: "prazo_urgencia",
  fornecedores: null,
};

async function getModuleRecords(input: Record<string, unknown>) {
  const moduleKey = String(input.module || "") as ModuleRecordsModule;
  if (!SUPPORTED_MODULES.includes(moduleKey)) {
    return { error: `Modulo '${moduleKey}' nao suportado por esta ferramenta nesta versao. Use get_overview_summary para uma visao geral.` };
  }

  const rows = await listEntities(moduleKey);
  let filtered: Array<Requisicao | Orcamento | Contrato | Fornecedor> = rows;

  const statusFilter = typeof input.status === "string" ? normalizeText(input.status) : "";
  if (statusFilter) {
    filtered = filtered.filter((item) => normalizeText(String((item as { status?: string }).status || "")).includes(statusFilter));
  }

  const dueField = DUE_DATE_FIELD[moduleKey];
  if (input.atrasado === true && dueField) {
    filtered = filtered.filter((item) => slaColorByDueDate((item as Record<string, unknown>)[dueField] as string | null) === "danger");
  }

  const atribuidoFilter = typeof input.atribuido === "string" ? normalizeText(input.atribuido) : "";
  if (atribuidoFilter) {
    filtered = filtered.filter((item) => normalizeText(JSON.stringify(item)).includes(atribuidoFilter));
  }

  const limit = Math.min(Math.max(1, Number(input.limit) || 15), 50);
  const total = filtered.length;
  const page = filtered.slice(0, limit);

  return {
    modulo: moduleKey,
    total_encontrado: total,
    mostrando: page.length,
    registros: page.map((item) => slimRecord(moduleKey, item)),
  };
}

function slimRecord(moduleKey: ModuleRecordsModule, item: Requisicao | Orcamento | Contrato | Fornecedor) {
  const base = { id: item.id, status: (item as { status?: string }).status, created_at: item.created_at, updated_at: item.updated_at };

  if (moduleKey === "requisicoes") {
    const r = item as Requisicao;
    return { ...base, numero_rm: r.numero_rm, solicitante: r.solicitante, comprador: r.comprador, categoria: r.categoria, prioridade: r.prioridade, data_necessidade: r.data_necessidade, centro_custo: r.centro_custo };
  }
  if (moduleKey === "orcamentos") {
    const o = item as Orcamento;
    return {
      ...base,
      numero_proposta: o.numero_proposta,
      cliente: o.cliente,
      nome_solicitante: o.nome_solicitante,
      local_obra: o.local_obra,
      tipo_orcamento: o.tipo_orcamento,
      data_entrega_cotacoes: o.data_entrega_cotacoes,
      saving: o.saving,
      atribuido_a: o.atribuido_a,
    };
  }
  if (moduleKey === "contratos") {
    const c = item as Contrato;
    return { ...base, codigo_embutido: c.codigo_embutido, solicitante: c.solicitante, centro_custo: c.centro_custo, tipo_documento: c.tipo_documento, urgencia: c.urgencia, prazo_urgencia: c.prazo_urgencia, fase_compor: c.fase_compor };
  }
  const f = item as Fornecedor;
  return { ...base, codigo: f.codigo, nome: f.nome, categoria: f.categoria, produto_servico: f.produto_servico, cidade: f.cidade, uf: f.uf, cadastro_ativo: f.cadastro_ativo };
}

async function getModuleInsights(input: Record<string, unknown>) {
  const moduleKey = String(input.module || "");
  if (moduleKey !== "orcamentos") {
    return { error: "Analise critica detalhada disponivel apenas para 'orcamentos' nesta versao. Use get_overview_summary para os demais modulos." };
  }

  const items = await listEntities("orcamentos");
  const analysis = buildOrcamentoCriticalAnalysis(items, Date.now());

  return {
    total: analysis.total,
    indice_controle: analysis.healthScore,
    resumo: analysis.headlineText,
    criticos: analysis.criticalCount,
    atencao: analysis.warningCount,
    exposicao_financeira: analysis.exposure,
    analises: analysis.cards.map((card) => ({
      categoria: card.eyebrow,
      titulo: card.title,
      valor: card.value,
      contexto: card.meta,
      descricao: card.description,
      acao: card.action,
      severidade: card.tone,
    })),
  };
}

async function compareSuppliers(input: Record<string, unknown>) {
  const evaluations = await listSupplierEvaluationPayloads();
  if (!evaluations || !evaluations.length) {
    return { error: "Nao ha avaliacoes de fornecedores registradas para comparar." };
  }

  let rows = evaluations;
  const obraFilter = typeof input.obra === "string" ? normalizeText(input.obra) : "";
  if (obraFilter) {
    rows = rows.filter((row) => normalizeText(String(row.obra || "")).includes(obraFilter));
  }

  const byFornecedor = new Map<string, { fornecedor: string; scores: number[]; count: number }>();
  rows.forEach((row) => {
    const nome = String(row.fornecedor || row.supplierName || "").trim();
    const score = Number(row.average ?? row.media ?? NaN);
    if (!nome || Number.isNaN(score)) return;
    const entry = byFornecedor.get(nome) || { fornecedor: nome, scores: [], count: 0 };
    entry.scores.push(score);
    entry.count += 1;
    byFornecedor.set(nome, entry);
  });

  if (!byFornecedor.size) {
    return { error: "Nenhuma avaliacao com nota valida encontrada para o filtro informado." };
  }

  const ranked = Array.from(byFornecedor.values())
    .map((entry) => ({
      fornecedor: entry.fornecedor,
      nota_media: Number((entry.scores.reduce((sum, value) => sum + value, 0) / entry.scores.length).toFixed(2)),
      avaliacoes: entry.count,
    }))
    .sort((a, b) => b.nota_media - a.nota_media);

  const limit = Math.min(Math.max(1, Number(input.limit) || 10), 30);

  return {
    total_fornecedores_avaliados: ranked.length,
    melhores: ranked.slice(0, limit),
    piores: ranked.slice(-limit).reverse(),
  };
}
