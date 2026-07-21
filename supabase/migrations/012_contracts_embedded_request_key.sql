-- Chave funcional para sincronizar o modulo detalhado de contratos com a tabela nativa.
-- A coluna evita duplicidade entre o card do HTML embutido e o registro protegido por RLS.

alter table public.contratos
add column if not exists codigo_embutido text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'contratos_codigo_embutido_key'
      and conrelid = 'public.contratos'::regclass
  ) then
    alter table public.contratos
    add constraint contratos_codigo_embutido_key unique (codigo_embutido);
  end if;
end $$;

create index if not exists contratos_codigo_embutido_idx
on public.contratos (codigo_embutido);
