import { useEffect, useMemo, useState } from "react";
import { ClipboardList, FileText, Plus, RefreshCw, Search, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import { EmbeddedHtmlToolPage } from "../../components/EmbeddedHtmlToolPage";
import { KanbanBoard } from "../../components/KanbanBoard";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { formatDateBr, normalizeText, slaColorByDueDate } from "../../lib/format";
import { canManage } from "../../lib/permissions";
import { useAsyncData, useSessionState } from "../../hooks";
import { insertEntity, listEntities, updateEntity } from "../../services/entities";
import { listObras } from "../../services/admin";
import type { Contrato, Obra } from "../../types";

const loadHtml = () => import("../../embedded/gestao-contratos.html?raw").then((module) => module.default);

const statuses = [
  ["solicitado", "Solicitado"],
  ["analise", "Em analise"],
  ["compor", "Processo Compor"],
  ["assinatura", "Assinatura"],
  ["finalizado", "Finalizado"],
  ["cancelado", "Cancelado"],
] as const;

type ViewMode = "solicitacoes" | "detalhado";

export function ContratosPage() {
  const { profile, obras } = useAuth();
  const [viewMode, setViewMode] = useSessionState<ViewMode>("supply-flow:contratos:view", "solicitacoes");
  const [query, setQuery] = useSessionState("supply-flow:contratos:query", "");
  const [showForm, setShowForm] = useSessionState("supply-flow:contratos:show-form", false);
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("contratos"), [], { cacheKey: "contratos" });
  const obrasData = useAsyncData(listObras, [], { cacheKey: "obras" });
  const canEdit = canManage(profile?.role, "contratos");
  const shouldUseGlobalObras = canEdit || profile?.role === "viewer_global";
  const availableObras = shouldUseGlobalObras ? obrasData.data || obras : obras;

  useEffect(() => {
    if (viewMode === "detalhado" && !canEdit) setViewMode("solicitacoes");
  }, [canEdit, setViewMode, viewMode]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return (data || []).filter((item) =>
      [
        item.solicitante,
        item.email_solicitante,
        item.centro_custo,
        item.tipo_documento,
        item.urgencia,
        item.status,
        item.fase_compor,
        JSON.stringify(item.payload || {}),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, query]);

  if (viewMode === "detalhado" && canEdit) {
    return (
      <div className="page-stack">
        <section className="toolbar-panel toolbar-panel--wrap">
          <button className="secondary-button" type="button" onClick={() => setViewMode("solicitacoes")}>
            Voltar para solicitacoes
          </button>
        </section>
        <EmbeddedHtmlToolPage title="Gestao de contratos" moduleKey="contratos" loadHtml={loadHtml} />
      </div>
    );
  }

  if (loading) return <LoadingState label="Carregando contratos" />;
  if (error) return <EmptyState title="Falha ao carregar contratos" description={error} />;

  const open = filtered.filter((item) => !isFinalStatus(item.status)).length;
  const finished = filtered.filter((item) => item.status === "finalizado").length;
  const urgent = filtered.filter((item) => normalizeText(item.urgencia).includes("urgent")).length;
  const late = filtered.filter((item) => !isFinalStatus(item.status) && isPastDate(item.prazo_urgencia)).length;

  return (
    <div className="page-stack">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar solicitante, contrato, centro de custo ou fase" />
        </label>
        <button className="secondary-button" type="button" onClick={() => setShowForm((current) => !current)}>
          <Plus size={18} />
          Solicitar contrato
        </button>
        <button className="secondary-button" type="button" onClick={refresh}>
          <RefreshCw size={18} />
          Atualizar
        </button>
        {canEdit ? (
          <>
            <Link className="secondary-button" to="/importacoes">
              <UploadCloud size={18} />
              Central de dados
            </Link>
            <button className="primary-button" type="button" onClick={() => setViewMode("detalhado")}>
              Processo detalhado
            </button>
          </>
        ) : null}
      </section>

      <section className="kpi-grid">
        <KpiCard title="Solicitacoes" value={filtered.length} icon={ClipboardList} />
        <KpiCard title="Em aberto" value={open} tone={open ? "warning" : "success"} />
        <KpiCard title="Urgentes" value={urgent} tone={urgent ? "danger" : "blue"} />
        <KpiCard title="Atrasados" value={late} tone={late ? "danger" : "success"} />
        <KpiCard title="Finalizados" value={finished} icon={FileText} tone="success" />
      </section>

      {showForm ? (
        <ContratoForm
          obras={availableObras}
          obrasLoading={shouldUseGlobalObras && obrasData.loading && !availableObras.length}
          obrasError={shouldUseGlobalObras ? obrasData.error : ""}
          onSaved={refresh}
        />
      ) : null}

      <KanbanBoard
        columns={statuses.map(([key, title]) => ({
          key,
          title,
          items: filtered.filter((item) => normalizeStatus(item.status) === key),
        }))}
        canDrag={canEdit}
        onMove={(id, status) => {
          const patch: Partial<Contrato> = { status };
          if (status === "compor") patch.fase_compor = "Em andamento";
          return updateEntity("contratos", id, patch).then(refresh);
        }}
        renderCard={(item: Contrato) => (
          <>
            <div className="card-topline">
              <strong>{item.tipo_documento || "Contrato"}</strong>
              <span className={`status-dot status-dot--${slaColorByDueDate(item.prazo_urgencia)}`} />
            </div>
            <p>{item.solicitante || item.email_solicitante || "Solicitante nao informado"}</p>
            <div className="card-meta">
              <span>{item.centro_custo || "Sem CC"}</span>
              <span>{formatDateBr(item.prazo_urgencia)}</span>
            </div>
            <div className="card-meta">
              <span>{item.urgencia || "Normal"}</span>
              <span>{phaseLabel(item.status)}</span>
            </div>
          </>
        )}
      />

      <DataTable
        data={filtered.slice(0, 120)}
        columns={[
          { key: "solicitante", label: "Solicitante", render: (item) => item.solicitante || "-" },
          { key: "documento", label: "Documento", render: (item) => item.tipo_documento || "-" },
          { key: "status", label: "Status", render: (item) => phaseLabel(item.status) },
          { key: "urgencia", label: "Urgencia", render: (item) => item.urgencia || "-" },
          { key: "prazo", label: "Prazo", render: (item) => formatDateBr(item.prazo_urgencia) },
          { key: "cc", label: "Centro custo", render: (item) => item.centro_custo || "-" },
        ]}
      />
    </div>
  );
}

function ContratoForm({
  obras: formObras,
  obrasLoading = false,
  obrasError = "",
  onSaved,
}: {
  obras?: Obra[];
  obrasLoading?: boolean;
  obrasError?: string;
  onSaved: () => void;
}) {
  const { profile, obras: linkedObras } = useAuth();
  const obras = formObras || linkedObras;
  const [form, setForm] = useState({
    obra_id: obras[0]?.id || "",
    solicitante: profile?.nome || "",
    email_solicitante: profile?.email || "",
    centro_custo: obras[0]?.centro_custo || "",
    tipo_documento: "",
    urgencia: "Normal",
    prazo_urgencia: "",
    fornecedor: "",
    objeto: "",
    observacoes: "",
  });
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const firstObra = obras[0];
    if (!firstObra) return;
    setForm((current) =>
      current.obra_id
        ? current
        : {
            ...current,
            obra_id: firstObra.id,
            centro_custo: firstObra.centro_custo || current.centro_custo,
          }
    );
  }, [obras]);

  async function submit() {
    if (obrasError) {
      setFeedback({ type: "error", text: `Falha ao carregar obras para solicitação: ${obrasError}` });
      return;
    }

    if (!obras.length) {
      setFeedback({ type: "error", text: "Nenhuma obra disponível para solicitar contrato. Revise o cadastro/permissão do usuário." });
      return;
    }

    if (!form.obra_id || !form.solicitante.trim() || !form.email_solicitante.trim() || !form.tipo_documento.trim()) {
      setFeedback({ type: "error", text: "Preencha obra, solicitante, e-mail e tipo de documento." });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      await insertEntity("contratos", {
        obra_id: form.obra_id,
        solicitante: form.solicitante,
        email_solicitante: form.email_solicitante,
        centro_custo: form.centro_custo,
        tipo_documento: form.tipo_documento,
        urgencia: form.urgencia,
        prazo_urgencia: form.prazo_urgencia || null,
        status: "solicitado",
        fase_compor: "Aguardando analise",
        payload: {
          fornecedor: form.fornecedor,
          objeto: form.objeto,
          observacoes: form.observacoes,
          solicitante_id: profile?.id || null,
          canal: "portal_supply_flow",
        },
      });
      setFeedback({ type: "success", text: "Solicitacao enviada. O administrador ja consegue tratar no Kanban." });
      onSaved();
    } catch (err) {
      setFeedback({ type: "error", text: err instanceof Error ? err.message : "Falha ao enviar solicitacao." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel glpi-request-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Fluxo GLPI</span>
          <h2>Solicitar contrato</h2>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Obra
          <select
            value={form.obra_id}
            onChange={(event) => {
              const obra = obras.find((item) => item.id === event.target.value);
              setForm((current) => ({ ...current, obra_id: event.target.value, centro_custo: obra?.centro_custo || current.centro_custo }));
            }}
          >
            <option value="">Selecione</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>{obra.nome}</option>
            ))}
          </select>
        </label>
        <Field label="Centro de custo" value={form.centro_custo} onChange={(value) => setForm((current) => ({ ...current, centro_custo: value }))} />
        <Field label="Solicitante" value={form.solicitante} onChange={(value) => setForm((current) => ({ ...current, solicitante: value }))} />
        <Field label="E-mail" type="email" value={form.email_solicitante} onChange={(value) => setForm((current) => ({ ...current, email_solicitante: value }))} />
        <label>
          Tipo de documento
          <select value={form.tipo_documento} onChange={(event) => setForm((current) => ({ ...current, tipo_documento: event.target.value }))}>
            <option value="">Selecione</option>
            <option>Contrato novo</option>
            <option>Aditivo</option>
            <option>Distrato</option>
            <option>Notificacao</option>
            <option>Analise documental</option>
          </select>
        </label>
        <label>
          Urgencia
          <select value={form.urgencia} onChange={(event) => setForm((current) => ({ ...current, urgencia: event.target.value }))}>
            <option>Normal</option>
            <option>Urgente</option>
            <option>Critica</option>
          </select>
        </label>
        <Field label="Prazo desejado" type="date" value={form.prazo_urgencia} onChange={(value) => setForm((current) => ({ ...current, prazo_urgencia: value }))} />
        <Field label="Fornecedor/parte envolvida" value={form.fornecedor} onChange={(value) => setForm((current) => ({ ...current, fornecedor: value }))} />
        <label className="field-full">
          Objeto / resumo da demanda
          <textarea value={form.objeto} onChange={(event) => setForm((current) => ({ ...current, objeto: event.target.value }))} />
        </label>
        <label className="field-full">
          Observacoes
          <textarea value={form.observacoes} onChange={(event) => setForm((current) => ({ ...current, observacoes: event.target.value }))} />
        </label>
      </div>
      {obrasLoading ? <div className="form-note">Carregando obras disponíveis para solicitação...</div> : null}
      {obrasError ? <div className="form-error">Falha ao carregar obras: {obrasError}</div> : null}
      {feedback ? <div className={feedback.type === "error" ? "form-error" : "form-note"}>{feedback.text}</div> : null}
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={submit} disabled={saving || obrasLoading}>
          {saving ? "Enviando..." : "Enviar solicitacao"}
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label>
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function normalizeStatus(value: string) {
  const status = normalizeText(value);
  if (status.includes("final")) return "finalizado";
  if (status.includes("cancel")) return "cancelado";
  if (status.includes("assin")) return "assinatura";
  if (status.includes("compor")) return "compor";
  if (status.includes("anal")) return "analise";
  return "solicitado";
}

function phaseLabel(value: string) {
  const status = normalizeStatus(value);
  return statuses.find(([key]) => key === status)?.[1] || value;
}

function isFinalStatus(value: string) {
  const status = normalizeStatus(value);
  return status === "finalizado" || status === "cancelado";
}

function isPastDate(value: string | null) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
