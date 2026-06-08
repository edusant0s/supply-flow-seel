import { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { EmptyState, LoadingState } from "../../components/States";
import { useAsyncData } from "../../hooks";
import { listObras, upsertObra } from "../../services/admin";

export function SettingsPage() {
  const [form, setForm] = useState({ nome: "", codigo: "", centro_custo: "" });
  const { data, loading, error, refresh } = useAsyncData(listObras, []);

  if (loading) return <LoadingState label="Carregando configurações" />;
  if (error) return <EmptyState title="Falha ao carregar obras" description={error} />;

  async function saveObra() {
    await upsertObra({ ...form, ativo: true });
    setForm({ nome: "", codigo: "", centro_custo: "" });
    refresh();
  }

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Hierarquia por obra</span>
            <h2>Obras</h2>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Nome
            <input value={form.nome} onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))} />
          </label>
          <label>
            Código
            <input value={form.codigo} onChange={(event) => setForm((current) => ({ ...current, codigo: event.target.value }))} />
          </label>
          <label>
            Centro de custo
            <input value={form.centro_custo} onChange={(event) => setForm((current) => ({ ...current, centro_custo: event.target.value }))} />
          </label>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="button" onClick={saveObra}>
            <Plus size={18} />
            Salvar obra
          </button>
        </div>
      </section>
      <section className="panel">
        <DataTable
          data={data || []}
          columns={[
            { key: "nome", label: "Nome", render: (item) => item.nome },
            { key: "codigo", label: "Código", render: (item) => item.codigo || "-" },
            { key: "cc", label: "Centro de custo", render: (item) => item.centro_custo || "-" },
            { key: "ativo", label: "Status", render: (item) => (item.ativo ? "Ativa" : "Inativa") },
          ]}
        />
      </section>
    </div>
  );
}
