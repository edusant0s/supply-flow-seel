import { type ElementType, type FormEvent, useMemo, useState } from "react";
import {
  BarChart3,
  Building2,
  Download,
  ExternalLink,
  FileSpreadsheet,
  Globe,
  Mail,
  MapPinned,
  Phone,
  Plus,
  Route,
  Save,
  Search,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { useAsyncData } from "../../hooks";
import { formatDateBr, headerKey, normalizeText } from "../../lib/format";
import { canManage } from "../../lib/permissions";
import { exportToXlsx } from "../../lib/spreadsheet";
import { deleteEntity, insertEntity, listEntities, updateEntity } from "../../services/entities";
import type { Fornecedor } from "../../types";

type SupplierTab = "executiva" | "base" | "mapa" | "cadastro";

type SupplierForm = {
  codigo: string;
  nome: string;
  categoria: string;
  produto_servico: string;
  cidade: string;
  uf: string;
  regiao: string;
  contato: string;
  telefone: string;
  email: string;
  site: string;
  cadastro_ativo: boolean;
  latitude: string;
  longitude: string;
  observacoes: string;
};

const initialForm: SupplierForm = {
  codigo: "",
  nome: "",
  categoria: "",
  produto_servico: "",
  cidade: "",
  uf: "",
  regiao: "",
  contato: "",
  telefone: "",
  email: "",
  site: "",
  cadastro_ativo: false,
  latitude: "",
  longitude: "",
  observacoes: "",
};

const tabs: Array<{ key: SupplierTab; label: string; icon: ElementType }> = [
  { key: "executiva", label: "Visao executiva", icon: BarChart3 },
  { key: "base", label: "Fornecedores", icon: Building2 },
  { key: "mapa", label: "Mapa geografico", icon: MapPinned },
  { key: "cadastro", label: "Cadastro", icon: Plus },
];

export function FornecedoresPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<SupplierTab>("executiva");
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [region, setRegion] = useState("");
  const [uf, setUf] = useState("");
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [workAddress, setWorkAddress] = useState("");
  const [form, setForm] = useState<SupplierForm>(initialForm);
  const [feedback, setFeedback] = useState("");
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("fornecedores"), []);
  const canEdit = canManage(profile?.role, "fornecedores");

  const ufs = useMemo(() => sortedUnique((data || []).map((item) => item.uf)), [data]);
  const categorias = useMemo(() => sortedUnique((data || []).map((item) => item.categoria)), [data]);
  const regions = useMemo(() => sortedUnique((data || []).map((item) => item.regiao)), [data]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    const searchingCartorio = q.includes("cartorio");
    return (data || [])
      .filter((item) => {
        const matchesQuery = [
          item.codigo,
          item.nome,
          item.categoria,
          item.produto_servico,
          item.cidade,
          item.uf,
          item.regiao,
          item.email,
          item.telefone,
          item.site,
          supplierPayloadField(item, ["Contato", "Nome Contato"]),
          JSON.stringify(item.payload || {}),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
        const matchesCategoria = !categoria || item.categoria === categoria;
        const matchesRegion = !region || item.regiao === region;
        const matchesUf = !uf || item.uf === uf;
        const matchesStatus = !status || (status === "ativo" ? item.cadastro_ativo : !item.cadastro_ativo);
        return matchesQuery && matchesCategoria && matchesRegion && matchesUf && matchesStatus;
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
  }, [categoria, data, query, region, status, uf]);

  const selected = filtered.find((item) => item.id === selectedId) || filtered[0] || null;

  if (loading) return <LoadingState label="Carregando fornecedores" />;
  if (error) return <EmptyState title="Falha ao carregar fornecedores" description={error} />;

  function updateForm<K extends keyof SupplierForm>(key: K, value: SupplierForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
    setFeedback("");
  }

  function editSupplier(item: Fornecedor) {
    setEditingId(item.id);
    setForm({
      codigo: item.codigo || "",
      nome: item.nome || "",
      categoria: item.categoria || "",
      produto_servico: item.produto_servico || "",
      cidade: item.cidade || "",
      uf: item.uf || "",
      regiao: item.regiao || "",
      contato: supplierPayloadField(item, ["Contato", "Nome Contato"]),
      telefone: item.telefone || "",
      email: item.email || "",
      site: item.site || "",
      cadastro_ativo: item.cadastro_ativo,
      latitude: item.latitude === null || item.latitude === undefined ? "" : String(item.latitude),
      longitude: item.longitude === null || item.longitude === undefined ? "" : String(item.longitude),
      observacoes: supplierPayloadField(item, ["Observacoes", "Observacao"]),
    });
    setActiveTab("cadastro");
    setFeedback("");
  }

  async function saveSupplier(event: FormEvent) {
    event.preventDefault();
    if (!canEdit) {
      setFeedback("Somente administradores de suprimentos podem cadastrar ou editar fornecedores.");
      return;
    }
    if (!form.nome.trim()) {
      setFeedback("Informe o nome do fornecedor.");
      return;
    }

    const row: Partial<Fornecedor> = {
      codigo: form.codigo.trim() || buildSupplierCode(form.nome),
      nome: form.nome.trim(),
      categoria: form.categoria.trim() || null,
      produto_servico: form.produto_servico.trim() || null,
      cidade: form.cidade.trim() || null,
      uf: form.uf.trim().toUpperCase() || null,
      regiao: form.regiao.trim() || null,
      telefone: form.telefone.trim() || null,
      email: form.email.trim() || null,
      site: form.site.trim() || null,
      cadastro_ativo: form.cadastro_ativo,
      latitude: parseCoordinate(form.latitude),
      longitude: parseCoordinate(form.longitude),
      payload: {
        contato: form.contato.trim(),
        observacoes: form.observacoes.trim(),
        origem: editingId ? "edicao_supply_flow" : "cadastro_supply_flow",
        atualizado_por: profile?.email || null,
      },
    };

    try {
      if (editingId) {
        await updateEntity("fornecedores", editingId, row);
        setFeedback("Fornecedor atualizado com sucesso.");
      } else {
        await insertEntity("fornecedores", row);
        setFeedback("Fornecedor cadastrado com sucesso.");
      }
      resetForm();
      await refresh();
      setActiveTab("base");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Falha ao salvar fornecedor.");
    }
  }

  async function removeSupplier() {
    if (!editingId || !canEdit) return;
    if (!window.confirm("Excluir este fornecedor? Esta acao nao pode ser desfeita.")) return;
    try {
      await deleteEntity("fornecedores", editingId);
      resetForm();
      await refresh();
      setActiveTab("base");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Falha ao excluir fornecedor.");
    }
  }

  return (
    <div className="page-stack suppliers-module">
      <section className="module-command-bar">
        <div>
          <span className="eyebrow">Base corporativa</span>
          <h2>Fornecedores SEEL</h2>
          <p>Mapa, consulta e cadastro centralizados na mesma base do Supply Flow.</p>
        </div>
        <div className="module-command-bar__actions">
          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              exportToXlsx(
                filtered.map((item) => ({
                  Codigo: item.codigo,
                  Nome: item.nome,
                  Categoria: item.categoria,
                  ProdutoServico: item.produto_servico,
                  Cidade: item.cidade,
                  UF: item.uf,
                  Regiao: item.regiao,
                  Contato: supplierPayloadField(item, ["Contato", "Nome Contato"]),
                  Email: item.email,
                  Telefone: item.telefone,
                  Site: item.site,
                  CadastroAtivo: item.cadastro_ativo ? "Sim" : "Nao",
                })),
                `fornecedores-${new Date().toISOString().slice(0, 10)}.xlsx`
              )
            }
          >
            <Download size={18} />
            Exportar base
          </button>
          {canEdit ? (
            <>
              <Link className="secondary-button" to="/importacoes">
                <UploadCloud size={18} />
                Central de dados
              </Link>
              <button className="primary-button" type="button" onClick={() => { resetForm(); setActiveTab("cadastro"); }}>
                <Plus size={18} />
                Novo fornecedor
              </button>
            </>
          ) : null}
        </div>
      </section>

      <section className="module-tabs" aria-label="Fornecedores">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.key} className={activeTab === tab.key ? "active" : ""} type="button" onClick={() => setActiveTab(tab.key)}>
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </section>

      <SupplierFilters
        query={query}
        setQuery={setQuery}
        categoria={categoria}
        setCategoria={setCategoria}
        region={region}
        setRegion={setRegion}
        uf={uf}
        setUf={setUf}
        status={status}
        setStatus={setStatus}
        categorias={categorias}
        regions={regions}
        ufs={ufs}
      />

      {activeTab === "executiva" ? <ExecutiveView fornecedores={filtered} /> : null}
      {activeTab === "base" ? <BaseView fornecedores={filtered} selected={selected} onSelect={setSelectedId} onEdit={editSupplier} canEdit={canEdit} /> : null}
      {activeTab === "mapa" ? (
        <MapView fornecedores={filtered} selected={selected} onSelect={setSelectedId} workAddress={workAddress} setWorkAddress={setWorkAddress} />
      ) : null}
      {activeTab === "cadastro" ? (
        <CadastroView
          form={form}
          updateForm={updateForm}
          editingId={editingId}
          feedback={feedback}
          canEdit={canEdit}
          onSubmit={saveSupplier}
          onReset={resetForm}
          onDelete={removeSupplier}
        />
      ) : null}
    </div>
  );
}

function SupplierFilters({
  query,
  setQuery,
  categoria,
  setCategoria,
  region,
  setRegion,
  uf,
  setUf,
  status,
  setStatus,
  categorias,
  regions,
  ufs,
}: {
  query: string;
  setQuery: (value: string) => void;
  categoria: string;
  setCategoria: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  uf: string;
  setUf: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  categorias: string[];
  regions: string[];
  ufs: string[];
}) {
  return (
    <section className="toolbar-panel toolbar-panel--wrap">
      <label className="search-field">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Fornecedor, cidade, categoria, telefone..." />
      </label>
      <select value={categoria} onChange={(event) => setCategoria(event.target.value)}>
        <option value="">Todas categorias</option>
        {categorias.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select value={region} onChange={(event) => setRegion(event.target.value)}>
        <option value="">Todas regioes</option>
        {regions.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select value={uf} onChange={(event) => setUf(event.target.value)}>
        <option value="">Todas UFs</option>
        {ufs.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select value={status} onChange={(event) => setStatus(event.target.value)}>
        <option value="">Todos status</option>
        <option value="ativo">Cadastro ativo</option>
        <option value="inativo">Sem cadastro ativo</option>
      </select>
    </section>
  );
}

function ExecutiveView({ fornecedores }: { fornecedores: Fornecedor[] }) {
  const active = fornecedores.filter((item) => item.cadastro_ativo).length;
  const withContact = fornecedores.filter((item) => item.email || item.telefone || item.site).length;
  const ufs = new Set(fornecedores.map((item) => item.uf).filter(Boolean)).size;
  const cities = new Set(fornecedores.map((item) => [item.cidade, item.uf].filter(Boolean).join("-")).filter(Boolean)).size;

  return (
    <>
      <section className="kpi-grid">
        <KpiCard title="Fornecedores" value={fornecedores.length} icon={Building2} tone="blue" />
        <KpiCard title="Ativos" value={active} tone="success" />
        <KpiCard title="Com contato" value={withContact} />
        <KpiCard title="UFs cobertas" value={ufs} />
        <KpiCard title="Cidades" value={cities} />
      </section>

      <section className="dashboard-chart-grid">
        <article className="panel dashboard-chart-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Categorias</span>
              <h2>Principais segmentos</h2>
            </div>
          </div>
          <BarList data={countBy(fornecedores, (item) => item.categoria || item.produto_servico || "Sem categoria")} />
        </article>
        <article className="panel dashboard-chart-card">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Cobertura</span>
              <h2>Distribuicao regional</h2>
            </div>
          </div>
          <BarList data={countBy(fornecedores, (item) => item.regiao || item.uf || "Sem regiao")} />
        </article>
      </section>
    </>
  );
}

function BaseView({
  fornecedores,
  selected,
  onSelect,
  onEdit,
  canEdit,
}: {
  fornecedores: Fornecedor[];
  selected: Fornecedor | null;
  onSelect: (id: string) => void;
  onEdit: (item: Fornecedor) => void;
  canEdit: boolean;
}) {
  return (
    <section className="supplier-modern-grid">
      <div className="panel supplier-list">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Base filtrada</span>
            <h2>{fornecedores.length.toLocaleString("pt-BR")} fornecedor(es)</h2>
          </div>
        </div>
        <div className="supplier-cards">
          {fornecedores.slice(0, 120).map((item) => (
            <article className={`supplier-card ${selected?.id === item.id ? "supplier-card--active" : ""}`} key={item.id} onClick={() => onSelect(item.id)}>
              <div>
                <strong>{item.nome}</strong>
                <span>{[item.cidade, item.uf].filter(Boolean).join(" / ") || "Sem local"}{item.codigo ? ` · ${item.codigo}` : ""}</span>
              </div>
              <div className="badge-row">
                <span className={item.cadastro_ativo ? "mini-badge mini-badge--good" : "mini-badge mini-badge--warn"}>{item.cadastro_ativo ? "Ativo" : "Sem cadastro"}</span>
                {item.categoria ? <span className="mini-badge">{item.categoria}</span> : null}
                {item.regiao ? <span className="mini-badge">{item.regiao}</span> : null}
              </div>
              <div className="supplier-actions">
                {item.telefone ? <a className="secondary-button" href={`tel:${normalizePhoneLink(item.telefone)}`} onClick={(event) => event.stopPropagation()}><Phone size={16} />Telefone</a> : null}
                {item.email ? <a className="secondary-button" href={`mailto:${item.email}`} onClick={(event) => event.stopPropagation()}><Mail size={16} />Email</a> : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      <SupplierDetail selected={selected} onEdit={onEdit} canEdit={canEdit} />

      <section className="panel supplier-table-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Tabela</span>
            <h2>Consulta detalhada</h2>
          </div>
        </div>
        <DataTable
          data={fornecedores.slice(0, 120)}
          columns={[
            { key: "codigo", label: "Codigo", render: (item) => item.codigo || "-" },
            { key: "nome", label: "Nome", render: (item) => item.nome },
            { key: "servico", label: "Produto/Servico", render: (item) => item.produto_servico || item.categoria || "-" },
            { key: "cidade", label: "Cidade", render: (item) => [item.cidade, item.uf].filter(Boolean).join(" / ") || "-" },
            { key: "telefone", label: "Telefone", render: (item) => item.telefone || "-" },
            { key: "email", label: "E-mail", render: (item) => item.email || "-" },
            { key: "ativo", label: "Status", render: (item) => (item.cadastro_ativo ? "Ativo" : "Inativo") },
          ]}
        />
      </section>
    </section>
  );
}

function SupplierDetail({ selected, onEdit, canEdit }: { selected: Fornecedor | null; onEdit: (item: Fornecedor) => void; canEdit: boolean }) {
  return (
    <div className="panel supplier-detail-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Detalhes</span>
          <h2>{selected?.nome || "Fornecedor"}</h2>
        </div>
        <div className="supplier-actions">
          {canEdit && selected ? (
            <button className="secondary-button" type="button" onClick={() => onEdit(selected)}>
              <Save size={16} />
              Editar
            </button>
          ) : null}
          <a className="secondary-button" href={mapsUrl(selected)} target="_blank" rel="noreferrer">
            <ExternalLink size={18} />
            Maps
          </a>
        </div>
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
            <Info label="Produto/Servico" value={selected.produto_servico || "-"} />
            <Info label="Contato" value={supplierPayloadField(selected, ["Contato", "Nome Contato"])} />
            <Info label="Telefone" value={selected.telefone || "-"} />
            <Info label="Email" value={selected.email || "-"} />
            <Info label="Site" value={selected.site || "-"} />
            <Info label="Coordenadas" value={selected.latitude !== null && selected.longitude !== null ? `${selected.latitude}, ${selected.longitude}` : "-"} />
            <Info label="Atualizado" value={formatDateBr(selected.updated_at)} />
          </div>
          <div className="supplier-actions">
            {selected.telefone ? <a className="secondary-button" href={`tel:${normalizePhoneLink(selected.telefone)}`}><Phone size={16} />Telefone</a> : null}
            {selected.email ? <a className="secondary-button" href={`mailto:${selected.email}`}><Mail size={16} />Email</a> : null}
            {selected.site ? <a className="secondary-button" href={normalizeSite(selected.site)} target="_blank" rel="noreferrer"><Globe size={16} />Site</a> : null}
          </div>
        </div>
      ) : (
        <div className="muted-box">Nenhum fornecedor encontrado para os filtros selecionados.</div>
      )}
    </div>
  );
}

function MapView({
  fornecedores,
  selected,
  onSelect,
  workAddress,
  setWorkAddress,
}: {
  fornecedores: Fornecedor[];
  selected: Fornecedor | null;
  onSelect: (id: string) => void;
  workAddress: string;
  setWorkAddress: (value: string) => void;
}) {
  return (
    <section className="supplier-map-layout">
      <div className="panel supplier-map-side">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Mapa geografico</span>
            <h2>Fornecedor e obra</h2>
          </div>
        </div>
        <label>
          Fornecedor filtrado
          <select value={selected?.id || ""} onChange={(event) => onSelect(event.target.value)}>
            <option value="">Selecione</option>
            {fornecedores.slice(0, 250).map((item) => (
              <option key={item.id} value={item.id}>{item.nome} - {[item.cidade, item.uf].filter(Boolean).join("/")}</option>
            ))}
          </select>
        </label>
        <label>
          Endereco completo da obra
          <input value={workAddress} onChange={(event) => setWorkAddress(event.target.value)} placeholder="Rua, numero, cidade, UF" />
        </label>
        <div className="route-box supplier-route-box">
          <Route size={18} />
          <div>
            <strong>{selected ? selected.nome : "Nenhum fornecedor selecionado"}</strong>
            <span>{selected ? supplierQuery(selected) : "Escolha um fornecedor para abrir rota ou visualizar no mapa."}</span>
          </div>
        </div>
        <div className="supplier-actions">
          <a className="primary-button" href={routeUrl(workAddress, selected)} target="_blank" rel="noreferrer">
            <ExternalLink size={17} />
            Abrir rota
          </a>
          <a className="secondary-button" href={mapsUrl(selected)} target="_blank" rel="noreferrer">
            <MapPinned size={17} />
            Abrir Maps
          </a>
        </div>
        <div className="supplier-map-list">
          {fornecedores.slice(0, 80).map((item) => (
            <button key={item.id} className={selected?.id === item.id ? "active" : ""} type="button" onClick={() => onSelect(item.id)}>
              <strong>{item.nome}</strong>
              <span>{[item.cidade, item.uf, item.categoria].filter(Boolean).join(" · ")}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="panel supplier-map-frame">
        <iframe title="Mapa de fornecedores" src={mapsEmbedUrl(selected)} loading="lazy" />
      </div>
    </section>
  );
}

function CadastroView({
  form,
  updateForm,
  editingId,
  feedback,
  canEdit,
  onSubmit,
  onReset,
  onDelete,
}: {
  form: SupplierForm;
  updateForm: <K extends keyof SupplierForm>(key: K, value: SupplierForm[K]) => void;
  editingId: string | null;
  feedback: string;
  canEdit: boolean;
  onSubmit: (event: FormEvent) => void;
  onReset: () => void;
  onDelete: () => void;
}) {
  if (!canEdit) {
    return (
      <section className="state-panel state-panel--inline">
        <UploadCloud size={26} />
        <div>
          <h2>Cadastro restrito</h2>
          <p>Somente super_admin e admin_suprimentos podem cadastrar ou alterar fornecedores.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel supplier-form-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Cadastro de fornecedores</span>
          <h2>{editingId ? "Editar fornecedor" : "Novo fornecedor"}</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <Field label="Nome do fornecedor" value={form.nome} onChange={(value) => updateForm("nome", value)} required className="field-full" />
        <Field label="Codigo" value={form.codigo} onChange={(value) => updateForm("codigo", value)} />
        <Field label="Categoria" value={form.categoria} onChange={(value) => updateForm("categoria", value)} />
        <Field label="Produto / servico" value={form.produto_servico} onChange={(value) => updateForm("produto_servico", value)} className="field-full" />
        <Field label="Cidade" value={form.cidade} onChange={(value) => updateForm("cidade", value)} />
        <Field label="UF" value={form.uf} onChange={(value) => updateForm("uf", value)} />
        <Field label="Regiao" value={form.regiao} onChange={(value) => updateForm("regiao", value)} />
        <Field label="Contato" value={form.contato} onChange={(value) => updateForm("contato", value)} />
        <Field label="Telefone" value={form.telefone} onChange={(value) => updateForm("telefone", value)} />
        <Field label="E-mail" type="email" value={form.email} onChange={(value) => updateForm("email", value)} />
        <Field label="Site" value={form.site} onChange={(value) => updateForm("site", value)} />
        <Field label="Latitude" type="number" value={form.latitude} onChange={(value) => updateForm("latitude", value)} />
        <Field label="Longitude" type="number" value={form.longitude} onChange={(value) => updateForm("longitude", value)} />
        <label className="toggle-row">
          <input type="checkbox" checked={form.cadastro_ativo} onChange={(event) => updateForm("cadastro_ativo", event.target.checked)} />
          Cadastro ativo
        </label>
        <label className="field-full">
          Observacoes
          <textarea value={form.observacoes} onChange={(event) => updateForm("observacoes", event.target.value)} />
        </label>
        {feedback ? <div className="form-note field-full">{feedback}</div> : null}
        <div className="form-actions field-full">
          <button className="secondary-button" type="button" onClick={onReset}>Limpar</button>
          {editingId ? <button className="danger-button" type="button" onClick={onDelete}><Trash2 size={16} />Excluir</button> : null}
          <button className="primary-button" type="submit"><Save size={16} />Salvar fornecedor</button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={className}>
      {label}
      <input type={type} value={value} required={required} step={type === "number" ? "any" : undefined} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function BarList({ data }: { data: Array<[string, number]> }) {
  const max = Math.max(...data.map(([, count]) => count), 1);
  if (!data.length) return <div className="muted-box">Sem dados para exibir.</div>;
  return (
    <div className="bar-chart">
      {data.slice(0, 8).map(([label, count]) => (
        <div className="bar-chart__row" key={label}>
          <span>{label}</span>
          <div><i style={{ width: `${Math.max(4, (count / max) * 100)}%` }} /></div>
          <strong>{count}</strong>
        </div>
      ))}
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

function sortedUnique(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((value) => String(value || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function countBy(items: Fornecedor[], getValue: (item: Fornecedor) => string) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const value = getValue(item).trim() || "Nao informado";
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function supplierPayloadField(supplier: Fornecedor, aliases: string[]) {
  const wanted = aliases.map(headerKey);
  const found = Object.entries(supplier.payload || {}).find(([key]) => wanted.includes(headerKey(key)));
  return found ? String(found[1] ?? "").trim() : "";
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
  if (supplier.latitude !== null && supplier.longitude !== null) return `${supplier.latitude},${supplier.longitude}`;
  return [supplier.nome, supplier.cidade, supplier.uf, "Brasil"].filter(Boolean).join(", ");
}

function mapsEmbedUrl(supplier: Fornecedor | null) {
  return `https://www.google.com/maps?q=${encodeURIComponent(supplierQuery(supplier))}&output=embed`;
}

function mapsUrl(supplier: Fornecedor | null) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(supplierQuery(supplier))}`;
}

function routeUrl(workAddress: string, supplier: Fornecedor | null) {
  const params = new URLSearchParams({
    api: "1",
    travelmode: "driving",
    destination: supplierQuery(supplier),
  });
  if (workAddress.trim()) params.set("origin", workAddress.trim());
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function parseCoordinate(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function buildSupplierCode(name: string) {
  const clean = normalizeText(name).replace(/[^a-z0-9]/g, "").slice(0, 8).toUpperCase();
  return `FOR-${clean || Date.now()}`;
}
