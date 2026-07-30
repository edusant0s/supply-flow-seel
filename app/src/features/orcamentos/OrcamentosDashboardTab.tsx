import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock3, Target, TimerReset, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { KpiCard } from "../../components/KpiCard";
import { formatCurrency, formatDateBr, normalizeText, slaColorByDueDate } from "../../lib/format";
import type { Orcamento } from "../../types";
import { averageOrcamentoSlaMs, formatBusinessDuration, getOrcamentoSla, phaseLabel } from "./sla";
import {
  formatDateTimeBr,
  getAssignedToList,
  getFilterDate,
  getLineCount,
  getOrcamentista,
  getOrcamentoOutcome,
  openStatuses,
  outcomeLabel,
} from "./model";

type ChartRow = { label: string; value: number; meta?: string; accent?: string };
type AnalysisTone = "success" | "warning" | "danger" | "blue" | "neutral";
type CriticalAnalysis = {
  category: string;
  title: string;
  value: string;
  meta: string;
  detail: string;
  action: string;
  status: string;
  tone: AnalysisTone;
  icon: LucideIcon;
};

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
  const criticalAnalyses = useMemo(() => buildCriticalAnalyses(filtered, metrics, now), [filtered, metrics, now]);

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

      <CriticalAnalysisPanel rows={criticalAnalyses} metrics={metrics} filteredCount={filtered.length} now={now} />

      <section className="orcamento-dashboard-grid orcamento-dashboard-grid--executive">
        <ChartCard title="Funil por fase" eyebrow="Operacao" rows={statusRows} accent="var(--yellow)" />
        <ChartCard title="Resultado das obras finalizadas" eyebrow="Comercial" rows={outcomeRows} accent="var(--green)" emptyLabel="Sem finalizados no filtro." />
        <ChartCard title="Carga por atribuido" eyebrow="Capacidade" rows={assigneeRows} accent="var(--blue-700)" />
        <ChartCard title="SLA medio por atribuido" eyebrow="Performance" rows={slaByAssigneeRows} accent="var(--amber)" valueSuffix="h" />
        <TrendCard rows={monthlyRows} />
        <ChartCard title="Tipo de orcamento" eyebrow="Mix de demanda" rows={typeRows} accent="var(--blue-950)" />
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

function CriticalAnalysisPanel({
  rows,
  metrics,
  filteredCount,
  now,
}: {
  rows: CriticalAnalysis[];
  metrics: ReturnType<typeof buildDashboardMetrics>;
  filteredCount: number;
  now: number;
}) {
  const criticalCount = rows.filter((row) => row.tone === "danger").length;
  const attentionCount = rows.filter((row) => row.tone === "warning").length;
  const mainTone: AnalysisTone = criticalCount ? "danger" : attentionCount ? "warning" : "success";
  const headline = criticalCount
    ? "Risco de prazo exige atuacao imediata"
    : attentionCount
      ? "Carteira com pontos de atencao"
      : "Carteira de orcamentos sob controle";
  const detail = filteredCount
    ? `${metrics.delayed} atrasado(s), ${metrics.warning} em atencao e ${metrics.open} em aberto no filtro atual.`
    : "Sem solicitacoes no filtro atual.";

  return (
    <section className="orcamento-critical-panel">
      <div className="orcamento-critical-title">
        <span>
          <AlertTriangle size={18} />
        </span>
        <div>
          <h3>Alertas de orcamentos</h3>
          <p>Analises criticas recalculadas automaticamente conforme o Kanban e os filtros mudam.</p>
        </div>
      </div>

      <div className="orcamento-critical-summary">
        <article className={`orcamento-critical-summary-card orcamento-critical-summary-card--wide orcamento-critical-summary-card--${mainTone}`}>
          <span className="orcamento-critical-icon">
            <AlertTriangle size={20} />
          </span>
          <div>
            <h4>{headline}</h4>
            <p>{detail}</p>
            <small>Recalculado automaticamente em {formatDateTimeBr(new Date(now).toISOString())}</small>
          </div>
        </article>
        <article className="orcamento-critical-summary-card orcamento-critical-summary-card--warning">
          <span>Indice de controle</span>
          <strong>{metrics.controlIndex}/100</strong>
          <p>Composto por prazo, resultado, atribuicao e qualidade cadastral.</p>
        </article>
        <article className="orcamento-critical-summary-card orcamento-critical-summary-card--danger">
          <span>Analises criticas</span>
          <strong>{criticalCount}</strong>
          <p>{attentionCount} analise(s) adicional(is) em atencao.</p>
        </article>
        <article className="orcamento-critical-summary-card orcamento-critical-summary-card--success">
          <span>Saving mapeado</span>
          <strong>{formatCurrency(metrics.saving)}</strong>
          <p>Resultado financeiro registrado nas solicitacoes filtradas.</p>
        </article>
      </div>

      <div className="orcamento-analysis-head">
        <strong>Analises automaticas priorizadas</strong>
        <span>{filteredCount} solicitacao(oes) consideradas no filtro atual</span>
      </div>

      <div className="orcamento-analysis-grid">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <article key={`${row.category}-${row.title}`} className={`orcamento-analysis-card orcamento-analysis-card--${row.tone}`}>
              <div className="orcamento-analysis-card__head">
                <span>
                  <Icon size={18} />
                </span>
                <div>
                  <small>{row.category}</small>
                  <strong>{row.title}</strong>
                </div>
                <b>{row.status}</b>
              </div>
              <div className="orcamento-analysis-card__metric">
                <strong>{row.value}</strong>
                <span>{row.meta}</span>
              </div>
              <p>{row.detail}</p>
              <div className="orcamento-analysis-card__action">
                <strong>Acao:</strong> {row.action}
              </div>
            </article>
          );
        })}
      </div>
    </section>
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
  const noDeadline = open.filter((item) => !item.data_entrega_cotacoes).length;
  const unassigned = open.filter((item) => !getAssignedToList(item).length).length;
  const busiestAssigneeCount = assigneeRows[0]?.value || 0;
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
    noDeadline,
    unassigned,
    busiestAssignee: assigneeRows[0]?.label || "",
    busiestAssigneeCount,
    controlIndex: calculateControlIndex({
      total: items.length,
      finished: finished.length,
      delayed: delayed.length,
      warning: warning.length,
      waitingOutcome,
      noDeadline,
      unassigned,
    }),
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

function buildCriticalAnalyses(items: Orcamento[], metrics: ReturnType<typeof buildDashboardMetrics>, now: number): CriticalAnalysis[] {
  if (!items.length) {
    return [
      {
        category: "SEM DADOS",
        title: "Filtro sem registros",
        value: "0",
        meta: "nenhuma solicitacao",
        detail: "Amplie o periodo ou remova filtros para visualizar a carteira de orcamentos.",
        action: "Revisar filtros antes da leitura executiva.",
        status: "Monitorar",
        tone: "blue",
        icon: ClipboardList,
      },
    ];
  }

  const oldestOpen = items
    .filter((item) => openStatuses.includes(item.status || "nao_iniciado"))
    .sort((a, b) => getOrcamentoSla(b, now).totalMs - getOrcamentoSla(a, now).totalMs)[0];
  const concentration = metrics.total ? metrics.busiestAssigneeCount / metrics.total : 0;
  const avgSlaHours = metrics.avgSla / 3_600_000;
  const finishedRate = formatPercent(metrics.finished, metrics.total);
  const oldestSla = oldestOpen ? getOrcamentoSla(oldestOpen, now).totalMs : 0;

  return [
    {
      category: "RISCO DE PRAZO",
      title: "Orcamentos atrasados",
      value: String(metrics.delayed),
      meta: `${formatPercent(metrics.delayed, metrics.open)} da carteira aberta`,
      detail: metrics.delayed ? "Ha solicitacoes abertas fora do prazo de entrega das cotacoes." : "Nao ha solicitacoes abertas vencidas no filtro atual.",
      action: metrics.delayed ? "Priorizar cobranca do responsavel e atualizar a fase no Kanban." : "Manter acompanhamento diario dos proximos vencimentos.",
      status: metrics.delayed ? "Critico" : "Controlado",
      tone: metrics.delayed ? "danger" : "success",
      icon: AlertTriangle,
    },
    {
      category: "PROXIMAS ENTREGAS",
      title: "Entregas em atencao",
      value: String(metrics.warning),
      meta: `${formatPercent(metrics.warning, metrics.open)} em janela critica`,
      detail: metrics.warning ? "Existem cotacoes proximas do vencimento e com risco de estourar SLA." : "A janela de prazo esta saudavel no recorte atual.",
      action: metrics.warning ? "Antecipar equalizacao e confirmar retorno dos fornecedores." : "Preservar rotina de follow-up com os orcamentistas.",
      status: metrics.warning ? "Atencao" : "Controlado",
      tone: metrics.warning ? "warning" : "success",
      icon: Clock3,
    },
    {
      category: "GOVERNANCA",
      title: "Sem atribuicao definida",
      value: String(metrics.unassigned),
      meta: `${formatPercent(metrics.unassigned, metrics.open)} da carteira aberta`,
      detail: metrics.unassigned ? "Solicitacoes sem responsavel reduzem previsibilidade de prazo e retorno ao solicitante." : "Todas as solicitacoes abertas possuem atribuicao registrada.",
      action: metrics.unassigned ? "Definir orcamentista responsavel nos cards sem atribuicao." : "Manter a obrigatoriedade de atribuicao no formulario.",
      status: metrics.unassigned ? "Atencao" : "Controlado",
      tone: metrics.unassigned ? "warning" : "success",
      icon: Users,
    },
    {
      category: "RESULTADO COMERCIAL",
      title: "Aguardando resultado",
      value: String(metrics.waitingOutcome),
      meta: `${formatPercent(metrics.waitingOutcome, metrics.finished)} dos finalizados`,
      detail: metrics.waitingOutcome ? "Ha orcamentos finalizados sem classificacao de ganho, perda ou aguardando retorno." : "Os resultados comerciais dos finalizados estao atualizados.",
      action: metrics.waitingOutcome ? "Atualizar o resultado da obra nos cards finalizados." : "Continuar fechando o resultado ao finalizar o processo.",
      status: metrics.waitingOutcome ? "Atencao" : "Controlado",
      tone: metrics.waitingOutcome ? "warning" : "success",
      icon: Target,
    },
    {
      category: "PERFORMANCE",
      title: "SLA medio do processo",
      value: formatBusinessDuration(metrics.avgSla),
      meta: `Finalizados: ${formatBusinessDuration(metrics.avgFinishedSla)}`,
      detail: "Media calculada pelo tempo em horario comercial registrado no ciclo de orcamentos.",
      action: avgSlaHours > 50 ? "Quebrar gargalos por fase e redistribuir demandas criticas." : "Acompanhar os desvios por fase e preservar o ritmo atual.",
      status: avgSlaHours > 50 ? "Critico" : avgSlaHours > 30 ? "Monitorar" : "Controlado",
      tone: avgSlaHours > 50 ? "danger" : avgSlaHours > 30 ? "neutral" : "success",
      icon: TimerReset,
    },
    {
      category: "CAPACIDADE",
      title: "Concentracao por atribuido",
      value: metrics.total ? formatPercent(metrics.busiestAssigneeCount, metrics.total) : "0%",
      meta: metrics.busiestAssignee || "Sem atribuicao",
      detail: concentration > 0.45 ? "A carteira esta concentrada em poucos responsaveis, aumentando risco de fila." : "A distribuicao de demandas esta em nivel aceitavel.",
      action: concentration > 0.45 ? "Balancear carteira entre os orcamentistas disponiveis." : "Monitorar mudancas de volume por responsavel.",
      status: concentration > 0.45 ? "Atencao" : "Controlado",
      tone: concentration > 0.45 ? "warning" : "success",
      icon: Users,
    },
    {
      category: "QUALIDADE CADASTRAL",
      title: "Sem prazo informado",
      value: String(metrics.noDeadline),
      meta: `${formatPercent(metrics.noDeadline, metrics.open)} da carteira aberta`,
      detail: metrics.noDeadline ? "Solicitacoes sem data de entrega prejudicam alertas e previsao de SLA." : "Os processos abertos possuem prazo de entrega preenchido.",
      action: metrics.noDeadline ? "Completar a data de entrega das cotacoes nos cards pendentes." : "Manter validacao de prazo no formulario.",
      status: metrics.noDeadline ? "Atencao" : "Controlado",
      tone: metrics.noDeadline ? "warning" : "success",
      icon: ClipboardList,
    },
    {
      category: "VOLUME E COMPLEXIDADE",
      title: "Quantidade de linhas",
      value: metrics.lines.toLocaleString("pt-BR"),
      meta: `${metrics.avgLines.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} linhas por solicitacao`,
      detail: "Demandas com mais linhas tendem a exigir mais equalizacao e tempo de cotacao.",
      action: metrics.avgLines > 15 ? "Priorizar demandas de alta complexidade e revisar anexos." : "Usar o volume como sinal de carga operacional.",
      status: metrics.avgLines > 15 ? "Monitorar" : "Controlado",
      tone: metrics.avgLines > 15 ? "neutral" : "success",
      icon: ClipboardList,
    },
    {
      category: "EFICIENCIA FINANCEIRA",
      title: "Saving registrado",
      value: formatCurrency(metrics.saving),
      meta: `${metrics.won} ganha(s) / ${metrics.lost} perdida(s)`,
      detail: "Valor consolidado de saving informado nas solicitacoes dentro do filtro atual.",
      action: "Validar registros de saving nos finalizados antes de exportar relatorio.",
      status: metrics.saving > 0 ? "Controlado" : "Monitorar",
      tone: metrics.saving > 0 ? "success" : "neutral",
      icon: TrendingUp,
    },
    {
      category: "CICLO DE VIDA",
      title: "Finalizacao da carteira",
      value: finishedRate,
      meta: `${metrics.finished} de ${metrics.total} solicitacao(oes)`,
      detail: oldestOpen
        ? `${oldestOpen.numero_proposta || "Solicitacao"} e o processo aberto com maior tempo: ${formatBusinessDuration(oldestSla)}.`
        : "Nao ha solicitacoes abertas no filtro atual.",
      action: oldestOpen ? "Revisar a tratativa mais antiga e registrar proximo passo." : "Manter rotina de fechamento e resultado comercial.",
      status: metrics.open ? "Monitorar" : "Controlado",
      tone: metrics.open ? "neutral" : "success",
      icon: CheckCircle2,
    },
  ];
}

function calculateControlIndex(input: {
  total: number;
  finished: number;
  delayed: number;
  warning: number;
  waitingOutcome: number;
  noDeadline: number;
  unassigned: number;
}) {
  if (!input.total) return 100;
  const completionBonus = (input.finished / input.total) * 8;
  const penalty =
    ((input.delayed * 14 + input.warning * 7 + input.waitingOutcome * 5 + input.noDeadline * 4 + input.unassigned * 4) / input.total) * 3;
  return clamp(Math.round(86 + completionBonus - penalty), 0, 100);
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
