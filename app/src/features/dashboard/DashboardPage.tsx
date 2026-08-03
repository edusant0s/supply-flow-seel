import { useMemo } from "react";
import type React from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock3,
  RefreshCw,
  Star,
  Target,
} from "lucide-react";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState, LoadingState } from "../../components/States";
import { useAsyncData, useSessionState } from "../../hooks";
import { loadEmbeddedStorageSnapshot } from "../../services/embeddedSync";
import { listEntities } from "../../services/entities";
import {
  buildControlledInsight,
  buildCriticalInsights,
  buildDashboardRows,
  formatCount,
  rowTotals,
  sumRows,
  type DashboardMetric,
  type DashboardRow,
  type ProcessKey,
} from "./dashboardModel";

const processOptions: Array<{ key: ProcessKey; label: string }> = [
  { key: "todos", label: "Todas as areas" },
  { key: "requisicoes", label: "Requisicoes" },
  { key: "orcamentos", label: "Orcamentos" },
  { key: "contratos", label: "Contratos" },
  { key: "fornecedores", label: "Mapa de fornecedores" },
  { key: "fretes", label: "Fretes" },
  { key: "frota", label: "Frota" },
  { key: "estoque", label: "Estoque de obras" },
  { key: "avaliacao", label: "Avaliacao de fornecedores" },
];

export function DashboardPage() {
  const [processFilter, setProcessFilter] = useSessionState<ProcessKey>("supply-flow:dashboard:process-filter", "todos");
  const { data, loading, error, refresh } = useAsyncData(async () => {
    const [requisicoes, orcamentos, contratos, fornecedores, fretesState, frotaState, estoqueState, avaliacaoState] = await Promise.all([
      listEntities("requisicoes"),
      listEntities("orcamentos"),
      listEntities("contratos"),
      listEntities("fornecedores"),
      loadEmbeddedStorageSnapshot("fretes"),
      loadEmbeddedStorageSnapshot("frota"),
      loadEmbeddedStorageSnapshot("estoque_obras"),
      loadEmbeddedStorageSnapshot("avaliacao_fornecedores"),
    ]);
    return { requisicoes, orcamentos, contratos, fornecedores, fretesState, frotaState, estoqueState, avaliacaoState };
  }, [], { cacheKey: "dashboard:summary" });

  const rows = useMemo(() => {
    if (!data) return [];
    return buildDashboardRows(data);
  }, [data]);
  const lastUpdatedAt = useMemo(() => new Date(), [data]);

  if (loading) return <LoadingState label="Carregando indicadores" />;
  if (error && !data) return <EmptyState title="Falha ao carregar dashboard" description={error} />;
  if (!data) return null;

  const selectedRow = processFilter === "todos" ? null : rows.find((row) => row.key === processFilter) ?? null;
  const topMetrics = (selectedRow ? selectedRow.metrics : buildSupplyMetrics(rows)).slice(0, 4);
  const chartRows = selectedRow ? [selectedRow] : rows.filter((row) => row.family === "operacao");

  return (
    <div className="page-stack dashboard-home">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label>
          Area de Supply
          <select value={processFilter} onChange={(event) => setProcessFilter(event.target.value as ProcessKey)}>
            {processOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button className="secondary-button" type="button" onClick={() => refresh({ preserveScroll: true })}>
          <RefreshCw size={18} />
          Atualizar dados
        </button>
      </section>

      {error ? (
        <section className="dashboard-cache-warning">
          <AlertTriangle size={18} />
          <span>Alguma fonte demorou para responder. Mantive os indicadores em cache enquanto a proxima atualizacao e processada.</span>
        </section>
      ) : null}

      <DashboardCommandCenter rows={rows} selectedRow={selectedRow} updatedAt={lastUpdatedAt} />

      <section className="kpi-grid">
        {topMetrics.map((metric) => (
          <KpiCard key={metric.title} title={metric.title} value={metric.value} icon={metric.icon} tone={metric.tone} />
        ))}
      </section>

      {selectedRow ? <AreaDashboardPanel row={selectedRow} /> : <DashboardCharts rows={chartRows} />}

      {selectedRow ? <AreaBreakdownCharts row={selectedRow} /> : null}

      <DashboardCriticalAnalysis rows={rows} selectedRow={selectedRow} updatedAt={lastUpdatedAt} />
    </div>
  );
}

function buildSupplyMetrics(rows: DashboardRow[]): DashboardMetric[] {
  const operacao = rows.filter((row) => row.family === "operacao");
  const totalDemandas = sumRows(operacao, "demanda");
  const emAberto = sumRows(operacao, "emAberto");
  const finalizados = sumRows(operacao, "finalizados");
  const alertas = sumRows(operacao, "riscoSla");
  const conclusao = totalDemandas ? Math.round((finalizados / totalDemandas) * 100) : 0;

  return [
    { title: "Demandas operacionais", value: totalDemandas, icon: BarChart3, tone: "blue" },
    { title: "Fila em aberto", value: emAberto, icon: ClipboardList, tone: emAberto ? "warning" : "success" },
    { title: "Alertas de SLA", value: alertas, icon: AlertTriangle, tone: alertas ? "danger" : "success" },
    { title: "Conclusao operacional", value: `${conclusao}%`, icon: Star, tone: "success", chartValue: conclusao },
  ];
}

function DashboardCommandCenter({
  rows,
  selectedRow,
  updatedAt,
}: {
  rows: DashboardRow[];
  selectedRow: DashboardRow | null;
  updatedAt: Date;
}) {
  const scopeRows = selectedRow ? [selectedRow] : rows;
  const operationalRows = scopeRows.filter((row) => row.family === "operacao");
  const rowsForHealth = operationalRows.length ? operationalRows : scopeRows;
  const totals = rowTotals(rowsForHealth);
  const health = calculateHealthScore(rowsForHealth);
  const completion = formatPercent(totals.finalizados, totals.demanda);
  const risk = formatPercent(totals.riscoSla, totals.demanda);
  const backlogLeader = rowsForHealth.slice().sort((a, b) => b.emAberto - a.emAberto)[0];
  const healthTone = health >= 80 ? "success" : health >= 58 ? "warning" : "danger";

  return (
    <section className="dashboard-command-center">
      <article className="dashboard-command-center__main">
        <div>
          <span className="eyebrow">{selectedRow ? "Area selecionada" : "Centro de comando"}</span>
          <h2>{selectedRow ? selectedRow.processo : "Supply Flow em tempo de gestao"}</h2>
          <p>
            Indicadores recalculados por fonte de dados, separando atendimento, ativos e bases cadastrais para evitar leitura distorcida.
          </p>
        </div>
        <div className={`dashboard-health-ring dashboard-health-ring--${healthTone}`} style={{ "--health": `${health * 3.6}deg` } as React.CSSProperties}>
          <strong>{health}</strong>
          <span>saude</span>
        </div>
      </article>

      <article className="dashboard-live-card">
        <Activity size={18} />
        <span>Atualizado</span>
        <strong>{updatedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</strong>
        <small>{updatedAt.toLocaleDateString("pt-BR")}</small>
      </article>

      <article className="dashboard-live-card">
        <Target size={18} />
        <span>Conclusao</span>
        <strong>{completion}</strong>
        <small>{formatCount(totals.finalizados)} de {formatCount(totals.demanda)}</small>
      </article>

      <article className="dashboard-live-card">
        <AlertTriangle size={18} />
        <span>Pressao SLA</span>
        <strong>{risk}</strong>
        <small>{formatCount(totals.riscoSla)} alertas</small>
      </article>

      <article className="dashboard-live-card">
        <ArrowUpRight size={18} />
        <span>Gargalo</span>
        <strong>{backlogLeader?.processo || "-"}</strong>
        <small>{backlogLeader ? `${formatCount(backlogLeader.emAberto)} ${backlogLeader.openLabel}` : "Sem fila"}</small>
      </article>

    </section>
  );
}

function DashboardCriticalAnalysis({
  rows,
  selectedRow,
  updatedAt,
}: {
  rows: DashboardRow[];
  selectedRow: DashboardRow | null;
  updatedAt: Date;
}) {
  const scopeRows = selectedRow ? [selectedRow] : rows;
  const rowsForHealth = scopeRows.filter((row) => row.family === "operacao").length ? scopeRows.filter((row) => row.family === "operacao") : scopeRows;
  const totals = rowTotals(rowsForHealth);
  const controlIndex = calculateHealthScore(rowsForHealth);
  const insights = buildCriticalInsights(scopeRows);
  const mainInsight = insights[0] ?? buildControlledInsight(scopeRows);
  const criticalCount = insights.filter((item) => item.tone === "danger").length;
  const attentionCount = insights.filter((item) => item.tone === "danger" || item.tone === "warning").length;
  const exposure = totals.emAberto + totals.riscoSla;
  const HeadIcon = mainInsight.icon;

  return (
    <section className="dashboard-alerts-section">
      <div className="dashboard-alerts-title">
        <span>
          <AlertTriangle size={20} />
        </span>
        <div>
          <h2>{selectedRow ? `Alertas de ${selectedRow.processo}` : "Alertas do Supply"}</h2>
          <p>Analises automaticas recalculadas conforme as bases e filtros do dashboard.</p>
        </div>
      </div>

      <div className="dashboard-alert-summary-grid">
        <article className={`dashboard-alert-summary-card dashboard-alert-summary-card--${mainInsight.tone} dashboard-alert-summary-card--wide`}>
          <HeadIcon size={26} />
          <div>
            <h3>{mainInsight.title}</h3>
            <p>{mainInsight.value} {mainInsight.meta}</p>
            <small>Recalculado automaticamente em {formatDashboardTimestamp(updatedAt)}</small>
          </div>
        </article>
        <article className={`dashboard-alert-summary-card dashboard-alert-summary-card--${controlIndex >= 80 ? "success" : controlIndex >= 58 ? "warning" : "danger"}`}>
          <span>Indice de controle</span>
          <strong>{controlIndex}/100</strong>
          <p>Composto por fila, conclusao, risco de SLA e qualidade cadastral.</p>
        </article>
        <article className={`dashboard-alert-summary-card dashboard-alert-summary-card--${criticalCount ? "danger" : attentionCount ? "warning" : "success"}`}>
          <span>Analises criticas</span>
          <strong>{criticalCount}</strong>
          <p>{attentionCount} analise(s) em atencao no recorte atual.</p>
        </article>
        <article className={`dashboard-alert-summary-card dashboard-alert-summary-card--${exposure ? "warning" : "success"}`}>
          <span>Exposicao operacional</span>
          <strong>{formatCount(exposure)}</strong>
          <p>{formatCount(totals.emAberto)} em aberto + {formatCount(totals.riscoSla)} alerta(s).</p>
        </article>
      </div>

      <div className="dashboard-auto-analysis-head">
        <h3>Analises automaticas priorizadas</h3>
        <span>{formatCount(scopeRows.reduce((sum, row) => sum + row.demanda, 0))} registro(s) considerados no filtro atual</span>
      </div>

      <div className="dashboard-auto-analysis-grid">
        {insights.slice(0, 4).map((insight) => {
          const Icon = insight.icon;
          return (
            <article key={insight.key} className={`dashboard-analysis-card dashboard-analysis-card--${insight.tone}`}>
              <div className="dashboard-analysis-card__head">
                <span>
                  <Icon size={17} />
                </span>
                <b>{insight.category}</b>
                <em>{criticalToneLabel(insight.tone)}</em>
              </div>
              <strong>{insight.title}</strong>
              <div className="dashboard-analysis-card__value">
                <span>{insight.value}</span>
                <small>{insight.meta}</small>
              </div>
              <p>{insight.description}</p>
              <footer>
                <b>Acao:</b> {insight.action}
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function criticalToneLabel(tone: DashboardRow extends never ? never : ReturnType<typeof buildCriticalInsights>[number]["tone"]) {
  return {
    danger: "Critico",
    warning: "Atencao",
    monitor: "Monitorar",
    success: "Controlado",
  }[tone];
}

function formatDashboardTimestamp(value: Date) {
  return `${value.toLocaleDateString("pt-BR")} ${value.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
}

function AreaDashboardPanel({ row }: { row: DashboardRow }) {
  return (
    <section className="dashboard-area-panel">
      <article>
        <span className={`dashboard-family-badge dashboard-family-badge--${row.family}`}>{row.familyLabel}</span>
        <h2>{row.processo}</h2>
        <p>{row.indicador}</p>
      </article>
      <div className="dashboard-area-panel__meta">
        <span>{formatCount(row.demanda)} {row.primaryLabel}</span>
        <span>{formatCount(row.emAberto)} {row.openLabel}</span>
        <span>{formatCount(row.finalizados)} {row.doneLabel}</span>
        <span>{formatCount(row.riscoSla)} {row.riskLabel}</span>
      </div>
    </section>
  );
}

function DashboardCharts({ rows }: { rows: DashboardRow[] }) {
  const maxDemand = Math.max(...rows.map((row) => row.demanda), 1);
  const totals = rows.reduce(
    (acc, row) => ({
      demanda: acc.demanda + row.demanda,
      emAberto: acc.emAberto + row.emAberto,
      finalizados: acc.finalizados + row.finalizados,
      riscoSla: acc.riscoSla + row.riscoSla,
    }),
    { demanda: 0, emAberto: 0, finalizados: 0, riscoSla: 0 }
  );
  const donePercent = totals.demanda ? Math.round((totals.finalizados / totals.demanda) * 100) : 0;
  const openPercent = totals.demanda ? Math.round((totals.emAberto / totals.demanda) * 100) : 0;
  const riskPercent = totals.demanda ? Math.round((totals.riscoSla / totals.demanda) * 100) : 0;

  return (
    <section className="dashboard-chart-grid">
      <article className="panel dashboard-chart-card">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Volume</span>
            <h2>Demandas operacionais por processo</h2>
          </div>
        </div>
        <div className="bar-chart" role="img" aria-label="Demandas operacionais por processo">
          {rows.map((row, index) => (
            <div className="bar-chart__row" key={row.key} style={{ "--bar-color": chartColor(index) } as React.CSSProperties}>
              <span>{row.processo}</span>
              <div>
                <i style={{ width: `${Math.max(4, (row.demanda / maxDemand) * 100)}%` }} />
              </div>
              <strong>{formatCount(row.demanda)}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className="panel dashboard-chart-card dashboard-chart-card--compact">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Funil</span>
            <h2>Status operacional</h2>
          </div>
        </div>
        <div className="donut-summary" style={{ "--done": `${donePercent * 3.6}deg`, "--open": `${openPercent * 3.6}deg` } as React.CSSProperties}>
          <div className="donut-summary__chart">
            <strong>{donePercent}%</strong>
            <span>conclusao</span>
          </div>
          <div className="donut-summary__legend">
            <span><b className="legend-dot legend-dot--done" />Finalizados {formatCount(totals.finalizados)}</span>
            <span><b className="legend-dot legend-dot--open" />Em aberto {formatCount(totals.emAberto)}</span>
            <span><b className="legend-dot legend-dot--risk" />Risco SLA {formatCount(totals.riscoSla)} ({riskPercent}%)</span>
          </div>
        </div>
      </article>
    </section>
  );
}

function AreaBreakdownCharts({ row }: { row: DashboardRow }) {
  const metrics = row.metrics.map((metric) => ({
    ...metric,
    chartValue: metric.chartValue ?? (typeof metric.value === "number" ? metric.value : 0),
  }));
  const maxValue = Math.max(...metrics.map((metric) => metric.chartValue), 1);

  return (
    <section className="dashboard-chart-grid">
      <article className="panel dashboard-chart-card">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Area selecionada</span>
            <h2>Indicadores de {row.processo}</h2>
          </div>
        </div>
        <div className="bar-chart" role="img" aria-label={`Indicadores de ${row.processo}`}>
          {metrics.map((metric, index) => (
            <div className="bar-chart__row" key={metric.title} style={{ "--bar-color": chartColor(index) } as React.CSSProperties}>
              <span>{metric.title}</span>
              <div>
                <i style={{ width: `${Math.max(4, (metric.chartValue / maxValue) * 100)}%` }} />
              </div>
              <strong>{typeof metric.value === "number" ? formatCount(metric.value) : metric.value}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className="panel dashboard-chart-card dashboard-chart-card--compact">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Leitura</span>
            <h2>Como interpretar</h2>
          </div>
        </div>
        <div className="dashboard-area-explain">
          <p>{row.processo} usa indicadores de {row.familyLabel.toLowerCase()}, por isso o painel evita chamar esses registros de demandas quando a natureza da area nao for atendimento.</p>
          <strong>{formatCount(row.riscoSla)} {row.riskLabel}</strong>
          <span>Priorize os alertas antes de olhar apenas o volume principal.</span>
        </div>
      </article>
    </section>
  );
}

function calculateHealthScore(rows: DashboardRow[]) {
  const totals = rowTotals(rows);
  if (!totals.demanda) return 100;
  const completionRate = totals.finalizados / totals.demanda;
  const riskRate = totals.riscoSla / totals.demanda;
  const backlogRate = totals.emAberto / totals.demanda;
  const score = 100 - riskRate * 48 - backlogRate * 22 + completionRate * 18;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function formatPercent(part: number, total: number) {
  return total ? `${Math.round((part / total) * 100)}%` : "0%";
}

function chartColor(index: number) {
  const colors = ["#fcc800", "#1b6d8e", "#45a0c0", "#10b981", "#f97316", "#ef4444", "#0a2e3d", "#8b5cf6"];
  return colors[index % colors.length];
}
