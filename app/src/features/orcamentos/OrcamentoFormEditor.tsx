import { useState } from "react";
import { DetailDrawer } from "../../components/DetailDrawer";
import {
  DEFAULT_ORCAMENTO_FORM_SPEC,
  allFieldsFromSpec,
  cloneSpec,
  conditionLabel,
  fieldTypeLabels,
  normalizeFieldName,
  type OrcamentoFieldType,
  type OrcamentoFormField,
  type OrcamentoFormSpec,
} from "./formSpec";

const fieldTypeOptions: OrcamentoFieldType[] = ["text", "textarea", "select", "checkbox", "date", "number", "email", "file"];

export function OrcamentoFormEditor({
  spec,
  onSave,
}: {
  spec: OrcamentoFormSpec;
  onSave: (next: OrcamentoFormSpec) => Promise<void>;
}) {
  const [localSpec, setLocalSpec] = useState<OrcamentoFormSpec>(() => cloneSpec(spec.length ? spec : DEFAULT_ORCAMENTO_FORM_SPEC));
  const [selectedSection, setSelectedSection] = useState(0);
  const [editingField, setEditingField] = useState<{ sectionIndex: number; fieldIndex: number | null } | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const activeIndex = Math.max(0, Math.min(localSpec.length - 1, selectedSection));
  const section = localSpec[activeIndex];

  function updateSpec(next: OrcamentoFormSpec) {
    setLocalSpec(next);
  }

  async function persist(next: OrcamentoFormSpec) {
    setSaving(true);
    setMessage("");
    try {
      await onSave(next);
      setMessage("Formulario salvo. As alteracoes ja valem para novas solicitacoes.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Falha ao salvar o formulario.");
    } finally {
      setSaving(false);
    }
  }

  function moveItem<T>(arr: T[], from: number, to: number): boolean {
    if (to < 0 || to >= arr.length || from < 0 || from >= arr.length) return false;
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    return true;
  }

  function addSection() {
    const next = cloneSpec(localSpec);
    next.push({ title: "Nova secao", description: "", fields: [] });
    updateSpec(next);
    setSelectedSection(next.length - 1);
  }

  function duplicateSection() {
    const next = cloneSpec(localSpec);
    const copy = cloneSpec([next[activeIndex]])[0];
    copy.title = `${copy.title} - copia`;
    next.splice(activeIndex + 1, 0, copy);
    updateSpec(next);
    setSelectedSection(activeIndex + 1);
  }

  function moveSection(index: number, direction: -1 | 1) {
    const next = cloneSpec(localSpec);
    if (moveItem(next, index, index + direction)) {
      updateSpec(next);
      setSelectedSection(index + direction);
    }
  }

  function deleteSection(index: number) {
    if (!window.confirm("Excluir esta secao e todas as perguntas dela?")) return;
    const next = cloneSpec(localSpec);
    next.splice(index, 1);
    updateSpec(next);
    setSelectedSection(Math.max(0, index - 1));
  }

  function restoreDefault() {
    if (!window.confirm("Restaurar a estrutura padrao do formulario? Isso remove as edicoes atuais.")) return;
    updateSpec(cloneSpec(DEFAULT_ORCAMENTO_FORM_SPEC));
    setSelectedSection(0);
  }

  function saveSectionMeta(title: string, description: string, conditionField: string, conditionValuesText: string) {
    const next = cloneSpec(localSpec);
    const target = next[activeIndex];
    target.title = title.trim() || "Secao sem titulo";
    target.description = description.trim();
    const values = conditionValuesText
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean);
    if (conditionField && values.length) {
      target.condition = { field: conditionField, values };
    } else {
      target.condition = null;
    }
    updateSpec(next);
  }

  function clearCondition() {
    const next = cloneSpec(localSpec);
    next[activeIndex].condition = null;
    updateSpec(next);
  }

  function moveQuestion(index: number, direction: -1 | 1) {
    const next = cloneSpec(localSpec);
    if (moveItem(next[activeIndex].fields, index, index + direction)) updateSpec(next);
  }

  function duplicateQuestion(index: number) {
    const next = cloneSpec(localSpec);
    const fields = next[activeIndex].fields;
    const copy: OrcamentoFormField = JSON.parse(JSON.stringify(fields[index]));
    copy.label = `${copy.label} - copia`;
    copy.name = normalizeFieldName(copy.label, new Set(allFieldsFromSpec(next).map((field) => field.name)));
    fields.splice(index + 1, 0, copy);
    updateSpec(next);
  }

  function deleteQuestion(index: number) {
    if (!window.confirm("Excluir esta pergunta?")) return;
    const next = cloneSpec(localSpec);
    next[activeIndex].fields.splice(index, 1);
    updateSpec(next);
  }

  function saveQuestion(field: OrcamentoFormField, fieldIndex: number | null) {
    const next = cloneSpec(localSpec);
    const fields = next[activeIndex].fields;
    if (fieldIndex === null) {
      fields.push(field);
    } else {
      fields[fieldIndex] = field;
    }
    updateSpec(next);
    setEditingField(null);
  }

  return (
    <div className="page-stack">
      <section className="toolbar-panel toolbar-panel--wrap">
        <button className="primary-button" type="button" onClick={addSection}>
          + Nova secao
        </button>
        <button className="secondary-button" type="button" onClick={duplicateSection}>
          Duplicar secao
        </button>
        <button className="secondary-button" type="button" onClick={restoreDefault}>
          Restaurar estrutura padrao
        </button>
        <button className="primary-button" type="button" disabled={saving} onClick={() => persist(localSpec)}>
          {saving ? "Salvando..." : "Salvar formulario"}
        </button>
      </section>

      {message ? <div className={message.startsWith("Falha") ? "form-error" : "form-note"}>{message}</div> : null}

      <div className="editor-layout-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Estrutura</span>
              <h2>Secoes do formulario</h2>
            </div>
          </div>
          <div className="page-stack">
            {localSpec.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className={`editor-section-card ${index === activeIndex ? "editor-section-card--active" : ""}`}
                onClick={() => setSelectedSection(index)}
              >
                <div>
                  <strong>
                    {index + 1}. {item.title}
                  </strong>
                  <div className="field-hint">{(item.fields || []).length} pergunta(s)</div>
                  <div className="field-hint">{conditionLabel(item.condition, localSpec)}</div>
                </div>
                <div className="card-actions-row" onClick={(event) => event.stopPropagation()}>
                  <button className="table-action" type="button" onClick={() => moveSection(index, -1)} aria-label="Mover secao para cima">
                    ↑
                  </button>
                  <button className="table-action" type="button" onClick={() => moveSection(index, 1)} aria-label="Mover secao para baixo">
                    ↓
                  </button>
                  <button className="danger-button danger-button--compact" type="button" onClick={() => deleteSection(index)}>
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {section ? (
          <SectionEditor
            key={activeIndex}
            section={section}
            spec={localSpec}
            onSaveMeta={saveSectionMeta}
            onClearCondition={clearCondition}
            onAddQuestion={() => setEditingField({ sectionIndex: activeIndex, fieldIndex: null })}
            onEditQuestion={(fieldIndex) => setEditingField({ sectionIndex: activeIndex, fieldIndex })}
            onMoveQuestion={moveQuestion}
            onDuplicateQuestion={duplicateQuestion}
            onDeleteQuestion={deleteQuestion}
          />
        ) : null}
      </div>

      {editingField ? (
        <QuestionEditorDrawer
          field={editingField.fieldIndex === null ? null : localSpec[editingField.sectionIndex].fields[editingField.fieldIndex]}
          existingNames={new Set(allFieldsFromSpec(localSpec).map((field) => field.name))}
          onClose={() => setEditingField(null)}
          onSave={(field) => saveQuestion(field, editingField.fieldIndex)}
        />
      ) : null}
    </div>
  );
}

function SectionEditor({
  section,
  spec,
  onSaveMeta,
  onClearCondition,
  onAddQuestion,
  onEditQuestion,
  onMoveQuestion,
  onDuplicateQuestion,
  onDeleteQuestion,
}: {
  section: OrcamentoFormSpec[number];
  spec: OrcamentoFormSpec;
  onSaveMeta: (title: string, description: string, conditionField: string, conditionValuesText: string) => void;
  onClearCondition: () => void;
  onAddQuestion: () => void;
  onEditQuestion: (index: number) => void;
  onMoveQuestion: (index: number, direction: -1 | 1) => void;
  onDuplicateQuestion: (index: number) => void;
  onDeleteQuestion: (index: number) => void;
}) {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description || "");
  const [conditionField, setConditionField] = useState(section.condition?.field || "");
  const [conditionValues, setConditionValues] = useState((section.condition?.values || []).join("; "));

  const otherFields = allFieldsFromSpec(spec);

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Secao selecionada</span>
          <h2>Editar secao</h2>
        </div>
      </div>
      <div className="form-grid">
        <label className="field-full">
          Nome da secao
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label className="field-full">
          Descricao / orientacao da secao
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <label>
          Campo que controla esta secao
          <select value={conditionField} onChange={(event) => setConditionField(event.target.value)}>
            <option value="">Sem condicao / sempre aparece</option>
            {otherFields.map((field) => (
              <option key={field.name} value={field.name}>
                {field.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Respostas que fazem aparecer
          <input placeholder="Separe por ponto e virgula" value={conditionValues} onChange={(event) => setConditionValues(event.target.value)} />
        </label>
        <div className="field-full muted-box">Condicao atual: {conditionLabel(section.condition, spec)}</div>
      </div>
      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onClearCondition}>
          Limpar condicao
        </button>
        <button className="primary-button" type="button" onClick={() => onSaveMeta(title, description, conditionField, conditionValues)}>
          Salvar secao
        </button>
      </div>

      <div className="form-section">
        <div className="panel-heading">
          <h3>Perguntas da secao</h3>
          <button className="primary-button" type="button" onClick={onAddQuestion}>
            + Nova pergunta
          </button>
        </div>
        {(section.fields || []).length ? (
          <div className="page-stack">
            {section.fields.map((field, index) => (
              <div className="editor-question-row" key={field.name}>
                <div>
                  <strong>
                    {index + 1}. {field.label}
                  </strong>
                  <div className="field-hint">
                    {field.name} · {fieldTypeLabels[field.type]} · {field.required ? "Obrigatoria" : "Opcional"}
                  </div>
                  {field.note ? <div className="field-hint">Obs.: {field.note}</div> : null}
                </div>
                <div className="card-actions-row">
                  <button className="table-action" type="button" onClick={() => onEditQuestion(index)}>
                    Editar
                  </button>
                  <button className="table-action" type="button" onClick={() => onMoveQuestion(index, -1)} aria-label="Mover pergunta para cima">
                    ↑
                  </button>
                  <button className="table-action" type="button" onClick={() => onMoveQuestion(index, 1)} aria-label="Mover pergunta para baixo">
                    ↓
                  </button>
                  <button className="table-action" type="button" onClick={() => onDuplicateQuestion(index)}>
                    Duplicar
                  </button>
                  <button className="danger-button danger-button--compact" type="button" onClick={() => onDeleteQuestion(index)}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted-box">Nenhuma pergunta nesta secao.</p>
        )}
      </div>
    </section>
  );
}

function QuestionEditorDrawer({
  field,
  existingNames,
  onClose,
  onSave,
}: {
  field: OrcamentoFormField | null;
  existingNames: Set<string>;
  onClose: () => void;
  onSave: (field: OrcamentoFormField) => void;
}) {
  const [label, setLabel] = useState(field?.label || "");
  const [type, setType] = useState<OrcamentoFieldType>(field?.type || "text");
  const [required, setRequired] = useState(field?.required ?? false);
  const [options, setOptions] = useState((field?.options || []).join("\n"));
  const [note, setNote] = useState(field?.note || "");
  const [error, setError] = useState("");

  function handleSave() {
    const cleanLabel = label.trim();
    if (!cleanLabel) {
      setError("A pergunta precisa ter um texto.");
      return;
    }
    const needsOptions = type === "select" || type === "checkbox";
    const optionList = options
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    if (needsOptions && !optionList.length) {
      setError("Informe pelo menos uma opcao, uma por linha.");
      return;
    }
    const name = field?.name || normalizeFieldName(cleanLabel, existingNames);
    onSave({
      name,
      label: cleanLabel,
      type,
      required,
      options: needsOptions ? optionList : undefined,
      note: note.trim() || undefined,
    });
  }

  return (
    <DetailDrawer eyebrow="Pergunta do formulario" title={field ? "Editar pergunta" : "Nova pergunta"} onClose={onClose}>
      <div className="form-grid">
        <label className="field-full">
          Texto da pergunta
          <input value={label} onChange={(event) => setLabel(event.target.value)} />
        </label>
        <label>
          Tipo do campo
          <select value={type} onChange={(event) => setType(event.target.value as OrcamentoFieldType)}>
            {fieldTypeOptions.map((option) => (
              <option key={option} value={option}>
                {fieldTypeLabels[option]}
              </option>
            ))}
          </select>
        </label>
        <label className="toggle-row">
          <input type="checkbox" checked={required} onChange={(event) => setRequired(event.target.checked)} />
          Pergunta obrigatoria
        </label>
        {(type === "select" || type === "checkbox") && (
          <label className="field-full">
            Opcoes (uma por linha)
            <textarea value={options} onChange={(event) => setOptions(event.target.value)} />
          </label>
        )}
        <label className="field-full">
          Observacao / ajuda (opcional)
          <input value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
      </div>
      {error ? <div className="form-error">{error}</div> : null}
      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onClose}>
          Cancelar
        </button>
        <button className="primary-button" type="button" onClick={handleSave}>
          Salvar pergunta
        </button>
      </div>
    </DetailDrawer>
  );
}
