import { useMemo, useState } from "react";
import { CheckCircle2, FileUp, Trash2, XCircle } from "lucide-react";
import type { ImportKind, ModuleKey } from "../types";
import { mapRowsForImport, readSpreadsheet, type RawRow } from "../lib/spreadsheet";
import { clearEntityTable, upsertImportedRows } from "../services/entities";
import { useAuth } from "../contexts/AuthContext";
import { canManage } from "../lib/permissions";

const labels: Record<ImportKind, string> = {
  requisicoes: "Requisições",
  orcamentos: "Orçamentos",
  contratos: "Contratos",
  fornecedores: "Fornecedores",
  frota: "Frota",
};

const importKindModules: Record<ImportKind, ModuleKey> = {
  requisicoes: "requisicoes",
  orcamentos: "orcamentos",
  contratos: "contratos",
  fornecedores: "fornecedores",
  frota: "frota",
};

export function ImportWizard({ kind, onComplete }: { kind: ImportKind; onComplete: () => void }) {
  const { obras, profile } = useAuth();
  const [fileName, setFileName] = useState("");
  const [rawRows, setRawRows] = useState<RawRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [message, setMessage] = useState("");

  const mapped = useMemo(() => mapRowsForImport(kind, rawRows, obras), [kind, obras, rawRows]);
  const preview = mapped.records.slice(0, 6);
  const headers = Object.keys(preview[0] || {}).filter((key) => key !== "payload").slice(0, 8);
  const canImportKind = canManage(profile?.role, importKindModules[kind]);
  const canClearPurchases = kind === "requisicoes" && canImportKind;

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
    if (!canImportKind) {
      setMessage("Seu perfil nao pode importar esta base.");
      return;
    }
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

  async function clearPurchasesBase() {
    const confirmation = window.prompt('Esta acao apaga todas as RMs/compras importadas. Digite "APAGAR COMPRAS" para confirmar.');
    if (confirmation !== "APAGAR COMPRAS") {
      setMessage("Limpeza cancelada. A base antiga foi preservada.");
      return;
    }

    setClearing(true);
    setMessage("");
    try {
      await clearEntityTable("requisicoes");
      setMessage("Base antiga de compras apagada. Voce ja pode gravar a planilha nova.");
      onComplete();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Falha ao apagar a base antiga.");
    } finally {
      setClearing(false);
    }
  }

  return (
    <section className="panel import-wizard">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Importação segura</span>
          <h2>{labels[kind]}</h2>
        </div>
        <label className={`secondary-button ${!canImportKind ? "is-disabled" : ""}`}>
          <FileUp size={18} />
          Selecionar planilha
          <input
            hidden
            type="file"
            accept=".xlsx,.xls,.csv"
            disabled={!canImportKind}
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
        <div className="muted-box">
          {canImportKind
            ? "Aceita .xlsx, .xls e .csv. A gravacao so acontece depois da confirmacao."
            : "Seu perfil nao tem permissao para alimentar esta base."}
        </div>
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

      {canClearPurchases ? (
        <section className="danger-zone import-danger-zone">
          <div>
            <h3>Apagar base antiga de compras</h3>
            <p>Remove todas as RMs importadas antes de gravar uma nova planilha. Esta acao nao apaga usuarios, obras, orcamentos, contratos ou fornecedores.</p>
          </div>
          <button className="danger-button" type="button" disabled={loading || clearing} onClick={clearPurchasesBase}>
            <Trash2 size={18} />
            {clearing ? "Apagando..." : "Apagar base antiga"}
          </button>
        </section>
      ) : null}

      <div className="form-actions">
        <button className="primary-button" type="button" disabled={!canImportKind || !mapped.records.length || loading || clearing} onClick={confirmImport}>
          {loading ? "Processando..." : "Confirmar e gravar"}
        </button>
      </div>
    </section>
  );
}
