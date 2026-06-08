import type { ModuleKey, UserRole } from "../types";

const moduleManagers: Record<ModuleKey, UserRole[]> = {
  dashboard: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos"],
  requisicoes: ["super_admin", "admin_suprimentos"],
  orcamentos: ["super_admin", "admin_orcamentos"],
  contratos: ["super_admin", "admin_contratos"],
  fornecedores: ["super_admin", "admin_suprimentos"],
  importacoes: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos"],
  usuarios: ["super_admin"],
  settings: ["super_admin"],
};

const moduleViewers: Record<ModuleKey, UserRole[]> = {
  dashboard: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos", "viewer_global", "viewer"],
  requisicoes: ["super_admin", "admin_suprimentos", "viewer_global", "viewer"],
  orcamentos: ["super_admin", "admin_orcamentos", "viewer_global", "viewer"],
  contratos: ["super_admin", "admin_contratos", "viewer"],
  fornecedores: ["super_admin", "admin_suprimentos", "viewer_global", "viewer"],
  importacoes: ["super_admin", "admin_suprimentos", "admin_orcamentos", "admin_contratos"],
  usuarios: ["super_admin"],
  settings: ["super_admin"],
};

export function canView(role: UserRole | undefined, module: ModuleKey) {
  return Boolean(role && moduleViewers[module].includes(role));
}

export function canManage(role: UserRole | undefined, module: ModuleKey) {
  return Boolean(role && moduleManagers[module].includes(role));
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
