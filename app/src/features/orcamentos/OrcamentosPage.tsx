import { useEffect, useState } from "react";
import {
  BarChart3,
  ClipboardList,
  PenLine,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { canManage } from "../../lib/permissions";
import { invalidateAsyncData, useAsyncData, useSessionState } from "../../hooks";
import { listEntities } from "../../services/entities";
import { ORCAMENTOS_FORM_STORAGE_KEY, listEmbeddedStateValue, saveEmbeddedStateValue } from "../../services/embeddedSync";
import { DynamicOrcamentoForm } from "./DynamicOrcamentoForm";
import { DEFAULT_ORCAMENTO_FORM_SPEC, type OrcamentoFormSpec } from "./formSpec";
import { OrcamentosDashboardTab } from "./OrcamentosDashboardTab";
import { OrcamentoFormEditor } from "./OrcamentoFormEditor";
import { OrcamentosKanbanTab } from "./OrcamentosKanbanTab";
import { OrcamentosReportTab } from "./OrcamentosReportTab";

type OrcamentosTab = "dashboard" | "formulario" | "kanban" | "relatorio" | "editor";

const baseTabs: { key: OrcamentosTab; label: string; icon: LucideIcon }[] = [
  { key: "formulario", label: "Nova solicitacao", icon: PenLine },
  { key: "kanban", label: "Kanban", icon: ClipboardList },
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "relatorio", label: "Relatorio", icon: BarChart3 },
];

export function OrcamentosPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useSessionState<OrcamentosTab>("supply-flow:orcamentos:tab", "kanban");
  const [now, setNow] = useState(() => Date.now());
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("orcamentos"), [], { cacheKey: "orcamentos" });
  const specState = useAsyncData(() => listEmbeddedStateValue<OrcamentoFormSpec>(ORCAMENTOS_FORM_STORAGE_KEY), [], {
    cacheKey: "orcamentos:form-spec",
  });
  const canEdit = canManage(profile, "orcamentos");
  const isSuperAdmin = profile?.role === "super_admin";

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isSuperAdmin && activeTab === "editor") setActiveTab("kanban");
  }, [activeTab, isSuperAdmin, setActiveTab]);

  if (loading) return <LoadingState label="Carregando orcamentos" />;
  if (error) return <EmptyState title="Falha ao carregar orcamentos" description={error} />;

  const rows = data || [];
  const spec: OrcamentoFormSpec = specState.data && specState.data.length ? specState.data : DEFAULT_ORCAMENTO_FORM_SPEC;
  const tabs = isSuperAdmin ? [...baseTabs, { key: "editor" as const, label: "Editor do formulario", icon: Settings2 }] : baseTabs;

  async function saveSpec(next: OrcamentoFormSpec) {
    await saveEmbeddedStateValue("orcamentos", ORCAMENTOS_FORM_STORAGE_KEY, next);
    invalidateAsyncData(["orcamentos:form-spec"]);
    await specState.refresh();
  }

  return (
    <div className="page-stack orcamentos-workspace">
      <div className="module-tabs orcamentos-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.key} type="button" className={activeTab === tab.key ? "active" : ""} onClick={() => setActiveTab(tab.key)}>
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "formulario" ? (
        <DynamicOrcamentoForm
          spec={spec}
          onSaved={() => {
            refresh();
            setActiveTab("kanban");
          }}
        />
      ) : null}

      {activeTab === "dashboard" ? <OrcamentosDashboardTab items={rows} now={now} /> : null}

      {activeTab === "kanban" ? <OrcamentosKanbanTab items={rows} now={now} canEdit={canEdit} refresh={refresh} /> : null}

      {activeTab === "relatorio" ? <OrcamentosReportTab items={rows} now={now} /> : null}

      {activeTab === "editor" && isSuperAdmin ? <OrcamentoFormEditor spec={spec} onSave={saveSpec} /> : null}
    </div>
  );
}
