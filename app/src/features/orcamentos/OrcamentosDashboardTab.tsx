import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock3, Target, TimerReset, TrendingUp } from "lucide-react";
import { KpiCard } from "../../components/KpiCard";
import { formatCurrency, formatDateBr, normalizeText, slaColorByDueDate } from "../../lib/format";
import type { Orcamento } from "../../types";
import { formatBusinessDuration, getOrcamentoSla, phaseLabel } from "./sla";
import {
  getAssignedToList,
  getFilterDate,
  getLineCount,
  getOrcamentista,
  getOrcamentoOutcome,
  openStatuses,
  outcomeLabel,
} from "./model";

type ChartRow = { label: string; value: number; meta?: string; accent?: string };
type AlertInsight = { title: string; detail: string; tone: "success" | "warning" | "danger" | "blue" };

export function OrcamentosDashboardTab({ items, now }: { items: Orcamento[]; now: number }) {
  const [assignee, setAssignee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const assignees = useMemo(() => unique(items.flatMap(getAssignedToList).filter(Boolean)), [items]);
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const itemDate = getFilterDate(item);
      const names = getAssignedToList(item).map(normalizeText);
      const matchesAssignee = !assignee || names.includes(normalizeText(assignee)) || normalizeText(getOrcamentista(item)) === normalizeText(assignee);
      const matchesStart = !startDate || !itemDate || itemDate >= startDate;
      const matchesEnd = !endDate || !itemDate || itemDate <= endDate;
      return matchesAssignee && matchesStart && matchesEnd;
    });
  }, [assignee, endDate, items, startDate]);

  const metrics = useMemo(() => buildDashboardMetrics(filtered, now), [filtered, now]);
  const statusRows = useMemo(() => groupRows(filtered, (item) => phaseLabel(item.status || "nao_iniciado")), [filtered]);
  const outcomeRows = useMemo(
    () =>
      groupRows(
        filtered.filter((item) => item.status === "finalizado"),
        (item) => outcomeLabel(getOrcamentoOutcome(item))
      ),
    [filtered]
  );
  const assigneeRows = useMemo(() => groupRowsByAssignee(filtered), [filtered]);
  const slaByAssigneeRows = useMemo(() => buildAssigneeSlaRows(filtered, now), [filtered, now]);
  const monthlyRows = useMemo(() => buildMonthlyRows(filtered), [filtered]);
  const typeRows = useMemo(() => groupRows(filtered, (item) => item.tipo_orcamento || "Tipo nao informado"), [filtered]);
  const alertRows = useMemo(() => buildAlertRows(filtered, metrics, now), [filtered, metrics, now]);

  return (
    <div className="page-stack orcamento-dashboard">
      <section className="toolbar-panel toolbar-panel--wrap orcamento-dashboard-filters">
        <select value={assignee} onChange={(event) => setAssignee(event.target.value)}>
          <option value="">Todos atribuidos</option>
          {assignees.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label>
          Data inicial
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </label>
        <label>
          Data final
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
      </section>

      <section className="kpi-grid orcamento-kpis orcamento-dashboard-kpis">
        <KpiCard title="Solicitacoes" value={metrics.total} icon={ClipboardList} tone="blue" />
        <KpiCard title="Em aberto" value={metrics.open} icon={AlertTriangle} tone={metrics.open ? "warning" : "success"} />
        <KpiCard title="Finalizados" value={metrics.finished} icon={CheckCircle2} tone="success" />
        <KpiCard title="Ganhas" value={metrics.won} icon={Target} tone={metrics.won ? "success" : "neutral"} />
        <KpiCard title="Aguardando resultado" value={metrics.waitingOutcome} icon={Clock3} tone={metrics.waitingOutcome ? "warning" : "success"} />
        <KpiCard title="SLA medio" value={formatBusinessDuration(metrics.avgSla)} icon={TimerReset} tone="blue" />
        <KpiCard title="Saving" value={formatCurrency(metrics.saving)} icon={TrendingUp} tone={metrics.saving > 0 ? "success" : "neutral"} />
      </section>

      <section className="orcamento-executive-grid">
        <ExecutiveCard title="Taxa de finalizacao" value={formatPercent(metrics.finished, metrics.total)} hint={`${metrics.finished} de ${metrics.total} solicitacoes`} accent="var(--green)" />
        <ExecutiveCard title="Taxa de ganho" value={formatPercent(metrics.won, metrics.finishedWithOutcome)} hint={`${metrics.won} ganha(s), ${metrics.lost} perdida(s)`} accent="var(--blue-700)" />
        <ExecutiveCard title="Linhas por solicitacao" value={metrics.avgLines.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} hint={`${metrics.lines} linha(s) no filtro`} accent="var(--yellow)" />
        <ExecutiveCard title="Pressao operacional" value={String(metrics.risk)} hint={`${metrics.delayed} atrasada(s), ${metrics.warning} em atencao`} accent="var(--red)" />
      </section>

      <section className="orcamento-dashboard-grid orcamento-dashboard-grid--executive">
        <ChartCard title="Funil por fase" eyebrow="Operacao" rows={statusRows} accent="var(--yellow)" />
        <ChartCard title="Resultado das obras finalizadas" eyebrow="Comercial" rows={outcomeRows} accent="var(--green)" emptyLabel="Sem finalizados no filtro." />
        <ChartCard title="Carga por atribuido" eyebrow="Capacidade" rows={assigneeRows} accent="var(--blue-700)" />
        <ChartCard title="SLA medio por atribuido" eyebrow="Performance" rows={slaByAssigneeRows} accent="var(--amber)" valueSuffix="h" />
        <TrendCard rows={monthlyRows} />
        <ChartCard title="Tipo de orcamento" eyebrow="Mix de demanda" rows={typeRows} accent="var(--blue-950)" />
        <AlertPanel rows={alertRows} />
        <section className="orcamento-insight-card orcamento-insight-card--wide">
          <span className="eyebrow">Leitura executiva</span>
          <h3>Resumo analitico</h3>
          <div className="orcamento-insight-list">
            <p>
              <strong>{metrics.busiestAssignee || "-"}</strong>
              Maior concentracao de demandas no filtro atual.
            </p>
            <p>
              <strong>{formatPercent(metrics.open, metrics.total)}</strong>
              Percentual da carteira ainda em aberto.
            </p>
            <p>
              <strong>{formatBusinessDuration(metrics.avgFinishedSla)}</strong>
              SLA medio somente dos processos finalizados.
            </p>
            <p>
              <strong>{filtered[0] ? formatDateBr(filtered[0].updated_at || filtered[0].created_at || "") : "-"}</strong>
              Ultima movimentacao considerada.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}

function ExecutiveCard({ title, value, hint, accent }: { title: string; value: string; hint: string; accent: string }) {
  return (
    <article className="orcamento-executive-card" style={{ "--executive-accent": accent } as CSSProperties}>
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{hint}</p>
    </article>
  );
}

function ChartCard({
  title,
  rows,
  accent,
  eyebrow = "Grafico dinamico",
  valueSuffix = "",
  emptyLabel = "Sem dados para este filtro.",
}: {
  title: string;
  rows: ChartRow[];
  accent: string;
  eyebrow?: string;
  valueSuffix?: string;
  emptyLabel?: string;
}) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <section className="panel orcamento-chart-card">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="bar-chart orcamento-fluid-chart">
        {rows.length ? (
          rows.slice(0, 10).map((row) => (
            <div className="bar-chart__row" key={row.label}>
              <span>{row.label}</span>
              <div>
                <i style={{ width: `${Math.max(4, Math.round((row.value / max) * 100))}%`, "--bar-color": row.accent || accent } as CSSProperties} />
              </div>
              <strong>
                {formatChartValue(row.value)}
                {valueSuffix}
              </strong>
              {row.meta ? <small>{row.meta}</small> : null}
            </div>
          ))
        ) : (
          <div className="muted-box">{emptyLabel}</div>
        )}
      </div>
    </section>
  );
}

function TrendCard({ rows }: { rows: ChartRow[] }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <section className="panel orcamento-chart-card orcamento-trend-card">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Tendencia mensal</span>
          <h3>Entrada de demandas</h3>
        </div>
      </div>
      {rows.length ? (
        <div className="orcamento-trend-bars">
          {rows.slice(-8).map((row) => (
            <div key={row.label}>
              <span style={{ height: `${Math.max(12, Math.round((row.value / max) * 100))}%` }} />
              <strong>{row.value}</strong>
              <small>{row.label}</small>
            </div>
          ))}
        </div>
      ) : (
        <div className="muted-box">Sem serie historica para este filtro.</div>
      )}
    </section>
  );
}

function AlertPanel({ rows }: { rows: AlertInsight[] }) {
  return (
    <section className="orcamento-alert-panel">
      <span className="eyebrow">Alertas e analises</span>
      <h3>Painel de decisao</h3>
      <div>
        {rows.map((row) => (
          <article key={row.title} className={`orcamento-alert-panel__item orcamento-alert-panel__item--${row.tone}`}>
            <strong>{row.title}</strong>
            <p>{row.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function buildDashboardMetrics(items: Orcamento[], now: number) {
  const open = items.filter((item) => openStatuses.includes(item.status || "nao_iniciado"));
  const finished = items.filter((item) => item.status === "finalizado");
  const delayed = items.filter((item) => openStatuses.includes(item.status || "nao_iniciado") && slaColorByDueDate(item.data_entrega_cotacoes) === "danger");
  const warning = items.filter((item) => openStatuses.includes(item.status || "nao_iniciado") && slaColorByDueDate(item.data_entrega_cotacoes) === "warning");
  const won = finished.filter((item) => getOrcamentoOutcome(item) === "ganha").length;
  const lost = finished.filter((item) => getOrcamentoOutcome(item) === "perdida").length;
  const waitingOutcome = finished.filter((item) => getOrcamentoOutcome(item) === "aguardando").length;
  const lines = items.reduce((sum, item) => sum + getLineCount(item), 0);
  const saving = items.reduce((sum, item) => sum + Number(item.saving || 0), 0);
  const avgSla = items.length ? items.reduce((sum, item) => sum + getOrcamentoSla(item, now).totalMs, 0) / items.length : 0;
  const avgFinishedSla = finished.length ? finished.reduce((sum, item) => sum + getOrcamentoSla(item, now).totalMs, 0) / finished.length : 0;
  const assigneeRows = groupRowsByAssignee(items);
  return {
    total: items.length,
    open: open.length,
    finished: finished.length,
    delayed: delayed.length,
    warning: warning.length,
    risk: delayed.length + warning.length,
    won,
    lost,
    waitingOutcome,
    finishedWithOutcome: won + lost,
    lines,
    avgLines: items.length ? lines / items.length : 0,
    saving,
    avgSla,
    avgFinishedSla,
    busiestAssignee: assigneeRows[0]?.label || "",
  };
}

function groupRows(items: Orcamento[], keyFn: (item: Orcamento) => string): ChartRow[] {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const key = keyFn(item) || "Nao informado";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function groupRowsByAssignee(items: Orcamento[]): ChartRow[] {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const names = getAssignedToList(item);
    (names.length ? names : ["Sem atribuido"]).forEach((name) => map.set(name, (map.get(name) || 0) + 1));
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function buildAssigneeSlaRows(items: Orcamento[], now: number): ChartRow[] {
  const map = new Map<string, { totalMs: number; count: number }>();
  items.forEach((item) => {
    const names = getAssignedToList(item);
    (names.length ? names : ["Sem atribuido"]).forEach((name) => {
      const current = map.get(name) || { totalMs: 0, count: 0 };
      current.totalMs += getOrcamentoSla(item, now).totalMs;
      current.count += 1;
      map.set(name, current);
    });
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({
      label,
      value: value.totalMs / value.count / 3_600_000,
      meta: `${value.count} demanda(s)`,
    }))
    .sort((a, b) => b.value - a.value);
}

function buildMonthlyRows(items: Orcamento[]): ChartRow[] {
  return groupRows(items, (item) => {
    const date = getFilterDate(item);
    return date ? date.slice(0, 7).split("-").reverse().join("/") : "Sem data";
  }).sort((a, b) => a.label.localeCompare(b.label, "pt-BR", { numeric: true }));
}

function buildAlertRows(items: Orcamento[], metrics: ReturnType<typeof buildDashboardMetrics>, now: number): AlertInsight[] {
  const rows: AlertInsight[] = [];
  if (!items.length) return [{ title: "Sem dados no filtro", detail: "Amplie o periodo ou remova filtros para visualizar a carteira.", tone: "blue" }];
  if (metrics.delayed) {
    rows.push({ title: "Prioridade de prazo", detail: `${metrics.delayed} solicitacao(oes) em aberto estao atrasadas e precisam de acao no Kanban.`, tone: "danger" });
  }
  if (metrics.waitingOutcome) {
    rows.push({ title: "Resultado comercial pendente", detail: `${metrics.waitingOutcome} finalizado(s) ainda estao aguardando resultado da obra.`, tone: "warning" });
  }
  if (metrics.open > metrics.finished) {
    rows.push({ title: "Carteira aberta elevada", detail: `Abertos representam ${formatPercent(metrics.open, metrics.total)} da carteira filtrada.`, tone: "warning" });
  }
  const oldestOpen = items
    .filter((item) => openStatuses.includes(item.status || "nao_iniciado"))
    .sort((a, b) => getOrcamentoSla(b, now).totalMs - getOrcamentoSla(a, now).totalMs)[0];
  if (oldestOpen) {
    rows.push({
      title: "Maior tempo em aberto",
      detail: `${oldestOpen.numero_proposta || "Solicitacao"} esta com ${formatBusinessDuration(getOrcamentoSla(oldestOpen, now).totalMs)} no processo.`,
      tone: "blue",
    });
  }
  if (!metrics.delayed && !metrics.waitingOutcome) {
    rows.push({ title: "Operacao controlada", detail: "Nao ha atrasos criticos ou resultados comerciais pendentes no filtro atual.", tone: "success" });
  }
  return rows.slice(0, 5);
}

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function formatPercent(value: number, total: number) {
  if (!total) return "0%";
  return `${((value / total) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}

function formatChartValue(value: number) {
  return value.toLocaleString("pt-BR", { maximumFractionDigits: value >= 10 ? 0 : 1 });
}
