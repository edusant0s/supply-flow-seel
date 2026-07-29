import { useEffect, useMemo, useState } from "react";
import type { ElementType } from "react";
import { Car, CheckCircle2, ClipboardList, FileSpreadsheet, FileText, PackageSearch, XCircle } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { ImportWizard } from "../../components/ImportWizard";
import { EmptyState, LoadingState } from "../../components/States";
import { formatDateBr } from "../../lib/format";
import { useAsyncData } from "../../hooks";
import { listImportacoes } from "../../services/entities";
import { useAuth } from "../../contexts/AuthContext";
import { canManage } from "../../lib/permissions";
import type { ImportKind, ModuleKey } from "../../types";

const importKindModules: Record<ImportKind, ModuleKey> = {
  requisicoes: "requisicoes",
  orcamentos: "orcamentos",
  contratos: "contratos",
  fornecedores: "fornecedores",
  frota: "frota",
};

const importOptions: Array<{ key: ImportKind; label: string; description: string; icon: ElementType }> = [
  {
    key: "requisicoes",
    label: "Requisicoes de suprimentos",
    description: "RMs, compradores, fases, obra, OC, SLA e itens importados da planilha de compras.",
    icon: ClipboardList,
  },
  {
    key: "orcamentos",
    label: "Orcamentos",
    description: "Solicitacoes, status, datas, anexos operacionais e SLA do processo de orcamento.",
    icon: FileSpreadsheet,
  },
  {
    key: "contratos",
    label: "Contratos",
    description: "Solicitacoes contratuais, urgencia, fases, processo Compor e campos complementares.",
    icon: FileText,
  },
  {
    key: "fornecedores",
    label: "Fornecedores",
    description: "Base corporativa de fornecedores, contatos, categorias, localizacao e cadastro ativo.",
    icon: PackageSearch,
  },
  {
    key: "frota",
    label: "Frota",
    description: "Veiculos, contratos, condutores, locadoras, centro de custo e dados operacionais compartilhados.",
    icon: Car,
  },
];

export function ImportacoesPage() {
  const { profile } = useAuth();
  const [activeKind, setActiveKind] = useState<ImportKind>("requisicoes");
  const { data, loading, error, refresh } = useAsyncData(listImportacoes, [], { cacheKey: "importacoes" });
  const visibleOptions = useMemo(
    () => importOptions.filter((option) => canManage(profile, importKindModules[option.key])),
    [profile]
  );

  useEffect(() => {
    if (!visibleOptions.length) return;
    if (!visibleOptions.some((option) => option.key === activeKind)) setActiveKind(visibleOptions[0].key);
  }, [activeKind, visibleOptions]);

  if (loading) return <LoadingState label="Carregando importacoes" />;
  if (error) return <EmptyState title="Falha ao carregar importacoes" description={error} />;
  if (!visibleOptions.length) return <EmptyState title="Sem permissao de importacao" description="Seu perfil nao pode alimentar bases pela central." />;

  return (
    <div className="page-stack">
      <section className="data-hub-grid">
        {visibleOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button key={option.key} className={activeKind === option.key ? "active" : ""} type="button" onClick={() => setActiveKind(option.key)}>
              <Icon size={20} />
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          );
        })}
      </section>

      <ImportWizard kind={activeKind} onComplete={refresh} />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Auditoria operacional</span>
            <h2>Historico de importacoes</h2>
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
