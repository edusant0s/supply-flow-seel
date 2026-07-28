import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { invalidateAsyncData } from "../../hooks";
import { insertEntity } from "../../services/entities";
import { uploadAttachments } from "../../services/storage";
import { createInitialSla, buildProposalNumber } from "./sla";
import {
  DEFAULT_ORCAMENTO_FORM_SPEC,
  visibleSections,
  withRequiredOperationalFields,
  type OrcamentoFormField,
  type OrcamentoFormSpec,
} from "./formSpec";

export function DynamicOrcamentoForm({ spec, onSaved }: { spec: OrcamentoFormSpec; onSaved: () => void }) {
  const { profile, session } = useAuth();
  const activeSpec = withRequiredOperationalFields(spec.length ? spec : DEFAULT_ORCAMENTO_FORM_SPEC);
  const allFields = useMemo(() => activeSpec.flatMap((section) => section.fields || []), [activeSpec]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setAnswers((current) => {
      const next = { ...current };
      let changed = false;
      const prefill: Record<string, string> = {
        data_solicitacao: new Date().toISOString().slice(0, 10),
        nome_solicitante: profile?.nome || "",
        email_solicitante: profile?.email || "",
      };
      allFields.forEach((field) => {
        if (next[field.name] === undefined) {
          next[field.name] = prefill[field.name] ?? "";
          changed = true;
        }
      });
      return changed ? next : current;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFields.map((field) => field.name).join("|")]);

  function setAnswer(name: string, value: string) {
    setAnswers((current) => ({ ...current, [name]: value }));
  }

  function setFieldFiles(name: string, value: File[]) {
    setFiles((current) => ({ ...current, [name]: value }));
  }

  const visible = visibleSections(activeSpec, answers);
  const visibleFieldNames = new Set(visible.flatMap((section) => (section.fields || []).map((field) => field.name)));

  async function save() {
    const missing = visible
      .flatMap((section) => section.fields || [])
      .filter((field) => field.required && field.type !== "file" && !String(answers[field.name] || "").trim());

    if (missing.length) {
      setFeedback({ type: "error", text: `Preencha os campos obrigatorios: ${missing.map((field) => field.label).join(", ")}.` });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      const allFiles = Object.entries(files)
        .filter(([name]) => visibleFieldNames.has(name))
        .flatMap(([, list]) => list);
      const attachments = await uploadAttachments("orcamentos", allFiles);
      const proposal = String(answers.numero_proposta || "").trim() || buildProposalNumber();
      const dataSolicitacao = answers.data_solicitacao || new Date().toISOString().slice(0, 10);
      const createdAt = new Date().toISOString();
      const quantidadeLinhas = Number(answers.quantidade_linhas || answers.quantidade_req || 0);
      const payload: Record<string, unknown> = {
        ...answers,
        numero_proposta: proposal,
        anexos: attachments,
        quantidade_linhas: quantidadeLinhas,
        sla: createInitialSla("nao_iniciado"),
        logs: [
          {
            id: `log-${Date.now()}`,
            at: createdAt,
            action: "Solicitacao criada",
            userName: profile?.nome || answers.nome_solicitante || "Solicitante",
            userEmail: profile?.email || answers.email_solicitante || "",
          },
        ],
      };

      await insertEntity("orcamentos", {
        criado_por: session?.user.id || profile?.id || null,
        numero_proposta: proposal,
        nome_solicitante: answers.nome_solicitante || "",
        email_solicitante: answers.email_solicitante || "",
        cliente: answers.cliente || "",
        local_obra: answers.local_obra || answers.nome_obra || "",
        tipo_orcamento: answers.tipo_orcamento || "",
        atribuido_a: answers.atribuido_a || "",
        link_pasta: answers.link_pasta || "",
        data_solicitacao: dataSolicitacao,
        data_entrega_cotacoes: answers.data_entrega_cotacoes || null,
        fornecedor: "A definir",
        valor_inicial: null,
        valor_final: null,
        saving: 0,
        quantidade_req: quantidadeLinhas,
        observacoes: answers.observacoes || "",
        status: "nao_iniciado",
        payload,
      });

      setFeedback({ type: "success", text: `Solicitacao ${proposal} criada e enviada para o Kanban.` });
      setFiles({});
      invalidateAsyncData(["orcamentos", "alertas:orcamentos", "dashboard:summary"]);
      onSaved();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao salvar solicitacao.";
      setFeedback({
        type: "error",
        text:
          message.toLowerCase().includes("duplicate") || message.toLowerCase().includes("numero_proposta")
            ? "Ja existe uma solicitacao com esse numero de proposta. Apague o numero para gerar automaticamente ou informe outro."
            : message,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-stack">
      {visible.map((section) => (
        <section className="panel" key={section.title}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Formulario de orcamento</span>
              <h2>{section.title}</h2>
            </div>
          </div>
          {section.description ? <p className="field-hint field-full">{section.description}</p> : null}
          <div className="form-grid">
            {(section.fields || []).map((field) => (
              <FieldControl
                key={field.name}
                field={field}
                value={answers[field.name] || ""}
                onChange={(value) => setAnswer(field.name, value)}
                files={files[field.name] || []}
                onFiles={(list) => setFieldFiles(field.name, list)}
              />
            ))}
          </div>
        </section>
      ))}

      {feedback ? <div className={feedback.type === "error" ? "form-error" : "form-note"}>{feedback.text}</div> : null}
      <div className="form-actions">
        <button className="primary-button" type="button" onClick={save} disabled={saving}>
          {saving ? "Salvando..." : "Enviar solicitacao"}
        </button>
      </div>
    </section>
  );
}

function FieldControl({
  field,
  value,
  onChange,
  files,
  onFiles,
}: {
  field: OrcamentoFormField;
  value: string;
  onChange: (value: string) => void;
  files: File[];
  onFiles: (files: File[]) => void;
}) {
  const wrapperClass = field.type === "textarea" || field.type === "checkbox" ? "field-full" : undefined;

  if (field.type === "select") {
    return (
      <label className={wrapperClass}>
        {field.label}
        <select value={value} onChange={(event) => onChange(event.target.value)} required={field.required} disabled={field.readonly}>
          <option value="">Selecione</option>
          {(field.options || []).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {field.note ? <span className="field-hint">{field.note}</span> : null}
      </label>
    );
  }

  if (field.type === "checkbox") {
    const selected = value ? value.split(",").map((item) => item.trim()) : [];
    function toggle(option: string) {
      const next = selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option];
      onChange(next.join(", "));
    }
    return (
      <label className={wrapperClass}>
        {field.label}
        <div className="checkbox-grid">
          {(field.options || []).map((option) => (
            <label key={option}>
              <input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} />
              {option}
            </label>
          ))}
        </div>
        {field.note ? <span className="field-hint">{field.note}</span> : null}
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className={wrapperClass}>
        {field.label}
        <textarea value={value} onChange={(event) => onChange(event.target.value)} required={field.required} disabled={field.readonly} />
        {field.note ? <span className="field-hint">{field.note}</span> : null}
      </label>
    );
  }

  if (field.type === "file") {
    return (
      <label className="field-full">
        {field.label}
        <input type="file" multiple onChange={(event) => onFiles(Array.from(event.target.files || []))} />
        <span className="field-hint">{files.length ? files.map((file) => file.name).join(", ") : "Nenhum arquivo selecionado."}</span>
      </label>
    );
  }

  const inputType = field.type === "number" ? "number" : field.type === "email" ? "email" : field.type === "date" ? "date" : "text";
  return (
    <label className={wrapperClass}>
      {field.label}
      <input
        type={inputType}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={field.required}
        readOnly={field.readonly}
        placeholder={field.note && field.name === "numero_proposta" ? field.note : undefined}
      />
      {field.note && field.name !== "numero_proposta" ? <span className="field-hint">{field.note}</span> : null}
    </label>
  );
}
