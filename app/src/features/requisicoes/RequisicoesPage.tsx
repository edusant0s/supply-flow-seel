import { useMemo, useState } from "react";
import { Download, Mail, MessageCircle, Plus, Search, UploadCloud, X } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import { KanbanBoard } from "../../components/KanbanBoard";
import { KpiCard } from "../../components/KpiCard";
import { RoleGate } from "../../components/RoleGate";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { formatDateBr, headerKey, normalizeText } from "../../lib/format";
import { exportToXlsx, type RawRow } from "../../lib/spreadsheet";
import { canManage } from "../../lib/permissions";
import { useAsyncData, useSessionState } from "../../hooks";
import { listObras } from "../../services/admin";
import { listEntities, updateEntity } from "../../services/entities";
import type { Obra, Requisicao } from "../../types";

const statuses = [
  ["RM", "RM", "Requisicao criada"],
  ["RC", "RC", "Requisicao de compra"],
  ["MC", "MC", "Mapa comparativo"],
  ["OC", "OC", "Ordem de compra"],
  ["CANCELADA", "CANCELADAS", "Encerradas"],
  ["PENDENTE_ASSINATURA", "NAO ASSINADAS", "Sem assinatura da RM"],
] as const;

const customBuyersKey = "supply-flow:custom-buyers";
const assinaturaAliases = ["Data Assinatura RM", "Data Assinatura", "Dt Assinatura", "Assinatura RM", "Assinatura", "Data Aprovacao", "Data Aprovacao RM"];
const obraAliases = ["Obra", "Nome da Obra", "Centro de Custo", "Descricao Centro Custo", "Centro Custo", "Local Obra"];
const closedOrSeparatedStatuses = ["OC", "CANCELADA", "PENDENTE_ASSINATURA"];
const kanbanColumnLimit = 60;

type RequisicaoIndex = {
  item: Requisicao;
  status: string;
  obra: string;
  sla: ReturnType<typeof getSlaInfo>;
  rows: RawRow[];
  rowsText: string;
  ocNumber: string;
  firstItem: string;
  urgent: boolean;
  elapsedDays: number | null;
  itemCount: number;
};

export function RequisicoesPage() {
  const { profile } = useAuth();
  const [query, setQuery] = useSessionState("supply-flow:requisicoes:query", "");
  const [buyer, setBuyer] = useSessionState("supply-flow:requisicoes:buyer", "Todos");
  const [customBuyers, setCustomBuyers] = useState<string[]>(() => loadCustomBuyers());
  const [obraFilter, setObraFilter] = useSessionState("supply-flow:requisicoes:obra", "");
  const [slaFilter, setSlaFilter] = useSessionState("supply-flow:requisicoes:sla", "");
  const [selectedId, setSelectedId] = useSessionState<string | null>("supply-flow:requisicoes:selected", null);
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("requisicoes"), [], { cacheKey: "requisicoes" });
  const obras = useAsyncData(listObras, [], { cacheKey: "obras" });
  const canEdit = canManage(profile?.role, "requisicoes");

  const indexed = useMemo(() => {
    return (data || []).map((item): RequisicaoIndex => {
      const rows = getPayloadRows(item.payload);
      const status = getRequisicaoStatus(item);
      const obra = obraName(item, obras.data || []);
      const sla = getSlaInfo(item);
      const ocNumber = getOcNumber(item);
      const firstItem = getFirstItemDescription(item);
      const urgent = isUrgent(item);
      const elapsedDays = getSlaElapsedDays(item);
      const rowsText = normalizeText(rows.map((row) => Object.values(row).join(" ")).join(" "));
      const searchText = normalizeText([item.numero_rm, ocNumber, item.solicitante, item.comprador, item.categoria, item.centro_custo, obra, status, rowsText].join(" "));
      return { item, status, obra, sla, rows, rowsText: searchText, ocNumber, firstItem, urgent, elapsedDays, itemCount: rows.length };
    });
  }, [data, obras.data]);

  const buyers = useMemo(() => {
    const importedBuyers = indexed.map(({ item }) => item.comprador || "Sem comprador");
    return ["Todos", ...Array.from(new Set([...importedBuyers, ...customBuyers])).sort((a, b) => a.localeCompare(b, "pt-BR"))];
  }, [customBuyers, indexed]);

  const obraOptions = useMemo(() => {
    return Array.from(new Set(indexed.map((item) => item.obra).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
  }, [indexed]);

  const filteredIndex = useMemo(() => {
    const q = normalizeText(query);
    return indexed.filter(({ item, obra, rowsText, sla }) => {
      const matchesBuyer = buyer === "Todos" || (item.comprador || "Sem comprador") === buyer;
      const matchesObra = !obraFilter || obra === obraFilter;
      const matchesSla = !slaFilter || sla.tone === slaFilter;
      const matchesQuery = !q || rowsText.includes(q);
      return matchesBuyer && matchesObra && matchesSla && matchesQuery;
    });
  }, [buyer, indexed, obraFilter, query, slaFilter]);

  const filtered = useMemo(() => filteredIndex.map(({ item }) => item), [filteredIndex]);
  const indexById = useMemo(() => new Map(filteredIndex.map((item) => [item.item.id, item])), [filteredIndex]);

  const selected = useMemo(() => (data || []).find((item) => item.id === selectedId) || null, [data, selectedId]);

  function addBuyer() {
    const value = window.prompt("Nome do comprador")?.trim();
    if (!value) return;
    const next = Array.from(new Set([...customBuyers, value])).sort((a, b) => a.localeCompare(b, "pt-BR"));
    setCustomBuyers(next);
    saveCustomBuyers(next);
    setBuyer(value);
  }

  if (loading) return <LoadingState label="Carregando requisicoes" />;
  if (error) return <EmptyState title="Falha ao carregar RMs" description={error} />;

  const columns = statuses.map(([key, title, subtitle]) => {
    const items = filteredIndex.filter((item) => item.status === key).sort(compareIndexedSla);
    const hiddenCount = Math.max(items.length - kanbanColumnLimit, 0);
    return {
      key,
      title,
      subtitle,
      totalCount: items.length,
      items: items.slice(0, kanbanColumnLimit).map(({ item }) => item),
      overflowLabel: hiddenCount ? `Mais ${hiddenCount} RM(s). Use busca, obra, SLA ou comprador para refinar.` : undefined,
    };
  });
  const activeIndexes = filteredIndex.filter((item) => !closedOrSeparatedStatuses.includes(item.status));
  const activeItems = activeIndexes.map(({ item }) => item);
  const openItemCount = activeIndexes.reduce((sum, item) => sum + item.itemCount, 0);
  const prioritySummary = buildPrioritySummaryFromIndex(activeIndexes);
  const ocSummary = buildOcSummaryFromIndex(filteredIndex.filter((item) => item.status === "OC"));
  const buyerReport = buildBuyerReport(activeItems, buyer);

  return (
    <div className="page-stack">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar RM, comprador, obra, item ou categoria" />
        </label>
        <select value={obraFilter} onChange={(event) => setObraFilter(event.target.value)}>
          <option value="">Todas as obras</option>
          {obraOptions.map((obra) => (
            <option key={obra} value={obra}>
              {obra}
            </option>
          ))}
        </select>
        <select value={slaFilter} onChange={(event) => setSlaFilter(event.target.value)}>
          <option value="">Todos SLAs</option>
          <option value="danger">Atrasadas</option>
          <option value="warning">Alerta SLA</option>
          <option value="success">No prazo</option>
          <option value="neutral">Sem SLA</option>
        </select>
        <button
          className="secondary-button"
          type="button"
          onClick={() =>
            exportToXlsx(
              filtered.map((item) => ({
                RM: item.numero_rm,
                Status: statusLabel(getRequisicaoStatus(item)),
                OC: getOcNumber(item),
                Comprador: item.comprador,
                Categoria: item.categoria,
                Obra: obraName(item, obras.data || []),
                CentroCusto: item.centro_custo,
                Solicitante: item.solicitante,
                DataInclusao: formatDateBr(item.data_inclusao),
                DataNecessidade: formatDateBr(item.data_necessidade),
                ItensAgrupados: getPayloadRows(item.payload).length,
              })),
              `requisicoes-${new Date().toISOString().slice(0, 10)}.xlsx`
            )
          }
        >
          <Download size={18} />
          Exportar
        </button>
        <RoleGate module="requisicoes">
          <Link className="primary-button" to="/importacoes">
            <UploadCloud size={18} />
            Central de dados
          </Link>
        </RoleGate>
      </section>

      <section className="buyer-panel">
        <div className="buyer-tabs">
          {buyers.map((item) => (
            <button key={item} className={item === buyer ? "active" : ""} type="button" onClick={() => setBuyer(item)}>
              {item}
            </button>
          ))}
          {canEdit ? (
            <button className="buyer-add-button" type="button" onClick={addBuyer} aria-label="Adicionar comprador" title="Adicionar comprador">
              <Plus size={17} />
            </button>
          ) : null}
        </div>
        <div className="buyer-actions">
          <span>{openItemCount} item(ns) em aberto</span>
          {buyerReport.whatsapp ? (
            <a className="secondary-button" href={buyerReport.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              WhatsApp
            </a>
          ) : null}
          {buyerReport.email ? (
            <a className="secondary-button" href={buyerReport.email} target="_blank" rel="noreferrer">
              <Mail size={17} />
              Outlook
            </a>
          ) : null}
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard title="RMs visiveis" value={activeItems.length} />
        <KpiCard title="Itens em aberto" value={openItemCount} />
        <KpiCard title="Atrasadas" value={activeItems.filter((item) => getSlaInfo(item).tone === "danger").length} tone="danger" />
        <KpiCard title="Alerta SLA" value={activeItems.filter((item) => getSlaInfo(item).tone === "warning").length} tone="warning" />
        <KpiCard title="No prazo" value={activeItems.filter((item) => getSlaInfo(item).tone === "success").length} tone="success" />
      </section>

      <section className="priority-summary">
        <div>
          <span className="eyebrow">Perfil das RMs em aberto</span>
          <h2>Normais x urgentes</h2>
        </div>
        <div className="priority-summary__grid">
          <article>
            <span>Normais</span>
            <strong>{prioritySummary.normal.count}</strong>
            <b>{prioritySummary.normal.percent}</b>
          </article>
          <article className="priority-summary__urgent">
            <span>Urgentes</span>
            <strong>{prioritySummary.urgent.count}</strong>
            <b>{prioritySummary.urgent.percent}</b>
          </article>
        </div>
      </section>

      <section className="oc-summary">
        <div>
          <span className="eyebrow">Ordens de compra</span>
          <h2>Indicadores de OC</h2>
        </div>
        <div className="oc-summary__grid">
          <article>
            <span>Quantidade de OCs</span>
            <strong>{ocSummary.total}</strong>
            <b>{ocSummary.total ? "Itens em fase OC" : "Sem OC no filtro"}</b>
          </article>
          <article>
            <span>OCs normais</span>
            <strong>{ocSummary.normal.count}</strong>
            <b>{ocSummary.normal.percent} · SLA {ocSummary.normal.avgSla}</b>
          </article>
          <article className="oc-summary__urgent">
            <span>OCs urgentes</span>
            <strong>{ocSummary.urgent.count}</strong>
            <b>{ocSummary.urgent.percent} · SLA {ocSummary.urgent.avgSla}</b>
          </article>
          <article>
            <span>SLA medio</span>
            <strong>{ocSummary.avgSla}</strong>
            <b>Media das OCs filtradas</b>
          </article>
        </div>
      </section>

      <KanbanBoard
        columns={columns}
        canDrag={canEdit}
        onMove={(id, status) => updateEntity("requisicoes", id, { status }).then(refresh)}
        renderCard={(item: Requisicao) => {
          const indexedItem = indexById.get(item.id);
          const sla = indexedItem?.sla || getSlaInfo(item);
          const rows = indexedItem?.rows || getPayloadRows(item.payload);
          const ocNumber = indexedItem?.ocNumber || getOcNumber(item);
          const firstItem = indexedItem?.firstItem || getFirstItemDescription(item);
          return (
            <>
              <div className="card-topline">
                <strong>RM {item.numero_rm || "S/N"}</strong>
                <span className={`status-dot status-dot--${sla.tone}`} title={sla.label} />
              </div>
              {getRequisicaoStatus(item) === "OC" && ocNumber ? <p>OC {ocNumber}</p> : null}
              <div className="card-main-info">
                <span>{item.centro_custo || "Centro de custo nao informado"}</span>
                <span>{item.solicitante || "Solicitante nao informado"}</span>
                <strong>{firstItem || "Primeiro item nao informado"}</strong>
              </div>
              <div className="card-meta">
                <span>{item.comprador || "Sem comprador"}</span>
                <span>{rows.length} item(ns)</span>
              </div>
              <div className="card-meta">
                <span>{sla.label}</span>
                <span>{formatDateBr(item.data_necessidade)}</span>
              </div>
              <div className="card-actions-row">
                <button className="table-action" type="button" onClick={() => setSelectedId(item.id)}>
                  Detalhes
                </button>
                {buildItemWhatsapp(item) ? (
                  <a className="table-action" href={buildItemWhatsapp(item) || ""} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                ) : null}
              </div>
            </>
          );
        }}
      />

      <DataTable
        data={filtered.slice(0, 80)}
        columns={[
          { key: "rm", label: "RM", render: (item) => item.numero_rm || "-" },
          { key: "oc", label: "OC", render: (item) => getOcNumber(item) || "-" },
          { key: "status", label: "Status", render: (item) => statusLabel(getRequisicaoStatus(item)) },
          { key: "comprador", label: "Comprador", render: (item) => item.comprador || "-" },
          { key: "categoria", label: "Categoria", render: (item) => item.categoria || "-" },
          { key: "itens", label: "Itens", render: (item) => getPayloadRows(item.payload).length },
          { key: "sla", label: "SLA", render: (item) => getSlaInfo(item).label },
        ]}
      />

      {selected ? (
        <RequisicaoDrawer
          item={selected}
          buyers={buyers.filter((item) => item !== "Todos")}
          canEdit={canEdit}
          obras={obras.data || []}
          onClose={() => setSelectedId(null)}
          onSaved={refresh}
        />
      ) : null}
    </div>
  );
}

function RequisicaoDrawer({
  item,
  buyers,
  canEdit,
  obras,
  onClose,
  onSaved,
}: {
  item: Requisicao;
  buyers: string[];
  canEdit: boolean;
  obras: Obra[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const rows = getPayloadRows(item.payload);
  const sla = getSlaInfo(item);
  const [newBuyer, setNewBuyer] = useState(item.comprador || "Sem comprador");

  async function saveBuyer() {
    await updateEntity("requisicoes", item.id, { comprador: newBuyer });
    onSaved();
  }

  return (
    <div className="drawer-backdrop">
      <aside className="detail-drawer">
        <header>
          <div>
            <span className="eyebrow">Ficha completa da RM</span>
            <h2>RM {item.numero_rm || "S/N"}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </header>

        <div className="drawer-grid">
          <Info label="Status" value={statusLabel(getRequisicaoStatus(item))} />
          <Info label="OC" value={getOcNumber(item) || "-"} />
          <Info label="Obra" value={obraName(item, obras)} />
          <Info label="SLA" value={sla.label} />
          <Info label="Solicitante" value={item.solicitante || "-"} />
          <Info label="Centro de custo" value={item.centro_custo || "-"} />
          <Info label="Data inclusao" value={formatDateBr(item.data_inclusao)} />
          <Info label="Necessidade" value={formatDateBr(item.data_necessidade)} />
          <Info label="Telefone comprador" value={getPayloadField(item.payload, ["Telefone", "Celular", "WhatsApp", "Wpp"]) || "-"} />
          <Info label="Email comprador" value={getPayloadField(item.payload, ["Email", "E-mail", "Correio"]) || "-"} />
        </div>

        {canEdit ? (
          <div className="drawer-edit-row">
            <label>
              Comprador
              <select value={newBuyer} onChange={(event) => setNewBuyer(event.target.value)}>
                {Array.from(new Set(["Sem comprador", ...buyers, item.comprador || "Sem comprador"])).map((buyer) => (
                  <option key={buyer}>{buyer}</option>
                ))}
              </select>
            </label>
            <button className="primary-button" type="button" onClick={saveBuyer}>
              Salvar comprador
            </button>
          </div>
        ) : null}

        <section className="panel panel--flat">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Itens da RM</span>
              <h3>{rows.length} linha(s) importada(s)</h3>
            </div>
          </div>
          <DataTable
            data={rows}
            columns={[
              { key: "desc", label: "Descricao", render: (row) => getAny(row, ["Descricao Item", "Produto", "Descricao"]) || "-" },
              { key: "cat", label: "Categoria", render: (row) => getAny(row, ["Categoria Item", "Categoria", "Filial"]) || "-" },
              { key: "sit", label: "Situacao", render: (row) => getAny(row, ["Situacao RM", "Status"]) || "-" },
            ]}
          />
        </section>
      </aside>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function getPayloadRows(payload: Record<string, unknown>) {
  const rows = payload._linhas_importadas;
  return Array.isArray(rows) && rows.length ? (rows as RawRow[]) : [payload as RawRow];
}

function getPayloadField(payload: Record<string, unknown>, aliases: string[]) {
  const rows = getPayloadRows(payload);
  for (const row of rows) {
    const value = getAny(row, aliases);
    if (value) return value;
  }
  return "";
}

function payloadHasField(payload: Record<string, unknown>, aliases: string[]) {
  const wanted = aliases.map(headerKey);
  return getPayloadRows(payload).some((row) => Object.keys(row).some((key) => wanted.includes(headerKey(key))));
}

function getRequisicaoStatus(item: Requisicao) {
  if (payloadHasField(item.payload, assinaturaAliases) && !getPayloadField(item.payload, assinaturaAliases)) {
    return "PENDENTE_ASSINATURA";
  }
  return normalizeRequisicaoStatus(item.status || "RM");
}

function normalizeRequisicaoStatus(value: string) {
  const normalized = headerKey(value);
  if (normalized.includes("naoassin") || normalized.includes("pendenteassin")) return "PENDENTE_ASSINATURA";
  if (normalized.includes("cancel")) return "CANCELADA";
  if (normalized.startsWith("oc") || normalized.includes("ordemdecompra")) return "OC";
  if (normalized.startsWith("mc") || normalized.includes("mapacomparativo")) return "MC";
  if (normalized.startsWith("rc") || normalized.includes("requisicaodecompra")) return "RC";
  return "RM";
}

function statusLabel(status: string) {
  return statuses.find(([key]) => key === status)?.[1] || status;
}

function getOcNumber(item: Requisicao) {
  return getPayloadField(item.payload, [
    "OC",
    "Num OC",
    "N OC",
    "Numero OC",
    "Numero da OC",
    "Ordem de Compra",
    "Pedido de Compra",
  ]);
}

function getFirstItemDescription(item: Requisicao) {
  const firstRow = getPayloadRows(item.payload)[0] || {};
  return getAny(firstRow, ["Descricao Item", "Produto", "Item", "Descricao", "Material"]);
}

function obraName(item: Requisicao, obras: Obra[]) {
  const linkedObra = item.obra_id ? obras.find((obra) => obra.id === item.obra_id)?.nome : "";
  return linkedObra || getPayloadField(item.payload, obraAliases) || "Sem obra vinculada";
}

function getAny(row: RawRow, aliases: string[]) {
  const wanted = aliases.map(headerKey);
  const found = Object.entries(row).find(([key]) => wanted.includes(headerKey(key)));
  return found ? String(found[1] ?? "").trim() : "";
}

function isUrgent(item: Requisicao) {
  return normalizeText(item.prioridade).includes("urgent") || normalizeText(getPayloadField(item.payload, ["Tipo RM", "Urgente", "Prioridade"])).includes("urg");
}

function getSlaInfo(item: Requisicao) {
  const status = getRequisicaoStatus(item);
  const elapsed = getSlaElapsedDays(item);
  const urgent = isUrgent(item);
  const isHugo = normalizeText(item.comprador) === "hugo";
  const limit = isHugo ? (urgent ? 30 : 35) : urgent ? 3 : 5;
  if (status === "OC") return { tone: "success" as const, label: "Concluida" };
  if (status === "CANCELADA") return { tone: "neutral" as const, label: "Cancelada" };
  if (elapsed === null) return { tone: "neutral" as const, label: "SLA sem data" };
  if (elapsed > limit) return { tone: "danger" as const, label: `${elapsed}d atrasada` };
  if (limit - elapsed <= 1) return { tone: "warning" as const, label: `${elapsed}d alerta` };
  return { tone: "success" as const, label: `${elapsed}d no prazo` };
}

function getSlaElapsedDays(item: Requisicao) {
  const rawDays = getPayloadField(item.payload, ["Dias RM em aberto", "Dias Em Aberto", "Atraso"]);
  const daysFromSheet = Number(String(rawDays).replace(",", ".").match(/\d+(\.\d+)?/)?.[0] || "");
  const created = item.data_inclusao ? new Date(`${item.data_inclusao}T00:00:00`).getTime() : Number.NaN;
  if (Number.isFinite(daysFromSheet)) return Math.floor(daysFromSheet);
  if (Number.isFinite(created)) return Math.max(0, Math.floor((Date.now() - created) / 86400000));
  return null;
}

function buildPrioritySummary(items: Requisicao[]) {
  const total = items.length;
  const urgent = items.filter(isUrgent).length;
  const normal = Math.max(0, total - urgent);
  return {
    normal: { count: normal, percent: formatPercent(normal, total) },
    urgent: { count: urgent, percent: formatPercent(urgent, total) },
  };
}

function buildPrioritySummaryFromIndex(items: RequisicaoIndex[]) {
  const total = items.length;
  const urgent = items.filter((item) => item.urgent).length;
  const normal = Math.max(0, total - urgent);
  return {
    normal: { count: normal, percent: formatPercent(normal, total) },
    urgent: { count: urgent, percent: formatPercent(urgent, total) },
  };
}

function buildOcSummary(items: Requisicao[]) {
  const urgentItems = items.filter(isUrgent);
  const normalItems = items.filter((item) => !isUrgent(item));
  return {
    total: items.length,
    avgSla: averageSlaLabel(items),
    normal: {
      count: normalItems.length,
      percent: formatPercent(normalItems.length, items.length),
      avgSla: averageSlaLabel(normalItems),
    },
    urgent: {
      count: urgentItems.length,
      percent: formatPercent(urgentItems.length, items.length),
      avgSla: averageSlaLabel(urgentItems),
    },
  };
}

function buildOcSummaryFromIndex(items: RequisicaoIndex[]) {
  const urgentItems = items.filter((item) => item.urgent);
  const normalItems = items.filter((item) => !item.urgent);
  return {
    total: items.length,
    avgSla: averageIndexedSlaLabel(items),
    normal: {
      count: normalItems.length,
      percent: formatPercent(normalItems.length, items.length),
      avgSla: averageIndexedSlaLabel(normalItems),
    },
    urgent: {
      count: urgentItems.length,
      percent: formatPercent(urgentItems.length, items.length),
      avgSla: averageIndexedSlaLabel(urgentItems),
    },
  };
}

function averageSlaLabel(items: Requisicao[]) {
  const values = items.map(getSlaElapsedDays).filter((value): value is number => value !== null);
  if (!values.length) return "sem data";
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return `${average.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}d`;
}

function averageIndexedSlaLabel(items: RequisicaoIndex[]) {
  const values = items.map((item) => item.elapsedDays).filter((value): value is number => value !== null);
  if (!values.length) return "sem data";
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return `${average.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}d`;
}

function formatPercent(value: number, total: number) {
  if (!total) return "0%";
  return `${((value / total) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}

function compareSla(a: Requisicao, b: Requisicao) {
  const order = { danger: 0, warning: 1, success: 2, neutral: 3 };
  const diff = order[getSlaInfo(a).tone] - order[getSlaInfo(b).tone];
  if (diff) return diff;
  return String(a.numero_rm || "").localeCompare(String(b.numero_rm || ""), "pt-BR", { numeric: true });
}

function compareIndexedSla(a: RequisicaoIndex, b: RequisicaoIndex) {
  const order = { danger: 0, warning: 1, success: 2, neutral: 3 };
  const diff = order[a.sla.tone] - order[b.sla.tone];
  if (diff) return diff;
  return String(a.item.numero_rm || "").localeCompare(String(b.item.numero_rm || ""), "pt-BR", { numeric: true });
}

function buildBuyerReport(items: Requisicao[], buyer: string) {
  if (buyer === "Todos") return { whatsapp: "", email: "" };
  const phone = normalizePhone(getPayloadField(items[0]?.payload || {}, ["Telefone", "Celular", "WhatsApp", "Wpp"]));
  const email = getPayloadField(items[0]?.payload || {}, ["Email", "E-mail", "Correio"]);
  const listedItems = items.slice(0, 40);
  const extra = items.length > listedItems.length ? `\n...mais ${items.length - listedItems.length} RM(s). Consulte o Supply Flow para a lista completa.` : "";
  const message = `Visao Geral - ${buyer}\nRMs: ${items.length}\n\n${listedItems
    .map((item, index) => `${index + 1}. RM ${item.numero_rm || "S/N"} - ${getSlaInfo(item).label} - ${statusLabel(getRequisicaoStatus(item))}`)
    .join("\n")}${extra}\n\nFavor verificar prioridades.`;
  return {
    whatsapp: phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : "",
    email: email
      ? `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(
          `RMs em aberto - ${buyer}`
        )}&body=${encodeURIComponent(message)}`
      : "",
  };
}

function buildItemWhatsapp(item: Requisicao) {
  const phone = normalizePhone(getPayloadField(item.payload, ["Telefone", "Celular", "WhatsApp", "Wpp"]));
  if (!phone) return "";
  const rows = getPayloadRows(item.payload);
  const message = `Ola, ${item.comprador || "comprador(a)"}!\n\nRM ${item.numero_rm || "S/N"}\nStatus: ${statusLabel(getRequisicaoStatus(item))}\nSLA: ${getSlaInfo(
    item
  ).label}\n\nItens:\n${rows.map((row) => `- ${getAny(row, ["Descricao Item", "Produto"]) || "S/desc"}`).join("\n")}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if ((digits.length === 10 || digits.length === 11) && !digits.startsWith("55")) return `55${digits}`;
  return digits;
}

function loadCustomBuyers() {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(customBuyersKey) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim()) : [];
  } catch {
    return [];
  }
}

function saveCustomBuyers(buyers: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(customBuyersKey, JSON.stringify(buyers));
}
