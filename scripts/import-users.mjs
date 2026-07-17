import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as XLSX from "@e965/xlsx";
import { createClient } from "@supabase/supabase-js";

const VALID_ROLES = new Set([
  "super_admin",
  "admin_suprimentos",
  "admin_orcamentos",
  "admin_contratos",
  "viewer_global",
  "viewer",
]);

const args = parseArgs(process.argv.slice(2));
loadEnvFile("app/.env");
loadEnvFile(".env");
loadEnvFile(".env.local");

const file = args.file || args.f;
const dryRun = Boolean(args["dry-run"]);
const confirmed = Boolean(args.yes);
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!file) {
  fail("Informe a planilha com --file caminho/usuarios.xlsx");
}

const rows = readUsers(file);
let parsedRows = rows.map((row, index) => mapUserRow(row, index + 2));
let errors = getRowErrors(parsedRows);
const roleCounts = parsedRows.reduce((acc, row) => {
  acc[row.role] = (acc[row.role] || 0) + 1;
  return acc;
}, {});

console.log(`Planilha: ${resolve(file)}`);
console.log(`Usuarios encontrados: ${parsedRows.length}`);
console.log(`Resumo por perfil: ${JSON.stringify(roleCounts)}`);

if (errors.length) {
  console.error("Erros de validacao:");
  errors.slice(0, 80).forEach((error) => console.error(`- ${error}`));
  if (errors.length > 80) console.error(`- ...mais ${errors.length - 80} erro(s)`);
  process.exitCode = 1;
  process.exit();
}

if (dryRun) {
  console.log("Dry-run concluido. Nenhum dado foi gravado.");
  process.exit();
}

if (!confirmed) {
  fail("Importacao real bloqueada. Rode novamente com --yes depois de revisar o resumo.");
}

if (!supabaseUrl || !serviceRoleKey) {
  fail("Defina SUPABASE_SERVICE_ROLE_KEY e SUPABASE_URL ou VITE_SUPABASE_URL somente no ambiente local antes de importar.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const obras = await listAll("obras", "id,nome,codigo,centro_custo");
parsedRows = rows.map((row, index) => mapUserRow(row, index + 2, obras));
errors = getRowErrors(parsedRows);
if (errors.length) {
  console.error("Erros de validacao com base nas obras cadastradas:");
  errors.slice(0, 80).forEach((error) => console.error(`- ${error}`));
  if (errors.length > 80) console.error(`- ...mais ${errors.length - 80} erro(s)`);
  process.exit(1);
}

const existingProfiles = await listAll("profiles", "id,nome,email,role,ativo");
const existingByEmail = new Map(existingProfiles.map((profile) => [String(profile.email).toLowerCase(), profile]));
const authByEmail = await listAuthUsersByEmail();

const results = [];
for (const row of parsedRows) {
  const existingProfile = existingByEmail.get(row.email);
  const existingAuthUser = authByEmail.get(row.email);
  let userId = existingProfile?.id || existingAuthUser?.id;
  let action = "atualizado";

  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: row.email,
      password: row.password || randomPassword(),
      email_confirm: true,
      user_metadata: { nome: row.nome },
    });
    if (error || !data.user) {
      results.push(`Linha ${row.row}: erro ao criar auth (${error?.message || "sem retorno"})`);
      continue;
    }
    userId = data.user.id;
    action = "criado";
  } else if (existingAuthUser) {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      email: row.email,
      user_metadata: { nome: row.nome },
    });
    if (error) {
      results.push(`Linha ${row.row}: erro ao atualizar auth (${error.message})`);
      continue;
    }
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    nome: row.nome,
    email: row.email,
    role: row.role,
    ativo: row.ativo,
  });

  if (profileError) {
    results.push(`Linha ${row.row}: erro em profiles (${profileError.message})`);
    continue;
  }

  const { error: deleteError } = await supabase.from("user_obras").delete().eq("user_id", userId);
  if (deleteError) {
    results.push(`Linha ${row.row}: erro ao limpar obras (${deleteError.message})`);
    continue;
  }

  if (row.obraIds.length) {
    const { error: obraError } = await supabase
      .from("user_obras")
      .insert(row.obraIds.map((obra_id) => ({ user_id: userId, obra_id })));
    if (obraError) {
      results.push(`Linha ${row.row}: erro ao vincular obras (${obraError.message})`);
      continue;
    }
  }

  results.push(`Linha ${row.row}: ${action}`);
}

console.log(results.join("\n"));
console.log("Importacao finalizada.");

function readUsers(path) {
  const workbook = XLSX.read(readFileSync(path), { type: "buffer", cellDates: true });
  const sheetName = workbook.SheetNames.find((name) => headerKey(name) === "usuarios") || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { defval: "", raw: false }).filter((row) =>
    Object.values(row).some((value) => String(value ?? "").trim())
  );
}

function mapUserRow(row, rowNumber, obras = []) {
  const nome = getCell(row, ["nome", "usuario", "usuário", "name"]);
  const email = getCell(row, ["email", "e-mail", "mail"]).toLowerCase();
  const rawRole = getCell(row, ["perfil", "permissao", "permissão", "role"]);
  const explicitAllObras = parseBoolean(getCell(row, ["todas as obras", "todas obras", "global", "ver todas"]));
  const role = parseRole(rawRole, explicitAllObras);
  const allObras = explicitAllObras || role === "viewer_global";
  const ativo = parseBoolean(getCell(row, ["ativo", "status", "active"]), true);
  const password = getCell(row, ["senha", "senha temporaria", "senha temporária", "password"]);
  const obraValue = getCell(row, ["obra_ids", "obra id", "id obras", "obras", "obra", "obras permitidas", "obra permitida"]);
  const obraIds = allObras ? [] : findObraIds(obraValue, obras);
  const errors = [];

  if (!nome) errors.push("nome obrigatorio");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("email invalido");
  if (!VALID_ROLES.has(role)) errors.push("perfil invalido");
  if (role === "viewer" && !obraValue) errors.push("viewer precisa de obra ou viewer_global");
  if (role === "viewer" && obraValue && obras.length && !obraIds.length) errors.push("obra nao encontrada para viewer");

  return { row: rowNumber, nome, email, role, ativo, password, obraIds, errors };
}

function getRowErrors(rows) {
  return rows.flatMap((row) => row.errors.map((message) => `Linha ${row.row}: ${message}`));
}

function findObraIds(value, obras) {
  const tokens = value
    .split(/[;,|]/)
    .map((item) => headerKey(item))
    .filter(Boolean);
  if (!tokens.length) return [];
  if (!obras.length) return tokens;

  return obras
    .filter((obra) =>
      tokens.some((token) =>
        [obra.id, obra.nome, obra.codigo, obra.centro_custo]
          .filter(Boolean)
          .map((candidate) => headerKey(candidate))
          .some((candidate) => candidate === token || (candidate.length >= 3 && token.includes(candidate)))
      )
    )
    .map((obra) => obra.id);
}

function parseRole(value, allObras) {
  const normalized = headerKey(value);
  if (normalized.includes("super")) return "super_admin";
  if (normalized.includes("suprimento")) return "admin_suprimentos";
  if (normalized.includes("orcamento")) return "admin_orcamentos";
  if (normalized.includes("contrato")) return "admin_contratos";
  if (normalized.includes("global") || allObras) return "viewer_global";
  return "viewer";
}

function parseBoolean(value, fallback = false) {
  const normalized = headerKey(value);
  if (!normalized) return fallback;
  return ["sim", "s", "true", "1", "ativo", "ativa", "yes", "x", "todas"].includes(normalized);
}

function getCell(row, aliases) {
  const wanted = aliases.map(headerKey);
  const entry = Object.entries(row).find(([key]) => wanted.includes(headerKey(key)));
  return String(entry?.[1] ?? "").trim();
}

function headerKey(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  return Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function listAll(table, select) {
  const pageSize = 1000;
  const records = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase.from(table).select(select).range(from, from + pageSize - 1);
    if (error) throw error;
    records.push(...(data || []));
    if (!data || data.length < pageSize) break;
  }
  return records;
}

async function listAuthUsersByEmail() {
  const users = new Map();
  for (let page = 1; ; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    (data.users || []).forEach((user) => {
      if (user.email) users.set(user.email.toLowerCase(), user);
    });
    if (!data.users || data.users.length < 1000) break;
  }
  return users;
}

function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) {
      result._ = [...(result._ || []), item];
      continue;
    }
    const [rawKey, inlineValue] = item.slice(2).split("=");
    const next = argv[index + 1];
    if (inlineValue !== undefined) {
      result[rawKey] = inlineValue;
    } else if (next && !next.startsWith("--")) {
      result[rawKey] = next;
      index += 1;
    } else {
      result[rawKey] = true;
    }
  }
  return result;
}

function loadEnvFile(path) {
  try {
    const content = readFileSync(path, "utf8");
    content.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) return;
      const [, key, rawValue] = match;
      if (process.env[key]) return;
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    });
  } catch {
    // Optional local file.
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
