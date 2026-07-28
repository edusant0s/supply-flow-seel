import type { ModuleKey, ModulePermissions, Profile, UserRole } from "../types";

const moduleManagers: Record<ModuleKey, UserRole[]> = {
  dashboard: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos"],
  alertas: ["super_admin", "admin_orcamentos"],
  requisicoes: ["super_admin", "admin_suprimentos"],
  orcamentos: ["super_admin", "admin_orcamentos"],
  contratos: ["super_admin", "admin_contratos"],
  fretes: ["super_admin"],
  nota_fiscal: ["super_admin", "admin_suprimentos"],
  estoque_obras: ["super_admin", "admin_suprimentos"],
  frota: ["super_admin"],
  fornecedores: ["super_admin", "admin_suprimentos"],
  avaliacao_fornecedores: ["super_admin"],
  importacoes: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos"],
  usuarios: ["super_admin"],
  settings: ["super_admin"],
};

const moduleViewers: Record<ModuleKey, UserRole[]> = {
  dashboard: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  alertas: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  requisicoes: ["super_admin", "admin_suprimentos", "viewer_global", "viewer"],
  orcamentos: ["super_admin", "admin_orcamentos", "viewer_global", "viewer"],
  contratos: ["super_admin", "admin_contratos", "viewer_global", "viewer"],
  fretes: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  nota_fiscal: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  estoque_obras: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  frota: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  fornecedores: ["super_admin", "admin_suprimentos", "viewer_global", "viewer"],
  avaliacao_fornecedores: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  importacoes: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos"],
  usuarios: ["super_admin"],
  settings: ["super_admin"],
};

export const permissionModules: Array<{ key: ModuleKey; label: string; description: string }> = [
  { key: "dashboard", label: "Dashboard", description: "Indicadores consolidados e visao executiva." },
  { key: "alertas", label: "Alertas", description: "Central de comentarios, respostas e pendencias." },
  { key: "requisicoes", label: "Requisicoes", description: "RMs, fases de compra, compradores e OC." },
  { key: "orcamentos", label: "Orcamentos", description: "Solicitacoes, kanban, comentarios, anexos e SLA." },
  { key: "contratos", label: "Contratos", description: "Solicitacoes e processo detalhado de contratos." },
  { key: "fretes", label: "Fretes", description: "Solicitacoes, kanban, cotacoes e mapa operacional." },
  { key: "nota_fiscal", label: "Nota fiscal", description: "Solicitacoes de NF de simples remessa." },
  { key: "estoque_obras", label: "Estoque obras", description: "Loja de materiais e solicitacoes de obra." },
  { key: "frota", label: "Frota", description: "Veiculos, contratos, condutores e indicadores." },
  { key: "fornecedores", label: "Fornecedores", description: "Mapa, cadastro e base de fornecedores." },
  { key: "avaliacao_fornecedores", label: "Avaliacao fornecedores", description: "Avaliacoes, filtros por obra e relatorios." },
  { key: "importacoes", label: "Importacoes", description: "Central unica de alimentacao das bases." },
];

type PermissionSubject = Profile | UserRole | undefined | null;

export function defaultCanView(role: UserRole | undefined, module: ModuleKey) {
  return Boolean(role && moduleViewers[module].includes(role));
}

export function defaultCanManage(role: UserRole | undefined, module: ModuleKey) {
  return Boolean(role && moduleManagers[module].includes(role));
}

export function canView(subject: PermissionSubject, module: ModuleKey) {
  const role = getSubjectRole(subject);
  if (role === "super_admin") return true;
  const explicit = getExplicitPermission(subject, module, "view");
  if (explicit !== undefined) return explicit;
  return defaultCanView(role, module);
}

export function canManage(subject: PermissionSubject, module: ModuleKey) {
  const role = getSubjectRole(subject);
  if (role === "super_admin") return true;
  const explicit = getExplicitPermission(subject, module, "manage");
  if (explicit !== undefined) return explicit;
  return defaultCanManage(role, module);
}

export function isAnyAdmin(role: UserRole | undefined) {
  return Boolean(role && role !== "viewer" && role !== "viewer_global");
}

export function roleLabel(role: UserRole | undefined) {
  return {
    super_admin: "Super admin",
    admin_suprimentos: "Admin suprimentos",
    admin_orcamentos: "Admin orçamentos",
    admin_contratos: "Admin contratos",
    viewer_global: "Visualizador global",
    viewer: "Visualizador",
  }[role || "viewer"];
}

export const roles: UserRole[] = [
  "super_admin",
  "admin_suprimentos",
  "admin_orcamentos",
  "admin_contratos",
  "viewer_global",
  "viewer",
];

function getSubjectRole(subject: PermissionSubject) {
  if (!subject) return undefined;
  return typeof subject === "string" ? subject : subject.role;
}

function getSubjectModulePermissions(subject: PermissionSubject): ModulePermissions | undefined | null {
  if (!subject || typeof subject === "string") return undefined;
  return subject.module_permissions;
}

function getExplicitPermission(subject: PermissionSubject, module: ModuleKey, mode: "view" | "manage") {
  const modulePermission = getSubjectModulePermissions(subject)?.[module];
  if (!modulePermission) return undefined;

  if (mode === "manage") {
    return typeof modulePermission.manage === "boolean" ? modulePermission.manage : undefined;
  }

  if (typeof modulePermission.view === "boolean") return modulePermission.view;
  if (modulePermission.manage === true) return true;
  return undefined;
}
