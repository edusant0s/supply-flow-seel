import { useEffect, useMemo, useState } from "react";
import { Clock3, Download, Paperclip, Plus, Search, UploadCloud, X } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { ImportWizard } from "../../components/ImportWizard";
import { KanbanBoard } from "../../components/KanbanBoard";
import { KpiCard } from "../../components/KpiCard";
import { RoleGate } from "../../components/RoleGate";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { formatCurrency, formatDateBr, normalizeText, parseMoney, slaColorByDueDate } from "../../lib/format";
import { canManage } from "../../lib/permissions";
import { exportToXlsx } from "../../lib/spreadsheet";
import { useAsyncData } from "../../hooks";
import { insertEntity, listEntities, updateEntity } from "../../services/entities";
import { signedAttachmentUrl, uploadAttachments, type AttachmentMeta } from "../../services/storage";
import type { Orcamento } from "../../types";

const statuses = [
  ["nao_iniciado", "Não iniciado"],
  ["em_cotacao", "Em cotação"],
  ["finalizado", "Finalizado"],
  ["pausado", "Pausado"],
] as const;

const timedStatuses = ["nao_iniciado", "em_cotacao"] as const;

const tipoOptions = [
  "Orçamento Inicial (Pré-BID)",
  "Pós-Aceite Verbal - Obra Ganha (Renegociação)",
  "Renegociação Orçamento (Pré-BID)",
];

export function OrcamentosPage() {
  const { profile } = useAuth();
  const [query, setQuery] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("orcamentos"), []);
  const canEdit = canManage(profile?.role, "orcamentos");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return (data || []).filter((item) =>
      [
        item.numero_proposta,
        item.nome_solicitante,
        item.email_solicitante,
        item.cliente,
        item.local_obra,
        item.tipo_orcamento,
        item.fornecedor,
        item.status,
        JSON.stringify(item.payload || {}),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, query]);

  const selected = useMemo(() => (data || []).find((item) => item.id === selectedId) || null, [data, selectedId]);

  if (loading) return <LoadingState label="Carregando orçamentos" />;
  if (error) return <EmptyState title="Falha ao carregar orçamentos" description={error} />;

  return (
    <div className="page-stack">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar proposta, cliente, solicitante ou fornecedor" />
        </label>
        <button
          className="secondary-button"
          type="button"
          onClick={() =>
            exportToXlsx(
              filtered.map((item) => ({
                Proposta: item.numero_proposta,
                Status: item.status,
                Solicitante: item.nome_solicitante,
                Email: item.email_solicitante,
                Cliente: item.cliente,
                LocalObra: item.local_obra,
                Tipo: item.tipo_orcamento,
                Fornecedor: item.fornecedor,
                Spend: item.valor_final,
                Saving: item.saving,
                Entrega: formatDateBr(item.data_entrega_cotacoes),
              })),
              `orcamentos-${new Date().toISOString().slice(0, 10)}.xlsx`
            )
          }
        >
          <Download size={18} />
          Exportar
        </button>
        <button className="secondary-button" type="button" onClick={() => setShowForm((current) => !current)}>
          <Plus size={18} />
          Nova solicitação
        </button>
        <RoleGate module="orcamentos">
          <button className="primary-button" type="button" onClick={() => setShowImport((current) => !current)}>
            <UploadCloud size={18} />
            Importar
          </button>
        </RoleGate>
      </section>

      <section className="kpi-grid">
        <KpiCard title="Solicitações" value={filtered.length} />
        <KpiCard title="Finalizados" value={filtered.filter((item) => item.status === "finalizado").length} tone="success" />
        <KpiCard title="Spend" value={formatCurrency(filtered.reduce((sum, item) => sum + Number(item.valor_final || 0), 0))} />
        <KpiCard title="Saving" value={formatCurrency(filtered.reduce((sum, item) => sum + Number(item.saving || 0), 0))} tone="blue" />
        <KpiCard title="Anexos" value={filtered.reduce((sum, item) => sum + getAttachments(item).length, 0)} />
      </section>

      {showForm ? <OrcamentoForm onSaved={refresh} /> : null}
      {showImport ? <ImportWizard kind="orcamentos" onComplete={refresh} /> : null}

      <KanbanBoard
        columns={statuses.map(([key, title]) => ({
          key,
          title,
          items: filtered.filter((item) => (item.status || "nao_iniciado") === key),
        }))}
        canDrag={canEdit}
        onMove={(id, status) => {
          const item = (data || []).find((row) => row.id === id);
          if (!item) return Promise.resolve();
          return updateEntity("orcamentos", id, buildStatusPatch(item, status)).then(refresh);
        }}
        renderCard={(item: Orcamento) => {
          const sla = getOrcamentoSla(item, now);
          return (
          <>
            <div className="card-topline">
              <strong>{item.numero_proposta || "Sem proposta"}</strong>
              <span className={`status-dot status-dot--${slaColorByDueDate(item.data_entrega_cotacoes)}`} />
            </div>
            <p>{item.cliente || item.local_obra || "Cliente não informado"}</p>
            <div className="timer-pill">
              <Clock3 size={15} />
              <span>{item.status === "finalizado" ? "Total" : "Fase atual"}: {formatBusinessDuration(item.status === "finalizado" ? sla.totalMs : sla.currentMs)}</span>
            </div>
            <div className="card-meta">
              <span>{phaseLabel(item.status)}</span>
              <span>{formatDateBr(item.data_entrega_cotacoes)}</span>
            </div>
            <div className="card-actions-row">
              <button className="table-action" type="button" onClick={() => setSelectedId(item.id)}>
                Detalhes
              </button>
              {getAttachments(item).length ? (
                <span className="attachment-count">
                  <Paperclip size={14} />
                  {getAttachments(item).length}
                </span>
              ) : null}
            </div>
          </>
          );
        }}
      />

      <DataTable
        data={filtered.slice(0, 80)}
        columns={[
          { key: "proposta", label: "Proposta", render: (item) => item.numero_proposta || "-" },
          { key: "status", label: "Status", render: (item) => item.status },
          { key: "cliente", label: "Cliente", render: (item) => item.cliente || "-" },
          { key: "sla", label: "SLA total", render: (item) => formatBusinessDuration(getOrcamentoSla(item, now).totalMs) },
          { key: "spend", label: "Spend", render: (item) => formatCurrency(item.valor_final) },
          { key: "saving", label: "Saving", render: (item) => formatCurrency(item.saving) },
          { key: "anexos", label: "Anexos", render: (item) => getAttachments(item).length },
        ]}
      />

      {selected ? <OrcamentoDrawer item={selected} canEdit={canEdit} now={now} onClose={() => setSelectedId(null)} onSaved={refresh} /> : null}
    </div>
  );
}

function OrcamentoForm({ onSaved }: { onSaved: () => void }) {
  const { profile } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    data_solicitacao: new Date().toISOString().slice(0, 10),
    nome_solicitante: profile?.nome || "",
    email_solicitante: profile?.email || "",
    numero_proposta: "",
    nome_obra: "",
    cliente: "",
    local_obra: "",
    tipo_orcamento: "",
    data_entrega_cotacoes: "",
    observacoes: "",
  });
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    const missingRequired = [
      form.nome_solicitante,
      form.email_solicitante,
      form.numero_proposta,
      form.nome_obra,
      form.cliente,
      form.local_obra,
      form.tipo_orcamento,
      form.data_entrega_cotacoes,
    ].some((value) => !value.trim());

    if (missingRequired) {
      setFeedback({ type: "error", text: "Preencha todos os campos obrigatorios antes de enviar a solicitacao." });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      const attachments = await uploadAttachments("orcamentos", files);
      const proposal = form.numero_proposta || buildProposalNumber();
      const payload = { ...form, anexos: attachments, sla: createInitialSla("nao_iniciado") };
      await insertEntity("orcamentos", {
        numero_proposta: proposal,
        nome_solicitante: form.nome_solicitante,
        email_solicitante: form.email_solicitante,
        cliente: form.cliente,
        local_obra: form.local_obra || form.nome_obra,
        tipo_orcamento: form.tipo_orcamento,
        data_solicitacao: form.data_solicitacao,
        data_entrega_cotacoes: form.data_entrega_cotacoes || null,
        fornecedor: "A definir",
        valor_inicial: 0,
        valor_final: 0,
        saving: 0,
        quantidade_req: 0,
        observacoes: form.observacoes,
        status: "nao_iniciado",
        payload,
      });
      setFeedback({ type: "success", text: `Solicitacao ${proposal} criada e enviada para o Kanban.` });
      setFiles([]);
      onSaved();
    } catch (err) {
      setFeedback({ type: "error", text: err instanceof Error ? err.message : "Falha ao salvar solicitacao." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Formulário de orçamento</span>
          <h2>Solicitação</h2>
        </div>
      </div>
      <div className="form-grid">
        <Field label="Data da solicitacao" type="date" value={form.data_solicitacao} onChange={(value) => setForm((current) => ({ ...current, data_solicitacao: value }))} disabled />
        <Field label="Nome do solicitante" value={form.nome_solicitante} onChange={(value) => setForm((current) => ({ ...current, nome_solicitante: value }))} required />
        <Field label="E-mail do solicitante" type="email" value={form.email_solicitante} onChange={(value) => setForm((current) => ({ ...current, email_solicitante: value }))} required />
        <Field label="Numero da proposta" value={form.numero_proposta} onChange={(value) => setForm((current) => ({ ...current, numero_proposta: value }))} placeholder="Pp-001-26" required />
        <Field label="Nome da obra" value={form.nome_obra} onChange={(value) => setForm((current) => ({ ...current, nome_obra: value }))} required />
        <Field label="Cliente" value={form.cliente} onChange={(value) => setForm((current) => ({ ...current, cliente: value }))} required />
        <Field label="Local da obra" value={form.local_obra} onChange={(value) => setForm((current) => ({ ...current, local_obra: value }))} required />
        <label>
          Tipo de orçamento
          <select value={form.tipo_orcamento} onChange={(event) => setForm((current) => ({ ...current, tipo_orcamento: event.target.value }))} required>
            <option value="">Selecione</option>
            {tipoOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <Field label="Data de entrega das cotacoes" type="date" value={form.data_entrega_cotacoes} onChange={(value) => setForm((current) => ({ ...current, data_entrega_cotacoes: value }))} required />
        <label className="field-full">
          Observações
          <textarea value={form.observacoes} onChange={(event) => setForm((current) => ({ ...current, observacoes: event.target.value }))} />
        </label>
        <label className="field-full">
          Anexos
          <input type="file" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} />
          <span className="field-hint">{files.length ? files.map((file) => file.name).join(", ") : "Nenhum arquivo selecionado."}</span>
        </label>
      </div>
      {feedback ? <div className={feedback.type === "error" ? "form-error" : "form-note"}>{feedback.text}</div> : null}
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={save} disabled={saving}>
          {saving ? "Salvando..." : "Enviar solicitacao"}
        </button>
      </div>
    </section>
  );
}

function OrcamentoDrawer({ item, canEdit, now, onClose, onSaved }: { item: Orcamento; canEdit: boolean; now: number; onClose: () => void; onSaved: () => void }) {
  const [spend, setSpend] = useState(String(item.valor_final || ""));
  const [saving, setSaving] = useState(String(item.saving || ""));
  const [qtd, setQtd] = useState(String(item.quantidade_req || ""));
  const sla = getOrcamentoSla(item, now);

  async function saveFinancials() {
    await updateEntity("orcamentos", item.id, {
      valor_final: parseMoney(spend),
      saving: parseMoney(saving),
      quantidade_req: Number(qtd || 0),
    });
    onSaved();
  }

  return (
    <div className="drawer-backdrop">
      <aside className="detail-drawer">
        <header>
          <div>
            <span className="eyebrow">Solicitação de orçamento</span>
            <h2>{item.numero_proposta || "Sem proposta"}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </header>

        <div className="drawer-grid">
          <Info label="Solicitante" value={item.nome_solicitante || "-"} />
          <Info label="E-mail" value={item.email_solicitante || "-"} />
          <Info label="Data solicitacao" value={formatDateBr(item.data_solicitacao)} />
          <Info label="Nome da obra" value={String(item.payload?.nome_obra || "-")} />
          <Info label="Cliente" value={item.cliente || "-"} />
          <Info label="Local/obra" value={item.local_obra || "-"} />
          <Info label="Tipo" value={item.tipo_orcamento || "-"} />
          <Info label="Entrega" value={formatDateBr(item.data_entrega_cotacoes)} />
          <Info label="Status" value={item.status} />
          <Info label="Fase atual" value={formatBusinessDuration(sla.currentMs)} />
          <Info label="Nao iniciado" value={formatBusinessDuration(sla.phaseMs.nao_iniciado || 0)} />
          <Info label="Em cotacao" value={formatBusinessDuration(sla.phaseMs.em_cotacao || 0)} />
          <Info label="Total processo" value={formatBusinessDuration(sla.totalMs)} />
          <Info label="Observações" value={item.observacoes || String(item.payload?.observacoes || "-")} />
        </div>

        {canEdit ? (
          <section className="panel panel--flat">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Administração</span>
                <h3>Spend, saving e REQ</h3>
              </div>
            </div>
            <div className="form-grid">
              <Field label="Spend" value={spend} onChange={setSpend} />
              <Field label="Saving" value={saving} onChange={setSaving} />
              <Field label="Quantidade REQ" value={qtd} onChange={setQtd} />
            </div>
            <div className="form-actions">
              <button className="primary-button" type="button" onClick={saveFinancials}>
                Salvar valores
              </button>
            </div>
          </section>
        ) : null}

        <section className="panel panel--flat">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Anexos</span>
              <h3>{getAttachments(item).length} arquivo(s)</h3>
            </div>
          </div>
          <AttachmentList attachments={getAttachments(item)} />
        </section>
      </aside>
    </div>
  );
}

function AttachmentList({ attachments }: { attachments: AttachmentMeta[] }) {
  const [links, setLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;
    Promise.all(
      attachments.map(async (attachment) => {
        const url = await signedAttachmentUrl(attachment.path);
        return [attachment.path, url] as const;
      })
    )
      .then((entries) => {
        if (mounted) setLinks(Object.fromEntries(entries));
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [attachments]);

  if (!attachments.length) return <div className="muted-box">Nenhum anexo enviado.</div>;

  return (
    <div className="attachment-list">
      {attachments.map((attachment) => (
        <a key={attachment.path} className="secondary-button" href={links[attachment.path] || "#"} target="_blank" rel="noreferrer">
          <Paperclip size={16} />
          {attachment.nome}
        </a>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label>
      {label}
      <input type={type} value={value} placeholder={placeholder} required={required} disabled={disabled} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

type SlaState = {
  currentPhase?: string;
  phaseStartedAt?: string | null;
  phaseDurations?: Record<string, number>;
  finalizedAt?: string | null;
  totalBusinessMs?: number;
  history?: Record<string, unknown>[];
};

function createInitialSla(status: string): SlaState {
  return {
    currentPhase: status,
    phaseStartedAt: new Date().toISOString(),
    phaseDurations: {},
    history: [],
  };
}

function buildStatusPatch(item: Orcamento, nextStatus: string): Partial<Orcamento> {
  const currentStatus = item.status || "nao_iniciado";
  if (currentStatus === nextStatus) return { status: nextStatus };

  const nowIso = new Date().toISOString();
  const sla = getSlaState(item);
  const phaseDurations = { ...(sla.phaseDurations || {}) };
  const currentStartedAt = sla.phaseStartedAt || fallbackStartedAt(item);
  let elapsedMs = 0;

  if (isTimedStatus(currentStatus) && currentStartedAt) {
    elapsedMs = businessMsBetween(currentStartedAt, nowIso);
    phaseDurations[currentStatus] = (phaseDurations[currentStatus] || 0) + elapsedMs;
  }

  const nextIsTimed = isTimedStatus(nextStatus);
  const totalBusinessMs = (phaseDurations.nao_iniciado || 0) + (phaseDurations.em_cotacao || 0);
  const history = Array.isArray(sla.history) ? sla.history : [];

  return {
    status: nextStatus,
    payload: {
      ...item.payload,
      sla: {
        ...sla,
        currentPhase: nextStatus,
        phaseStartedAt: nextIsTimed ? nowIso : null,
        phaseDurations,
        finalizedAt: nextStatus === "finalizado" ? nowIso : null,
        totalBusinessMs: nextStatus === "finalizado" ? totalBusinessMs : undefined,
        history: [...history, { from: currentStatus, to: nextStatus, at: nowIso, businessMs: elapsedMs }],
      },
    },
  };
}

function getOrcamentoSla(item: Orcamento, now: number) {
  const sla = getSlaState(item);
  const status = item.status || "nao_iniciado";
  const phaseMs = { ...(sla.phaseDurations || {}) };

  if (isTimedStatus(status)) {
    const startedAt = sla.phaseStartedAt || fallbackStartedAt(item);
    phaseMs[status] = (phaseMs[status] || 0) + businessMsBetween(startedAt, now);
  }

  const totalMs = item.status === "finalizado" && Number.isFinite(sla.totalBusinessMs)
    ? Number(sla.totalBusinessMs)
    : (phaseMs.nao_iniciado || 0) + (phaseMs.em_cotacao || 0);

  return {
    currentMs: isTimedStatus(status) ? phaseMs[status] || 0 : 0,
    phaseMs,
    totalMs,
  };
}

function getSlaState(item: Orcamento): SlaState {
  const raw = item.payload?.sla;
  return raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as SlaState) : {};
}

function fallbackStartedAt(item: Orcamento) {
  if (item.created_at) return item.created_at;
  if (item.data_solicitacao) return `${item.data_solicitacao.slice(0, 10)}T07:00:00`;
  return new Date().toISOString();
}

function isTimedStatus(status: string): status is (typeof timedStatuses)[number] {
  return (timedStatuses as readonly string[]).includes(status);
}

function businessMsBetween(startValue: string | number, endValue: string | number) {
  const start = new Date(startValue);
  const end = new Date(endValue);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) return 0;

  let total = 0;
  const day = new Date(start);
  day.setHours(0, 0, 0, 0);

  while (day.getTime() <= end.getTime()) {
    const weekday = day.getDay();
    if (weekday >= 1 && weekday <= 5) {
      const windowStart = new Date(day);
      windowStart.setHours(7, 0, 0, 0);
      const windowEnd = new Date(day);
      windowEnd.setHours(17, 0, 0, 0);
      const from = Math.max(start.getTime(), windowStart.getTime());
      const to = Math.min(end.getTime(), windowEnd.getTime());
      if (to > from) total += to - from;
    }
    day.setDate(day.getDate() + 1);
  }

  return total;
}

function formatBusinessDuration(ms: number) {
  const minutes = Math.max(0, Math.floor(ms / 60000));
  if (!minutes) return "0min";
  const businessDayMinutes = 10 * 60;
  const days = Math.floor(minutes / businessDayMinutes);
  const hours = Math.floor((minutes % businessDayMinutes) / 60);
  const mins = minutes % 60;
  return [
    days ? `${days}d` : "",
    hours ? `${hours}h` : "",
    mins || (!days && !hours) ? `${mins}min` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function phaseLabel(status: string) {
  return {
    nao_iniciado: "Nao iniciado",
    em_cotacao: "Em cotacao",
    finalizado: "Finalizado",
    pausado: "Pausado",
  }[status] || status;
}

function getAttachments(item: Orcamento): AttachmentMeta[] {
  const attachments = item.payload?.anexos;
  return Array.isArray(attachments) ? (attachments as AttachmentMeta[]) : [];
}

function buildProposalNumber() {
  const year = String(new Date().getFullYear()).slice(-2);
  return `Pp-${String(Date.now()).slice(-5)}-${year}`;
}
