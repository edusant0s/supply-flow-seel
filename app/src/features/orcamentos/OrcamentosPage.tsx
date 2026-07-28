import { useEffect, useState, type ReactNode } from "react";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  PenLine,
  Settings2,
  TimerReset,
  type LucideIcon,
} from "lucide-react";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { canManage } from "../../lib/permissions";
import { invalidateAsyncData, useAsyncData, useSessionState } from "../../hooks";
import { listEntities } from "../../services/entities";
import { ORCAMENTOS_FORM_STORAGE_KEY, listEmbeddedStateValue, saveEmbeddedStateValue } from "../../services/embeddedSync";
import type { Orcamento } from "../../types";
import { DynamicOrcamentoForm } from "./DynamicOrcamentoForm";
import { DEFAULT_ORCAMENTO_FORM_SPEC, type OrcamentoFormSpec } from "./formSpec";
import { OrcamentosDashboardTab } from "./OrcamentosDashboardTab";
import { OrcamentoFormEditor } from "./OrcamentoFormEditor";
import { OrcamentosKanbanTab } from "./OrcamentosKanbanTab";
import { OrcamentosReportTab } from "./OrcamentosReportTab";
import { formatBusinessDuration, getOrcamentoSla } from "./sla";

type OrcamentosTab = "dashboard" | "formulario" | "kanban" | "relatorio" | "editor";

const baseTabs: { key: OrcamentosTab; label: string; icon: LucideIcon }[] = [
  { key: "formulario", label: "Nova solicitacao", icon: PenLine },
  { key: "kanban", label: "Kanban", icon: ClipboardList },
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "relatorio", label: "Relatorio", icon: BarChart3 },
];

export function OrcamentosPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useSessionState<OrcamentosTab>("supply-flow:orcamentos:tab", "dashboard");
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
  const summary = summarizeOrcamentos(rows, now);

  async function saveSpec(next: OrcamentoFormSpec) {
    await saveEmbeddedStateValue("orcamentos", ORCAMENTOS_FORM_STORAGE_KEY, next);
    invalidateAsyncData(["orcamentos:form-spec"]);
    await specState.refresh();
  }

  return (
    <div className="page-stack orcamentos-workspace">
      <section className="module-command-bar orcamentos-hero">
        <div className="orcamentos-hero__copy">
          <span className="eyebrow">Supply Flow SEEL</span>
          <h2>Orcamentos</h2>
          <p>Solicitacoes, cotacoes, anexos, saving e SLA em horario comercial no mesmo fluxo operacional dos demais modulos.</p>
        </div>
        <div className="module-command-bar__actions orcamentos-hero__metrics">
          <HeroMetric icon={<FileSpreadsheet size={18} />} label="Solicitacoes" value={summary.total} />
          <HeroMetric icon={<ClipboardList size={18} />} label="Em aberto" value={summary.open} />
          <HeroMetric icon={<CheckCircle2 size={18} />} label="Finalizados" value={summary.finished} />
          <HeroMetric icon={<TimerReset size={18} />} label="SLA medio" value={summary.averageSla} />
          <span className="module-command-bar__badge">{canEdit ? "Controle administrativo" : "Consulta e acompanhamento"}</span>
        </div>
      </section>

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

function HeroMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return (
    <span className="orcamentos-hero-metric">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

function summarizeOrcamentos(rows: Orcamento[], now: number) {
  const open = rows.filter((item) => ["nao_iniciado", "em_cotacao"].includes(item.status || "nao_iniciado")).length;
  const finished = rows.filter((item) => item.status === "finalizado").length;
  const basis = finished ? rows.filter((item) => item.status === "finalizado") : rows;
  const averageMs = basis.length ? basis.reduce((sum, item) => sum + getOrcamentoSla(item, now).totalMs, 0) / basis.length : 0;
  return {
    total: rows.length,
    open,
    finished,
    averageSla: formatBusinessDuration(averageMs),
  };
}
