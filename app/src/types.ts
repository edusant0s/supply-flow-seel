export type UserRole =
  | "super_admin"
  | "admin_suprimentos"
  | "admin_orcamentos"
  | "admin_contratos"
  | "viewer_global"
  | "viewer";

export type ModuleKey =
  | "dashboard"
  | "requisicoes"
  | "orcamentos"
  | "contratos"
  | "fornecedores"
  | "importacoes"
  | "usuarios"
  | "settings";

export type Profile = {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Obra = {
  id: string;
  nome: string;
  codigo: string | null;
  centro_custo: string | null;
  ativo: boolean;
  created_at?: string;
};

export type Requisicao = {
  id: string;
  numero_rm: string | null;
  obra_id: string | null;
  centro_custo: string | null;
  solicitante: string | null;
  comprador: string | null;
  categoria: string | null;
  status: string;
  prioridade: string | null;
  data_inclusao: string | null;
  data_necessidade: string | null;
  payload: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type Orcamento = {
  id: string;
  obra_id: string | null;
  criado_por: string | null;
  numero_proposta: string | null;
  nome_solicitante: string | null;
  email_solicitante: string | null;
  cliente: string | null;
  local_obra: string | null;
  tipo_orcamento: string | null;
  status: string;
  data_solicitacao: string | null;
  data_entrega_cotacoes: string | null;
  fornecedor: string | null;
  valor_inicial: number | null;
  valor_final: number | null;
  saving: number | null;
  quantidade_req: number | null;
  observacoes: string | null;
  payload: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type Contrato = {
  id: string;
  obra_id: string | null;
  solicitante: string | null;
  email_solicitante: string | null;
  centro_custo: string | null;
  tipo_documento: string | null;
  urgencia: string | null;
  prazo_urgencia: string | null;
  status: string;
  fase_compor: string | null;
  payload: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type Fornecedor = {
  id: string;
  codigo: string | null;
  nome: string;
  categoria: string | null;
  produto_servico: string | null;
  cidade: string | null;
  uf: string | null;
  regiao: string | null;
  telefone: string | null;
  email: string | null;
  site: string | null;
  cadastro_ativo: boolean;
  latitude: number | null;
  longitude: number | null;
  payload: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type Importacao = {
  id: string;
  tipo: "requisicoes" | "orcamentos" | "contratos" | "fornecedores";
  arquivo_nome: string;
  usuario_id: string | null;
  total_linhas: number;
  sucesso: boolean;
  erros: Record<string, unknown>[] | null;
  created_at: string;
};

export type ImportKind = Importacao["tipo"];

export type KanbanColumn<T> = {
  key: string;
  title: string;
  subtitle?: string;
  items: T[];
};
