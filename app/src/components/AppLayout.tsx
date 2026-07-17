import {
  BarChart3,
  Building2,
  Car,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  LogOut,
  MapPinned,
  Menu,
  Moon,
  Package,
  Settings,
  ShieldCheck,
  Star,
  Sun,
  Truck,
  UploadCloud,
  Users,
  X,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { useAuth } from "../contexts/AuthContext";
import { canView, roleLabel } from "../lib/permissions";
import type { ModuleKey } from "../types";

const menu: { to: string; label: string; module: ModuleKey; icon: React.ElementType }[] = [
  { to: "/", label: "Dashboard", module: "dashboard", icon: BarChart3 },
  { to: "/requisicoes", label: "Requisições", module: "requisicoes", icon: ClipboardList },
  { to: "/orcamentos", label: "Orçamentos", module: "orcamentos", icon: FileSpreadsheet },
  { to: "/contratos", label: "Contratos", module: "contratos", icon: FileText },
  { to: "/fretes", label: "Fretes", module: "fretes", icon: Truck },
  { to: "/estoque-obras", label: "Estoque Obras", module: "estoque_obras", icon: Package },
  { to: "/frota", label: "Frota", module: "frota", icon: Car },
  { to: "/fornecedores", label: "Fornecedores", module: "fornecedores", icon: MapPinned },
  { to: "/avaliacao-fornecedores", label: "Avaliacao Fornecedores", module: "avaliacao_fornecedores", icon: Star },
  { to: "/importacoes", label: "Importações", module: "importacoes", icon: UploadCloud },
  { to: "/usuarios", label: "Usuários", module: "usuarios", icon: Users },
  { to: "/settings", label: "Configurações", module: "settings", icon: Settings },
];

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/requisicoes": "Requisições de Suprimentos",
  "/orcamentos": "Solicitações de Orçamento",
  "/contratos": "Contratos",
  "/fretes": "Gestao de Fretes",
  "/estoque-obras": "Estoque de Obras",
  "/frota": "Gestao de Frota",
  "/fornecedores": "Mapa de Fornecedores",
  "/avaliacao-fornecedores": "Avaliacao de Fornecedores",
  "/importacoes": "Importações",
  "/usuarios": "Gestão de Usuários",
  "/settings": "Configurações",
};

export function AppLayout() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("supply-flow:theme") === "light" ? "light" : "dark";
  });
  const location = useLocation();
  const { profile, obras, signOut } = useAuth();

  const visibleMenu = useMemo(
    () => menu.filter((item) => canView(profile?.role, item.module)),
    [profile?.role]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("supply-flow:theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="brand">
          <img src="/logo-seel.png" alt="Seel" />
          <div>
            <strong>Supply Flow</strong>
            <span>Seel</span>
          </div>
          <button className="icon-button sidebar-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Menu principal">
          {visibleMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                to={item.to}
                key={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="obra-chip">
            <Building2 size={16} />
            <span>{profile?.role === "viewer" ? `${obras.length} obra(s)` : "Escopo admin"}</span>
          </div>
        </div>
      </aside>

      {open ? <button className="sidebar-backdrop" aria-label="Fechar menu" onClick={() => setOpen(false)} /> : null}

      <div className="main-shell">
        <header className="topbar">
          <button className="icon-button mobile-menu" type="button" onClick={() => setOpen(true)} aria-label="Abrir menu">
            <Menu size={20} />
          </button>
          <div>
            <div className="breadcrumb">Supply Flow / {routeTitles[location.pathname] || "Área"}</div>
            <h1>{routeTitles[location.pathname] || "Supply Flow"}</h1>
          </div>
          <div className="profile-area">
            <button
              className="icon-button"
              type="button"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
              title={theme === "dark" ? "Tema claro" : "Tema escuro"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="role-pill">
              <ShieldCheck size={16} />
              {roleLabel(profile?.role)}
            </div>
            <div className="profile-name">
              <strong>{profile?.nome || "Usuário"}</strong>
              <span>{profile?.email}</span>
            </div>
            <button className="icon-button" type="button" onClick={signOut} aria-label="Sair">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
