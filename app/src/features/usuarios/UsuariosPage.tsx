import { useMemo, useState } from "react";
import { Download, Search, ShieldCheck, UploadCloud, UserPlus } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { EmptyState, LoadingState } from "../../components/States";
import { headerKey, normalizeText } from "../../lib/format";
import { roleLabel, roles } from "../../lib/permissions";
import { readSpreadsheet, type RawRow } from "../../lib/spreadsheet";
import { useAsyncData } from "../../hooks";
import { createUser, listObras, listProfiles, listUserObraLinks, setUserObras, updateProfile } from "../../services/admin";
import type { Obra, Profile, UserRole } from "../../types";

type UserFormState = {
  nome: string;
  email: string;
  role: UserRole;
  ativo: boolean;
  password: string;
  obraIds: string[];
  allObras: boolean;
};

type BulkUserRow = {
  row: number;
  nome: string;
  email: string;
  role: UserRole;
  ativo: boolean;
  password: string;
  obraIds: string[];
  allObras: boolean;
  errors: string[];
};

export function UsuariosPage() {
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const users = useAsyncData(listProfiles, []);
  const obras = useAsyncData(listObras, []);
  const userObras = useAsyncData(listUserObraLinks, []);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return (users.data || []).filter((profile) => [profile.nome, profile.email, profile.role].join(" ").toLowerCase().includes(q));
  }, [query, users.data]);

  const linksByUser = useMemo(() => {
    const map = new Map<string, string[]>();
    (userObras.data || []).forEach((link) => {
      map.set(link.user_id, [...(map.get(link.user_id) || []), link.obra_id]);
    });
    return map;
  }, [userObras.data]);

  function refreshAll() {
    users.refresh();
    userObras.refresh();
  }

  if (users.loading || obras.loading || userObras.loading) return <LoadingState label="Carregando usuarios" />;
  if (users.error) return <EmptyState title="Falha ao carregar usuarios" description={users.error} />;
  if (obras.error) return <EmptyState title="Falha ao carregar obras" description={obras.error} />;
  if (userObras.error) return <EmptyState title="Falha ao carregar permissoes" description={userObras.error} />;

  const selectedUser = (users.data || []).find((user) => user.id === selectedUserId) || null;

  return (
    <div className="page-stack">
      <section className="toolbar-panel toolbar-panel--wrap">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, e-mail ou perfil" />
        </label>
        <button className="secondary-button" type="button" onClick={() => setShowImport((current) => !current)}>
          <UploadCloud size={18} />
          Importar usuarios
        </button>
        <a className="secondary-button" href="/modelo-importacao-usuarios.xlsx" download>
          <Download size={18} />
          Baixar modelo
        </a>
        <button className="primary-button" type="button" onClick={() => setShowForm((current) => !current)}>
          <UserPlus size={18} />
          Novo usuario
        </button>
      </section>

      {showForm ? <UserForm obras={obras.data || []} onSaved={refreshAll} /> : null}
      {showImport ? <BulkUserImport obras={obras.data || []} existingProfiles={users.data || []} onSaved={refreshAll} /> : null}
      {selectedUser ? (
        <UserPermissionsEditor
          key={selectedUser.id}
          profile={selectedUser}
          obras={obras.data || []}
          initialObraIds={linksByUser.get(selectedUser.id) || []}
          onClose={() => setSelectedUserId(null)}
          onSaved={refreshAll}
        />
      ) : null}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Administracao</span>
            <h2>Usuarios</h2>
          </div>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { key: "nome", label: "Nome", render: (item) => item.nome },
            { key: "email", label: "E-mail", render: (item) => item.email },
            { key: "role", label: "Perfil", render: (item) => roleLabel(item.role) },
            {
              key: "escopo",
              label: "Obras",
              render: (item) =>
                item.role === "viewer_global"
                  ? "Todas"
                  : `${linksByUser.get(item.id)?.length || 0} obra(s)`,
            },
            {
              key: "ativo",
              label: "Status",
              render: (item) => (
                <button className="table-action" type="button" onClick={() => updateProfile(item.id, { ativo: !item.ativo }).then(refreshAll)}>
                  {item.ativo ? "Ativo" : "Inativo"}
                </button>
              ),
            },
            {
              key: "permissoes",
              label: "Permissoes",
              render: (item) => (
                <button className="table-action" type="button" onClick={() => setSelectedUserId(item.id)}>
                  <ShieldCheck size={16} />
                  Editar
                </button>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}

function UserForm({ obras, onSaved }: { obras: Obra[]; onSaved: () => void }) {
  const [form, setForm] = useState<UserFormState>({
    nome: "",
    email: "",
    role: "viewer",
    ativo: true,
    password: "",
    obraIds: [],
    allObras: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);
  const effectiveRole = getScopedRole(form.role, form.allObras);

  async function save() {
    setMessage("");
    const validationMessage = validateNewUser(form, effectiveRole);
    if (validationMessage) {
      setMessageType("error");
      setMessage(validationMessage);
      return;
    }

    setSaving(true);
    try {
      const result = await createUser({
        ...form,
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim() || undefined,
        role: effectiveRole,
        obraIds: form.allObras ? [] : form.obraIds,
      });
      setMessageType("success");
      setMessage(result.temporary_password ? `Usuario criado. Senha temporaria: ${result.temporary_password}` : "Usuario criado.");
      setForm({
        nome: "",
        email: "",
        role: "viewer",
        ativo: true,
        password: "",
        obraIds: [],
        allObras: false,
      });
      onSaved();
    } catch (err) {
      setMessageType("error");
      setMessage(getErrorMessage(err, "Falha ao enviar usuario."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Auth Admin API</span>
          <h2>Novo usuario</h2>
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
          <select
            value={form.role}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                role: event.target.value as UserRole,
                allObras: event.target.value === "viewer_global" ? true : current.allObras,
              }))
            }
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {roleLabel(role)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Senha temporaria
          <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="Opcional" />
        </label>
      </div>
      <label className="toggle-row">
        <input
          type="checkbox"
          checked={form.allObras}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              allObras: event.target.checked,
              role: event.target.checked && current.role === "viewer" ? "viewer_global" : !event.target.checked && current.role === "viewer_global" ? "viewer" : current.role,
              obraIds: event.target.checked ? [] : current.obraIds,
            }))
          }
        />
        Visualizar todas as obras
      </label>
      {!form.allObras ? <ObraCheckboxes obras={obras} selected={form.obraIds} onChange={(obraIds) => setForm((current) => ({ ...current, obraIds }))} /> : null}
      {message ? <div className={messageType === "error" ? "form-error" : "form-note"}>{message}</div> : null}
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={save} disabled={saving}>
          {saving ? "Enviando..." : "Enviar usuario"}
        </button>
      </div>
    </section>
  );
}

function validateNewUser(form: UserFormState, effectiveRole: UserRole) {
  if (!form.nome.trim()) return "Informe o nome do usuario.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Informe um e-mail valido.";
  if (!form.allObras && effectiveRole === "viewer" && !form.obraIds.length) return "Selecione ao menos uma obra ou marque visualizar todas as obras.";
  return "";
}

function UserPermissionsEditor({
  profile,
  obras,
  initialObraIds,
  onClose,
  onSaved,
}: {
  profile: Profile;
  obras: Obra[];
  initialObraIds: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [role, setRole] = useState<UserRole>(profile.role);
  const [ativo, setAtivo] = useState(profile.ativo);
  const [allObras, setAllObras] = useState(profile.role === "viewer_global");
  const [obraIds, setObraIds] = useState(initialObraIds);
  const [message, setMessage] = useState("");

  async function save() {
    const nextRole = getScopedRole(role, allObras);
    await updateProfile(profile.id, { role: nextRole, ativo });
    await setUserObras(profile.id, allObras ? [] : obraIds);
    setMessage("Permissoes salvas.");
    onSaved();
  }

  return (
    <section className="panel access-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Permissoes</span>
          <h2>{profile.nome}</h2>
        </div>
        <button className="secondary-button" type="button" onClick={onClose}>
          Fechar
        </button>
      </div>
      <div className="form-grid">
        <label>
          Perfil
          <select
            value={role}
            onChange={(event) => {
              const nextRole = event.target.value as UserRole;
              setRole(nextRole);
              if (nextRole === "viewer_global") setAllObras(true);
            }}
          >
            {roles.map((item) => (
              <option key={item} value={item}>
                {roleLabel(item)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={ativo ? "ativo" : "inativo"} onChange={(event) => setAtivo(event.target.value === "ativo")}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </label>
      </div>
      <label className="toggle-row">
        <input
          type="checkbox"
          checked={allObras}
          onChange={(event) => {
            setAllObras(event.target.checked);
            if (event.target.checked && role === "viewer") setRole("viewer_global");
            if (!event.target.checked && role === "viewer_global") setRole("viewer");
          }}
        />
        Visualizar todas as obras
      </label>
      {!allObras ? <ObraCheckboxes obras={obras} selected={obraIds} onChange={setObraIds} /> : null}
      {message ? <div className="form-note">{message}</div> : null}
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={save}>
          Salvar permissoes
        </button>
      </div>
    </section>
  );
}

function BulkUserImport({ obras, existingProfiles, onSaved }: { obras: Obra[]; existingProfiles: Profile[]; onSaved: () => void }) {
  const [rows, setRows] = useState<BulkUserRow[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadFile(file: File | null) {
    if (!file) return;
    setMessage("");
    const rawRows = await readSpreadsheet(file);
    setRows(rawRows.map((row, index) => mapBulkUserRow(row, index + 2, obras)));
  }

  async function importUsers() {
    setBusy(true);
    setMessage("");
    const results: string[] = [];
    const existingByEmail = new Map(existingProfiles.map((profile) => [profile.email.toLowerCase(), profile]));

    for (const row of rows) {
      if (row.errors.length) {
        results.push(`Linha ${row.row}: ${row.errors.join(", ")}`);
        continue;
      }

      const role = getScopedRole(row.role, row.allObras);
      const obraIds = row.allObras ? [] : row.obraIds;
      const existing = existingByEmail.get(row.email.toLowerCase());

      try {
        if (existing) {
          await updateProfile(existing.id, { nome: row.nome || existing.nome, role, ativo: row.ativo });
          await setUserObras(existing.id, obraIds);
          results.push(`Linha ${row.row}: atualizado`);
        } else {
          const created = await createUser({ nome: row.nome, email: row.email, role, ativo: row.ativo, obraIds, password: row.password });
          results.push(created.temporary_password ? `Linha ${row.row}: criado com senha temporaria` : `Linha ${row.row}: criado`);
        }
      } catch (error) {
        results.push(`Linha ${row.row}: ${(error as Error).message}`);
      }
    }

    setBusy(false);
    setMessage(results.join("\n"));
    onSaved();
  }

  const validRows = rows.filter((row) => !row.errors.length).length;

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Importacao em massa</span>
          <h2>Usuarios</h2>
        </div>
      </div>
      <div className="toolbar-panel toolbar-panel--wrap toolbar-panel--flat">
        <input type="file" accept=".xlsx,.xls,.csv" onChange={(event) => loadFile(event.target.files?.[0] || null)} />
        <button className="primary-button" type="button" disabled={!validRows || busy} onClick={importUsers}>
          <UploadCloud size={18} />
          Importar {validRows || 0}
        </button>
      </div>
      {rows.length ? (
        <DataTable
          data={rows.slice(0, 40)}
          columns={[
            { key: "row", label: "Linha", render: (item) => item.row },
            { key: "nome", label: "Nome", render: (item) => item.nome || "-" },
            { key: "email", label: "E-mail", render: (item) => item.email || "-" },
            { key: "role", label: "Perfil", render: (item) => roleLabel(getScopedRole(item.role, item.allObras)) },
            { key: "obras", label: "Obras", render: (item) => (item.allObras ? "Todas" : `${item.obraIds.length} obra(s)`) },
            { key: "erros", label: "Erros", render: (item) => item.errors.join(", ") || "-" },
          ]}
        />
      ) : null}
      {message ? <pre className="import-results">{message}</pre> : null}
    </section>
  );
}

function ObraCheckboxes({ obras, selected, onChange }: { obras: Obra[]; selected: string[]; onChange: (obraIds: string[]) => void }) {
  return (
    <div className="checkbox-grid">
      {obras.map((obra) => (
        <label key={obra.id}>
          <input
            type="checkbox"
            checked={selected.includes(obra.id)}
            onChange={(event) => onChange(event.target.checked ? [...selected, obra.id] : selected.filter((id) => id !== obra.id))}
          />
          {obra.nome}
        </label>
      ))}
    </div>
  );
}

function mapBulkUserRow(row: RawRow, rowNumber: number, obras: Obra[]): BulkUserRow {
  const nome = getCell(row, ["nome", "usuario", "usuário", "name"]);
  const email = getCell(row, ["email", "e-mail", "mail"]);
  const rawRole = getCell(row, ["perfil", "permissao", "permissão", "role"]);
  const explicitAllObras = parseBoolean(getCell(row, ["todas as obras", "todas obras", "global", "ver todas"]));
  const role = parseRole(rawRole, explicitAllObras);
  const allObras = explicitAllObras || role === "viewer_global";
  const ativo = parseBoolean(getCell(row, ["ativo", "status", "active"]), true);
  const password = getCell(row, ["senha", "senha temporaria", "senha temporária", "password"]);
  const obraIds = allObras ? [] : findObraIds(getCell(row, ["obras", "obra", "obras permitidas", "obra permitida"]), obras);
  const errors: string[] = [];

  if (!nome) errors.push("nome obrigatorio");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("e-mail invalido");
  if (!allObras && role === "viewer" && !obraIds.length) errors.push("viewer sem obra");

  return { row: rowNumber, nome, email, role, ativo, password, obraIds, allObras, errors };
}

function getCell(row: RawRow, aliases: string[]) {
  const wanted = aliases.map(headerKey);
  const found = Object.entries(row).find(([key]) => wanted.includes(headerKey(key)));
  return String(found?.[1] ?? "").trim();
}

function parseRole(value: string, allObras: boolean): UserRole {
  const normalized = headerKey(value);
  if (normalized.includes("super")) return "super_admin";
  if (normalized.includes("suprimento")) return "admin_suprimentos";
  if (normalized.includes("orcamento")) return "admin_orcamentos";
  if (normalized.includes("contrato")) return "admin_contratos";
  if (normalized.includes("global") || allObras) return "viewer_global";
  return "viewer";
}

function parseBoolean(value: string, fallback = false) {
  const normalized = headerKey(value);
  if (!normalized) return fallback;
  return ["sim", "s", "true", "1", "ativo", "ativa", "yes", "x", "todas"].includes(normalized);
}

function findObraIds(value: string, obras: Obra[]) {
  const parts = value
    .split(/[;,|]/)
    .map((item) => headerKey(item))
    .filter(Boolean);

  return obras
    .filter((obra) =>
      parts.some((part) =>
        [obra.id, obra.nome, obra.codigo, obra.centro_custo]
          .filter(Boolean)
          .map((candidate) => headerKey(candidate))
          .some((candidate) => candidate === part || (candidate.length >= 3 && part.includes(candidate)))
      )
    )
    .map((obra) => obra.id);
}

function getScopedRole(role: UserRole, allObras: boolean): UserRole {
  if (allObras && role === "viewer") return "viewer_global";
  if (!allObras && role === "viewer_global") return "viewer";
  return role;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (message) return String(message);
  }
  return fallback;
}
