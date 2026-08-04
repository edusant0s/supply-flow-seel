# JARVIS SUPPLY — copiloto de IA integrado ao Supply Flow

Assistente de IA disponível em qualquer tela autenticada (botão flutuante no canto
inferior direito). Detecta automaticamente o módulo atual e responde perguntas de
Supply Chain/Procurement usando apenas dados reais do sistema — nunca inventa
informação.

## Como funciona

- **Tools rodam no cliente.** O botão (`app/src/features/jarvis/JarvisAssistant.tsx`)
  chama `useJarvisChat`, que conversa com a Edge Function `jarvis-chat` e, quando o
  modelo pede uma ferramenta (`tool_use`), executa a ferramenta correspondente no
  navegador (`app/src/features/jarvis/tools.ts`) reaproveitando os serviços já
  existentes (`listEntities`, `embeddedSync.ts`, `buildDashboardRows`,
  `buildCriticalInsights`, `buildOrcamentoCriticalAnalysis`). Isso significa que toda
  leitura de dados roda com o Supabase client do próprio usuário logado — RLS e as
  permissões de `app/src/lib/permissions.ts` (`canView`/`canManage`) se aplicam
  automaticamente, sem nenhuma lógica de acesso duplicada no servidor. O protocolo de
  conversa exposto ao cliente (`text`/`tool_use`/`tool_result`, `stop_reason`) segue o
  formato da Anthropic Messages API — a Edge Function traduz isso para o formato da
  Gemini API internamente, então o loop do cliente (`useJarvisChat.ts`) não precisa
  conhecer o provedor de IA por baixo.
- **A Edge Function é só um proxy fino.** `supabase/functions/jarvis-chat/index.ts`
  segue exatamente o esqueleto de `create-user/index.ts` (CORS, validação de
  `Authorization`, checagem de usuário ativo em `profiles`), converte as mensagens
  para o formato da Gemini API (`toGeminiContents`/`toGeminiTools`) e repassa a
  conversa para a API do Gemini (`generativelanguage.googleapis.com`), usando o
  modelo `gemini-2.0-flash` por padrão (configurável via secret `GEMINI_MODEL`). Ela
  não tem acesso de service-role e não executa nenhuma ferramenta — só monta o system
  prompt e faz o relay.
- **Auditoria leve.** Cada pergunta feita ao JARVIS grava uma linha em
  `public.jarvis_interactions` (migration `025_jarvis_interactions.sql`):
  usuário, módulo, pergunta e quais ferramentas foram usadas. É best-effort — se a
  gravação falhar, a conversa do usuário não é interrompida.

## Ferramentas disponíveis (v1)

| Ferramenta | O que faz |
| --- | --- |
| `get_overview_summary` | Resumo executivo cruzando Requisições, Orçamentos, Contratos, Fornecedores, Fretes, Frota, Estoque de Obras e Avaliação de Fornecedores (mesmo pipeline do Dashboard). |
| `get_module_records` | Lista registros reais de Requisições, Orçamentos, Contratos ou Fornecedores, com filtro por status/atraso/responsável. |
| `get_module_insights` | Análise crítica detalhada — nesta versão, apenas para Orçamentos. |
| `compare_suppliers` | Compara fornecedores pela nota média das avaliações reais registradas. |

## Escopo desta versão

**Cobertura completa:** Requisições, Orçamentos, Contratos, Fornecedores.

**Cobertura em nível de indicador** (via `get_overview_summary`, mesmo resumo do
Dashboard): Fretes, Frota, Estoque de Obras, Avaliação de Fornecedores.

**Fora do escopo desta v1** (o JARVIS avisa honestamente que não tem essa
ferramenta, em vez de inventar uma resposta): NF Simples Remessa, Cadastro de
Materiais, Cadastro de Fornecedores.

## Como estender

Para dar suporte completo a um módulo hoje coberto só em nível de indicador:

1. Adicione uma nova entrada em `JARVIS_TOOL_DEFINITIONS` (`app/src/features/jarvis/tools.ts`
   e a cópia estática em `supabase/functions/jarvis-chat/index.ts`).
2. Implemente a função da ferramenta em `tools.ts`, reaproveitando o serviço de leitura
   já existente do módulo (ex.: `listFretePayloads`, `listEstoqueOrderPayloads`).
3. Se o módulo ainda não tiver um builder de análise crítica (como
   `buildOrcamentoCriticalAnalysis`), considere criar um seguindo o mesmo padrão antes
   de expor a ferramenta.
4. Rode `npm run typecheck` e `npm run build` e confirme que nenhum aviso de
   `INEFFECTIVE_DYNAMIC_IMPORT` aparece (mantenha lógica pura fora de páginas
   lazy-loaded, como foi feito em `app/src/features/dashboard/dashboardModel.ts`).

## Configuração necessária (feita uma vez por ambiente)

O JARVIS usa a **Gemini API do Google** (via Google AI Studio) em vez da API da
Anthropic, para não depender de billing pago: a camada gratuita da Gemini API não
exige cartão de crédito, apenas limites de uso (requisições por minuto/dia) que
podem ser consultados em https://ai.google.dev/pricing.

1. Gere uma chave gratuita em https://aistudio.google.com/apikey (login com conta
   Google, sem necessidade de ativar billing).
2. Configure o secret:

```
supabase secrets set GEMINI_API_KEY=...
```

Sem essa secret, a Edge Function responde com um erro claro em português
("Função sem variáveis de ambiente obrigatórias.") em vez de falhar silenciosamente
ou inventar uma resposta — o botão do JARVIS continua visível e utilizável assim que
a chave for configurada, sem precisar de deploy novo do frontend.

Se a camada gratuita atingir o limite de uso, a Gemini API retorna um erro claro
(HTTP 429) que a Edge Function repassa ao usuário — o JARVIS nunca trava nem finge
sucesso.
