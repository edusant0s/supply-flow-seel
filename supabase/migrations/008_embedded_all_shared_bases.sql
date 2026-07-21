-- Centraliza no Supabase as bases que ainda estavam presas ao localStorage dos modulos embutidos.
-- Dados operacionais ficam compartilhados com RLS; credenciais/API settings continuam fora do frontend.

alter table public.embedded_app_state
drop constraint if exists embedded_app_state_module_key_check;

alter table public.embedded_app_state
add constraint embedded_app_state_module_key_check
check (module_key in ('contratos','fretes','frota','estoque_obras','avaliacao_fornecedores'));

create or replace function public.get_current_user_email()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.email from public.profiles p where p.id = auth.uid()),
    auth.jwt() ->> 'email'
  );
$$;

create or replace function public.can_manage_embedded_module(p_module_key text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_profile_is_active()
    and case p_module_key
      when 'contratos' then public.get_current_user_role() in ('super_admin','admin_contratos')
      when 'estoque_obras' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'fretes' then public.get_current_user_role() = 'super_admin'
      when 'frota' then public.get_current_user_role() = 'super_admin'
      when 'avaliacao_fornecedores' then public.get_current_user_role() = 'super_admin'
      else false
    end;
$$;

drop policy if exists embedded_app_state_select on public.embedded_app_state;
create policy embedded_app_state_select on public.embedded_app_state
for select using (public.current_profile_is_active());

drop policy if exists embedded_app_state_insert on public.embedded_app_state;
create policy embedded_app_state_insert on public.embedded_app_state
for insert with check (public.can_manage_embedded_module(module_key));

drop policy if exists embedded_app_state_update on public.embedded_app_state;
create policy embedded_app_state_update on public.embedded_app_state
for update using (public.can_manage_embedded_module(module_key))
with check (public.can_manage_embedded_module(module_key));

drop policy if exists embedded_app_state_delete on public.embedded_app_state;
create policy embedded_app_state_delete on public.embedded_app_state
for delete using (public.can_manage_embedded_module(module_key));

create table if not exists public.estoque_obras_pedidos (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  criado_por uuid references public.profiles(id) default auth.uid(),
  requester_email text,
  obra text,
  status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists estoque_obras_pedidos_email_idx on public.estoque_obras_pedidos (lower(requester_email));
create index if not exists estoque_obras_pedidos_obra_idx on public.estoque_obras_pedidos (obra);
create index if not exists estoque_obras_pedidos_status_idx on public.estoque_obras_pedidos (status);
create index if not exists estoque_obras_pedidos_updated_idx on public.estoque_obras_pedidos (updated_at desc);

drop trigger if exists set_estoque_obras_pedidos_updated_at on public.estoque_obras_pedidos;
create trigger set_estoque_obras_pedidos_updated_at
before update on public.estoque_obras_pedidos
for each row execute function public.set_updated_at();

alter table public.estoque_obras_pedidos enable row level security;

drop policy if exists estoque_obras_pedidos_select on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_select on public.estoque_obras_pedidos
for select using (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('estoque_obras')
    or criado_por = auth.uid()
    or lower(coalesce(requester_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists estoque_obras_pedidos_insert on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_insert on public.estoque_obras_pedidos
for insert with check (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('estoque_obras')
    or lower(coalesce(requester_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists estoque_obras_pedidos_update on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_update on public.estoque_obras_pedidos
for update using (public.can_manage_embedded_module('estoque_obras'))
with check (public.can_manage_embedded_module('estoque_obras'));

drop policy if exists estoque_obras_pedidos_delete on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_delete on public.estoque_obras_pedidos
for delete using (public.can_manage_embedded_module('estoque_obras'));

create table if not exists public.avaliacao_fornecedores_avaliacoes (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  criado_por uuid references public.profiles(id) default auth.uid(),
  cycle_id text,
  supplier_id text,
  obra text,
  fornecedor text,
  avaliador_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists avaliacao_fornecedores_avaliacoes_identity_idx
on public.avaliacao_fornecedores_avaliacoes (cycle_id, supplier_id, avaliador_email);

create index if not exists avaliacao_fornecedores_avaliacoes_obra_idx on public.avaliacao_fornecedores_avaliacoes (obra);
create index if not exists avaliacao_fornecedores_avaliacoes_supplier_idx on public.avaliacao_fornecedores_avaliacoes (supplier_id);
create index if not exists avaliacao_fornecedores_avaliacoes_updated_idx on public.avaliacao_fornecedores_avaliacoes (updated_at desc);

drop trigger if exists set_avaliacao_fornecedores_avaliacoes_updated_at on public.avaliacao_fornecedores_avaliacoes;
create trigger set_avaliacao_fornecedores_avaliacoes_updated_at
before update on public.avaliacao_fornecedores_avaliacoes
for each row execute function public.set_updated_at();

alter table public.avaliacao_fornecedores_avaliacoes enable row level security;

drop policy if exists avaliacao_fornecedores_avaliacoes_select on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_select on public.avaliacao_fornecedores_avaliacoes
for select using (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('avaliacao_fornecedores')
    or criado_por = auth.uid()
    or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists avaliacao_fornecedores_avaliacoes_insert on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_insert on public.avaliacao_fornecedores_avaliacoes
for insert with check (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('avaliacao_fornecedores')
    or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists avaliacao_fornecedores_avaliacoes_update on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_update on public.avaliacao_fornecedores_avaliacoes
for update using (
  public.can_manage_embedded_module('avaliacao_fornecedores')
  or criado_por = auth.uid()
  or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
)
with check (
  public.can_manage_embedded_module('avaliacao_fornecedores')
  or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
);

drop policy if exists avaliacao_fornecedores_avaliacoes_delete on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_delete on public.avaliacao_fornecedores_avaliacoes
for delete using (
  public.can_manage_embedded_module('avaliacao_fornecedores')
  or criado_por = auth.uid()
);
