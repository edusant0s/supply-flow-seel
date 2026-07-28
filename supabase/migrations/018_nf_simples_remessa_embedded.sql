alter table public.embedded_app_state
drop constraint if exists embedded_app_state_module_key_check;

alter table public.embedded_app_state
add constraint embedded_app_state_module_key_check
check (module_key in ('contratos','fretes','nota_fiscal','frota','estoque_obras','avaliacao_fornecedores','orcamentos','fornecedores'));

create or replace function public.get_current_user_email()
returns text
language sql
security definer
set search_path = public, auth
as $$
  select coalesce(
    (select email from public.profiles where id = auth.uid()),
    (auth.jwt() ->> 'email')
  );
$$;

create or replace function public.can_manage_embedded_module(p_module_key text)
returns boolean
language sql
security definer
set search_path = public, auth
as $$
  select public.current_profile_is_active()
    and case p_module_key
      when 'fretes' then public.get_current_user_role() = 'super_admin'
      when 'nota_fiscal' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'frota' then public.get_current_user_role() = 'super_admin'
      when 'estoque_obras' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'contratos' then public.get_current_user_role() in ('super_admin','admin_contratos')
      when 'fornecedores' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'avaliacao_fornecedores' then public.get_current_user_role() = 'super_admin'
      when 'orcamentos' then public.get_current_user_role() in ('super_admin','admin_orcamentos')
      else false
    end;
$$;

create or replace function public.can_manage_embedded_state_key(p_module_key text, p_storage_key text)
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_role text;
begin
  v_role := public.get_current_user_role();

  if not public.current_profile_is_active() then
    return false;
  end if;

  if v_role = 'super_admin' then
    return true;
  end if;

  if p_module_key = 'fornecedores' and p_storage_key = 'seel_fornecedores_schema_v2' then
    return false;
  end if;

  if p_module_key = 'nota_fiscal' and p_storage_key = 'seel_nf_formulario_editor_v1' then
    return false;
  end if;

  return
    (p_module_key = 'fretes' and v_role = 'super_admin')
    or (p_module_key = 'frota' and v_role = 'super_admin')
    or (p_module_key = 'avaliacao_fornecedores' and v_role = 'super_admin')
    or (p_module_key = 'contratos' and v_role in ('super_admin', 'admin_contratos'))
    or (p_module_key = 'orcamentos' and v_role in ('super_admin', 'admin_orcamentos'))
    or (p_module_key = 'fornecedores' and v_role in ('super_admin', 'admin_suprimentos'))
    or (p_module_key = 'nota_fiscal' and v_role in ('super_admin', 'admin_suprimentos'))
    or (p_module_key = 'estoque_obras' and v_role in ('super_admin', 'admin_suprimentos'));
end;
$$;

create table if not exists public.nf_simples_remessa_solicitacoes (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  criado_por uuid references public.profiles(id) default auth.uid(),
  codigo text,
  solicitante text,
  email_solicitante text,
  centro_custo text,
  status text,
  prioridade text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists nf_simples_remessa_codigo_idx on public.nf_simples_remessa_solicitacoes (codigo);
create index if not exists nf_simples_remessa_email_idx on public.nf_simples_remessa_solicitacoes (lower(email_solicitante));
create index if not exists nf_simples_remessa_status_idx on public.nf_simples_remessa_solicitacoes (status);
create index if not exists nf_simples_remessa_centro_idx on public.nf_simples_remessa_solicitacoes (centro_custo);
create index if not exists nf_simples_remessa_updated_idx on public.nf_simples_remessa_solicitacoes (updated_at desc);

drop trigger if exists set_nf_simples_remessa_updated_at on public.nf_simples_remessa_solicitacoes;
create trigger set_nf_simples_remessa_updated_at
before update on public.nf_simples_remessa_solicitacoes
for each row execute function public.set_updated_at();

alter table public.nf_simples_remessa_solicitacoes enable row level security;

drop policy if exists nf_simples_remessa_select on public.nf_simples_remessa_solicitacoes;
create policy nf_simples_remessa_select on public.nf_simples_remessa_solicitacoes
for select using (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('nota_fiscal')
    or criado_por = auth.uid()
    or lower(coalesce(email_solicitante, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists nf_simples_remessa_insert on public.nf_simples_remessa_solicitacoes;
create policy nf_simples_remessa_insert on public.nf_simples_remessa_solicitacoes
for insert with check (
  public.current_profile_is_active()
  and (
    public.can_manage_embedded_module('nota_fiscal')
    or (
      coalesce(criado_por, auth.uid()) = auth.uid()
      and (
        email_solicitante is null
        or lower(email_solicitante) = lower(coalesce(public.get_current_user_email(), ''))
      )
    )
  )
);

drop policy if exists nf_simples_remessa_update on public.nf_simples_remessa_solicitacoes;
create policy nf_simples_remessa_update on public.nf_simples_remessa_solicitacoes
for update using (public.can_manage_embedded_module('nota_fiscal'))
with check (public.can_manage_embedded_module('nota_fiscal'));

drop policy if exists nf_simples_remessa_delete on public.nf_simples_remessa_solicitacoes;
create policy nf_simples_remessa_delete on public.nf_simples_remessa_solicitacoes
for delete using (public.can_manage_embedded_module('nota_fiscal'));
