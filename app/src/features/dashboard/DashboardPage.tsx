import { useMemo, useState } from "react";
import type React from "react";
import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  MapPinned,
  PackageCheck,
  Star,
  Truck,
  Warehouse,
} from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState, LoadingState } from "../../components/States";
import { normalizeText } from "../../lib/format";
import { useAsyncData } from "../../hooks";
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

type DashboardRow = {
  key: Exclude<ProcessKey, "todos">;
  processo: string;
  demanda: number;
  emAberto: number;
  finalizados: number;
  riscoSla: number;
  indicador: string;
};

const processOptions: Array<{ key: ProcessKey; label: string }> = [
  { key: "todos", label: "Todos os processos" },
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
  const [processFilter, setProcessFilter] = useState<ProcessKey>("todos");
  const { data, loading, error } = useAsyncData(async () => {
    const [requisicoes, orcamentos, contratos, fornecedores] = await Promise.all([
      listEntities("requisicoes"),
      listEntities("orcamentos"),
      listEntities("contratos"),
      listEntities("fornecedores"),
    ]);
    return { requisicoes, orcamentos, contratos, fornecedores };
  }, []);

  const rows = useMemo(() => {
    if (!data) return [];
    return buildDashboardRows(data);
  }, [data]);

  if (loading) return <LoadingState label="Carregando indicadores" />;
  if (error) return <EmptyState title="Falha ao carregar dashboard" description={error} />;
  if (!data) return null;

  const filteredRows = processFilter === "todos" ? rows : rows.filter((row) => row.key === processFilter);
  const managedRows = filteredRows.filter((row) => row.key !== "fornecedores");
  const totals = managedRows.reduce(
    (acc, row) => ({
      demanda: acc.demanda + row.demanda,
      emAberto: acc.emAberto + row.emAberto,
      finalizados: acc.finalizados + row.finalizados,
      riscoSla: acc.riscoSla + row.riscoSla,
    }),
    { demanda: 0, emAberto: 0, finalizados: 0, riscoSla: 0 }
  );
  const completion = totals.demanda ? Math.round((totals.finalizados / totals.demanda) * 100) : 0;

  return (
    <div className="page-stack dashboard-home">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label>
          Processo
          <select value={processFilter} onChange={(event) => setProcessFilter(event.target.value as ProcessKey)}>
            {processOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="kpi-grid">
        <KpiCard title="Demandas" value={totals.demanda} icon={BarChart3} tone="blue" />
        <KpiCard title="Em aberto" value={totals.emAberto} icon={ClipboardList} tone={totals.emAberto ? "warning" : "success"} />
        <KpiCard title="Finalizados" value={totals.finalizados} icon={PackageCheck} tone="success" />
        <KpiCard title="Risco SLA" value={totals.riscoSla} icon={AlertTriangle} tone={totals.riscoSla ? "danger" : "success"} />
        <KpiCard title="Conclusao" value={`${completion}%`} icon={Star} />
      </section>

      <DashboardCharts rows={managedRows} />

      <section className="dashboard-process-grid">
        {filteredRows.map((row) => (
          <article key={row.key}>
            <div className="dashboard-process-grid__top">
              {processIcon(row.key)}
              <strong>{row.processo}</strong>
            </div>
            <div className="dashboard-process-grid__numbers">
              <span>{row.demanda.toLocaleString("pt-BR")} demandas</span>
              <span>{row.emAberto.toLocaleString("pt-BR")} abertas</span>
              <span>{row.riscoSla.toLocaleString("pt-BR")} em risco</span>
            </div>
            <p>{row.indicador}</p>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Indicadores</span>
            <h2>Gestao por processo</h2>
          </div>
        </div>
        <DataTable
          data={filteredRows}
          columns={[
            { key: "processo", label: "Processo", render: (item) => item.processo },
            { key: "demanda", label: "Demandas", render: (item) => item.demanda.toLocaleString("pt-BR") },
            { key: "aberto", label: "Em aberto", render: (item) => item.emAberto.toLocaleString("pt-BR") },
            { key: "finalizados", label: "Finalizados", render: (item) => item.finalizados.toLocaleString("pt-BR") },
            { key: "sla", label: "Risco SLA", render: (item) => item.riscoSla.toLocaleString("pt-BR") },
            { key: "indicador", label: "Indicador", render: (item) => item.indicador },
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
}): DashboardRow[] {
  const fretes = safeLocalArray("gestao_fretes_solicitacoes_v1");
  const frota = safeLocalArray("frota_veiculos_v4_importacao_inicial");
  const estoque = safeLocalObject("obrastock_clean_state_v1");
  const avaliacao = safeLocalObject("seel_supplier_evaluation_db_v10");

  const estoquePedidos = Array.isArray(estoque.orders) ? estoque.orders : [];
  const estoqueItens = Array.isArray(estoque.items) ? estoque.items : [];
  const fornecedoresAvaliacao = Array.isArray(avaliacao.suppliers) ? avaliacao.suppliers : [];
  const avaliacoes = Array.isArray(avaliacao.evaluations) ? avaliacao.evaluations : [];

  return [
    summarizeRequisicoes(data.requisicoes),
    summarizeOrcamentos(data.orcamentos),
    summarizeContratos(data.contratos),
    {
      key: "fornecedores",
      processo: "Mapa de fornecedores",
      demanda: 0,
      emAberto: data.fornecedores.filter((item) => !item.cadastro_ativo).length,
      finalizados: data.fornecedores.filter((item) => item.cadastro_ativo).length,
      riscoSla: data.fornecedores.filter((item) => !item.email && !item.telefone).length,
      indicador: `${data.fornecedores.length.toLocaleString("pt-BR")} cadastros. Consulta, base e contatos completos, sem contar como demanda.`,
    },
    {
      key: "fretes",
      processo: "Fretes",
      demanda: fretes.length,
      emAberto: fretes.filter((item) => !isFinalStatus(item.status)).length,
      finalizados: fretes.filter((item) => isFinalStatus(item.status)).length,
      riscoSla: fretes.filter((item) => !isFinalStatus(item.status) && isPastDate(item.dataLimiteEntrega || item.dataColetaMaterial)).length,
      indicador: "Solicitacoes logisticas e prazos de entrega.",
    },
    {
      key: "frota",
      processo: "Frota",
      demanda: frota.length,
      emAberto: frota.filter((item) => normalizeText(item.statusCarro).includes("uso")).length,
      finalizados: frota.filter((item) => normalizeText(item.statusCarro).includes("disponivel")).length,
      riscoSla: frota.filter((item) => isWithinDays(item.terminoContrato, 45)).length,
      indicador: "Veiculos, contratos proximos do fim e disponibilidade.",
    },
    {
      key: "estoque",
      processo: "Estoque de obras",
      demanda: estoquePedidos.length + estoqueItens.length,
      emAberto: estoquePedidos.filter((item) => !isFinalStatus(item.status)).length,
      finalizados: estoquePedidos.filter((item) => isFinalStatus(item.status)).length,
      riscoSla: estoqueItens.filter((item) => Number(item.qty ?? item.quantidade ?? 0) <= Number(item.min ?? item.minimo ?? 0)).length,
      indicador: "Pedidos, saldo minimo e itens em alerta.",
    },
    {
      key: "avaliacao",
      processo: "Avaliacao de fornecedores",
      demanda: fornecedoresAvaliacao.length,
      emAberto: Math.max(fornecedoresAvaliacao.length - avaliacoes.length, 0),
      finalizados: avaliacoes.length,
      riscoSla: avaliacoes.filter((item) => Number(item.average ?? 1) < 0.6).length,
      indicador: "Fornecedores pendentes e notas abaixo do esperado.",
    },
  ];
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
            <h2>Demandas por processo</h2>
          </div>
        </div>
        <div className="bar-chart" role="img" aria-label="Demandas por processo">
          {rows.map((row) => (
            <div className="bar-chart__row" key={row.key}>
              <span>{row.processo}</span>
              <div>
                <i style={{ width: `${Math.max(4, (row.demanda / maxDemand) * 100)}%` }} />
              </div>
              <strong>{row.demanda.toLocaleString("pt-BR")}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className="panel dashboard-chart-card dashboard-chart-card--compact">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Funil</span>
            <h2>Status geral</h2>
          </div>
        </div>
        <div className="donut-summary" style={{ "--done": `${donePercent * 3.6}deg`, "--open": `${openPercent * 3.6}deg` } as React.CSSProperties}>
          <div className="donut-summary__chart">
            <strong>{donePercent}%</strong>
            <span>conclusao</span>
          </div>
          <div className="donut-summary__legend">
            <span><b className="legend-dot legend-dot--done" />Finalizados {totals.finalizados.toLocaleString("pt-BR")}</span>
            <span><b className="legend-dot legend-dot--open" />Em aberto {totals.emAberto.toLocaleString("pt-BR")}</span>
            <span><b className="legend-dot legend-dot--risk" />Risco SLA {totals.riscoSla.toLocaleString("pt-BR")} ({riskPercent}%)</span>
          </div>
        </div>
      </article>
    </section>
  );
}

function summarizeRequisicoes(rows: Requisicao[]): DashboardRow {
  const finalizados = rows.filter((item) => isFinalStatus(item.status)).length;
  const emAberto = rows.length - finalizados;
  return {
    key: "requisicoes",
    processo: "Requisicoes",
    demanda: rows.length,
    emAberto,
    finalizados,
    riscoSla: rows.filter((item) => !isFinalStatus(item.status) && isPastDate(item.data_necessidade)).length,
    indicador: "RMs abertas, compras em andamento e prazos vencidos.",
  };
}

function summarizeOrcamentos(rows: Orcamento[]): DashboardRow {
  const finalizados = rows.filter((item) => isFinalStatus(item.status)).length;
  return {
    key: "orcamentos",
    processo: "Orcamentos",
    demanda: rows.length,
    emAberto: rows.length - finalizados,
    finalizados,
    riscoSla: rows.filter((item) => !isFinalStatus(item.status) && isPastDate(item.data_entrega_cotacoes)).length,
    indicador: "Solicitacoes, cotacoes e tempo ate finalizacao.",
  };
}

function summarizeContratos(rows: Contrato[]): DashboardRow {
  const finalizados = rows.filter((item) => isFinalStatus(item.status)).length;
  return {
    key: "contratos",
    processo: "Contratos",
    demanda: rows.length,
    emAberto: rows.length - finalizados,
    finalizados,
    riscoSla: rows.filter((item) => !isFinalStatus(item.status) && isPastDate(item.prazo_urgencia)).length,
    indicador: "Modulo travado para evolucao, mantendo leitura dos registros.",
  };
}

function safeLocalArray(key: string): Array<Record<string, unknown>> {
  const value = safeLocalObject(key);
  return Array.isArray(value) ? value : [];
}

function safeLocalObject(key: string): Record<string, any> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
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
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

function isFinalStatus(value: unknown) {
  const status = normalizeText(value);
  return ["final", "finalizado", "entregue", "oc", "cancel", "concluido", "aprovado", "disponivel"].some((item) => status.includes(item));
}

function processIcon(key: DashboardRow["key"]) {
  const icons = {
    requisicoes: <ClipboardList size={22} />,
    orcamentos: <FileSpreadsheet size={22} />,
    contratos: <FileText size={22} />,
    fornecedores: <MapPinned size={22} />,
    fretes: <Truck size={22} />,
    frota: <Truck size={22} />,
    estoque: <Warehouse size={22} />,
    avaliacao: <Star size={22} />,
  };
  return icons[key];
}
