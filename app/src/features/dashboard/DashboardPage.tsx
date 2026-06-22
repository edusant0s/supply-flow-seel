import { AlertTriangle, ClipboardList, FileSpreadsheet, FileText, MapPinned } from "lucide-react";
import { KpiCard } from "../../components/KpiCard";
import { EmptyState, LoadingState } from "../../components/States";
import { useAsyncData } from "../../hooks";
import { listEntities } from "../../services/entities";

export function DashboardPage() {
  const { data, loading, error } = useAsyncData(async () => {
    const [requisicoes, orcamentos, contratos, fornecedores] = await Promise.all([
      listEntities("requisicoes"),
      listEntities("orcamentos"),
      listEntities("contratos"),
      listEntities("fornecedores"),
    ]);
    return { requisicoes, orcamentos, contratos, fornecedores };
  }, []);

  if (loading) return <LoadingState label="Carregando indicadores" />;
  if (error) return <EmptyState title="Falha ao carregar dashboard" description={error} />;
  if (!data) return null;

  const atrasadas =
    data.requisicoes.filter((item) => item.status?.toLowerCase().includes("atras")).length +
    data.orcamentos.filter((item) => item.status?.toLowerCase().includes("atras")).length;

  return (
    <div className="page-stack">
      <section className="kpi-grid">
        <KpiCard title="RMs" value={data.requisicoes.length} icon={ClipboardList} tone="blue" />
        <KpiCard title="Orcamentos" value={data.orcamentos.length} icon={FileSpreadsheet} />
        <KpiCard title="Contratos" value={data.contratos.length} icon={FileText} />
        <KpiCard title="Fornecedores" value={data.fornecedores.length} icon={MapPinned} />
        <KpiCard title="Alertas" value={atrasadas} icon={AlertTriangle} tone={atrasadas ? "warning" : "success"} />
      </section>
    </div>
  );
}
