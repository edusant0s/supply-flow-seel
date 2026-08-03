import type { ModuleKey } from "../types";

/**
 * Route -> module mapping, mirroring the routes registered in App.tsx/AppLayout.tsx.
 * Kept as a small standalone lookup (instead of refactoring AppLayout's menu) so the
 * existing sidebar/navigation code stays untouched while JARVIS can still detect
 * "where the user is" automatically.
 */
const MODULE_ROUTES: Array<{ path: string; module: ModuleKey }> = [
  { path: "/", module: "dashboard" },
  { path: "/alertas", module: "alertas" },
  { path: "/requisicoes", module: "requisicoes" },
  { path: "/orcamentos", module: "orcamentos" },
  { path: "/contratos", module: "contratos" },
  { path: "/fretes", module: "fretes" },
  { path: "/nota-fiscal", module: "nota_fiscal" },
  { path: "/estoque-obras", module: "estoque_obras" },
  { path: "/cadastro-materiais", module: "cadastro_materiais" },
  { path: "/frota", module: "frota" },
  { path: "/fornecedores", module: "fornecedores" },
  { path: "/cadastro-fornecedores", module: "fornecedores" },
  { path: "/avaliacao-fornecedores", module: "avaliacao_fornecedores" },
  { path: "/importacoes", module: "importacoes" },
  { path: "/usuarios", module: "usuarios" },
  { path: "/settings", module: "settings" },
];

const MODULE_LABELS: Record<ModuleKey, string> = {
  dashboard: "Dashboard",
  alertas: "Alertas",
  requisicoes: "Requisições",
  orcamentos: "Orçamentos",
  contratos: "Contratos",
  fretes: "Fretes",
  nota_fiscal: "NF Simples Remessa",
  estoque_obras: "Estoque de Obras",
  cadastro_materiais: "Cadastro de Materiais",
  frota: "Frota",
  fornecedores: "Fornecedores",
  avaliacao_fornecedores: "Avaliação de Fornecedores",
  importacoes: "Importações",
  usuarios: "Usuários",
  settings: "Configurações",
};

export function resolveModuleFromPath(pathname: string): ModuleKey | null {
  return MODULE_ROUTES.find((route) => route.path === pathname)?.module || null;
}

export function moduleLabel(moduleKey: ModuleKey | null): string {
  if (!moduleKey) return "Visão geral";
  return MODULE_LABELS[moduleKey] || moduleKey;
}
