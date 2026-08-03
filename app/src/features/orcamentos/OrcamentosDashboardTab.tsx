import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock3, Target, TimerReset, TrendingUp } from "lucide-react";
import { KpiCard } from "../../components/KpiCard";
import { ChartCanvas } from "../../components/ChartCanvas";
import { formatCurrency, formatDateBr, normalizeText, slaColorByDueDate } from "../../lib/format";
import type { Orcamento } from "../../types";
import { OrcamentosCriticalAnalysis } from "./OrcamentosCriticalAnalysis";
import { averageOrcamentoSlaMs, formatBusinessDuration, getOrcamentoSla, statuses } from "./sla";
import { getAssignedToList, getFilterDate, getLineCount, getOrcamentista, getOrcamentoOutcome, openStatuses } from "./model";

type ChartRow = { label: string; value: number; meta?: string; accent?: string };

const BRAND_PALETTE = ["#1b6d8e", "#059669", "#d97706", "#e7000b", "#fcc800", "#0a2e3d", "#0891b2", "#7c3aed"];
const PHASE_COLORS: Record<string, string> = {
  nao_iniciado: "#d97706",
  em_cotacao: "#1b6d8e",
  finalizado: "#059669",
  pausado: "#94a3b8",
};
const TIMED_PHASES = statuses.filter(([key]) => key === "nao_iniciado" || key === "em_cotacao");
const MAX_PROPOSAL_SLA_BARS = 20;

function readCssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function formatHoursLabel(value: number) {
  return `${value.toFixed(1)}h`;
}

function formatCountLabel(value: number) {
  return String(Math.round(value));
}

function buildPhaseSlaRows(items: Orcamento[], now: number): ChartRow[] {
  return TIMED_PHASES.map(([key, label]) => {
    const durations = items.map((item) => getOrcamentoSla(item, now).phaseMs[key] || 0).filter((ms) => ms > 0);
    const avgMs = durations.length ? durations.reduce((sum, ms) => sum + ms, 0) / durations.length : 0;
    return { label, value: avgMs / 3_600_000 };
  });
}

function buildProposalSlaRows(items: Orcamento[], now: number): ChartRow[] {
  return items
    .map((item) => ({ label: item.numero_proposta || "Sem proposta", value: getOrcamentoSla(item, now).totalMs / 3_600_000 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, MAX_PROPOSAL_SLA_BARS);
}

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
  const monthlyRows = useMemo(() => buildMonthlyRows(filtered), [filtered]);
  const typeRows = useMemo(() => groupRows(filtered, (item) => item.tipo_orcamento || "Tipo nao informado"), [filtered]);
  const funnelRows = useMemo(
    () =>
      statuses.map(([key, label]) => ({
        label,
        value: filtered.filter((item) => (item.status || "nao_iniciado") === key).length,
        accent: PHASE_COLORS[key],
      })),
    [filtered]
  );
  const proposalItems = useMemo(() => filtered.filter((item) => String(item.numero_proposta || "").trim() !== ""), [filtered]);
  const proposalsByPhaseRows = useMemo(
    () => statuses.map(([key, label]) => ({ label, value: proposalItems.filter((item) => (item.status || "nao_iniciado") === key).length })),
    [proposalItems]
  );
  const proposalsByMonthRows = useMemo(() => buildMonthlyRows(proposalItems), [proposalItems]);
  const phaseSlaRows = useMemo(() => buildPhaseSlaRows(filtered, now), [filtered, now]);
  const proposalSlaRows = useMemo(() => buildProposalSlaRows(proposalItems, now), [proposalItems, now]);
  const proposalSlaTruncated = proposalItems.length > proposalSlaRows.length;

  const textColor = readCssVar("--text", "#081b23");
  const mutedColor = readCssVar("--muted", "#526771");
  const gridColor = readCssVar("--line", "#d8e3e8");
  const panelColor = readCssVar("--panel", "#ffffff");

  const trendChartData = useMemo(
    () => ({
      labels: monthlyRows.map((row) => row.label),
      datasets: [
        {
          label: "Solicitacoes",
          data: monthlyRows.map((row) => row.value),
          borderColor: "#1b6d8e",
          backgroundColor: "rgba(27, 109, 142, 0.16)",
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: "#1b6d8e",
          pointHoverRadius: 5,
        },
      ],
    }),
    [monthlyRows]
  );

  const typeChartData = useMemo(
    () => ({
      labels: typeRows.map((row) => row.label),
      datasets: [
        {
          data: typeRows.map((row) => row.value),
          backgroundColor: typeRows.map((_, index) => BRAND_PALETTE[index % BRAND_PALETTE.length]),
          borderColor: panelColor,
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    }),
    [typeRows, panelColor]
  );

  const outcomeChartData = useMemo(
    () => ({
      labels: ["Ganhas", "Perdidas", "Aguardando"],
      datasets: [
        {
          data: [metrics.won, metrics.lost, metrics.waitingOutcome],
          backgroundColor: ["#059669", "#e7000b", "#d97706"],
          borderColor: panelColor,
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    }),
    [metrics.won, metrics.lost, metrics.waitingOutcome, panelColor]
  );

  const proposalsPhaseChartData = useMemo(
    () => ({
      labels: proposalsByPhaseRows.map((row) => row.label),
      datasets: [
        {
          label: "Propostas",
          data: proposalsByPhaseRows.map((row) => row.value),
          backgroundColor: "#1b6d8e",
          borderRadius: 8,
          maxBarThickness: 46,
        },
      ],
    }),
    [proposalsByPhaseRows]
  );

  const proposalsMonthChartData = useMemo(
    () => ({
      labels: proposalsByMonthRows.map((row) => row.label),
      datasets: [
        {
          label: "Propostas emitidas",
          data: proposalsByMonthRows.map((row) => row.value),
          backgroundColor: "#d97706",
          borderRadius: 8,
          maxBarThickness: 46,
        },
      ],
    }),
    [proposalsByMonthRows]
  );

  const phaseSlaChartData = useMemo(
    () => ({
      labels: phaseSlaRows.map((row) => row.label),
      datasets: [
        {
          label: "SLA medio (h)",
          data: phaseSlaRows.map((row) => Number(row.value.toFixed(2))),
          backgroundColor: ["#d97706", "#1b6d8e"],
          borderRadius: 8,
          maxBarThickness: 70,
        },
      ],
    }),
    [phaseSlaRows]
  );

  const proposalSlaChartData = useMemo(
    () => ({
      labels: proposalSlaRows.map((row) => row.label),
      datasets: [
        {
          label: "SLA (h)",
          data: proposalSlaRows.map((row) => Number(row.value.toFixed(2))),
          backgroundColor: "#7c3aed",
          borderRadius: 6,
          maxBarThickness: 20,
        },
      ],
    }),
    [proposalSlaRows]
  );

  const scaleStyle = useMemo(
    () => ({
      grid: { color: gridColor, drawTicks: false },
      ticks: { color: mutedColor, font: { size: 10, weight: 700 as const }, precision: 0 },
    }),
    [gridColor, mutedColor]
  );

  const lineOptions = useMemo(
    () => ({
      plugins: {
        legend: { display: false },
        tooltip: { intersect: false, mode: "index" as const },
      },
      scales: { x: { ...scaleStyle }, y: { ...scaleStyle, beginAtZero: true } },
    }),
    [scaleStyle]
  );

  const countBarOptions = useMemo(
    () => ({
      plugins: { legend: { display: false } },
      scales: { x: { ...scaleStyle }, y: { ...scaleStyle, beginAtZero: true } },
    }),
    [scaleStyle]
  );

  const phaseSlaOptions = useMemo(
    () => ({
      plugins: { legend: { display: false } },
      scales: { x: { ...scaleStyle }, y: { ...scaleStyle, beginAtZero: true } },
    }),
    [scaleStyle]
  );

  const proposalSlaOptions = useMemo(
    () => ({
      indexAxis: "y" as const,
      plugins: { legend: { display: false } },
      scales: { x: { ...scaleStyle, beginAtZero: true }, y: { ...scaleStyle } },
    }),
    [scaleStyle]
  );

  const doughnutOptions = useMemo(
    () => ({
      cutout: "62%",
      plugins: {
        legend: { position: "bottom" as const, labels: { color: textColor, boxWidth: 12, padding: 12, font: { size: 11, weight: 700 as const } } },
      },
    }),
    [textColor]
  );

  const countDataLabels = useMemo(() => ({ formatter: formatCountLabel, color: textColor }), [textColor]);
  const hoursDataLabels = useMemo(() => ({ formatter: formatHoursLabel, color: textColor }), [textColor]);

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

      <OrcamentosCriticalAnalysis items={filtered} now={now} />

      <section className="orcamento-dashboard-grid orcamento-dashboard-grid--executive">
        <section className="panel orcamento-chart-card orcamento-canvas-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Tendencia mensal</span>
              <h3>Entrada de demandas</h3>
            </div>
          </div>
          {monthlyRows.length ? <ChartCanvas type="line" data={trendChartData} options={lineOptions} dataLabels={countDataLabels} /> : <div className="muted-box">Sem serie historica para este filtro.</div>}
        </section>

        <section className="panel orcamento-chart-card orcamento-canvas-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Mix de demanda</span>
              <h3>Tipo de orcamento</h3>
            </div>
          </div>
          {typeRows.length ? <ChartCanvas type="doughnut" data={typeChartData} options={doughnutOptions} dataLabels={countDataLabels} /> : <div className="muted-box">Sem dados para este filtro.</div>}
        </section>

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

        <PhaseFunnel rows={funnelRows} />

        <section className="panel orcamento-chart-card orcamento-canvas-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Comercial</span>
              <h3>Resultado das obras finalizadas</h3>
            </div>
          </div>
          {metrics.won + metrics.lost + metrics.waitingOutcome ? (
            <ChartCanvas type="doughnut" data={outcomeChartData} options={doughnutOptions} dataLabels={countDataLabels} />
          ) : (
            <div className="muted-box">Sem finalizados no filtro.</div>
          )}
        </section>

        <section className="panel orcamento-chart-card orcamento-canvas-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Proposta (PP)</span>
              <h3>Propostas por fase</h3>
            </div>
          </div>
          {proposalItems.length ? <ChartCanvas type="bar" data={proposalsPhaseChartData} options={countBarOptions} dataLabels={countDataLabels} /> : <div className="muted-box">Sem propostas numeradas no filtro.</div>}
        </section>

        <section className="panel orcamento-chart-card orcamento-canvas-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Proposta (PP)</span>
              <h3>Propostas por mes de emissao</h3>
            </div>
          </div>
          {proposalItems.length ? <ChartCanvas type="bar" data={proposalsMonthChartData} options={countBarOptions} dataLabels={countDataLabels} /> : <div className="muted-box">Sem propostas numeradas no filtro.</div>}
        </section>

        <section className="panel orcamento-chart-card orcamento-canvas-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Performance</span>
              <h3>SLA por fase</h3>
            </div>
          </div>
          {filtered.length ? <ChartCanvas type="bar" data={phaseSlaChartData} options={phaseSlaOptions} dataLabels={hoursDataLabels} /> : <div className="muted-box">Sem dados para este filtro.</div>}
        </section>

        <section className="panel orcamento-chart-card orcamento-canvas-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Proposta (PP)</span>
              <h3>SLA por proposta</h3>
            </div>
          </div>
          {proposalSlaRows.length ? (
            <>
              <ChartCanvas type="bar" data={proposalSlaChartData} options={proposalSlaOptions} dataLabels={hoursDataLabels} height={Math.max(240, proposalSlaRows.length * 26)} />
              {proposalSlaTruncated ? (
                <p className="muted-note">
                  Mostrando as {proposalSlaRows.length} propostas com maior SLA de {proposalItems.length} no filtro.
                </p>
              ) : null}
            </>
          ) : (
            <div className="muted-box">Sem propostas numeradas no filtro.</div>
          )}
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

function PhaseFunnel({ rows }: { rows: ChartRow[] }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <section className="panel orcamento-chart-card orcamento-funnel-card">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Operacao</span>
          <h3>Funil por fase</h3>
        </div>
      </div>
      <div className="orcamento-funnel">
        {rows.map((row) => {
          const pct = Math.max(16, Math.round((row.value / max) * 100));
          return (
            <div className="orcamento-funnel-row" key={row.label}>
              <div className="orcamento-funnel-bar" style={{ width: `${pct}%`, background: row.accent || "var(--blue-700)" }}>
                <strong>{row.value}</strong>
              </div>
              <span>{row.label}</span>
            </div>
          );
        })}
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
  const avgFinishedSla = averageOrcamentoSlaMs(finished, now);
  const avgSla = averageOrcamentoSlaMs(finished.length ? finished : items, now);
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

function buildMonthlyRows(items: Orcamento[]): ChartRow[] {
  return groupRows(items, (item) => {
    const date = getFilterDate(item);
    return date ? date.slice(0, 7).split("-").reverse().join("/") : "Sem data";
  }).sort((a, b) => a.label.localeCompare(b.label, "pt-BR", { numeric: true }));
}

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function formatPercent(value: number, total: number) {
  if (!total) return "0%";
  return `${((value / total) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}
