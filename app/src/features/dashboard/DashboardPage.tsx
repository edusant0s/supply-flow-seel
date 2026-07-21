import { useMemo } from "react";
import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BarChart3,
  Car,
  CheckCircle2,
  ClipboardList,
  Clock3,
  DollarSign,
  FileSpreadsheet,
  FileText,
  Gauge,
  MapPinned,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState, LoadingState } from "../../components/States";
import { formatCurrency, normalizeText, parseMoney } from "../../lib/format";
import { useAsyncData, useSessionState } from "../../hooks";
import {
  AVALIACAO_DB_STORAGE_KEY,
  ESTOQUE_STATE_STORAGE_KEY,
  FRETES_STORAGE_KEY,
  FROTA_FINES_STORAGE_KEY,
  FROTA_VEHICLES_STORAGE_KEY,
  loadEmbeddedStorageSnapshot,
  type EmbeddedStorageSnapshot,
} from "../../services/embeddedSync";
import { listEntities } from "../../services/entities";
import type { Contrato, Fornecedor, Orcamento, Requisicao } from "../../types";

type ProcessKey =
  | "todos"
  | "requisicoes"
  | "orcamentos"
  | "contratos"
  | "fornecedores"
  | "fretes"
  | "frota"
  | "estoque"
  | "avaliacao";

type DashboardFamily = "operacao" | "ativo" | "base";
type KpiTone = "neutral" | "success" | "warning" | "danger" | "blue";

type DashboardMetric = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  tone?: KpiTone;
  chartValue?: number;
};

type DashboardRow = {
  key: Exclude<ProcessKey, "todos">;
  processo: string;
  family: DashboardFamily;
  familyLabel: string;
  demanda: number;
  emAberto: number;
  finalizados: number;
  riscoSla: number;
  primaryLabel: string;
  openLabel: string;
  doneLabel: string;
  riskLabel: string;
  indicador: string;
  metrics: DashboardMetric[];
};

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

const familyLabels: Record<DashboardFamily, string> = {
  operacao: "Processo de atendimento",
  ativo: "Ativos e contratos",
  base: "Base cadastral",
};

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

  if (loading) return <LoadingState label="Carregando indicadores" />;
  if (error) return <EmptyState title="Falha ao carregar dashboard" description={error} />;
  if (!data) return null;

  const selectedRow = processFilter === "todos" ? null : rows.find((row) => row.key === processFilter) ?? null;
  const filteredRows = selectedRow ? [selectedRow] : rows;
  const topMetrics = selectedRow ? selectedRow.metrics : buildSupplyMetrics(rows);
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
        <button className="secondary-button" type="button" onClick={refresh}>
          <RefreshCw size={18} />
          Atualizar dados
        </button>
      </section>

      <section className="kpi-grid">
        {topMetrics.map((metric) => (
          <KpiCard key={metric.title} title={metric.title} value={metric.value} icon={metric.icon} tone={metric.tone} />
        ))}
      </section>

      {selectedRow ? <AreaDashboardPanel row={selectedRow} /> : <SupplyPortfolioOverview rows={rows} />}

      {selectedRow ? <AreaBreakdownCharts row={selectedRow} /> : <DashboardCharts rows={chartRows} />}

      {!selectedRow ? <StrategicInsights rows={rows} fornecedores={data.fornecedores} /> : null}

      <section className="dashboard-process-grid">
        {filteredRows.map((row) => (
          <article key={row.key}>
            <div className="dashboard-process-grid__top">
              {processIcon(row.key)}
              <strong>{row.processo}</strong>
            </div>
            <span className={`dashboard-family-badge dashboard-family-badge--${row.family}`}>{row.familyLabel}</span>
            <div className="dashboard-process-grid__numbers">
              <span>{formatCount(row.demanda)} {row.primaryLabel}</span>
              <span>{formatCount(row.emAberto)} {row.openLabel}</span>
              <span>{formatCount(row.riscoSla)} {row.riskLabel}</span>
            </div>
            <p>{row.indicador}</p>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Indicadores</span>
            <h2>Gestao por area de Supply</h2>
          </div>
        </div>
        <DataTable
          data={filteredRows}
          columns={[
            { key: "processo", label: "Area", render: (item) => item.processo },
            { key: "tipo", label: "Tipo", render: (item) => item.familyLabel },
            { key: "principal", label: "Indicador principal", render: (item) => `${formatCount(item.demanda)} ${item.primaryLabel}` },
            { key: "acompanhamento", label: "Acompanhamento", render: (item) => `${formatCount(item.emAberto)} ${item.openLabel}` },
            { key: "concluidos", label: "Concluidos / disponiveis", render: (item) => `${formatCount(item.finalizados)} ${item.doneLabel}` },
            { key: "alertas", label: "Alertas", render: (item) => `${formatCount(item.riscoSla)} ${item.riskLabel}` },
            { key: "indicador", label: "Leitura executiva", render: (item) => item.indicador },
          ]}
        />
      </section>
    </div>
  );
}

function buildDashboardRows(data: {
  requisicoes: Requisicao[];
  orcamentos: Orcamento[];
  contratos: Contrato[];
  fornecedores: Fornecedor[];
  fretesState: EmbeddedStorageSnapshot;
  frotaState: EmbeddedStorageSnapshot;
  estoqueState: EmbeddedStorageSnapshot;
  avaliacaoState: EmbeddedStorageSnapshot;
}): DashboardRow[] {
  const fretes = arrayFromSnapshot(data.fretesState, FRETES_STORAGE_KEY, "gestao_fretes_solicitacoes_v1");
  const frota = arrayFromSnapshot(data.frotaState, FROTA_VEHICLES_STORAGE_KEY, "frota_veiculos_v4_importacao_inicial");
  const multasFrota = arrayFromSnapshot(data.frotaState, FROTA_FINES_STORAGE_KEY, "frota_multas_v4_importacao_inicial");
  const estoque = objectFromSnapshot(data.estoqueState, ESTOQUE_STATE_STORAGE_KEY, "obrastock_clean_state_v1");
  const avaliacao = objectFromSnapshot(data.avaliacaoState, AVALIACAO_DB_STORAGE_KEY, "seel_supplier_evaluation_db_v10");

  const estoquePedidos = Array.isArray(estoque.orders) ? estoque.orders : [];
  const estoqueItens = Array.isArray(estoque.items) ? estoque.items : [];
  const fornecedoresAvaliacao = Array.isArray(avaliacao.suppliers) ? avaliacao.suppliers : [];
  const avaliacoes = Array.isArray(avaliacao.evaluations) ? avaliacao.evaluations : [];

  return [
    summarizeRequisicoes(data.requisicoes),
    summarizeOrcamentos(data.orcamentos),
    summarizeContratos(data.contratos),
    summarizeFornecedores(data.fornecedores),
    summarizeFretes(fretes),
    summarizeFrota(frota, multasFrota),
    summarizeEstoque(estoquePedidos, estoqueItens),
    summarizeAvaliacao(fornecedoresAvaliacao, avaliacoes),
  ];
}

function buildSupplyMetrics(rows: DashboardRow[]): DashboardMetric[] {
  const operacao = rows.filter((row) => row.family === "operacao");
  const frota = rows.find((row) => row.key === "frota");
  const fornecedores = rows.find((row) => row.key === "fornecedores");

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
    { title: "Veiculos da frota", value: frota?.demanda ?? 0, icon: Car, tone: "neutral" },
    { title: "Fornecedores ativos", value: fornecedores?.finalizados ?? 0, icon: Users, tone: "blue" },
  ];
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

function SupplyPortfolioOverview({ rows }: { rows: DashboardRow[] }) {
  const groups: Array<{ family: DashboardFamily; title: string; rows: DashboardRow[]; icon: LucideIcon }> = [
    { family: "operacao", title: "Processos de atendimento", rows: rows.filter((row) => row.family === "operacao"), icon: ClipboardList },
    { family: "ativo", title: "Ativos e contratos", rows: rows.filter((row) => row.family === "ativo"), icon: Car },
    { family: "base", title: "Bases cadastrais", rows: rows.filter((row) => row.family === "base"), icon: Users },
  ];

  return (
    <section className="dashboard-segment-grid">
      {groups.map((group) => {
        const Icon = group.icon;
        return (
          <article key={group.family} className={`dashboard-segment-card dashboard-segment-card--${group.family}`}>
            <div>
              <Icon size={22} />
              <strong>{group.title}</strong>
            </div>
            <span>{group.rows.map((row) => row.processo).join(", ") || "Sem fonte ativa"}</span>
            <p>
              {formatCount(sumRows(group.rows, "demanda"))} registros principais, {formatCount(sumRows(group.rows, "riscoSla"))} alertas para acompanhamento.
            </p>
          </article>
        );
      })}
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

function StrategicInsights({ rows, fornecedores }: { rows: DashboardRow[]; fornecedores: Fornecedor[] }) {
  const operacao = rows.filter((row) => row.family === "operacao");
  const totalDemandas = sumRows(operacao, "demanda");
  const finalizados = sumRows(operacao, "finalizados");
  const risco = totalDemandas ? Math.round((sumRows(operacao, "riscoSla") / totalDemandas) * 100) : 0;
  const completion = totalDemandas ? Math.round((finalizados / totalDemandas) * 100) : 0;
  const contactCoverage = fornecedores.length
    ? Math.round((fornecedores.filter((item) => item.email || item.telefone).length / fornecedores.length) * 100)
    : 0;
  const topBacklog = operacao.slice().sort((a, b) => b.emAberto - a.emAberto)[0];
  const frota = rows.find((row) => row.key === "frota");

  return (
    <section className="strategic-grid">
      <article>
        <span>Conversao operacional</span>
        <strong>{completion}%</strong>
        <p>Demandas finalizadas apenas sobre os processos de atendimento.</p>
      </article>
      <article>
        <span>Risco operacional</span>
        <strong>{risco}%</strong>
        <p>Percentual de processos em risco de SLA para priorizacao diaria.</p>
      </article>
      <article>
        <span>Maior backlog</span>
        <strong>{topBacklog?.processo || "-"}</strong>
        <p>{topBacklog ? `${formatCount(topBacklog.emAberto)} ${topBacklog.openLabel}.` : "Sem processos em aberto."}</p>
      </article>
      <article>
        <span>Disponibilidade da frota</span>
        <strong>{frota ? formatPercent(frota.finalizados, frota.demanda) : "0%"}</strong>
        <p>Veiculos disponiveis sobre o total cadastrado, fora do calculo de demandas.</p>
      </article>
      <article>
        <span>Base de fornecedores</span>
        <strong>{contactCoverage}%</strong>
        <p>Cadastros com telefone ou e-mail para acionar fornecedores rapidamente.</p>
      </article>
    </section>
  );
}

function summarizeRequisicoes(rows: Requisicao[]): DashboardRow {
  const finalizados = rows.filter((item) => isFinalStatus(item.status)).length;
  const emAberto = rows.length - finalizados;
  const atrasadas = rows.filter((item) => !isFinalStatus(item.status) && isPastDate(item.data_necessidade)).length;
  const urgentes = rows.filter((item) => normalizeText(item.prioridade).includes("urgent")).length;

  return {
    key: "requisicoes",
    processo: "Requisicoes",
    family: "operacao",
    familyLabel: familyLabels.operacao,
    demanda: rows.length,
    emAberto,
    finalizados,
    riscoSla: atrasadas,
    primaryLabel: "RMs",
    openLabel: "RMs abertas",
    doneLabel: "RMs em OC/finalizadas",
    riskLabel: "RMs atrasadas",
    indicador: "RMs abertas, compras em andamento, OCs e prazos vencidos.",
    metrics: [
      { title: "RMs importadas", value: rows.length, icon: ClipboardList, tone: "blue" },
      { title: "Em aberto", value: emAberto, icon: Clock3, tone: emAberto ? "warning" : "success" },
      { title: "OCs/finalizadas", value: finalizados, icon: PackageCheck, tone: "success" },
      { title: "Atrasadas", value: atrasadas, icon: AlertTriangle, tone: atrasadas ? "danger" : "success" },
      { title: "Urgentes", value: urgentes, icon: Gauge, tone: urgentes ? "warning" : "neutral" },
    ],
  };
}

function summarizeOrcamentos(rows: Orcamento[]): DashboardRow {
  const finalizados = rows.filter((item) => isFinalStatus(item.status)).length;
  const emAberto = rows.length - finalizados;
  const atrasados = rows.filter((item) => !isFinalStatus(item.status) && isPastDate(item.data_entrega_cotacoes)).length;
  const saving = rows.reduce((acc, item) => acc + Number(item.saving || 0), 0);

  return {
    key: "orcamentos",
    processo: "Orcamentos",
    family: "operacao",
    familyLabel: familyLabels.operacao,
    demanda: rows.length,
    emAberto,
    finalizados,
    riscoSla: atrasados,
    primaryLabel: "solicitacoes",
    openLabel: "em aberto",
    doneLabel: "finalizadas",
    riskLabel: "com prazo vencido",
    indicador: "Solicitacoes, cotacoes, saving e tempo ate finalizacao.",
    metrics: [
      { title: "Solicitacoes", value: rows.length, icon: FileSpreadsheet, tone: "blue" },
      { title: "Em aberto", value: emAberto, icon: Clock3, tone: emAberto ? "warning" : "success" },
      { title: "Finalizadas", value: finalizados, icon: CheckCircle2, tone: "success" },
      { title: "Prazo vencido", value: atrasados, icon: AlertTriangle, tone: atrasados ? "danger" : "success" },
      { title: "Saving", value: formatCurrency(saving), icon: DollarSign, tone: "success", chartValue: saving },
    ],
  };
}

function summarizeContratos(rows: Contrato[]): DashboardRow {
  const finalizados = rows.filter((item) => isFinalStatus(item.status)).length;
  const emAberto = rows.length - finalizados;
  const urgentesVencidos = rows.filter((item) => !isFinalStatus(item.status) && isPastDate(item.prazo_urgencia)).length;

  return {
    key: "contratos",
    processo: "Contratos",
    family: "operacao",
    familyLabel: familyLabels.operacao,
    demanda: rows.length,
    emAberto,
    finalizados,
    riscoSla: urgentesVencidos,
    primaryLabel: "solicitacoes",
    openLabel: "em andamento",
    doneLabel: "finalizadas",
    riskLabel: "urgencias vencidas",
    indicador: "Solicitacoes contratuais, fase Compor, urgencia e prazo.",
    metrics: [
      { title: "Solicitacoes", value: rows.length, icon: FileText, tone: "blue" },
      { title: "Em andamento", value: emAberto, icon: Clock3, tone: emAberto ? "warning" : "success" },
      { title: "Finalizadas", value: finalizados, icon: CheckCircle2, tone: "success" },
      { title: "Urgencias vencidas", value: urgentesVencidos, icon: AlertTriangle, tone: urgentesVencidos ? "danger" : "success" },
    ],
  };
}

function summarizeFornecedores(rows: Fornecedor[]): DashboardRow {
  const ativos = rows.filter((item) => item.cadastro_ativo).length;
  const inativos = rows.length - ativos;
  const semContato = rows.filter((item) => !item.email && !item.telefone).length;
  const ufs = new Set(rows.map((item) => item.uf).filter(Boolean)).size;

  return {
    key: "fornecedores",
    processo: "Mapa de fornecedores",
    family: "base",
    familyLabel: familyLabels.base,
    demanda: rows.length,
    emAberto: inativos,
    finalizados: ativos,
    riscoSla: semContato,
    primaryLabel: "fornecedores",
    openLabel: "inativos",
    doneLabel: "ativos",
    riskLabel: "sem contato",
    indicador: "Base de consulta e cadastro, sem contabilizar como demanda operacional.",
    metrics: [
      { title: "Fornecedores", value: rows.length, icon: Users, tone: "blue" },
      { title: "Ativos", value: ativos, icon: CheckCircle2, tone: "success" },
      { title: "Inativos", value: inativos, icon: Clock3, tone: inativos ? "warning" : "success" },
      { title: "Sem contato", value: semContato, icon: AlertTriangle, tone: semContato ? "danger" : "success" },
      { title: "UFs cobertas", value: ufs, icon: MapPinned, tone: "neutral" },
    ],
  };
}

function summarizeFretes(rows: Array<Record<string, unknown>>): DashboardRow {
  const finalizados = rows.filter((item) => isFinalStatus(getText(item, ["status", "situacao", "fase"]))).length;
  const emAberto = rows.length - finalizados;
  const vencidos = rows.filter((item) => !isFinalStatus(getText(item, ["status", "situacao", "fase"])) && isPastDate(firstDefined(item, ["dataLimiteEntrega", "prazoEntrega", "dataEntrega", "dataColetaMaterial"]))).length;
  const emTransporte = rows.filter((item) => normalizeText(getText(item, ["status", "situacao", "fase"])).includes("transporte")).length;

  return {
    key: "fretes",
    processo: "Fretes",
    family: "operacao",
    familyLabel: familyLabels.operacao,
    demanda: rows.length,
    emAberto,
    finalizados,
    riscoSla: vencidos,
    primaryLabel: "fretes",
    openLabel: "em andamento",
    doneLabel: "entregues/finalizados",
    riskLabel: "vencidos",
    indicador: "Solicitacoes logisticas, cotacoes, rotas e prazos de entrega.",
    metrics: [
      { title: "Fretes cadastrados", value: rows.length, icon: Truck, tone: "blue" },
      { title: "Em andamento", value: emAberto, icon: Clock3, tone: emAberto ? "warning" : "success" },
      { title: "Entregues", value: finalizados, icon: CheckCircle2, tone: "success" },
      { title: "Vencidos", value: vencidos, icon: AlertTriangle, tone: vencidos ? "danger" : "success" },
      { title: "Em transporte", value: emTransporte, icon: Gauge, tone: "neutral" },
    ],
  };
}

function summarizeFrota(vehicles: Array<Record<string, unknown>>, fines: Array<Record<string, unknown>>): DashboardRow {
  const disponiveis = vehicles.filter((item) => isVehicleAvailable(item)).length;
  const emUso = vehicles.filter((item) => isVehicleInUse(item)).length;
  const manutencao = vehicles.filter((item) => normalizeText(getText(item, ["statusCarro", "status", "situacao"])).includes("manut")).length;
  const contratosVencendo = vehicles.filter((item) => isWithinDays(firstDefined(item, ["terminoContrato", "fimContrato", "dataFimContrato", "vencimentoContrato"]), 45)).length;
  const multasPendentes = fines.filter((item) => !isFinalStatus(getText(item, ["status", "situacao"]))).length;

  return {
    key: "frota",
    processo: "Frota",
    family: "ativo",
    familyLabel: familyLabels.ativo,
    demanda: vehicles.length,
    emAberto: emUso,
    finalizados: disponiveis,
    riscoSla: contratosVencendo + multasPendentes,
    primaryLabel: "veiculos",
    openLabel: "em uso",
    doneLabel: "disponiveis",
    riskLabel: "alertas de contrato/multa",
    indicador: "Veiculos, disponibilidade, contratos proximos do fim, manutencao e multas.",
    metrics: [
      { title: "Veiculos cadastrados", value: vehicles.length, icon: Car, tone: "blue" },
      { title: "Em uso", value: emUso, icon: Gauge, tone: "neutral" },
      { title: "Disponiveis", value: disponiveis, icon: CheckCircle2, tone: "success" },
      { title: "Contratos <=45 dias", value: contratosVencendo, icon: Clock3, tone: contratosVencendo ? "warning" : "success" },
      { title: "Manutencao", value: manutencao, icon: ShieldCheck, tone: manutencao ? "warning" : "success" },
      { title: "Multas pendentes", value: multasPendentes, icon: AlertTriangle, tone: multasPendentes ? "danger" : "success" },
    ],
  };
}

function summarizeEstoque(pedidos: Array<Record<string, unknown>>, itens: Array<Record<string, unknown>>): DashboardRow {
  const pedidosFinalizados = pedidos.filter((item) => isFinalStatus(getText(item, ["status", "situacao"]))).length;
  const pedidosAbertos = pedidos.length - pedidosFinalizados;
  const abaixoMinimo = itens.filter((item) => getNumber(item, ["qty", "quantidade", "saldo", "estoque"]) <= getNumber(item, ["min", "minimo", "estoqueMinimo"])).length;

  return {
    key: "estoque",
    processo: "Estoque de obras",
    family: "operacao",
    familyLabel: familyLabels.operacao,
    demanda: pedidos.length,
    emAberto: pedidosAbertos,
    finalizados: pedidosFinalizados,
    riscoSla: abaixoMinimo,
    primaryLabel: "pedidos",
    openLabel: "pedidos abertos",
    doneLabel: "pedidos concluidos",
    riskLabel: "itens abaixo do minimo",
    indicador: "Pedidos, itens em estoque, saldo minimo e reposicao por obra.",
    metrics: [
      { title: "Pedidos", value: pedidos.length, icon: Warehouse, tone: "blue" },
      { title: "Itens cadastrados", value: itens.length, icon: PackageCheck, tone: "neutral" },
      { title: "Pedidos abertos", value: pedidosAbertos, icon: Clock3, tone: pedidosAbertos ? "warning" : "success" },
      { title: "Pedidos concluidos", value: pedidosFinalizados, icon: CheckCircle2, tone: "success" },
      { title: "Abaixo do minimo", value: abaixoMinimo, icon: AlertTriangle, tone: abaixoMinimo ? "danger" : "success" },
    ],
  };
}

function summarizeAvaliacao(suppliers: Array<Record<string, unknown>>, evaluations: Array<Record<string, unknown>>): DashboardRow {
  const pendentes = Math.max(suppliers.length - evaluations.length, 0);
  const notasCriticas = evaluations.filter((item) => Number(item.average ?? item.media ?? 1) < 0.6).length;

  return {
    key: "avaliacao",
    processo: "Avaliacao de fornecedores",
    family: "operacao",
    familyLabel: familyLabels.operacao,
    demanda: suppliers.length,
    emAberto: pendentes,
    finalizados: evaluations.length,
    riscoSla: notasCriticas,
    primaryLabel: "fornecedores avaliaveis",
    openLabel: "pendentes",
    doneLabel: "avaliacoes realizadas",
    riskLabel: "notas criticas",
    indicador: "Acompanhamento de avaliacoes, pendencias por obra e fornecedores criticos.",
    metrics: [
      { title: "Fornecedores avaliaveis", value: suppliers.length, icon: Users, tone: "blue" },
      { title: "Avaliacoes feitas", value: evaluations.length, icon: Star, tone: "success" },
      { title: "Pendentes", value: pendentes, icon: Clock3, tone: pendentes ? "warning" : "success" },
      { title: "Notas criticas", value: notasCriticas, icon: AlertTriangle, tone: notasCriticas ? "danger" : "success" },
    ],
  };
}

function safeLocalValue(key: string): unknown {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function safeLocalArray(key: string): Array<Record<string, unknown>> {
  const value = safeLocalValue(key);
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item)) : [];
}

function safeLocalObject(key: string): Record<string, any> {
  const value = safeLocalValue(key);
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, any>) : {};
}

function arrayFromSnapshot(snapshot: EmbeddedStorageSnapshot, storageKey: string, fallbackLocalKey: string): Array<Record<string, unknown>> {
  const value = snapshot[storageKey];
  if (Array.isArray(value)) {
    return value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item));
  }
  return safeLocalArray(fallbackLocalKey);
}

function objectFromSnapshot(snapshot: EmbeddedStorageSnapshot, storageKey: string, fallbackLocalKey: string): Record<string, any> {
  const value = snapshot[storageKey];
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, any>;
  return safeLocalObject(fallbackLocalKey);
}

function sumRows(rows: DashboardRow[], key: "demanda" | "emAberto" | "finalizados" | "riscoSla") {
  return rows.reduce((acc, row) => acc + row[key], 0);
}

function getText(row: Record<string, unknown>, keys: string[]) {
  const value = firstDefined(row, keys);
  return String(value ?? "");
}

function getNumber(row: Record<string, unknown>, keys: string[]) {
  const value = firstDefined(row, keys);
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  return parseMoney(value);
}

function firstDefined(row: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") return row[key];
  }
  return null;
}

function isVehicleAvailable(item: Record<string, unknown>) {
  const status = normalizeText(getText(item, ["statusCarro", "status", "situacao"]));
  return status.includes("disponivel") || status.includes("livre");
}

function isVehicleInUse(item: Record<string, unknown>) {
  const status = normalizeText(getText(item, ["statusCarro", "status", "situacao"]));
  return status.includes("uso") || status.includes("locado") || status.includes("alocado") || status.includes("reservado");
}

function isPastDate(value: unknown) {
  const date = parseDate(value);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isWithinDays(value: unknown, days: number) {
  const date = parseDate(value);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limit = new Date(today);
  limit.setDate(limit.getDate() + days);
  return date >= today && date <= limit;
}

function parseDate(value: unknown) {
  if (!value) return null;
  const text = String(value).trim();
  const brDate = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/);
  if (brDate) {
    const year = brDate[3].length === 2 ? `20${brDate[3]}` : brDate[3];
    const date = new Date(`${year}-${brDate[2].padStart(2, "0")}-${brDate[1].padStart(2, "0")}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

function isFinalStatus(value: unknown) {
  const status = normalizeText(value);
  return ["final", "finalizado", "entregue", "oc", "cancel", "concluido", "aprovado", "disponivel", "pago", "baixado"].some((item) => status.includes(item));
}

function processIcon(key: DashboardRow["key"]) {
  const icons = {
    requisicoes: <ClipboardList size={22} />,
    orcamentos: <FileSpreadsheet size={22} />,
    contratos: <FileText size={22} />,
    fornecedores: <MapPinned size={22} />,
    fretes: <Truck size={22} />,
    frota: <Car size={22} />,
    estoque: <Warehouse size={22} />,
    avaliacao: <Star size={22} />,
  };
  return icons[key];
}

function formatCount(value: number) {
  return Number(value || 0).toLocaleString("pt-BR");
}

function formatPercent(part: number, total: number) {
  return total ? `${Math.round((part / total) * 100)}%` : "0%";
}

function chartColor(index: number) {
  const colors = ["#ffe61c", "#49a7d9", "#10b981", "#f97316", "#ef4444", "#14b8a6", "#94a3b8", "#8b5cf6"];
  return colors[index % colors.length];
}
