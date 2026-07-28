-- Habilita eventos realtime para orcamentos, usados para atualizar
-- solicitacoes e comentarios sem depender de F5.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'orcamentos'
    )
  then
    alter publication supabase_realtime add table public.orcamentos;
  end if;
end $$;
