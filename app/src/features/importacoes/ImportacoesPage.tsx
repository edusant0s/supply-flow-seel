import { CheckCircle2, XCircle } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { EmptyState, LoadingState } from "../../components/States";
import { formatDateBr } from "../../lib/format";
import { useAsyncData } from "../../hooks";
import { listImportacoes } from "../../services/entities";

export function ImportacoesPage() {
  const { data, loading, error } = useAsyncData(listImportacoes, []);

  if (loading) return <LoadingState label="Carregando importações" />;
  if (error) return <EmptyState title="Falha ao carregar importações" description={error} />;

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Auditoria operacional</span>
            <h2>Histórico de importações</h2>
          </div>
        </div>
        <DataTable
          data={data || []}
          columns={[
            { key: "status", label: "Status", render: (item) => (item.sucesso ? <CheckCircle2 className="success-icon" /> : <XCircle className="danger-icon" />) },
            { key: "tipo", label: "Tipo", render: (item) => item.tipo },
            { key: "arquivo", label: "Arquivo", render: (item) => item.arquivo_nome },
            { key: "linhas", label: "Linhas", render: (item) => item.total_linhas },
            { key: "data", label: "Data", render: (item) => formatDateBr(item.created_at) },
          ]}
        />
      </section>
    </div>
  );
}
