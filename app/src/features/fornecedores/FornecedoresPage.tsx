import { useMemo, useState } from "react";
import { Download, ExternalLink, Globe, Mail, Phone, Search, UploadCloud } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { ImportWizard } from "../../components/ImportWizard";
import { KpiCard } from "../../components/KpiCard";
import { RoleGate } from "../../components/RoleGate";
import { EmptyState, LoadingState } from "../../components/States";
import { headerKey, normalizeText } from "../../lib/format";
import { exportToXlsx } from "../../lib/spreadsheet";
import { useAsyncData } from "../../hooks";
import { listEntities } from "../../services/entities";
import type { Fornecedor } from "../../types";

export function FornecedoresPage() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [service, setService] = useState("");
  const [region, setRegion] = useState("");
  const [uf, setUf] = useState("");
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("fornecedores"), []);

  const ufs = useMemo(() => Array.from(new Set((data || []).map((item) => item.uf).filter(Boolean))).sort(), [data]);
  const categorias = useMemo(() => Array.from(new Set((data || []).map((item) => item.categoria).filter(Boolean))).sort(), [data]);
  const regions = useMemo(() => Array.from(new Set((data || []).map((item) => item.regiao).filter(Boolean))).sort(), [data]);
  const filtered = useMemo(() => {
    const q = normalizeText(query);
    const searchingCartorio = q.includes("cartorio");
    return (data || [])
      .filter((item) => {
        const matchesQuery = [item.codigo, item.nome, item.categoria, item.produto_servico, item.cidade, item.uf, item.regiao, item.email, item.telefone, item.site, JSON.stringify(item.payload || {})]
          .join(" ")
          .toLowerCase()
          .includes(q);
        const matchesCategoria = !categoria || item.categoria === categoria;
        const matchesService = !service || normalizeText(item.produto_servico).includes(normalizeText(service));
        const matchesRegion = !region || item.regiao === region;
        const matchesUf = !uf || item.uf === uf;
        const matchesStatus = !status || (status === "ativo" ? item.cadastro_ativo : !item.cadastro_ativo);
        return matchesQuery && matchesCategoria && matchesService && matchesRegion && matchesUf && matchesStatus;
      })
      .sort((a, b) => {
        if (a.cadastro_ativo !== b.cadastro_ativo) return a.cadastro_ativo ? -1 : 1;
        if (!searchingCartorio) {
          const aCartorio = isCartorioSupplier(a);
          const bCartorio = isCartorioSupplier(b);
          if (aCartorio !== bCartorio) return aCartorio ? 1 : -1;
        }
        return a.nome.localeCompare(b.nome, "pt-BR", { numeric: true });
      });
  }, [categoria, data, query, region, service, status, uf]);

  const selected = filtered.find((item) => item.id === selectedId) || filtered[0] || null;
  const route: Fornecedor[] = [];

  if (loading) return <LoadingState label="Carregando fornecedores" />;
  if (error) return <EmptyState title="Falha ao carregar fornecedores" description={error} />;

  return (
    <div className="page-stack">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar fornecedor, serviço, cidade ou UF" />
        </label>
        <select value={categoria} onChange={(event) => setCategoria(event.target.value)}>
          <option value="">Todas categorias</option>
          {categorias.map((item) => (
            <option key={item} value={item || ""}>
              {item}
            </option>
          ))}
        </select>
        <input value={service} onChange={(event) => setService(event.target.value)} placeholder="Filtrar servico" />
        <select value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="">Todas regioes</option>
          {regions.map((item) => (
            <option key={item} value={item || ""}>
              {item}
            </option>
          ))}
        </select>
        <select value={uf} onChange={(event) => setUf(event.target.value)}>
          <option value="">Todas UFs</option>
          {ufs.map((item) => (
            <option key={item} value={item || ""}>
              {item}
            </option>
          ))}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">Todos status</option>
          <option value="ativo">Cadastro ativo</option>
          <option value="inativo">Sem cadastro ativo</option>
        </select>
        <button
          className="secondary-button"
          type="button"
          onClick={() =>
            exportToXlsx(
              filtered.map((item) => ({
                Codigo: item.codigo,
                Nome: item.nome,
                Categoria: item.categoria,
                Servico: item.produto_servico,
                Cidade: item.cidade,
                UF: item.uf,
                Regiao: item.regiao,
                Email: item.email,
                Telefone: item.telefone,
                Ativo: item.cadastro_ativo ? "Sim" : "Não",
              })),
              `fornecedores-${new Date().toISOString().slice(0, 10)}.xlsx`
            )
          }
        >
          <Download size={18} />
          Exportar
        </button>
        <RoleGate module="fornecedores">
          <button className="primary-button" type="button" onClick={() => setShowImport((current) => !current)}>
            <UploadCloud size={18} />
            Importar
          </button>
        </RoleGate>
      </section>

      <section className="kpi-grid">
        <KpiCard title="Fornecedores" value={filtered.length} />
        <KpiCard title="Ativos" value={filtered.filter((item) => item.cadastro_ativo).length} tone="success" />
        <KpiCard title="Com contato" value={filtered.filter((item) => item.email || item.telefone || item.site).length} />
        <KpiCard title="UFs" value={new Set(filtered.map((item) => item.uf).filter(Boolean)).size} tone="blue" />
        <KpiCard title="Cidades" value={new Set(filtered.map((item) => [item.cidade, item.uf].filter(Boolean).join("-")).filter(Boolean)).size} />
      </section>

      {showImport ? <ImportWizard kind="fornecedores" onComplete={refresh} /> : null}

      <section className="supplier-layout">
        <div className="panel supplier-list">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Base filtrada</span>
              <h2>{filtered.length.toLocaleString("pt-BR")} fornecedor(es)</h2>
            </div>
          </div>
          <div className="supplier-cards">
            {filtered.slice(0, 80).map((item) => (
              <article className={`supplier-card ${selected?.id === item.id ? "supplier-card--active" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}>
                <div>
                  <strong>{item.nome}</strong>
                  <span>{[item.cidade, item.uf].filter(Boolean).join(" / ") || "Sem local"}{item.codigo ? ` · ${item.codigo}` : ""}</span>
                </div>
                <div className="badge-row">
                  <span className={item.cadastro_ativo ? "mini-badge mini-badge--good" : "mini-badge mini-badge--warn"}>{item.cadastro_ativo ? "Ativo" : "Sem cadastro"}</span>
                  {item.categoria ? <span className="mini-badge">{item.categoria}</span> : null}
                  {item.produto_servico ? <span className="mini-badge">{item.produto_servico}</span> : null}
                  {item.regiao ? <span className="mini-badge">{item.regiao}</span> : null}
                </div>
                <div className="supplier-actions">
                  {item.telefone ? (
                    <a className="secondary-button" href={`tel:${normalizePhoneLink(item.telefone)}`} onClick={(event) => event.stopPropagation()}>
                      <Phone size={16} />
                      Telefone
                    </a>
                  ) : null}
                  {item.email ? (
                    <a className="secondary-button" href={`mailto:${item.email}`} onClick={(event) => event.stopPropagation()}>
                      <Mail size={16} />
                      Email
                    </a>
                  ) : null}
                  {item.site ? (
                    <a className="secondary-button" href={normalizeSite(item.site)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                      <Globe size={16} />
                      Site
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel supplier-detail-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Detalhes</span>
              <h2>{selected?.nome || "Fornecedor"}</h2>
            </div>
            <a className="secondary-button" href={mapsUrl(selected)} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              Abrir no Maps
            </a>
          </div>
          <div className="route-box">
            <strong>Rota selecionada</strong>
            <span>{route.length ? route.map((item) => item.nome).join(" → ") : "Nenhum ponto adicionado."}</span>
            {route.length > 1 ? (
              <a className="primary-button" href={routeUrl(route)} target="_blank" rel="noreferrer">
                Abrir rota no Google Maps
              </a>
            ) : null}
          </div>
          {selected ? (
            <div className="supplier-detail">
              <div className="badge-row">
                <span className={selected.cadastro_ativo ? "mini-badge mini-badge--good" : "mini-badge mini-badge--warn"}>
                  {selected.cadastro_ativo ? "Cadastro ativo" : "Sem cadastro ativo"}
                </span>
                {selected.categoria ? <span className="mini-badge">{selected.categoria}</span> : null}
              </div>
              <h3>{selected.nome}</h3>
              <p>{[selected.cidade, selected.uf, selected.regiao].filter(Boolean).join(" · ") || "Sem local informado"}</p>
              <div className="drawer-grid">
                <Info label="Codigo" value={selected.codigo || "-"} />
                <Info label="Servico" value={selected.produto_servico || "-"} />
                <Info label="Telefone" value={selected.telefone || "-"} />
                <Info label="Email" value={selected.email || "-"} />
                <Info label="Site" value={selected.site || "-"} />
                <Info label="CNPJ" value={supplierPayloadField(selected, ["CNPJ"])} />
                <Info label="Coordenadas" value={selected.latitude !== null && selected.longitude !== null ? `${selected.latitude}, ${selected.longitude}` : "-"} />
                <Info label="Observacoes" value={supplierPayloadField(selected, ["Observações", "Observacoes", "Observação", "Observacao"])} />
              </div>
              <div className="supplier-actions">
                {selected.telefone ? (
                  <a className="secondary-button" href={`tel:${normalizePhoneLink(selected.telefone)}`}>
                    <Phone size={16} />
                    Telefone
                  </a>
                ) : null}
                {selected.email ? (
                  <a className="secondary-button" href={`mailto:${selected.email}`}>
                    <Mail size={16} />
                    Email
                  </a>
                ) : null}
                {selected.site ? (
                  <a className="secondary-button" href={normalizeSite(selected.site)} target="_blank" rel="noreferrer">
                    <Globe size={16} />
                    Site
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <DataTable
        data={filtered.slice(0, 80)}
        columns={[
          { key: "codigo", label: "Código", render: (item) => item.codigo || "-" },
          { key: "nome", label: "Nome", render: (item) => item.nome },
          { key: "servico", label: "Serviço", render: (item) => item.produto_servico || item.categoria || "-" },
          { key: "cidade", label: "Cidade", render: (item) => [item.cidade, item.uf].filter(Boolean).join(" / ") },
          { key: "telefone", label: "Telefone", render: (item) => item.telefone || "-" },
          { key: "email", label: "E-mail", render: (item) => item.email || "-" },
          { key: "ativo", label: "Status", render: (item) => (item.cadastro_ativo ? "Ativo" : "Inativo") },
        ]}
      />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-field">
      <span>{label}</span>
      <strong>{value || "-"}</strong>
    </div>
  );
}

function supplierPayloadField(supplier: Fornecedor, aliases: string[]) {
  const wanted = aliases.map(headerKey);
  const found = Object.entries(supplier.payload || {}).find(([key]) => wanted.includes(headerKey(key)));
  return found ? String(found[1] ?? "").trim() || "-" : "-";
}

function isCartorioSupplier(supplier: Fornecedor) {
  return normalizeText(
    [supplier.nome, supplier.categoria, supplier.produto_servico, supplier.payload ? JSON.stringify(supplier.payload) : ""].join(" ")
  ).includes("cartorio");
}

function normalizeSite(site: string) {
  const value = site.trim();
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function normalizePhoneLink(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function supplierQuery(supplier: Fornecedor | null) {
  if (!supplier) return "Brasil";
  return [supplier.nome, supplier.cidade, supplier.uf, "Brasil"].filter(Boolean).join(", ");
}

function mapsEmbedUrl(supplier: Fornecedor | null) {
  return `https://www.google.com/maps?q=${encodeURIComponent(supplierQuery(supplier))}&output=embed`;
}

function mapsUrl(supplier: Fornecedor | null) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(supplierQuery(supplier))}`;
}

function routeUrl(route: Fornecedor[]) {
  const params = new URLSearchParams({
    api: "1",
    travelmode: "driving",
    origin: supplierQuery(route[0]),
    destination: supplierQuery(route[route.length - 1]),
  });
  const waypoints = route.slice(1, -1).map(supplierQuery).join("|");
  if (waypoints) params.set("waypoints", waypoints);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
