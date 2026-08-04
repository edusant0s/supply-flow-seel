-- Permite excluir um usuario (auth.users, com cascade para profiles) sem falhar por
-- violacao de chave estrangeira. Colunas que guardam "quem criou/atualizou" um registro
-- de negocio devem virar NULL em vez de bloquear a exclusao do usuario — o registro
-- historico e preservado, apenas perde a referencia ao autor.

alter table public.orcamentos drop constraint if exists orcamentos_criado_por_fkey;
alter table public.orcamentos
  add constraint orcamentos_criado_por_fkey foreign key (criado_por) references public.profiles(id) on delete set null;

alter table public.importacoes drop constraint if exists importacoes_usuario_id_fkey;
alter table public.importacoes
  add constraint importacoes_usuario_id_fkey foreign key (usuario_id) references public.profiles(id) on delete set null;

alter table public.fretes_solicitacoes drop constraint if exists fretes_solicitacoes_criado_por_fkey;
alter table public.fretes_solicitacoes
  add constraint fretes_solicitacoes_criado_por_fkey foreign key (criado_por) references public.profiles(id) on delete set null;

alter table public.embedded_app_state drop constraint if exists embedded_app_state_updated_by_fkey;
alter table public.embedded_app_state
  add constraint embedded_app_state_updated_by_fkey foreign key (updated_by) references public.profiles(id) on delete set null;

alter table public.estoque_obras_pedidos drop constraint if exists estoque_obras_pedidos_criado_por_fkey;
alter table public.estoque_obras_pedidos
  add constraint estoque_obras_pedidos_criado_por_fkey foreign key (criado_por) references public.profiles(id) on delete set null;

alter table public.avaliacao_fornecedores_avaliacoes drop constraint if exists avaliacao_fornecedores_avaliacoes_criado_por_fkey;
alter table public.avaliacao_fornecedores_avaliacoes
  add constraint avaliacao_fornecedores_avaliacoes_criado_por_fkey foreign key (criado_por) references public.profiles(id) on delete set null;

alter table public.fornecedores_cadastros drop constraint if exists fornecedores_cadastros_criado_por_fkey;
alter table public.fornecedores_cadastros
  add constraint fornecedores_cadastros_criado_por_fkey foreign key (criado_por) references public.profiles(id) on delete set null;

alter table public.nf_simples_remessa_solicitacoes drop constraint if exists nf_simples_remessa_solicitacoes_criado_por_fkey;
alter table public.nf_simples_remessa_solicitacoes
  add constraint nf_simples_remessa_solicitacoes_criado_por_fkey foreign key (criado_por) references public.profiles(id) on delete set null;

alter table public.cadastro_materiais_solicitacoes drop constraint if exists cadastro_materiais_solicitacoes_criado_por_fkey;
alter table public.cadastro_materiais_solicitacoes
  add constraint cadastro_materiais_solicitacoes_criado_por_fkey foreign key (criado_por) references public.profiles(id) on delete set null;
