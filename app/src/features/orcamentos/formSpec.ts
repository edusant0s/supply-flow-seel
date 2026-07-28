export type OrcamentoFieldType = "text" | "textarea" | "select" | "date" | "number" | "email" | "checkbox" | "file";

export type OrcamentoFormField = {
  name: string;
  label: string;
  type: OrcamentoFieldType;
  required: boolean;
  readonly?: boolean;
  note?: string;
  options?: string[];
};

export type OrcamentoFormCondition = {
  field: string;
  values: string[];
};

export type OrcamentoFormSection = {
  title: string;
  description: string;
  fields: OrcamentoFormField[];
  condition?: OrcamentoFormCondition | null;
};

export type OrcamentoFormSpec = OrcamentoFormSection[];

export const fieldTypeLabels: Record<OrcamentoFieldType, string> = {
  text: "Texto curto",
  textarea: "Texto longo",
  select: "Lista suspensa",
  date: "Data",
  number: "Numero",
  email: "E-mail",
  checkbox: "Multipla escolha",
  file: "Arquivo",
};

export const DEFAULT_ORCAMENTO_ASSIGNEE_OPTIONS = ["A definir", "Orcamentista 1", "Orcamentista 2", "Orcamentista 3", "Equipe de orcamentos"];

export const DEFAULT_ORCAMENTO_FORM_SPEC: OrcamentoFormSpec = [
  {
    title: "Solicitacao de orcamento",
    description: "Preencha os dados da solicitacao para envio ao Kanban de orcamentos.",
    fields: [
      { name: "data_solicitacao", label: "Data da solicitacao", type: "date", required: true },
      { name: "nome_solicitante", label: "Nome do solicitante", type: "text", required: true },
      { name: "email_solicitante", label: "E-mail do solicitante", type: "email", required: true },
      {
        name: "numero_proposta",
        label: "Numero da proposta",
        type: "text",
        required: false,
        note: "Em branco gera automaticamente",
      },
      { name: "nome_obra", label: "Nome da obra", type: "text", required: true },
      { name: "cliente", label: "Cliente", type: "text", required: true },
      { name: "local_obra", label: "Local da obra", type: "text", required: true },
      {
        name: "atribuido_a",
        label: "Atribuido a",
        type: "checkbox",
        required: true,
        options: DEFAULT_ORCAMENTO_ASSIGNEE_OPTIONS,
        note: "Selecione um ou mais orcamentistas responsaveis.",
      },
      {
        name: "tipo_orcamento",
        label: "Tipo de orcamento",
        type: "select",
        required: true,
        options: ["Orcamento Inicial (Pre-BID)", "Pos-Aceite Verbal - Obra Ganha (Renegociacao)", "Renegociacao Orcamento (Pre-BID)"],
      },
      { name: "data_entrega_cotacoes", label: "Data de entrega das cotacoes", type: "date", required: true },
      { name: "quantidade_linhas", label: "Quantidade de linhas", type: "number", required: false },
      { name: "link_pasta", label: "Link da pasta", type: "text", required: false },
      { name: "observacoes", label: "Observacoes", type: "textarea", required: false },
      { name: "anexos", label: "Anexos", type: "file", required: false },
    ],
    condition: null,
  },
];

export function conditionOk(condition: OrcamentoFormCondition | null | undefined, answers: Record<string, string>): boolean {
  if (!condition || !condition.field) return true;
  const value = String(answers[condition.field] ?? "").trim();
  return condition.values.includes(value);
}

export function visibleSections(spec: OrcamentoFormSpec, answers: Record<string, string>): OrcamentoFormSection[] {
  return spec.filter((section) => conditionOk(section.condition, answers));
}

export function withRequiredOperationalFields(spec: OrcamentoFormSpec): OrcamentoFormSpec {
  const next = cloneSpec(spec.length ? spec : DEFAULT_ORCAMENTO_FORM_SPEC);
  const firstSection = next[0] || {
    title: "Solicitacao de orcamento",
    description: "Preencha os dados da solicitacao para envio ao Kanban de orcamentos.",
    fields: [],
    condition: null,
  };
  if (!next.length) next.push(firstSection);

  const taken = new Set(next.flatMap((section) => section.fields || []).map((field) => field.name));
  const requiredFields: OrcamentoFormField[] = [
    {
      name: "atribuido_a",
      label: "Atribuido a",
      type: "checkbox",
      required: true,
      options: DEFAULT_ORCAMENTO_ASSIGNEE_OPTIONS,
      note: "Selecione um ou mais orcamentistas responsaveis.",
    },
    { name: "quantidade_linhas", label: "Quantidade de linhas", type: "number", required: false },
    { name: "link_pasta", label: "Link da pasta", type: "text", required: false },
  ];

  requiredFields.forEach((field) => {
    if (!taken.has(field.name)) firstSection.fields.push(field);
  });

  next.forEach((section) => {
    section.fields = (section.fields || []).map((field) => {
      if (field.name !== "atribuido_a") return field;
      return {
        ...field,
        type: "checkbox",
        required: true,
        options: field.options?.length ? field.options : DEFAULT_ORCAMENTO_ASSIGNEE_OPTIONS,
        note: field.note || "Selecione um ou mais orcamentistas responsaveis.",
      };
    });
  });

  return next;
}

export function allFieldsFromSpec(spec: OrcamentoFormSpec): OrcamentoFormField[] {
  return spec.flatMap((section) => section.fields || []);
}

export function conditionLabel(condition: OrcamentoFormCondition | null | undefined, spec: OrcamentoFormSpec): string {
  if (!condition || !condition.field) return "Sem condicao / sempre aparece";
  const field = allFieldsFromSpec(spec).find((item) => item.name === condition.field);
  const label = field?.label || condition.field;
  return `Aparece se "${label}" for: ${condition.values.join(", ")}`;
}

export function normalizeFieldName(label: string, taken: Set<string>): string {
  const base =
    label
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 48) || "nova_pergunta";
  let name = base;
  let index = 1;
  while (taken.has(name)) {
    name = `${base}_${index++}`;
  }
  return name;
}

export function cloneSpec(spec: OrcamentoFormSpec): OrcamentoFormSpec {
  return JSON.parse(JSON.stringify(spec));
}
