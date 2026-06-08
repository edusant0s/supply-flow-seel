import { useMemo, useState } from "react";
import { CheckCircle2, FileUp, XCircle } from "lucide-react";
import type { ImportKind } from "../types";
import { mapRowsForImport, readSpreadsheet, type RawRow } from "../lib/spreadsheet";
import { upsertImportedRows } from "../services/entities";
import { useAuth } from "../contexts/AuthContext";

const labels: Record<ImportKind, string> = {
  requisicoes: "Requisições",
  orcamentos: "Orçamentos",
  contratos: "Contratos",
  fornecedores: "Fornecedores",
};

export function ImportWizard({ kind, onComplete }: { kind: ImportKind; onComplete: () => void }) {
  const { obras } = useAuth();
  const [fileName, setFileName] = useState("");
  const [rawRows, setRawRows] = useState<RawRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const mapped = useMemo(() => mapRowsForImport(kind, rawRows, obras), [kind, obras, rawRows]);
  const preview = mapped.records.slice(0, 6);
  const headers = Object.keys(preview[0] || {}).filter((key) => key !== "payload").slice(0, 8);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setMessage("");
    setLoading(true);
    try {
      setFileName(file.name);
      setRawRows(await readSpreadsheet(file));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Falha ao ler planilha.");
    } finally {
      setLoading(false);
    }
  }

  async function confirmImport() {
    setLoading(true);
    setMessage("");
    try {
      await upsertImportedRows(kind, mapped.records, fileName, mapped.errors);
      setRawRows([]);
      setFileName("");
      setMessage("Importação gravada com sucesso.");
      onComplete();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Falha ao gravar importação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel import-wizard">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Importação segura</span>
          <h2>{labels[kind]}</h2>
        </div>
        <label className="secondary-button">
          <FileUp size={18} />
          Selecionar planilha
          <input
            hidden
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(event) => handleFile(event.target.files?.[0]).finally(() => (event.currentTarget.value = ""))}
          />
        </label>
      </div>

      <div className="import-steps">
        <div className="import-step import-step--done">
          <CheckCircle2 size={18} />
          Upload
        </div>
        <div className={`import-step ${rawRows.length ? "import-step--done" : ""}`}>
          <CheckCircle2 size={18} />
          Pré-visualização
        </div>
        <div className={`import-step ${mapped.records.length ? "import-step--done" : ""}`}>
          <CheckCircle2 size={18} />
          Validação
        </div>
      </div>

      {fileName ? (
        <div className="import-summary">
          <strong>{fileName}</strong>
          <span>
            {rawRows.length} linha(s) lida(s), {mapped.records.length} válida(s), {mapped.errors.length} erro(s)
          </span>
        </div>
      ) : (
        <div className="muted-box">Aceita .xlsx, .xls e .csv. A gravação só acontece depois da confirmação.</div>
      )}

      {preview.length ? (
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header}>{String(row[header] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {mapped.errors.length ? (
        <div className="import-errors">
          {mapped.errors.slice(0, 5).map((error) => (
            <div key={`${error.row}-${error.message}`}>
              <XCircle size={16} />
              Linha {error.row}: {error.message}
            </div>
          ))}
        </div>
      ) : null}

      {message ? <div className="form-note">{message}</div> : null}

      <div className="form-actions">
        <button className="primary-button" type="button" disabled={!mapped.records.length || loading} onClick={confirmImport}>
          {loading ? "Processando..." : "Confirmar e gravar"}
        </button>
      </div>
    </section>
  );
}
