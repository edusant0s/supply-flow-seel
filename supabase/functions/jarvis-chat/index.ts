import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const ANTHROPIC_MODEL = "claude-sonnet-5";
const ANTHROPIC_MAX_TOKENS = 1536;
const MAX_MESSAGES = 40;

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://supply-flow-seel.vercel.app",
  "https://supply-flow-seel-py97vh9sl-edusant0s-projects.vercel.app",
  "https://edusant0s.github.io",
];

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

const JARVIS_TOOL_DEFINITIONS = [
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

const MODULE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  alertas: "Alertas",
  requisicoes: "Requisicoes",
  orcamentos: "Orcamentos",
  contratos: "Contratos",
  fretes: "Fretes",
  nota_fiscal: "NF Simples Remessa",
  estoque_obras: "Estoque de Obras",
  cadastro_materiais: "Cadastro de Materiais",
  frota: "Frota",
  fornecedores: "Fornecedores",
  avaliacao_fornecedores: "Avaliacao de Fornecedores",
  importacoes: "Importacoes",
  usuarios: "Usuarios",
  settings: "Configuracoes",
};

function buildSystemPrompt(moduleKey: string, userName: string) {
  const moduleLabel = MODULE_LABELS[moduleKey] || "nenhum modulo especifico (visao geral)";

  return `Voce e o JARVIS SUPPLY, copiloto operacional de Supply Chain integrado ao Supply Flow (sistema de gestao de suprimentos da Seel para obras).

Contexto atual: o usuario ${userName} esta na tela "${moduleLabel}". Priorize responder sobre esse contexto quando a pergunta for ambigua, mas responda livremente sobre qualquer modulo se o usuario perguntar especificamente sobre outro.

Sua expertise cobre: Supply Chain, Strategic Sourcing, Procurement, Compras, Gestao de Estoques e Materiais, PCP, Engenharia Civil e de Producao, Pesquisa Operacional, Lean Construction, Lean Manufacturing, Lean Office, Lean Six Sigma, Kaizen, DMAIC, PDCA, 5S, Kanban, VSM, Last Planner, Gestao de Projetos, Logistica, Gestao de Frota e Contratos, Compliance, KPIs/indicadores, engenharia economica e gestao de riscos.

Regras invioláveis:
1. Responda SOMENTE com base em dados retornados pelas ferramentas (tools) disponiveis. Nunca invente numeros, registros, nomes ou datas.
2. Se a pergunta exigir dados que voce nao tem ferramenta para buscar (ex.: NF Simples Remessa, Cadastro de Materiais, Cadastro de Fornecedores nesta versao), diga isso claramente em vez de supor.
3. Sempre que apresentar uma conclusao, cite a evidencia (quais registros, quantidade, ferramenta usada) que a sustenta.
4. Ao ser solicitado analises (Lean, Six Sigma, gargalos, riscos), aplique os frameworks pertinentes mas ancore cada afirmacao nos dados reais buscados — nao entregue teoria genérica desconectada dos numeros do sistema.
5. Seja direto e estruturado (bullets/secoes curtas) em resumos executivos; seja conversacional em perguntas simples.
6. Nunca revele chaves, tokens ou detalhes de infraestrutura.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: getCorsHeaders(req) });
  if (req.method !== "POST") return jsonResponse(req, { error: "Metodo nao permitido." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");
  const authHeader = req.headers.get("Authorization");

  if (!supabaseUrl || !anonKey || !anthropicApiKey) {
    return jsonResponse(req, { error: "Funcao sem variaveis de ambiente obrigatorias." }, 500);
  }

  if (!authHeader) {
    return jsonResponse(req, { error: "Sem Authorization header." }, 401);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user: caller },
    error: callerError,
  } = await userClient.auth.getUser();

  if (callerError || !caller) {
    return jsonResponse(req, { error: "Sessao invalida." }, 401);
  }

  const { data: callerProfile, error: profileError } = await userClient
    .from("profiles")
    .select("nome, ativo")
    .eq("id", caller.id)
    .maybeSingle();

  if (profileError || !callerProfile?.ativo) {
    return jsonResponse(req, { error: "Usuario inativo ou sem perfil valido." }, 403);
  }

  let body: { messages?: unknown; moduleKey?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse(req, { error: "Corpo da requisicao invalido." }, 400);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    return jsonResponse(req, { error: "Nenhuma mensagem informada." }, 400);
  }
  if (messages.length > MAX_MESSAGES) {
    return jsonResponse(req, { error: "Conversa muito longa. Inicie uma nova conversa." }, 400);
  }

  const moduleKey = typeof body.moduleKey === "string" ? body.moduleKey : "";
  const systemPrompt = buildSystemPrompt(moduleKey, callerProfile.nome || "usuario");

  let anthropicResponse: Response;
  try {
    anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: ANTHROPIC_MAX_TOKENS,
        system: systemPrompt,
        messages,
        tools: JARVIS_TOOL_DEFINITIONS,
      }),
    });
  } catch (err) {
    return jsonResponse(req, { error: `Falha ao contatar o provedor de IA: ${err instanceof Error ? err.message : String(err)}` }, 502);
  }

  const payload = await anthropicResponse.json().catch(() => null);

  if (!anthropicResponse.ok || !payload) {
    const message = (payload as { error?: { message?: string } } | null)?.error?.message || "Falha ao consultar o provedor de IA.";
    return jsonResponse(req, { error: message }, 502);
  }

  return jsonResponse(req, {
    content: payload.content,
    stop_reason: payload.stop_reason,
    usage: payload.usage,
  });
});
