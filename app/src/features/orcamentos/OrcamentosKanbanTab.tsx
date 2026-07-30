import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Link as LinkIcon,
  MessageSquare,
  Paperclip,
  PauseCircle,
  Printer,
  RefreshCw,
  Search,
  Send,
  Trash2,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import { DetailDrawer, InfoField } from "../../components/DetailDrawer";
import { RoleGate } from "../../components/RoleGate";
import { useAuth } from "../../contexts/AuthContext";
import { invalidateAsyncData } from "../../hooks";
import { formatCurrency, formatDateBr, normalizeText, slaColorByDueDate } from "../../lib/format";
import { deleteEntity, updateEntity } from "../../services/entities";
import { signedAttachmentUrl, type AttachmentMeta } from "../../services/storage";
import { appendOrcamentoComment as appendOrcamentoCommentRequest } from "../../services/orcamentos";
import type { Orcamento, Profile } from "../../types";
import {
  appendOrcamentoLog,
  buildOrcamentoLog,
  formatDateTimeBr,
  fromDateTimeLocal,
  getAssignedTo,
  getAssignedToList,
  getFilterDate,
  getFinalizationDate,
  getFolderLink,
  getLineCount,
  getOrcamentista,
  getOrcamentistaList,
  getOrcamentoOutcome,
  getOrcamentoComments,
  getOrcamentoLogs,
  hasRequesterCommentAlert,
  orcamentoOutcomeOptions,
  outcomeLabel,
  printOrcamentosPdf,
  toDateTimeLocal,
  type OrcamentoOutcome,
} from "./model";
import {
  buildRequestDatePatch,
  buildStatusPatch,
  formatBusinessDuration,
  getAttachments,
  getOrcamentoSla,
  phaseLabel,
  statuses,
} from "./sla";

type DueTone = "success" | "warning" | "danger" | "neutral";
type DueFilter = "todos" | DueTone;

const statusMeta: Record<string, { icon: LucideIcon; subtitle: string; accent: string }> = {
  nao_iniciado: {
    icon: ClipboardList,
    subtitle: "Triagem inicial e validacao da demanda",
    accent: "var(--blue-700)",
  },
  em_cotacao: {
    icon: Send,
    subtitle: "Cotacao ativa e equalizacao",
    accent: "var(--yellow)",
  },
  finalizado: {
    icon: CheckCircle2,
    subtitle: "Processos concluidos e prontos para relatorio",
    accent: "var(--green)",
  },
  pausado: {
    icon: PauseCircle,
    subtitle: "Demandas suspensas ou aguardando retorno",
    accent: "var(--amber)",
  },
};

export function OrcamentosKanbanTab({
  items,
  now,
  canEdit,
  refresh,
}: {
  items: Orcamento[];
  now: number;
  canEdit: boolean;
  refresh: () => void;
}) {
  const { profile } = useAuth();
  const [query, setQuery] = useState("");
  const [dueFilter, setDueFilter] = useState<DueFilter>("todos");
  const [orcamentistaFilter, setOrcamentistaFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [updatingOutcomeId, setUpdatingOutcomeId] = useState<string | null>(null);

  const orcamentistas = useMemo(() => uniqueText(items.flatMap(getOrcamentistaList).filter(Boolean)), [items]);
  const assignedUsers = useMemo(() => uniqueText(items.flatMap(getAssignedToList).filter(Boolean)), [items]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return items.filter((item) => {
      const due = getDueInfo(item).tone;
      const itemDate = getFilterDate(item);
      const orcamentistaNames = getOrcamentistaList(item).map(normalizeText);
      const assignedNames = getAssignedToList(item).map(normalizeText);
      const matchesDue = dueFilter === "todos" || due === dueFilter;
      const matchesOrcamentista = !orcamentistaFilter || orcamentistaNames.includes(normalizeText(orcamentistaFilter));
      const matchesAssigned = !assignedFilter || assignedNames.includes(normalizeText(assignedFilter));
      const matchesStart = !dateStart || !itemDate || itemDate >= dateStart;
      const matchesEnd = !dateEnd || !itemDate || itemDate <= dateEnd;
      const text = normalizeText(
        [
          item.numero_proposta,
          item.nome_solicitante,
          item.email_solicitante,
          item.cliente,
          item.local_obra,
          item.tipo_orcamento,
          getAssignedTo(item),
          getOrcamentista(item),
          outcomeLabel(getOrcamentoOutcome(item)),
          getFolderLink(item),
          getOrcamentoComments(item).map((comment) => comment.text).join(" "),
          item.status,
          item.observacoes,
          JSON.stringify(item.payload || {}),
        ].join(" ")
      );
      return matchesDue && matchesOrcamentista && matchesAssigned && matchesStart && matchesEnd && (!q || text.includes(q));
    });
  }, [assignedFilter, dateEnd, dateStart, dueFilter, items, orcamentistaFilter, query]);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) || null, [items, selectedId]);

  async function moveOrcamento(item: Orcamento, nextStatus: string) {
    setMovingId(item.id);
    try {
      const patch = buildStatusPatch(item, nextStatus);
      const payload = appendOrcamentoLog(
        ((patch.payload || item.payload || {}) as Record<string, unknown>),
        buildOrcamentoLog("Fase alterada", profile, `${phaseLabel(item.status || "nao_iniciado")} -> ${phaseLabel(nextStatus)}`)
      );
      await updateEntity("orcamentos", item.id, { ...patch, payload });
      invalidateAsyncData(["orcamentos", "alertas:orcamentos", "dashboard:summary"]);
      refresh();
    } finally {
      setMovingId(null);
    }
  }

  async function updateOutcome(item: Orcamento, outcome: OrcamentoOutcome) {
    setUpdatingOutcomeId(item.id);
    try {
      const payload = appendOrcamentoLog(
        {
          ...(item.payload || {}),
          resultado_obra: outcome,
          resultado_comercial: outcome,
        },
        buildOrcamentoLog("Resultado da obra atualizado", profile, outcomeLabel(outcome))
      );
      await updateEntity("orcamentos", item.id, { payload });
      invalidateAsyncData(["orcamentos", "alertas:orcamentos", "dashboard:summary"]);
      refresh();
    } finally {
      setUpdatingOutcomeId(null);
    }
  }

  return (
    <div className="orcamento-operacao page-stack">
      <section className="orcamento-commandbar">
        <div className="orcamento-search-row">
          <label className="search-field orcamento-search">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar proposta, cliente, solicitante ou obra" />
          </label>
          <select className="orcamento-filter" value={dueFilter} onChange={(event) => setDueFilter(event.target.value as DueFilter)}>
            <option value="todos">Todos os prazos</option>
            <option value="success">No prazo</option>
            <option value="warning">Atencao</option>
            <option value="danger">Atrasado</option>
            <option value="neutral">Sem prazo</option>
          </select>
          <select className="orcamento-filter" value={orcamentistaFilter} onChange={(event) => setOrcamentistaFilter(event.target.value)}>
            <option value="">Todos orcamentistas</option>
            {orcamentistas.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select className="orcamento-filter" value={assignedFilter} onChange={(event) => setAssignedFilter(event.target.value)}>
            <option value="">Todos atribuidos</option>
            {assignedUsers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <label className="orcamento-date-filter">
            <CalendarDays size={16} />
            <input type="date" value={dateStart} onChange={(event) => setDateStart(event.target.value)} aria-label="Data inicial" />
          </label>
          <label className="orcamento-date-filter">
            <CalendarDays size={16} />
            <input type="date" value={dateEnd} onChange={(event) => setDateEnd(event.target.value)} aria-label="Data final" />
          </label>
        </div>
        <div className="orcamento-actions">
          <button className="secondary-button" type="button" onClick={() => printOrcamentosPdf(filtered, now)}>
            <Printer size={18} />
            Exportar PDF
          </button>
          <button className="secondary-button" type="button" onClick={refresh}>
            <RefreshCw size={18} />
            Atualizar
          </button>
          <RoleGate module="orcamentos">
            <Link className="primary-button" to="/importacoes">
              <UploadCloud size={18} />
              Central de dados
            </Link>
          </RoleGate>
        </div>
      </section>

      <section className="orcamento-kanban-board" aria-label="Kanban de orcamentos">
        {statuses.map(([key, title]) => {
          const rows = filtered.filter((item) => (item.status || "nao_iniciado") === key);
          return (
            <OrcamentoColumn
              key={key}
              statusKey={key}
              title={title}
              items={rows}
              allItems={items}
              now={now}
              canEdit={canEdit}
              currentUserEmail={profile?.email}
              movingId={movingId}
              updatingOutcomeId={updatingOutcomeId}
              onMove={moveOrcamento}
              onOutcomeChange={updateOutcome}
              onSelect={setSelectedId}
            />
          );
        })}
      </section>

      <section className="panel orcamentos-table-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Base operacional</span>
            <h2>Solicitacoes de orcamento</h2>
          </div>
        </div>
        <DataTable
          data={filtered.slice(0, 100)}
          columns={[
            { key: "proposta", label: "Proposta", render: (item) => item.numero_proposta || "-" },
            { key: "status", label: "Fase", render: (item) => phaseLabel(item.status) },
            { key: "cliente", label: "Cliente", render: (item) => item.cliente || "-" },
            { key: "solicitante", label: "Solicitante", render: (item) => item.nome_solicitante || "-" },
            { key: "atribuido", label: "Atribuido a", render: (item) => getAssignedTo(item) || "-" },
            { key: "resultado", label: "Resultado", render: (item) => (item.status === "finalizado" ? outcomeLabel(getOrcamentoOutcome(item)) : "-") },
            { key: "linhas", label: "Linhas", render: (item) => getLineCount(item) },
            { key: "prazo", label: "Semaforo", render: (item) => getDueInfo(item).label },
            { key: "saving", label: "Saving", render: (item) => formatCurrency(item.saving || 0) },
            { key: "sla", label: "SLA total", render: (item) => formatBusinessDuration(getOrcamentoSla(item, now).totalMs) },
            { key: "anexos", label: "Anexos", render: (item) => getAttachments(item).length },
          ]}
        />
      </section>

      {selected ? (
        <OrcamentoDrawer
          item={selected}
          canDelete={canDeleteOrcamento(selected, profile?.id, profile?.email, canEdit)}
          canEdit={canEdit}
          profile={profile}
          now={now}
          onClose={() => setSelectedId(null)}
          onMove={moveOrcamento}
          onOutcomeChange={updateOutcome}
          onSaved={refresh}
        />
      ) : null}
    </div>
  );
}

function OrcamentoColumn({
  statusKey,
  title,
  items,
  allItems,
  now,
  canEdit,
  currentUserEmail,
  movingId,
  updatingOutcomeId,
  onMove,
  onOutcomeChange,
  onSelect,
}: {
  statusKey: string;
  title: string;
  items: Orcamento[];
  allItems: Orcamento[];
  now: number;
  canEdit: boolean;
  currentUserEmail?: string;
  movingId: string | null;
  updatingOutcomeId: string | null;
  onMove: (item: Orcamento, nextStatus: string) => Promise<void>;
  onOutcomeChange: (item: Orcamento, outcome: OrcamentoOutcome) => Promise<void>;
  onSelect: (id: string) => void;
}) {
  const MetaIcon = statusMeta[statusKey]?.icon || ClipboardList;

  return (
    <section
      className="orcamento-column"
      style={{ "--phase-accent": statusMeta[statusKey]?.accent || "var(--blue-700)" } as CSSProperties}
      onDragOver={(event) => {
        if (canEdit) event.preventDefault();
      }}
      onDrop={(event) => {
        if (!canEdit) return;
        const id = event.dataTransfer.getData("text/plain");
        const item = allItems.find((row) => row.id === id);
        if (item) void onMove(item, statusKey);
      }}
    >
      <header>
        <div className="orcamento-column-title">
          <span>
            <MetaIcon size={18} />
          </span>
          <div>
            <strong>{title}</strong>
            <small>{statusMeta[statusKey]?.subtitle}</small>
          </div>
        </div>
        <b>{items.length}</b>
      </header>
      <div className="orcamento-column-cards">
        {items.length ? (
          items.map((item) => (
            <OrcamentoCard
              key={item.id}
              item={item}
              now={now}
              canEdit={canEdit}
              currentUserEmail={currentUserEmail}
              moving={movingId === item.id || updatingOutcomeId === item.id}
              onMove={onMove}
              onOutcomeChange={onOutcomeChange}
              onSelect={onSelect}
            />
          ))
        ) : (
          <div className="kanban-empty">Sem itens nesta fase.</div>
        )}
      </div>
    </section>
  );
}

function OrcamentoCard({
  item,
  now,
  canEdit,
  currentUserEmail,
  moving,
  onMove,
  onOutcomeChange,
  onSelect,
}: {
  item: Orcamento;
  now: number;
  canEdit: boolean;
  currentUserEmail?: string;
  moving: boolean;
  onMove: (item: Orcamento, nextStatus: string) => Promise<void>;
  onOutcomeChange: (item: Orcamento, outcome: OrcamentoOutcome) => Promise<void>;
  onSelect: (id: string) => void;
}) {
  const sla = getOrcamentoSla(item, now);
  const due = getDueInfo(item);
  const attachments = getAttachments(item);
  const currentStatus = item.status || "nao_iniciado";
  const currentTimer = currentStatus === "finalizado" ? sla.totalMs : sla.currentMs;
  const phaseTotal = sla.phaseMs[currentStatus] || currentTimer;
  const assignedNames = getAssignedToList(item);
  const outcome = getOrcamentoOutcome(item);
  const comments = getOrcamentoComments(item);
  const commentCount = comments.length;
  const hasAlert = hasRequesterCommentAlert(item, currentUserEmail);
  const cardAccent =
    due.tone === "danger" ? "var(--red)" : due.tone === "warning" ? "var(--yellow)" : due.tone === "success" ? "var(--green)" : "#94a3b8";

  return (
    <article
      className={`orcamento-card orcamento-card--${due.tone} ${canEdit ? "orcamento-card--draggable" : ""}`}
      style={{ "--card-accent": cardAccent } as CSSProperties}
      draggable={canEdit}
      onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
    >
      <div className="orcamento-card-top">
        <div>
          <span className="orcamento-card-label">{item.numero_proposta || "Sem proposta"}</span>
          <strong>{item.cliente || item.local_obra || "Cliente nao informado"}</strong>
        </div>
        <span className={`orcamento-status-chip orcamento-status-chip--${currentStatus}`}>
          {phaseLabel(currentStatus)}
        </span>
      </div>

      <div className="orcamento-card-lines">
        <div className="orcamento-card-line">
          <ClipboardList size={14} />
          <span>
            <b>Solicitante:</b> {item.nome_solicitante || "-"}
          </span>
        </div>
        <div className="orcamento-card-line">
          <Send size={14} />
          <span>
            <b>Atribuido a:</b> {assignedNames.length ? assignedNames.join(" | ") : "-"}
          </span>
        </div>
        <div className="orcamento-card-line">
          <CalendarDays size={14} />
          <span>
            <b>Entrega:</b> {formatDateBr(item.data_entrega_cotacoes)}
          </span>
        </div>
        <div className="orcamento-card-line">
          <CalendarDays size={14} />
          <span>
            <b>Criado em:</b> {formatDateTimeBr(item.created_at || item.data_solicitacao)}
          </span>
        </div>
      </div>

      <div className="orcamento-card-route">
        <strong>{getLineCount(item)} linha(s)</strong>
        <span>{item.tipo_orcamento || "Tipo nao informado"}</span>
        {item.local_obra ? <span>{item.local_obra}</span> : null}
      </div>

      <div className="orcamento-card-badges">
        <span className="saving-pill">{formatCurrency(item.saving || 0)}</span>
        <span className={`orcamento-mini-badge orcamento-mini-badge--${due.tone}`}>{due.label}</span>
        {currentStatus === "finalizado" ? <span className={`orcamento-outcome-pill orcamento-outcome-pill--${outcome}`}>{outcomeLabel(outcome)}</span> : null}
        {commentCount ? (
          <span className={`attachment-count orcamento-comment-badge ${hasAlert ? "orcamento-comment-badge--alert" : ""}`} title={`${commentCount} comentario(s) registrado(s)`}>
            {hasAlert ? <BellRing size={14} /> : <MessageSquare size={14} />}
            <b>{commentCount}</b>
            comentario{commentCount > 1 ? "s" : ""}
          </span>
        ) : null}
        {attachments.length ? (
          <span className="attachment-count">
            <Paperclip size={14} />
            {attachments.length}
          </span>
        ) : null}
      </div>

      <div className={`orcamento-deadline-strip orcamento-deadline-strip--${due.tone}`}>
        <span>Prazo: {formatDateBr(item.data_entrega_cotacoes)}</span>
        <strong>{getDueRelativeLabel(item)}</strong>
      </div>

      <div className="orcamento-timer-box orcamento-timer-box--stacked">
        <div className="orcamento-timer-row">
          <span>Na fase agora</span>
          <strong>{formatBusinessDuration(currentTimer)}</strong>
        </div>
        <div className="orcamento-timer-row">
          <span>Acumulado da fase</span>
          <strong>{formatBusinessDuration(phaseTotal)}</strong>
        </div>
        <div className="orcamento-timer-row">
          <span>Tempo total</span>
          <strong>{formatBusinessDuration(sla.totalMs)}</strong>
        </div>
      </div>

      <div className="orcamento-card-actions orcamento-card-actions--stacked">
        {canEdit ? (
          <label className="orcamento-select-block">
            <span>Fase da solicitacao</span>
            <select className="orcamento-segment-select" value={currentStatus} disabled={moving} onChange={(event) => void onMove(item, event.target.value)}>
              {statuses.map(([key, title]) => (
                <option key={key} value={key}>
                  {title}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        {canEdit ? (
          <label className="orcamento-select-block">
            <span>Resultado da obra</span>
            <select
              className="orcamento-outcome-select"
              value={outcome}
              disabled={moving || currentStatus !== "finalizado"}
              title={currentStatus === "finalizado" ? "Marcar resultado da obra" : "Disponivel apos mover para Finalizado"}
              onChange={(event) => void onOutcomeChange(item, event.target.value as OrcamentoOutcome)}
            >
              {orcamentoOutcomeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <button className="table-action" type="button" onClick={() => onSelect(item.id)}>
          Ver detalhes
        </button>
      </div>
    </article>
  );
}

function getDueRelativeLabel(item: Orcamento) {
  if (item.status === "finalizado") return "Finalizado";
  if (!item.data_entrega_cotacoes) return "Sem prazo";
  const due = new Date(`${item.data_entrega_cotacoes.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(due.getTime())) return "Sem prazo";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due.getTime() - today.getTime()) / 86_400_000);
  if (diffDays < 0) return `${Math.abs(diffDays)}d vencido`;
  if (diffDays === 0) return "Vence hoje";
  if (diffDays === 1) return "Vence amanha";
  return `${diffDays}d restantes`;
}

function OrcamentoDrawer({
  item,
  canDelete,
  canEdit,
  profile,
  now,
  onClose,
  onMove,
  onOutcomeChange,
  onSaved,
}: {
  item: Orcamento;
  canDelete: boolean;
  canEdit: boolean;
  profile: Profile | null;
  now: number;
  onClose: () => void;
  onMove: (item: Orcamento, nextStatus: string) => Promise<void>;
  onOutcomeChange: (item: Orcamento, outcome: OrcamentoOutcome) => Promise<void>;
  onSaved: () => void;
}) {
  const [requestDate, setRequestDate] = useState(item.data_solicitacao || "");
  const [dueDate, setDueDate] = useState(item.data_entrega_cotacoes || "");
  const [finalizedAt, setFinalizedAt] = useState(toDateTimeLocal(getFinalizationDate(item)));
  const [assignedTo, setAssignedTo] = useState(getAssignedTo(item));
  const [outcome, setOutcome] = useState<OrcamentoOutcome>(getOrcamentoOutcome(item));
  const [folderLink, setFolderLink] = useState(getFolderLink(item));
  const [qtd, setQtd] = useState(String(item.quantidade_req || ""));
  const [saving, setSaving] = useState(String(item.saving || ""));
  const [status, setStatus] = useState(item.status || "nao_iniciado");
  const [commentText, setCommentText] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [savingMessage, setSavingMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const sla = getOrcamentoSla(item, now);
  const due = getDueInfo(item);
  const comments = getOrcamentoComments(item);
  const logs = getOrcamentoLogs(item);
  const canComment = canEdit || canCommentOrcamento(item, profile);

  useEffect(() => {
    setRequestDate(item.data_solicitacao || "");
    setDueDate(item.data_entrega_cotacoes || "");
    setFinalizedAt(toDateTimeLocal(getFinalizationDate(item)));
    setAssignedTo(getAssignedTo(item));
    setOutcome(getOrcamentoOutcome(item));
    setFolderLink(getFolderLink(item));
    setQtd(String(item.quantidade_req || ""));
    setSaving(String(item.saving || ""));
    setStatus(item.status || "nao_iniciado");
  }, [item]);

  async function saveAdminFields() {
    setSavingMessage("");
    const nextStatus = status || "nao_iniciado";
    const requestPatch = buildRequestDatePatch(item, requestDate);
    const statusPatch = nextStatus !== (item.status || "nao_iniciado") ? buildStatusPatch(item, nextStatus) : {};
    const finalizationValue =
      nextStatus === "finalizado"
        ? fromDateTimeLocal(finalizedAt) || String(statusPatch.data_finalizacao || getFinalizationDate(item) || new Date().toISOString())
        : null;
    const basePayload =
      requestPatch.payload || statusPatch.payload
        ? {
            ...(item.payload || {}),
            ...(requestPatch.payload || {}),
            ...(statusPatch.payload || {}),
          }
        : item.payload;
    const mergedPayload = appendOrcamentoLog(
      {
        ...basePayload,
        data_solicitacao: requestDate || null,
        data_entrega_cotacoes: dueDate || null,
        data_finalizacao: finalizationValue,
        atribuido_a: assignedTo || null,
        orcamentista: assignedTo || null,
        resultado_obra: outcome,
        resultado_comercial: outcome,
        link_pasta: folderLink || null,
        quantidade_linhas: Number(qtd || 0),
        quantidade_req: Number(qtd || 0),
        saving: Number(saving || 0),
      },
      buildOrcamentoLog("Dados administrativos atualizados", profile)
    );
      await updateEntity("orcamentos", item.id, {
      ...requestPatch,
      ...statusPatch,
      payload: mergedPayload,
      data_entrega_cotacoes: dueDate || null,
      data_finalizacao: finalizationValue,
      atribuido_a: assignedTo || null,
      link_pasta: folderLink || null,
      quantidade_req: Number(qtd || 0),
      saving: Number(saving || 0),
    });
    setSavingMessage("Dados salvos.");
    invalidateAsyncData(["orcamentos", "alertas:orcamentos", "dashboard:summary"]);
    onSaved();
  }

  async function addComment() {
    const text = commentText.trim();
    if (!text) return;
    setPostingComment(true);
    setSavingMessage("");
    try {
      await appendOrcamentoCommentRequest(item.id, text);
      setCommentText("");
      setSavingMessage(canEdit ? "Comentario registrado e alerta disponibilizado ao solicitante." : "Resposta enviada para a equipe de orcamentos.");
      invalidateAsyncData(["orcamentos", "alertas:orcamentos", "dashboard:summary"]);
      onSaved();
    } finally {
      setPostingComment(false);
    }
  }

  async function deleteRequest() {
    if (!window.confirm("Excluir esta solicitacao de orcamento? Esta acao nao pode ser desfeita.")) return;
    setDeleting(true);
    setDeleteMessage("");
    try {
      await deleteEntity("orcamentos", item.id);
      invalidateAsyncData(["orcamentos", "alertas:orcamentos", "dashboard:summary"]);
      onSaved();
      onClose();
    } catch (err) {
      setDeleteMessage(err instanceof Error ? err.message : "Falha ao excluir solicitacao.");
    } finally {
      setDeleting(false);
    }
  }

  async function moveFromDrawer(nextStatus: string) {
    setStatus(nextStatus);
    await onMove(item, nextStatus);
  }

  async function saveOutcomeFromDrawer(nextOutcome: OrcamentoOutcome) {
    setOutcome(nextOutcome);
    await onOutcomeChange(item, nextOutcome);
  }

  return (
    <DetailDrawer eyebrow="Solicitacao de orcamento" title={item.numero_proposta || "Sem proposta"} onClose={onClose}>
      <section className="orcamento-drawer-summary">
        <article>
          <span>Semaforo</span>
          <strong className={`orcamento-summary-tone orcamento-summary-tone--${due.tone}`}>{due.label}</strong>
        </article>
        <article>
          <span>Fase atual</span>
          <strong>{phaseLabel(item.status)}</strong>
        </article>
        <article>
          <span>SLA total</span>
          <strong>{formatBusinessDuration(sla.totalMs)}</strong>
        </article>
        <article>
          <span>Linhas</span>
          <strong>{getLineCount(item)}</strong>
        </article>
        <article>
          <span>Saving</span>
          <strong>{formatCurrency(item.saving || 0)}</strong>
        </article>
        <article>
          <span>Resultado</span>
          <strong>{outcomeLabel(getOrcamentoOutcome(item))}</strong>
        </article>
      </section>

      <div className="drawer-grid">
        <InfoField label="Solicitante" value={item.nome_solicitante || "-"} />
        <InfoField label="E-mail" value={item.email_solicitante || "-"} />
        <InfoField label="Data solicitacao" value={formatDateBr(item.data_solicitacao)} />
        <InfoField label="Nome da obra" value={String(item.payload?.nome_obra || item.local_obra || "-")} />
        <InfoField label="Cliente" value={item.cliente || "-"} />
        <InfoField label="Local/obra" value={item.local_obra || "-"} />
        <InfoField label="Tipo" value={item.tipo_orcamento || "-"} />
        <InfoField label="Atribuido a" value={getAssignedTo(item) || "-"} />
        <InfoField label="Entrega cotacoes" value={formatDateBr(item.data_entrega_cotacoes)} />
        <InfoField label="Finalizado em" value={formatDateTimeBr(getFinalizationDate(item))} />
        <InfoField label="Quantidade de linhas" value={String(getLineCount(item))} />
        <InfoField label="Nao iniciado" value={formatBusinessDuration(sla.phaseMs.nao_iniciado || 0)} />
        <InfoField label="Em cotacao" value={formatBusinessDuration(sla.phaseMs.em_cotacao || 0)} />
        <InfoField label="Cronometro atual" value={formatBusinessDuration(sla.currentMs)} />
        <InfoField label="Total processo" value={formatBusinessDuration(sla.totalMs)} />
        <InfoField label="Observacoes" value={item.observacoes || String(item.payload?.observacoes || "-")} />
      </div>

      {getFolderLink(item) ? (
        <a className="secondary-button orcamento-folder-link" href={getFolderLink(item)} target="_blank" rel="noreferrer">
          <LinkIcon size={16} />
          Abrir pasta do orcamento
        </a>
      ) : null}

      {canEdit ? (
        <section className="panel panel--flat orcamento-admin-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Administracao</span>
              <h3>Tratativa e dados comerciais</h3>
            </div>
          </div>
          <div className="form-grid">
            <label>
              Fase
              <select value={status} onChange={(event) => void moveFromDrawer(event.target.value)}>
                {statuses.map(([key, title]) => (
                  <option key={key} value={key}>
                    {title}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Data da solicitacao" type="date" value={requestDate} onChange={setRequestDate} />
            <Field label="Entrega das cotacoes" type="date" value={dueDate} onChange={setDueDate} />
            <Field label="Data real de finalizacao" type="datetime-local" value={finalizedAt} onChange={setFinalizedAt} />
            <Field label="Atribuido a" value={assignedTo} onChange={setAssignedTo} />
            <label>
              Resultado da obra
              <select value={outcome} onChange={(event) => void saveOutcomeFromDrawer(event.target.value as OrcamentoOutcome)} disabled={(status || item.status) !== "finalizado"}>
                {orcamentoOutcomeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Link da pasta" value={folderLink} onChange={setFolderLink} />
            <Field label="Quantidade de linhas" type="number" value={qtd} onChange={setQtd} />
            <Field label="Saving" type="number" value={saving} onChange={setSaving} />
          </div>
          {savingMessage ? <div className="form-note">{savingMessage}</div> : null}
          <div className="form-actions">
            <button className="primary-button" type="button" onClick={saveAdminFields}>
              Salvar dados
            </button>
          </div>
        </section>
      ) : null}

      <section className="panel panel--flat orcamento-comments-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Comunicacao</span>
            <h3>Comentarios e alertas</h3>
          </div>
        </div>
        {comments.length ? (
          <div className="orcamento-comment-list">
            {comments.map((comment) => (
              <article key={comment.id}>
                <div>
                  <strong>{comment.authorName || "Supply Flow"}</strong>
                  <span>{formatDateTimeBr(comment.at)}</span>
                </div>
                <p>{comment.text}</p>
                {comment.targetEmail ? (
                  <small>
                    <BellRing size={13} />
                    Alerta interno para {comment.targetEmail}
                  </small>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="muted-box">Nenhum comentario registrado.</div>
        )}

        {canComment ? (
          <div className="orcamento-comment-form">
            <label>
              {canEdit ? "Novo comentario para o solicitante" : "Responder comentario"}
              <textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder={canEdit ? "Registre o retorno, pendencia ou orientacao." : "Escreva sua resposta para a equipe de orcamentos."} />
            </label>
            <div className="form-actions">
              <button className="primary-button" type="button" onClick={addComment} disabled={postingComment || !commentText.trim()}>
                <MessageSquare size={16} />
                {postingComment ? "Enviando..." : canEdit ? "Adicionar comentario" : "Enviar resposta"}
              </button>
            </div>
          </div>
        ) : comments.length ? (
          <div className="form-note">
            <BellRing size={15} />
            Os comentarios acima sao os alertas internos registrados pela equipe de orcamentos.
          </div>
        ) : null}
      </section>

      <section className="panel panel--flat orcamento-log-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Historico</span>
            <h3>Log da solicitacao</h3>
          </div>
        </div>
        {logs.length ? (
          <div className="orcamento-log-list">
            {logs
              .slice()
              .reverse()
              .map((entry) => (
                <article key={entry.id}>
                  <strong>{entry.action}</strong>
                  <span>{formatDateTimeBr(entry.at)} - {entry.userName || "Supply Flow"}</span>
                  {entry.detail ? <p>{entry.detail}</p> : null}
                </article>
              ))}
          </div>
        ) : (
          <div className="muted-box">Sem log operacional registrado.</div>
        )}
      </section>

      <section className="panel panel--flat">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Anexos</span>
            <h3>{getAttachments(item).length} arquivo(s)</h3>
          </div>
        </div>
        <AttachmentList attachments={getAttachments(item)} />
      </section>

      {canDelete ? (
        <section className="panel panel--flat danger-zone">
          <div>
            <span className="eyebrow">Exclusao</span>
            <h3>Excluir solicitacao</h3>
            <p>Disponivel para administradores de orcamento e para quem criou esta solicitacao.</p>
          </div>
          {deleteMessage ? <div className="form-error">{deleteMessage}</div> : null}
          <div className="form-actions">
            <button className="danger-button" type="button" onClick={deleteRequest} disabled={deleting}>
              <Trash2 size={16} />
              {deleting ? "Excluindo..." : "Excluir solicitacao"}
            </button>
          </div>
        </section>
      ) : null}
    </DetailDrawer>
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

function getDueInfo(item: Orcamento): { tone: DueTone; label: string } {
  if (item.status === "finalizado") return { tone: "success", label: "Finalizado" };
  const tone = slaColorByDueDate(item.data_entrega_cotacoes) as DueTone;
  const labels: Record<DueTone, string> = {
    success: "No prazo",
    warning: "Atencao",
    danger: "Atrasado",
    neutral: "Sem prazo",
  };
  return { tone, label: labels[tone] || "Sem prazo" };
}

function uniqueText(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function canDeleteOrcamento(item: Orcamento, userId: string | undefined, email: string | undefined, canEdit: boolean) {
  if (canEdit) return true;
  if (userId && item.criado_por === userId) return true;
  return Boolean(email && item.criado_por === null && item.email_solicitante?.toLowerCase() === email.toLowerCase());
}

function canCommentOrcamento(item: Orcamento, profile: Profile | null) {
  if (!profile) return false;
  if (item.criado_por && item.criado_por === profile.id) return true;
  return Boolean(item.email_solicitante && profile.email && item.email_solicitante.toLowerCase() === profile.email.toLowerCase());
}
