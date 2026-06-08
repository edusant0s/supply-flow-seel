import { useMemo, useState } from "react";
import { Download, Plus, Search, UploadCloud } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { ImportWizard } from "../../components/ImportWizard";
import { KanbanBoard } from "../../components/KanbanBoard";
import { KpiCard } from "../../components/KpiCard";
import { RoleGate } from "../../components/RoleGate";
import { EmptyState, LoadingState } from "../../components/States";
import { useAuth } from "../../contexts/AuthContext";
import { formatDateBr, normalizeText, slaColorByDueDate } from "../../lib/format";
import { canManage } from "../../lib/permissions";
import { exportToXlsx } from "../../lib/spreadsheet";
import { useAsyncData } from "../../hooks";
import { listObras } from "../../services/admin";
import { insertEntity, listEntities, updateEntity } from "../../services/entities";
import type { Contrato } from "../../types";

const statuses = [
  ["Não Iniciado", "Não iniciado"],
  ["Em Elaboração", "Em elaboração"],
  ["Aguardando Validação", "Aguardando validação"],
  ["Enviado para Assinatura", "Enviado para assinatura"],
  ["Contrato Assinado", "Contrato assinado"],
  ["Em Cadastro no Compor", "Cadastro no Compor"],
  ["Aprovado no Compor", "Aprovado no Compor"],
];

const contractFields = [
  ["Dados iniciais", ["solicitante", "email_solicitante", "centro_custo", "un_negocios", "tipo_documento", "urgencia", "prazo_urgencia"]],
  ["Fornecedor", ["nome_fornecedor", "cnpj_cpf", "razao_social", "representante_legal", "email_representante", "telefone"]],
  ["Contrato", ["tipo_contrato", "objeto_contrato", "forma_assinatura", "cnpj_seel", "observacao"]],
  ["Valores e pagamento", ["inicio_vigencia", "termino_vigencia", "valor_contratual", "forma_pagamento", "dados_bancarios"]],
  ["Aditivo/Compor", ["numero_aditivo", "motivo_aditivo", "fase_compor", "link_checklist"]],
] as const;

export function ContratosPage() {
  const { profile } = useAuth();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const { data, loading, error, refresh } = useAsyncData(() => listEntities("contratos"), []);
  const canEdit = canManage(profile?.role, "contratos");

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return (data || []).filter((item) =>
      [item.solicitante, item.email_solicitante, item.centro_custo, item.tipo_documento, item.urgencia, item.status, item.fase_compor]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, query]);

  if (loading) return <LoadingState label="Carregando contratos" />;
  if (error) return <EmptyState title="Falha ao carregar contratos" description={error} />;

  return (
    <div className="page-stack">
      <section className="toolbar-panel">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar solicitante, centro de custo, tipo ou fase" />
        </label>
        <button
          className="secondary-button"
          type="button"
          onClick={() =>
            exportToXlsx(
              filtered.map((item) => ({
                Solicitante: item.solicitante,
                Email: item.email_solicitante,
                CentroCusto: item.centro_custo,
                TipoDocumento: item.tipo_documento,
                Urgencia: item.urgencia,
                Prazo: formatDateBr(item.prazo_urgencia),
                Status: item.status,
                FaseCompor: item.fase_compor,
              })),
              `contratos-${new Date().toISOString().slice(0, 10)}.xlsx`
            )
          }
        >
          <Download size={18} />
          Exportar
        </button>
        <button className="secondary-button" type="button" onClick={() => setShowForm((current) => !current)}>
          <Plus size={18} />
          Solicitar contrato
        </button>
        <RoleGate module="contratos">
          <button className="primary-button" type="button" onClick={() => setShowImport((current) => !current)}>
            <UploadCloud size={18} />
            Importar
          </button>
        </RoleGate>
      </section>

      <section className="kpi-grid">
        <KpiCard title="Solicitações" value={filtered.length} />
        <KpiCard title="Assinados" value={filtered.filter((item) => item.status === "Contrato Assinado").length} tone="success" />
        <KpiCard title="Compor" value={filtered.filter((item) => item.status?.includes("Compor")).length} tone="blue" />
        <KpiCard title="Críticos" value={filtered.filter((item) => item.urgencia === "Crítica").length} tone="danger" />
      </section>

      {showForm ? <ContratoForm onSaved={refresh} /> : null}
      {showImport ? <ImportWizard kind="contratos" onComplete={refresh} /> : null}

      <KanbanBoard
        columns={statuses.map(([key, title]) => ({
          key,
          title,
          items: filtered.filter((item) => (item.status || "Não Iniciado") === key),
        }))}
        canDrag={canEdit}
        onMove={(id, status) => updateEntity("contratos", id, { status, fase_compor: status.includes("Compor") ? status : undefined }).then(refresh)}
        renderCard={(item: Contrato) => (
          <>
            <div className="card-topline">
              <strong>{item.tipo_documento || "Contrato"}</strong>
              <span className={`status-dot status-dot--${slaColorByDueDate(item.prazo_urgencia)}`} />
            </div>
            <p>{item.solicitante || "Solicitante não informado"}</p>
            <div className="card-meta">
              <span>{item.urgencia || "Média"}</span>
              <span>{formatDateBr(item.prazo_urgencia)}</span>
            </div>
          </>
        )}
      />

      <DataTable
        data={filtered.slice(0, 50)}
        columns={[
          { key: "solicitante", label: "Solicitante", render: (item) => item.solicitante || "-" },
          { key: "tipo", label: "Tipo", render: (item) => item.tipo_documento || "-" },
          { key: "urgencia", label: "Urgência", render: (item) => item.urgencia || "-" },
          { key: "prazo", label: "Prazo", render: (item) => formatDateBr(item.prazo_urgencia) },
          { key: "status", label: "Status", render: (item) => item.status },
        ]}
      />
    </div>
  );
}

function ContratoForm({ onSaved }: { onSaved: () => void }) {
  const obras = useAsyncData(listObras, []);
  const [form, setForm] = useState<Record<string, string>>({
    obra_id: "",
    urgencia: "Média",
    tipo_documento: "Contrato novo",
  });
  const [message, setMessage] = useState("");

  async function save() {
    setMessage("");
    if (!form.obra_id && (obras.data || []).length) {
      setMessage("Selecione a obra da solicitação.");
      return;
    }
    await insertEntity("contratos", {
      obra_id: form.obra_id || null,
      solicitante: form.solicitante || null,
      email_solicitante: form.email_solicitante || null,
      centro_custo: form.centro_custo || null,
      tipo_documento: form.tipo_documento || "Contrato novo",
      urgencia: form.urgencia || "Média",
      prazo_urgencia: form.prazo_urgencia || null,
      status: "Não Iniciado",
      fase_compor: form.fase_compor || null,
      payload: form,
    });
    setMessage("Contrato criado.");
    onSaved();
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Formulário de solicitação</span>
          <h2>Contrato</h2>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Obra
          <select value={form.obra_id || ""} onChange={(event) => setForm((current) => ({ ...current, obra_id: event.target.value }))}>
            <option value="">Selecione a obra</option>
            {(obras.data || []).map((obra) => (
              <option key={obra.id} value={obra.id}>
                {obra.nome}
              </option>
            ))}
          </select>
        </label>
      </div>
      {contractFields.map(([section, fields]) => (
        <div className="form-section" key={section}>
          <h3>{section}</h3>
          <div className="form-grid">
            {fields.map((field) => (
              <label key={field}>
                {field.replaceAll("_", " ")}
                <input
                  type={field.includes("email") ? "email" : field.includes("prazo") || field.includes("vigencia") ? "date" : "text"}
                  value={form[field] || ""}
                  onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
      {message ? <div className="form-note">{message}</div> : null}
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={save}>
          Enviar solicitação
        </button>
      </div>
    </section>
  );
}
