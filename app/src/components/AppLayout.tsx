import {
  BarChart3,
  BellRing,
  Building2,
  Car,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  KeyRound,
  LogOut,
  MapPinned,
  Menu,
  Moon,
  Package,
  ReceiptText,
  Settings,
  ShieldCheck,
  Star,
  Sun,
  Truck,
  UploadCloud,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import type React from "react";
import { useAuth } from "../contexts/AuthContext";
import { AlertNotificationBell } from "../features/alertas/AlertNotificationBell";
import { canView, roleLabel } from "../lib/permissions";
import { useSupplyFlowRealtime } from "../useSupplyFlowRealtime";
import type { ModuleKey } from "../types";

const menu: { to: string; label: string; module: ModuleKey; icon: React.ElementType }[] = [
  { to: "/", label: "Dashboard", module: "dashboard", icon: BarChart3 },
  { to: "/alertas", label: "Alertas", module: "alertas", icon: BellRing },
  { to: "/requisicoes", label: "Requisições", module: "requisicoes", icon: ClipboardList },
  { to: "/orcamentos", label: "Orçamentos", module: "orcamentos", icon: FileSpreadsheet },
  { to: "/contratos", label: "Contratos", module: "contratos", icon: FileText },
  { to: "/fretes", label: "Fretes", module: "fretes", icon: Truck },
  { to: "/nota-fiscal", label: "NF Simples Remessa", module: "nota_fiscal", icon: ReceiptText },
  { to: "/estoque-obras", label: "Estoque Obras", module: "estoque_obras", icon: Package },
  { to: "/cadastro-materiais", label: "Cadastro Materiais", module: "cadastro_materiais", icon: Package },
  { to: "/frota", label: "Frota", module: "frota", icon: Car },
  { to: "/fornecedores", label: "Fornecedores", module: "fornecedores", icon: MapPinned },
  { to: "/cadastro-fornecedores", label: "Cadastro Fornecedores", module: "fornecedores", icon: UserRoundPlus },
  { to: "/avaliacao-fornecedores", label: "Avaliacao Fornecedores", module: "avaliacao_fornecedores", icon: Star },
  { to: "/importacoes", label: "Importações", module: "importacoes", icon: UploadCloud },
  { to: "/usuarios", label: "Usuários", module: "usuarios", icon: Users },
  { to: "/settings", label: "Configurações", module: "settings", icon: Settings },
];

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/alertas": "Central de Alertas",
  "/requisicoes": "Requisições de Suprimentos",
  "/orcamentos": "Solicitações de Orçamento",
  "/contratos": "Contratos",
  "/fretes": "Gestao de Fretes",
  "/nota-fiscal": "NF de Simples Remessa",
  "/estoque-obras": "Estoque de Obras",
  "/cadastro-materiais": "Cadastro de Materiais",
  "/frota": "Gestao de Frota",
  "/fornecedores": "Mapa de Fornecedores",
  "/cadastro-fornecedores": "Cadastro de Fornecedores",
  "/avaliacao-fornecedores": "Avaliacao de Fornecedores",
  "/importacoes": "Importações",
  "/usuarios": "Gestão de Usuários",
  "/settings": "Configurações",
  "/alterar-senha": "Alterar Senha",
};

const routeScrollPositions = new Map<string, { x: number; y: number }>();

export function AppLayout() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("supply-flow:theme") === "light" ? "light" : "dark";
  });
  const location = useLocation();
  const { profile, obras, signOut, refreshProfile } = useAuth();

  const visibleMenu = useMemo(() => menu.filter((item) => canView(profile, item.module)), [profile]);
  useSupplyFlowRealtime({ enabled: Boolean(profile?.ativo), currentUserId: profile?.id, refreshProfile });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("supply-flow:theme", theme);
  }, [theme]);

  useLayoutEffect(() => {
    const path = location.pathname;
    const saved = routeScrollPositions.get(path);
    if (saved) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ left: saved.x, top: saved.y, behavior: "auto" });
        window.requestAnimationFrame(() => window.scrollTo({ left: saved.x, top: saved.y, behavior: "auto" }));
      });
    }

    return () => {
      routeScrollPositions.set(path, { x: window.scrollX, y: window.scrollY });
    };
  }, [location.pathname]);

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
            <span>{scopeLabel(profile?.role, obras.length)}</span>
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
            <AlertNotificationBell />
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
            <NavLink className="icon-button" to="/alterar-senha" aria-label="Alterar senha" title="Alterar senha">
              <KeyRound size={18} />
            </NavLink>
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

function scopeLabel(role: string | undefined, obraCount: number) {
  if (role === "viewer") return `${obraCount} obra(s)`;
  if (role === "viewer_global") return "Todas as obras";
  return "Escopo administrativo";
}
