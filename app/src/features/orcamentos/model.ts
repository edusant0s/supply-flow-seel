import type { Profile, Orcamento } from "../../types";
import { formatCurrency, formatDateBr } from "../../lib/format";
import { formatBusinessDuration, getOrcamentoSla, getSlaState, phaseLabel } from "./sla";

export const openStatuses = ["nao_iniciado", "em_cotacao"];
export const orcamentoOutcomeOptions = [
  { value: "aguardando", label: "Aguardando resultado" },
  { value: "ganha", label: "Ganhamos a obra" },
  { value: "perdida", label: "Perdemos a obra" },
] as const;

export type OrcamentoOutcome = (typeof orcamentoOutcomeOptions)[number]["value"];

export type OrcamentoLogEntry = {
  id: string;
  at: string;
  action: string;
  detail?: string;
  userName?: string;
  userEmail?: string;
};

export type OrcamentoComment = {
  id: string;
  at: string;
  text: string;
  authorName: string;
  authorEmail?: string;
  authorRole?: string;
  targetEmail?: string;
  source?: "admin" | "solicitante" | string;
};

export function getLineCount(item: Orcamento) {
  const payload = item.payload || {};
  const value = payload.quantidade_linhas ?? payload.quantidade_req ?? payload.linhas ?? item.quantidade_req ?? 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function getAssignedTo(item: Orcamento) {
  return getAssignedToList(item).join(" • ");
}

export function getAssignedToList(item: Orcamento) {
  return uniqueTexts([
    ...splitAssigneeValue(item.atribuido_a),
    ...splitAssigneeValue(item.payload?.atribuido_a),
    ...splitAssigneeValue(item.payload?.orcamentista),
  ]);
}

export function getOrcamentista(item: Orcamento) {
  return getOrcamentistaList(item).join(" • ");
}

export function getOrcamentistaList(item: Orcamento) {
  return uniqueTexts([
    ...splitAssigneeValue(item.payload?.orcamentista),
    ...splitAssigneeValue(item.atribuido_a),
    ...splitAssigneeValue(item.payload?.atribuido_a),
  ]);
}

export function getOrcamentoOutcome(item: Orcamento): OrcamentoOutcome {
  const raw = normalizeOutcomeValue(item.payload?.resultado_obra || item.payload?.resultado_comercial || item.payload?.resultado || "");
  if (raw.includes("ganh")) return "ganha";
  if (raw.includes("perd")) return "perdida";
  return "aguardando";
}

export function outcomeLabel(value: OrcamentoOutcome | string | null | undefined) {
  const normalized = normalizeOutcomeValue(value);
  const mapped = normalized.includes("ganh") ? "ganha" : normalized.includes("perd") ? "perdida" : "aguardando";
  return orcamentoOutcomeOptions.find((option) => option.value === mapped)?.label || "Aguardando resultado";
}

export function getFolderLink(item: Orcamento) {
  return String(item.link_pasta || item.payload?.link_pasta || item.payload?.pasta_link || item.payload?.folderLink || "").trim();
}

export function getFinalizationDate(item: Orcamento) {
  return item.data_finalizacao || getSlaState(item).finalizedAt || null;
}

export function getFilterDate(item: Orcamento) {
  return String(item.data_solicitacao || item.created_at || "").slice(0, 10);
}

export function getOrcamentoComments(item: Orcamento): OrcamentoComment[] {
  const raw = item.payload?.comentarios || item.payload?.comments;
  return Array.isArray(raw) ? (raw as OrcamentoComment[]) : [];
}

export function getOrcamentoLogs(item: Orcamento): OrcamentoLogEntry[] {
  const raw = item.payload?.logs || item.payload?.log;
  return Array.isArray(raw) ? (raw as OrcamentoLogEntry[]) : [];
}

export function buildOrcamentoLog(action: string, profile: Profile | null, detail?: string): OrcamentoLogEntry {
  return {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    action,
    detail,
    userName: profile?.nome || "Supply Flow",
    userEmail: profile?.email || "",
  };
}

export function appendOrcamentoLog(payload: Record<string, unknown>, entry: OrcamentoLogEntry) {
  const logs = Array.isArray(payload.logs) ? (payload.logs as OrcamentoLogEntry[]) : [];
  return { ...payload, logs: [...logs, entry] };
}

export function appendOrcamentoComment(payload: Record<string, unknown>, comment: OrcamentoComment, log: OrcamentoLogEntry) {
  const comments = Array.isArray(payload.comentarios) ? (payload.comentarios as OrcamentoComment[]) : [];
  const alerts = Array.isArray(payload.alertas_solicitante) ? (payload.alertas_solicitante as Record<string, unknown>[]) : [];
  return appendOrcamentoLog(
    {
      ...payload,
      comentarios: [...comments, comment],
      alertas_solicitante: [
        ...alerts,
        {
          id: comment.id,
          at: comment.at,
          type: "comentario",
          targetEmail: comment.targetEmail || "",
          message: comment.text,
          read: false,
        },
      ],
    },
    log
  );
}

export function hasRequesterCommentAlert(item: Orcamento, email: string | undefined | null) {
  if (!email) return false;
  const requesterEmail = String(item.email_solicitante || "").toLowerCase();
  if (requesterEmail !== email.toLowerCase()) return false;
  return getOrcamentoComments(item).length > 0;
}

export function toDateTimeLocal(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function fromDateTimeLocal(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function formatDateTimeBr(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatDateBr(value);
  return date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export function printOrcamentosPdf(items: Orcamento[], now: number) {
  const opened = window.open("about:blank", "_blank", "width=1180,height=840");

  if (!opened) {
    window.alert("Nao foi possivel abrir o relatorio. Verifique o bloqueador de pop-ups do navegador.");
    return;
  }

  opened.document.open();
  opened.document.write(buildOrcamentosReportHtml(items, now));
  opened.document.close();
}

function buildOrcamentosReportHtml(items: Orcamento[], now: number) {
  const total = items.length;
  const open = items.filter((item) => openStatuses.includes(item.status || "nao_iniciado")).length;
  const finished = items.filter((item) => item.status === "finalizado").length;
  const lines = items.reduce((sum, item) => sum + getLineCount(item), 0);
  const saving = items.reduce((sum, item) => sum + Number(item.saving || 0), 0);
  const avgSla = total ? items.reduce((sum, item) => sum + getOrcamentoSla(item, now).totalMs, 0) / total : 0;
  const byStatus = groupCount(items, (item) => phaseLabel(item.status || "nao_iniciado"));
  const byAssignee = groupCountMany(items, (item) => getAssignedToList(item));
  const maxStatus = Math.max(1, ...Array.from(byStatus.values()));
  const maxAssignee = Math.max(1, ...Array.from(byAssignee.values()));
  const logoUrl = `${window.location.origin}/logo-seel.png`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Relatorio de orcamentos</title>
  <style>
    :root { color: #091827; font-family: Arial, sans-serif; }
    body { margin: 0; background: #f4f7fa; }
    main { padding: 28px; }
    header { display:flex; justify-content:space-between; gap:16px; border-bottom:3px solid #ffd200; padding-bottom:18px; margin-bottom:18px; }
    h1 { margin:0; color:#001b35; font-size:26px; }
    h2 { margin:0 0 10px; color:#001b35; font-size:16px; }
    p { margin:4px 0 0; color:#506070; }
    .logo { height:52px; object-fit:contain; }
    .kpis { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin:18px 0; }
    .kpi, .card, .chart { border:1px solid #dbe4ee; border-radius:10px; background:white; padding:14px; }
    .kpi span { display:block; color:#65758a; font-size:11px; font-weight:700; text-transform:uppercase; }
    .kpi strong { display:block; margin-top:7px; color:#001b35; font-size:21px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; }
    .bar { display:grid; grid-template-columns:150px 1fr 42px; gap:8px; align-items:center; margin:8px 0; font-size:12px; }
    .track { height:10px; background:#edf2f7; border-radius:99px; overflow:hidden; }
    .fill { height:100%; background:linear-gradient(90deg,#003b67,#ffd200); border-radius:inherit; }
    .empty { border:1px dashed #cbd5e1; border-radius:10px; background:white; padding:22px; color:#53657a; text-align:center; }
    table { width:100%; border-collapse:collapse; background:white; border:1px solid #dbe4ee; border-radius:10px; overflow:hidden; }
    th, td { padding:9px; border-bottom:1px solid #e7edf4; text-align:left; font-size:11px; vertical-align:top; }
    th { color:#53657a; background:#f8fafc; text-transform:uppercase; }
    @page { size: A4 landscape; margin: 10mm; }
    @media print { body { background:white; } main { padding:0; } button { display:none; } }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>Relatorio de orcamentos</h1>
        <p>Supply Flow SEEL - gerado em ${escapeHtml(formatDateTimeBr(new Date().toISOString()))}</p>
      </div>
      <img class="logo" src="${escapeHtml(logoUrl)}" alt="SEEL" />
    </header>
    <section class="kpis">
      ${kpi("Solicitacoes", total)}
      ${kpi("Em aberto", open)}
      ${kpi("Finalizados", finished)}
      ${kpi("Linhas", lines)}
      ${kpi("SLA medio", formatBusinessDuration(avgSla))}
    </section>
    <section class="grid">
      <div class="chart">
        <h2>Distribuicao por fase</h2>
        ${barRows(byStatus, maxStatus)}
      </div>
      <div class="chart">
        <h2>Distribuicao por orcamentista</h2>
        ${barRows(byAssignee, maxAssignee)}
      </div>
    </section>
    <section class="card">
      <h2>Resumo financeiro</h2>
      <p>Saving acumulado: <strong>${escapeHtml(formatCurrency(saving))}</strong></p>
    </section>
    <table>
      <thead>
        <tr><th>Proposta</th><th>Status</th><th>Resultado</th><th>Solicitante</th><th>Atribuido a</th><th>Cliente/obra</th><th>Linhas</th><th>Solicitado</th><th>Finalizado</th><th>SLA</th></tr>
      </thead>
      <tbody>
        ${items.length ? reportRows(items, now) : '<tr><td colspan="10"><div class="empty">Nenhum orcamento encontrado para os filtros atuais.</div></td></tr>'}
      </tbody>
    </table>
  </main>
  <script>
    window.addEventListener("load", function() {
      setTimeout(function(){ window.focus(); window.print(); }, 650);
    });
  </script>
</body>
</html>`;
}

function reportRows(items: Orcamento[], now: number) {
  return items
    .slice(0, 250)
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.numero_proposta || "-")}</td><td>${escapeHtml(phaseLabel(item.status || "-"))}</td><td>${escapeHtml(
          item.status === "finalizado" ? outcomeLabel(getOrcamentoOutcome(item)) : "-"
        )}</td><td>${escapeHtml(
          item.nome_solicitante || "-"
        )}</td><td>${escapeHtml(getAssignedTo(item) || "-")}</td><td>${escapeHtml(item.cliente || item.local_obra || "-")}</td><td>${getLineCount(
          item
        )}</td><td>${escapeHtml(formatDateBr(item.data_solicitacao))}</td><td>${escapeHtml(formatDateTimeBr(getFinalizationDate(item)))}</td><td>${escapeHtml(
          formatBusinessDuration(getOrcamentoSla(item, now).totalMs)
        )}</td></tr>`
    )
    .join("");
}

function groupCount(items: Orcamento[], keyFn: (item: Orcamento) => string) {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const key = keyFn(item) || "Nao informado";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return map;
}

function groupCountMany(items: Orcamento[], keyFn: (item: Orcamento) => string[]) {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const keys = keyFn(item);
    (keys.length ? keys : ["Sem atribuido"]).forEach((key) => map.set(key, (map.get(key) || 0) + 1));
  });
  return map;
}

function kpi(label: string, value: string | number) {
  return `<div class="kpi"><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong></div>`;
}

function barRows(map: Map<string, number>, max: number) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value]) => {
      const width = Math.max(4, Math.round((value / max) * 100));
      return `<div class="bar"><span>${escapeHtml(label)}</span><div class="track"><div class="fill" style="width:${width}%"></div></div><strong>${value}</strong></div>`;
    })
    .join("");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] || char));
}

function splitAssigneeValue(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(splitAssigneeValue);
  return String(value ?? "")
    .split(/[,;|\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueTexts(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function normalizeOutcomeValue(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
