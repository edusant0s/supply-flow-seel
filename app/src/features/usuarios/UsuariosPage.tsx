import { useMemo, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { EmptyState, LoadingState } from "../../components/States";
import { normalizeText } from "../../lib/format";
import { roleLabel, roles } from "../../lib/permissions";
import { useAsyncData } from "../../hooks";
import { createUser, listObras, listProfiles, updateProfile } from "../../services/admin";
import type { UserRole } from "../../types";

export function UsuariosPage() {
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const users = useAsyncData(listProfiles, []);
  const obras = useAsyncData(listObras, []);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return (users.data || []).filter((profile) => [profile.nome, profile.email, profile.role].join(" ").toLowerCase().includes(q));
  }, [query, users.data]);

  if (users.loading || obras.loading) return <LoadingState label="Carregando usuários" />;
  if (users.error) return <EmptyState title="Falha ao carregar usuários" description={users.error} />;

  return (
    <div className="page-stack">
      <section className="toolbar-panel">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, e-mail ou perfil" />
        </label>
        <button className="primary-button" type="button" onClick={() => setShowForm((current) => !current)}>
          <UserPlus size={18} />
          Novo usuário
        </button>
      </section>

      {showForm ? <UserForm obras={obras.data || []} onSaved={users.refresh} /> : null}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Administração</span>
            <h2>Usuários</h2>
          </div>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { key: "nome", label: "Nome", render: (item) => item.nome },
            { key: "email", label: "E-mail", render: (item) => item.email },
            { key: "role", label: "Perfil", render: (item) => roleLabel(item.role) },
            {
              key: "ativo",
              label: "Status",
              render: (item) => (
                <button className="table-action" type="button" onClick={() => updateProfile(item.id, { ativo: !item.ativo }).then(users.refresh)}>
                  {item.ativo ? "Ativo" : "Inativo"}
                </button>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}

function UserForm({ obras, onSaved }: { obras: { id: string; nome: string }[]; onSaved: () => void }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    role: "viewer" as UserRole,
    ativo: true,
    password: "",
    obraIds: [] as string[],
  });
  const [message, setMessage] = useState("");

  async function save() {
    setMessage("");
    const result = await createUser(form);
    setMessage(result.temporary_password ? `Usuário criado. Senha temporária: ${result.temporary_password}` : "Usuário criado.");
    onSaved();
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Auth Admin API</span>
          <h2>Novo usuário</h2>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Nome
          <input value={form.nome} onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))} />
        </label>
        <label>
          E-mail
          <input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
        </label>
        <label>
          Perfil
          <select value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value as UserRole }))}>
            {roles.map((role) => (
              <option key={role} value={role}>
                {roleLabel(role)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Senha temporária
          <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="Opcional" />
        </label>
      </div>
      <div className="checkbox-grid">
        {obras.map((obra) => (
          <label key={obra.id}>
            <input
              type="checkbox"
              checked={form.obraIds.includes(obra.id)}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  obraIds: event.target.checked ? [...current.obraIds, obra.id] : current.obraIds.filter((id) => id !== obra.id),
                }))
              }
            />
            {obra.nome}
          </label>
        ))}
      </div>
      {message ? <div className="form-note">{message}</div> : null}
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={save}>
          Criar usuário
        </button>
      </div>
    </section>
  );
}
