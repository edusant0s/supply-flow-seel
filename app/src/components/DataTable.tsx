import type React from "react";

export type DataColumn<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  empty = "Nenhum registro encontrado.",
}: {
  columns: DataColumn<T>[];
  data: T[];
  empty?: string;
}) {
  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className={column.className}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
