import * as XLSX from "@e965/xlsx";
import type { ImportKind, Obra } from "../types";
import { headerKey, parseMoney, toIsoDate } from "./format";

export type RawRow = Record<string, unknown>;

export type ImportMappingResult<T extends RawRow> = {
  records: T[];
  errors: { row: number; message: string; payload: RawRow }[];
};

export async function readSpreadsheet(file: File) {
  const isCsv = file.name.toLowerCase().endsWith(".csv");
  const workbook = isCsv
    ? XLSX.read(await file.text(), { type: "string", raw: true })
    : XLSX.read(await file.arrayBuffer(), { type: "array", cellDates: true });

  const rows: RawRow[] = [];
  workbook.SheetNames.forEach((sheetName) => {
    if (headerKey(sheetName) === "menuprincipal") return;
    const worksheet = workbook.Sheets[sheetName];
    const matrix = XLSX.utils.sheet_to_json<unknown[]>(worksheet, { header: 1, defval: "", blankrows: false });
    const headerRowIndex = findHeaderRow(matrix);
    const sheetRows = XLSX.utils.sheet_to_json<RawRow>(worksheet, { defval: "", range: headerRowIndex });
    sheetRows
      .filter((row) => Object.values(row).some((value) => text(value)))
      .forEach((row) => rows.push({ ...row, Categoria: text(row.Categoria) || sheetName, _sheet: sheetName }));
  });
  return rows;
}

export function exportToXlsx(rows: RawRow[], filename: string, sheet = "Dados") {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheet);
  XLSX.writeFile(workbook, filename);
}

function pick(row: RawRow, aliases: string[]) {
  const wanted = aliases.map(headerKey);
  const found = Object.entries(row).find(([key]) => wanted.includes(headerKey(key)));
  return found ? found[1] : "";
}

function hasColumn(row: RawRow, aliases: string[]) {
  const wanted = aliases.map(headerKey);
  return Object.keys(row).some((key) => wanted.includes(headerKey(key)));
}

function findHeaderRow(rows: unknown[][]) {
  const headerSignals = new Set([
    "numrm",
    "rm",
    "codigo",
    "nome",
    "nomedofornecedor",
    "fornecedor",
    "cidade",
    "uf",
    "estado",
    "numeroproposta",
    "proposta",
    "solicitante",
  ]);

  for (let index = 0; index < Math.min(rows.length, 20); index += 1) {
    const keys = rows[index].map(headerKey).filter(Boolean);
    const score = keys.filter((key) => headerSignals.has(key)).length;
    if (score >= 2 || keys.includes("numrm") || keys.includes("nomedofornecedor")) return index;
  }

  return 0;
}

function text(value: unknown) {
  return String(value ?? "").trim();
}

function boolFrom(value: unknown) {
  const raw = text(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return ["sim", "s", "ativo", "true", "1", "yes"].includes(raw);
}

function matchObra(row: RawRow, obras: Obra[]) {
  const raw = text(pick(row, ["obra", "nome da obra", "centro de custo", "descrição centro custo", "descricao centro custo", "centro custo", "cc", "local obra"]));
  if (!raw) return null;
  const normalized = headerKey(raw);
  return (
    obras.find((obra) =>
      [obra.id, obra.nome, obra.codigo, obra.centro_custo].filter(Boolean).some((value) => {
        const candidate = headerKey(value);
        if (!candidate) return false;
        if (candidate === normalized) return true;
        return candidate.length >= 3 && normalized.includes(candidate);
      })
    )?.id || null
  );
}

export function mapRowsForImport(kind: ImportKind, rows: RawRow[], obras: Obra[]): ImportMappingResult<RawRow> {
  const errors: ImportMappingResult<RawRow>["errors"] = [];
  const records = rows
    .map((row, index) => {
      const obra_id = matchObra(row, obras);

      if (kind === "requisicoes") {
        const numero_rm = text(pick(row, ["num rm", "rm", "requisicao", "requisição", "numero", "número"]));
        if (!numero_rm && !text(pick(row, ["descrição item", "descricao item", "produto"]))) {
          errors.push({ row: index + 2, message: "Linha sem número de RM ou descrição.", payload: row });
          return null;
        }
        const assinaturaAliases = ["data assinatura rm", "data assinatura", "dt assinatura", "assinatura rm", "assinatura", "data aprovacao", "data aprovação"];
        const assinaturaColumnExists = hasColumn(row, assinaturaAliases);
        const dataAssinatura = toIsoDate(pick(row, assinaturaAliases));
        const spreadsheetStatus = text(pick(row, ["fase rm", "última fase", "ultima fase", "fase", "status"])) || "RM";
        return {
          numero_rm: numero_rm || null,
          obra_id,
          centro_custo: text(pick(row, ["centro de custo", "descrição centro custo", "centro custo", "cc"])),
          solicitante: text(pick(row, ["solicitante rm", "solicitante", "nome solicitante", "criador", "requisitante"])),
          comprador: text(pick(row, ["comprador", "nome comprador"])) || "Sem comprador",
          categoria: text(pick(row, ["categoria item", "filial", "categoria"])),
          status: assinaturaColumnExists && !dataAssinatura ? "PENDENTE_ASSINATURA" : spreadsheetStatus,
          prioridade: text(pick(row, ["tipo rm", "urgente", "prioridade"])) || "Normal",
          data_inclusao: toIsoDate(pick(row, ["data rm", "data inclusão item", "data inclusao item", "emissão", "emissao"])),
          data_necessidade: toIsoDate(pick(row, ["data entrega rm", "data entrega", "prazo", "data necessidade", "entrega"])),
          payload: row,
        };
      }

      if (kind === "orcamentos") {
        const numero_proposta = text(
          pick(row, ["numero proposta", "número proposta", "numero da proposta", "proposta", "pp", "id", "codigo"])
        );
        if (!numero_proposta) {
          errors.push({ row: index + 2, message: "Linha sem número da proposta.", payload: row });
          return null;
        }
        const valorFinal = parseMoney(pick(row, ["valor final", "spend", "valor", "valor fechamento"]));
        const saving = parseMoney(pick(row, ["saving", "economia"]));
        return {
          obra_id,
          numero_proposta,
          nome_solicitante: text(pick(row, ["nome do solicitante", "solicitante", "responsavel", "responsável"])),
          email_solicitante: text(pick(row, ["email do solicitante", "e-mail do solicitante", "email", "e-mail"])),
          cliente: text(pick(row, ["cliente"])),
          local_obra: text(pick(row, ["local da obra", "local", "endereco", "endereço", "obra"])),
          tipo_orcamento: text(pick(row, ["tipo de orçamento", "tipo de orcamento", "tipo"])),
          status: text(pick(row, ["status", "situacao", "situação", "etapa"])) || "nao_iniciado",
          data_solicitacao: toIsoDate(pick(row, ["data solicitação", "data solicitacao", "data", "abertura"])),
          data_entrega_cotacoes: toIsoDate(pick(row, ["data entrega cotações", "data entrega cotacoes", "data entrega", "prazo"])),
          fornecedor: text(pick(row, ["fornecedor", "vendor", "empresa"])) || "A definir",
          valor_inicial: parseMoney(pick(row, ["valor inicial", "valor estimado"])),
          valor_final: valorFinal,
          saving,
          quantidade_req: Number(pick(row, ["quantidade req", "qtd req", "linhas req", "quantidade"]) || 0),
          observacoes: text(pick(row, ["observações", "observacoes", "obs", "comentários", "comentarios"])),
          payload: row,
        };
      }

      if (kind === "contratos") {
        const solicitante = text(pick(row, ["solicitante", "nome solicitante", "responsável", "responsavel"]));
        if (!solicitante && !text(pick(row, ["nome fornecedor", "fornecedor", "razao social", "razão social"]))) {
          errors.push({ row: index + 2, message: "Linha sem solicitante ou fornecedor.", payload: row });
          return null;
        }
        return {
          obra_id,
          solicitante,
          email_solicitante: text(pick(row, ["email solicitante", "e-mail solicitante", "email", "e-mail"])),
          centro_custo: text(pick(row, ["centro de custo", "centro custo", "cc"])),
          tipo_documento: text(pick(row, ["tipo documento", "tipo de documento", "documento"])) || "Contrato novo",
          urgencia: text(pick(row, ["urgência", "urgencia", "prioridade"])) || "Média",
          prazo_urgencia: toIsoDate(pick(row, ["prazo urgência", "prazo urgencia", "prazo", "data limite"])),
          status: text(pick(row, ["status", "fase", "etapa"])) || "Não Iniciado",
          fase_compor: text(pick(row, ["fase compor", "compor"])),
          payload: row,
        };
      }

      const codigo = text(pick(row, ["código", "codigo", "cod"]));
      const emailValue = text(pick(row, ["email", "e-mail"]));
      const emailLooksValid = emailValue.includes("@");
      const nome = text(pick(row, ["nome do fornecedor", "nome", "fornecedor", "razão social", "razao social"])) || (!emailLooksValid ? emailValue : "");
      if (!codigo && !nome) {
        errors.push({ row: index + 2, message: "Linha sem código ou nome do fornecedor.", payload: row });
        return null;
      }
      return {
        codigo: codigo || null,
        nome: nome || "Fornecedor sem nome",
        categoria: text(pick(row, ["categoria"])),
        produto_servico: text(pick(row, ["produto/serviço", "produto/servico", "serviço", "servico", "produto", "usina", "tubos e conexões"])),
        cidade: text(pick(row, ["cidade", "município", "municipio"])),
        uf: text(pick(row, ["uf", "estado"])).toUpperCase(),
        regiao: text(pick(row, ["região", "regiao"])),
        telefone: text(pick(row, ["telefone", "contato", "celular"])),
        email: emailLooksValid ? emailValue : "",
        site: text(pick(row, ["site", "website"])),
        cadastro_ativo: boolFrom(pick(row, ["tem cadastro ativo?", "tem cadastro?", "cadastro?", "cadastro", "ativo"])),
        latitude: Number(pick(row, ["latitude", "lat"]) || "") || null,
        longitude: Number(pick(row, ["longitude", "lng", "long"]) || "") || null,
        payload: row,
      };
    })
    .filter(Boolean) as RawRow[];

  return { records, errors };
}
