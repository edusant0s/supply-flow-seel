import { useMemo, useState } from "react";
import { Printer, Search } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState } from "../../components/States";
import { formatCurrency, formatDateBr, normalizeText } from "../../lib/format";
import type { Orcamento } from "../../types";
import { formatBusinessDuration, getOrcamentoSla, getSlaState } from "./sla";
import { getAssignedTo, getFinalizationDate, getLineCount, getOrcamentoOutcome, outcomeLabel, printOrcamentosPdf } from "./model";

export function OrcamentosReportTab({ items, now }: { items: Orcamento[]; now: number }) {
  const [query, setQuery] = useState("");

  const finalizados = useMemo(() => items.filter((item) => item.status === "finalizado"), [items]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return finalizados;
    return finalizados.filter((item) =>
      normalizeText([item.numero_proposta, item.cliente, item.local_obra, item.nome_solicitante, outcomeLabel(getOrcamentoOutcome(item))].join(" ")).includes(q)
    );
  }, [finalizados, query]);

  const totalSaving = filtered.reduce((sum, item) => sum + Number(item.saving || 0), 0);
  const totalLinhas = filtered.reduce((sum, item) => sum + getLineCount(item), 0);
  const mediaSlaMs = filtered.length ? filtered.reduce((sum, item) => sum + getOrcamentoSla(item, now).totalMs, 0) / filtered.length : 0;

  if (!finalizados.length) {
    return <EmptyState title="Nenhum orcamento finalizado" description="Assim que uma solicitacao for movida para Finalizado no Kanban, ela aparece neste relatorio." />;
  }

  return (
    <div className="page-stack">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar proposta, cliente ou obra" />
        </label>
        <button className="secondary-button" type="button" onClick={() => printOrcamentosPdf(filtered, now)}>
          <Printer size={18} />
          Exportar PDF
        </button>
      </section>

      <section className="kpi-grid">
        <KpiCard title="Orcamentos finalizados" value={filtered.length} tone="blue" />
        <KpiCard title="Saving acumulado" value={formatCurrency(totalSaving)} tone={totalSaving > 0 ? "success" : "blue"} />
        <KpiCard title="Quantidade de linhas" value={totalLinhas} tone="blue" />
        <KpiCard title="SLA medio ate finalizar" value={formatBusinessDuration(mediaSlaMs)} tone="blue" />
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Relatorio</span>
            <h2>Orcamentos finalizados</h2>
          </div>
        </div>
        <DataTable
          data={filtered}
          className="orcamento-table-scroll"
          columns={[
            { key: "proposta", label: "Proposta", render: (item) => item.numero_proposta || "-" },
            { key: "cliente", label: "Cliente", render: (item) => item.cliente || "-" },
            { key: "obra", label: "Obra", render: (item) => item.local_obra || "-" },
            { key: "atribuido", label: "Atribuido a", render: (item) => getAssignedTo(item) || "-" },
            { key: "resultado", label: "Resultado", render: (item) => outcomeLabel(getOrcamentoOutcome(item)) },
            { key: "linhas", label: "Linhas", render: (item) => getLineCount(item) },
            { key: "solicitacao", label: "Solicitado em", render: (item) => formatDateBr(item.data_solicitacao) },
            { key: "finalizado", label: "Finalizado em", render: (item) => formatDateBr(getFinalizationDate(item) || getSlaState(item).finalizedAt) },
            { key: "sla", label: "SLA total", render: (item) => formatBusinessDuration(getOrcamentoSla(item, now).totalMs) },
            { key: "saving", label: "Saving", render: (item) => formatCurrency(item.saving || 0) },
          ]}
        />
      </section>
    </div>
  );
}
