import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { EmptyState, LoadingState } from "../../components/States";
import { useAsyncData } from "../../hooks";
import { deleteObra, listObras, upsertObra } from "../../services/admin";

export function SettingsPage() {
  const [form, setForm] = useState({ nome: "", codigo: "", centro_custo: "" });
  const [message, setMessage] = useState("");
  const { data, loading, error, refresh } = useAsyncData(listObras, []);

  if (loading) return <LoadingState label="Carregando configuracoes" />;
  if (error) return <EmptyState title="Falha ao carregar obras" description={error} />;

  async function saveObra() {
    try {
      setMessage("");
      await upsertObra({ ...form, ativo: true });
      setForm({ nome: "", codigo: "", centro_custo: "" });
      setMessage("Obra salva.");
      refresh();
    } catch (saveError) {
      setMessage((saveError as Error).message);
    }
  }

  async function removeObra(id: string, nome: string) {
    if (!window.confirm(`Excluir a obra "${nome}"?`)) return;
    try {
      setMessage("");
      await deleteObra(id);
      setMessage("Obra excluida.");
      refresh();
    } catch (deleteError) {
      setMessage((deleteError as Error).message);
    }
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
            Codigo
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
        {message ? <div className="form-note">{message}</div> : null}
      </section>
      <section className="panel">
        <DataTable
          data={data || []}
          columns={[
            { key: "nome", label: "Nome", render: (item) => item.nome },
            { key: "codigo", label: "Codigo", render: (item) => item.codigo || "-" },
            { key: "cc", label: "Centro de custo", render: (item) => item.centro_custo || "-" },
            { key: "ativo", label: "Status", render: (item) => (item.ativo ? "Ativa" : "Inativa") },
            {
              key: "delete",
              label: "Excluir",
              render: (item) => (
                <button className="danger-button danger-button--compact" type="button" onClick={() => removeObra(item.id, item.nome)}>
                  <Trash2 size={16} />
                  Excluir
                </button>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}
