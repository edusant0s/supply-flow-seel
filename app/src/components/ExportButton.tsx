import { Download } from "lucide-react";
import { exportToXlsx, type RawRow } from "../lib/spreadsheet";

export function ExportButton({
  rows,
  filename,
  label = "Exportar",
}: {
  rows: RawRow[];
  filename: string;
  label?: string;
}) {
  return (
    <button className="secondary-button" type="button" onClick={() => exportToXlsx(rows, filename)}>
      <Download size={18} />
      {label}
    </button>
  );
}
