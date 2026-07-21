-- Compartilhamento dos modulos embutidos.
-- Fretes fica em tabela propria para permitir solicitacao por viewer e gestao por super_admin.

create table if not exists public.fretes_solicitacoes (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  criado_por uuid references public.profiles(id) default auth.uid(),
  email_solicitante text,
  status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists fretes_solicitacoes_status_idx on public.fretes_solicitacoes (status);
create index if not exists fretes_solicitacoes_email_idx on public.fretes_solicitacoes (lower(email_solicitante));
create index if not exists fretes_solicitacoes_updated_idx on public.fretes_solicitacoes (updated_at desc);

drop trigger if exists set_fretes_solicitacoes_updated_at on public.fretes_solicitacoes;
create trigger set_fretes_solicitacoes_updated_at
before update on public.fretes_solicitacoes
for each row execute function public.set_updated_at();

alter table public.fretes_solicitacoes enable row level security;

drop policy if exists fretes_solicitacoes_select on public.fretes_solicitacoes;
create policy fretes_solicitacoes_select on public.fretes_solicitacoes
for select using (public.current_profile_is_active());

drop policy if exists fretes_solicitacoes_insert on public.fretes_solicitacoes;
create policy fretes_solicitacoes_insert on public.fretes_solicitacoes
for insert with check (
  public.current_profile_is_active()
  and (
    public.is_super_admin()
    or criado_por = auth.uid()
    or criado_por is null
  )
);

drop policy if exists fretes_solicitacoes_update on public.fretes_solicitacoes;
create policy fretes_solicitacoes_update on public.fretes_solicitacoes
for update using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists fretes_solicitacoes_delete on public.fretes_solicitacoes;
create policy fretes_solicitacoes_delete on public.fretes_solicitacoes
for delete using (public.is_super_admin());

create table if not exists public.embedded_app_state (
  storage_key text primary key,
  module_key text not null check (module_key in ('fretes','frota','estoque_obras','avaliacao_fornecedores')),
  payload jsonb not null default 'null'::jsonb,
  updated_by uuid references public.profiles(id) default auth.uid(),
  updated_at timestamptz not null default now()
);

create index if not exists embedded_app_state_module_idx on public.embedded_app_state (module_key);

drop trigger if exists set_embedded_app_state_updated_at on public.embedded_app_state;
create trigger set_embedded_app_state_updated_at
before update on public.embedded_app_state
for each row execute function public.set_updated_at();

alter table public.embedded_app_state enable row level security;

drop policy if exists embedded_app_state_select on public.embedded_app_state;
create policy embedded_app_state_select on public.embedded_app_state
for select using (public.current_profile_is_active());

drop policy if exists embedded_app_state_insert on public.embedded_app_state;
create policy embedded_app_state_insert on public.embedded_app_state
for insert with check (public.is_super_admin());

drop policy if exists embedded_app_state_update on public.embedded_app_state;
create policy embedded_app_state_update on public.embedded_app_state
for update using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists embedded_app_state_delete on public.embedded_app_state;
create policy embedded_app_state_delete on public.embedded_app_state
for delete using (public.is_super_admin());
