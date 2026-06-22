import { useMemo, useState } from "react";
import { Download, Mail, MessageCircle, Plus, Search, UploadCloud, X } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { ImportWizard } from "../../components/ImportWizard";
import { KanbanBoard } from "../../components/KanbanBoard";
import { KpiCard } from "../../components/KpiCard";
import { RoleGate } from "../../components/RoleGate";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { formatDateBr, headerKey, normalizeText } from "../../lib/format";
import { exportToXlsx, type RawRow } from "../../lib/spreadsheet";
import { canManage } from "../../lib/permissions";
import { useAsyncData } from "../../hooks";
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

export function RequisicoesPage() {
  const { profile } = useAuth();
  const [query, setQuery] = useState("");
  const [buyer, setBuyer] = useState("Todos");
  const [customBuyers, setCustomBuyers] = useState<string[]>(() => loadCustomBuyers());
  const [obraFilter, setObraFilter] = useState("");
  const [slaFilter, setSlaFilter] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("requisicoes"), []);
  const obras = useAsyncData(listObras, []);
  const canEdit = canManage(profile?.role, "requisicoes");

  const buyers = useMemo(() => {
    const importedBuyers = (data || []).map((item) => item.comprador || "Sem comprador");
    return ["Todos", ...Array.from(new Set([...importedBuyers, ...customBuyers])).sort((a, b) => a.localeCompare(b, "pt-BR"))];
  }, [customBuyers, data]);

  const obraOptions = useMemo(() => {
    return Array.from(new Set((data || []).map((item) => obraName(item, obras.data || [])).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b, "pt-BR", { numeric: true })
    );
  }, [data, obras.data]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return (data || []).filter((item) => {
      const matchesBuyer = buyer === "Todos" || (item.comprador || "Sem comprador") === buyer;
      const obra = obraName(item, obras.data || []);
      const matchesObra = !obraFilter || obra === obraFilter;
      const matchesSla = !slaFilter || getSlaInfo(item).tone === slaFilter;
      const rowsText = getPayloadRows(item.payload)
        .map((row) => Object.values(row).join(" "))
        .join(" ");
      const matchesQuery = [item.numero_rm, getOcNumber(item), item.solicitante, item.comprador, item.categoria, item.centro_custo, obra, getRequisicaoStatus(item), rowsText]
        .join(" ")
        .toLowerCase()
        .includes(q);
      return matchesBuyer && matchesObra && matchesSla && matchesQuery;
    });
  }, [buyer, data, obraFilter, obras.data, query, slaFilter]);

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

  const columns = statuses.map(([key, title, subtitle]) => ({
    key,
    title,
    subtitle,
    items: filtered.filter((item) => getRequisicaoStatus(item) === key).sort(compareSla),
  }));
  const activeItems = filtered.filter((item) => !["OC", "CANCELADA"].includes(getRequisicaoStatus(item)));
  const openItemCount = activeItems.reduce((sum, item) => sum + getPayloadRows(item.payload).length, 0);
  const prioritySummary = buildPrioritySummary(activeItems);
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
          <button className="primary-button" type="button" onClick={() => setShowImport((current) => !current)}>
            <UploadCloud size={18} />
            Importar
          </button>
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

      <section className="phase-strip">
        {statuses.map(([key, title, subtitle]) => (
          <article key={key}>
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </article>
        ))}
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

      {showImport ? <ImportWizard kind="requisicoes" onComplete={refresh} /> : null}

      <KanbanBoard
        columns={columns}
        canDrag={canEdit}
        onMove={(id, status) => updateEntity("requisicoes", id, { status }).then(refresh)}
        renderCard={(item: Requisicao) => {
          const sla = getSlaInfo(item);
          const rows = getPayloadRows(item.payload);
          const ocNumber = getOcNumber(item);
          const firstItem = getFirstItemDescription(item);
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
  const rawDays = getPayloadField(item.payload, ["Dias RM em aberto", "Dias Em Aberto", "Atraso"]);
  const daysFromSheet = Number(String(rawDays).replace(",", ".").match(/\d+(\.\d+)?/)?.[0] || "");
  const created = item.data_inclusao ? new Date(`${item.data_inclusao}T00:00:00`).getTime() : Number.NaN;
  const elapsed = Number.isFinite(daysFromSheet)
    ? Math.floor(daysFromSheet)
    : Number.isFinite(created)
      ? Math.max(0, Math.floor((Date.now() - created) / 86400000))
      : null;
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

function buildPrioritySummary(items: Requisicao[]) {
  const total = items.length;
  const urgent = items.filter(isUrgent).length;
  const normal = Math.max(0, total - urgent);
  return {
    normal: { count: normal, percent: formatPercent(normal, total) },
    urgent: { count: urgent, percent: formatPercent(urgent, total) },
  };
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

function buildBuyerReport(items: Requisicao[], buyer: string) {
  if (buyer === "Todos") return { whatsapp: "", email: "" };
  const phone = normalizePhone(getPayloadField(items[0]?.payload || {}, ["Telefone", "Celular", "WhatsApp", "Wpp"]));
  const email = getPayloadField(items[0]?.payload || {}, ["Email", "E-mail", "Correio"]);
  const message = `Visao Geral - ${buyer}\nRMs: ${items.length}\n\n${items
    .map((item, index) => `${index + 1}. RM ${item.numero_rm || "S/N"} - ${getSlaInfo(item).label} - ${statusLabel(getRequisicaoStatus(item))}`)
    .join("\n")}\n\nFavor verificar prioridades.`;
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
