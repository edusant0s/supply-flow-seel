-- Suporte ao modulo embutido de Cadastro/Homologacao de Fornecedores.
-- As solicitacoes ficam em tabela propria para permitir abertura por usuarios
-- comuns e tratamento por super_admin/admin_suprimentos via RLS.

alter table public.embedded_app_state
drop constraint if exists embedded_app_state_module_key_check;

alter table public.embedded_app_state
add constraint embedded_app_state_module_key_check
check (module_key in ('contratos','fretes','frota','estoque_obras','avaliacao_fornecedores','orcamentos','fornecedores'));

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
      when 'fornecedores' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'fretes' then public.get_current_user_role() = 'super_admin'
      when 'frota' then public.get_current_user_role() = 'super_admin'
      when 'avaliacao_fornecedores' then public.get_current_user_role() = 'super_admin'
      when 'orcamentos' then public.get_current_user_role() = 'super_admin'
      else false
    end;
$$;

create or replace function public.can_manage_embedded_state_key(p_module_key text, p_storage_key text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_profile_is_active()
    and case p_module_key
      when 'contratos' then
        case
          when p_storage_key = 'seel_form_google_forms_v8_sem_mapa_sem_un' then public.get_current_user_role() = 'super_admin'
          else public.get_current_user_role() in ('super_admin','admin_contratos')
        end
      when 'estoque_obras' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'fornecedores' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'fretes' then public.get_current_user_role() = 'super_admin'
      when 'frota' then public.get_current_user_role() = 'super_admin'
      when 'avaliacao_fornecedores' then public.get_current_user_role() = 'super_admin'
      when 'orcamentos' then public.get_current_user_role() = 'super_admin'
      else false
    end;
$$;

create table if not exists public.fornecedores_cadastros (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  criado_por uuid references public.profiles(id) default auth.uid(),
  email_solicitante text,
  obra text,
  fornecedor text,
  status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists fornecedores_cadastros_email_idx on public.fornecedores_cadastros (lower(email_solicitante));
create index if not exists fornecedores_cadastros_obra_idx on public.fornecedores_cadastros (obra);
create index if not exists fornecedores_cadastros_fornecedor_idx on public.fornecedores_cadastros (fornecedor);
create index if not exists fornecedores_cadastros_status_idx on public.fornecedores_cadastros (status);
create index if not exists fornecedores_cadastros_updated_idx on public.fornecedores_cadastros (updated_at desc);

drop trigger if exists set_fornecedores_cadastros_updated_at on public.fornecedores_cadastros;
create trigger set_fornecedores_cadastros_updated_at
before update on public.fornecedores_cadastros
for each row execute function public.set_updated_at();

alter table public.fornecedores_cadastros enable row level security;

drop policy if exists fornecedores_cadastros_select on public.fornecedores_cadastros;
create policy fornecedores_cadastros_select on public.fornecedores_cadastros
for select using (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('fornecedores')
    or criado_por = auth.uid()
    or lower(coalesce(email_solicitante, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists fornecedores_cadastros_insert on public.fornecedores_cadastros;
create policy fornecedores_cadastros_insert on public.fornecedores_cadastros
for insert with check (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('fornecedores')
    or criado_por = auth.uid()
    or criado_por is null
  )
);

drop policy if exists fornecedores_cadastros_update on public.fornecedores_cadastros;
create policy fornecedores_cadastros_update on public.fornecedores_cadastros
for update using (public.can_manage_embedded_module('fornecedores'))
with check (public.can_manage_embedded_module('fornecedores'));

drop policy if exists fornecedores_cadastros_delete on public.fornecedores_cadastros;
create policy fornecedores_cadastros_delete on public.fornecedores_cadastros
for delete using (public.can_manage_embedded_module('fornecedores'));
