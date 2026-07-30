import type { Orcamento } from "../../types";
import type { AttachmentMeta } from "../../services/storage";

export const statuses = [
  ["nao_iniciado", "Não iniciado"],
  ["em_cotacao", "Em cotação"],
  ["finalizado", "Finalizado"],
  ["pausado", "Pausado"],
] as const;

const timedStatuses = ["nao_iniciado", "em_cotacao"] as const;

export type SlaState = {
  currentPhase?: string;
  phaseStartedAt?: string | null;
  phaseDurations?: Record<string, number>;
  finalizedAt?: string | null;
  totalBusinessMs?: number;
  history?: Record<string, unknown>[];
};

export function createInitialSla(status: string, requestDate?: string): SlaState {
  return {
    currentPhase: status,
    phaseStartedAt: requestDate ? toBusinessStartIso(requestDate) : new Date().toISOString(),
    phaseDurations: {},
    history: [],
  };
}

export function buildRequestDatePatch(item: Orcamento, requestDate: string): Partial<Orcamento> {
  const dataSolicitacao = requestDate || null;
  const payload: Record<string, unknown> = { ...item.payload, data_solicitacao: dataSolicitacao };
  const sla = getSlaState(item);
  const hasHistory = Array.isArray(sla.history) && sla.history.length > 0;
  const hasDurations = Object.values(sla.phaseDurations || {}).some((value) => Number(value) > 0);

  if ((item.status || "nao_iniciado") === "nao_iniciado" && dataSolicitacao && !hasHistory && !hasDurations) {
    payload.sla = {
      ...sla,
      currentPhase: "nao_iniciado",
      phaseStartedAt: toBusinessStartIso(dataSolicitacao),
      phaseDurations: sla.phaseDurations || {},
      history: sla.history || [],
    };
  }

  return { data_solicitacao: dataSolicitacao, payload };
}

export function toBusinessStartIso(date: string) {
  return `${date.slice(0, 10)}T07:00:00`;
}

export function buildStatusPatch(item: Orcamento, nextStatus: string): Partial<Orcamento> {
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
    data_finalizacao: nextStatus === "finalizado" ? nowIso : null,
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

export function getOrcamentoSla(item: Orcamento, now: number) {
  const sla = getSlaState(item);
  const status = item.status || "nao_iniciado";
  const phaseMs = { ...(sla.phaseDurations || {}) };

  if (isTimedStatus(status)) {
    const startedAt = sla.phaseStartedAt || fallbackStartedAt(item);
    phaseMs[status] = (phaseMs[status] || 0) + businessMsBetween(startedAt, now);
  }

  const finalizedAt = sla.finalizedAt || item.data_finalizacao || null;
  const storedTotal = Number(sla.totalBusinessMs);
  const fallbackFinalizedTotal =
    status === "finalizado" && finalizedAt ? businessMsBetween(sla.phaseStartedAt || fallbackStartedAt(item), finalizedAt) : 0;
  const totalMs =
    status === "finalizado" && Number.isFinite(storedTotal) && storedTotal > 0
      ? storedTotal
      : status === "finalizado" && fallbackFinalizedTotal
        ? fallbackFinalizedTotal
        : (phaseMs.nao_iniciado || 0) + (phaseMs.em_cotacao || 0);

  return {
    currentMs: isTimedStatus(status) ? phaseMs[status] || 0 : 0,
    phaseMs,
    totalMs,
  };
}

export function getSlaState(item: Orcamento): SlaState {
  const raw = item.payload?.sla;
  return raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as SlaState) : {};
}

function fallbackStartedAt(item: Orcamento) {
  if (item.created_at) return item.created_at;
  if (item.data_solicitacao) return `${item.data_solicitacao.slice(0, 10)}T07:00:00`;
  return new Date().toISOString();
}

export function isTimedStatus(status: string): status is (typeof timedStatuses)[number] {
  return (timedStatuses as readonly string[]).includes(status);
}

export function businessMsBetween(startValue: string | number, endValue: string | number) {
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

export function formatBusinessDuration(ms: number) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const businessDayMinutes = 10 * 60;
  const days = Math.floor(minutes / businessDayMinutes);
  const hours = Math.floor((minutes % businessDayMinutes) / 60);
  const mins = minutes % 60;
  return [days ? `${days}d` : "", hours ? `${hours}h` : "", mins || (!days && !hours) ? `${mins}min` : ""].filter(Boolean).join(" ");
}

export function averageOrcamentoSla(items: Orcamento[], now: number) {
  return formatBusinessDuration(averageOrcamentoSlaMs(items, now));
}

export function averageOrcamentoSlaMs(items: Orcamento[], now: number) {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => sum + getOrcamentoSla(item, now).totalMs, 0);
  return total / items.length;
}

export function phaseLabel(status: string) {
  return (
    {
      nao_iniciado: "Nao iniciado",
      em_cotacao: "Em cotacao",
      finalizado: "Finalizado",
      pausado: "Pausado",
    }[status] || status
  );
}

export function getAttachments(item: Orcamento): AttachmentMeta[] {
  const attachments = item.payload?.anexos;
  return Array.isArray(attachments) ? (attachments as AttachmentMeta[]) : [];
}

export function buildProposalNumber() {
  const year = String(new Date().getFullYear()).slice(-2);
  return `Pp-${String(Date.now()).slice(-5)}-${year}`;
}
