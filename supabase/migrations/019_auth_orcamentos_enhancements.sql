-- Troca obrigatoria de senha e evolucao operacional dos orcamentos.

alter table public.profiles
  add column if not exists must_change_password boolean not null default false,
  add column if not exists password_changed_at timestamptz;

create or replace function public.mark_own_password_changed()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Usuario nao autenticado.';
  end if;

  update public.profiles
  set must_change_password = false,
      password_changed_at = now(),
      updated_at = now()
  where id = auth.uid();
end;
$$;

grant execute on function public.mark_own_password_changed() to authenticated;

alter table public.orcamentos
  add column if not exists atribuido_a text,
  add column if not exists link_pasta text,
  add column if not exists data_finalizacao timestamptz;

create index if not exists orcamentos_atribuido_a_idx on public.orcamentos (atribuido_a);
create index if not exists orcamentos_data_solicitacao_idx on public.orcamentos (data_solicitacao);
create index if not exists orcamentos_data_finalizacao_idx on public.orcamentos (data_finalizacao desc);

create or replace function public.set_orcamento_finalizacao()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'finalizado' and coalesce(old.status, '') is distinct from 'finalizado' then
    new.data_finalizacao = coalesce(new.data_finalizacao, now());
  elsif old.status = 'finalizado' and new.status is distinct from 'finalizado' then
    new.data_finalizacao = null;
  end if;

  return new;
end;
$$;

drop trigger if exists set_orcamento_finalizacao on public.orcamentos;
create trigger set_orcamento_finalizacao
before update on public.orcamentos
for each row execute function public.set_orcamento_finalizacao();
