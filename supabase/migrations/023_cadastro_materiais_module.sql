-- Cadastro de materiais como modulo integrado ao Supply Flow.
-- Solicitacoes ficam em tabela propria para que viewers possam abrir chamados
-- e administradores de suprimentos/super_admin possam tratar a fila.

alter table public.embedded_app_state
drop constraint if exists embedded_app_state_module_key_check;

alter table public.embedded_app_state
add constraint embedded_app_state_module_key_check
check (module_key in ('contratos','fretes','nota_fiscal','frota','estoque_obras','cadastro_materiais','avaliacao_fornecedores','orcamentos','fornecedores'));

create or replace function public.profile_has_module_permission(p_module_key text, p_mode text default 'view')
returns boolean
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  v_role text;
  v_permissions jsonb;
  v_module jsonb;
  v_view boolean;
  v_manage boolean;
begin
  select p.role, coalesce(p.module_permissions, '{}'::jsonb)
    into v_role, v_permissions
  from public.profiles p
  where p.id = auth.uid()
    and p.ativo = true;

  if v_role is null then
    return false;
  end if;

  if v_role = 'super_admin' then
    return true;
  end if;

  v_module := coalesce(v_permissions -> p_module_key, '{}'::jsonb);

  if jsonb_typeof(v_module -> 'view') = 'boolean' then
    v_view := (v_module ->> 'view')::boolean;
  end if;

  if jsonb_typeof(v_module -> 'manage') = 'boolean' then
    v_manage := (v_module ->> 'manage')::boolean;
  end if;

  if p_mode = 'manage' then
    if v_manage is not null then
      return v_manage;
    end if;

    return case p_module_key
      when 'dashboard' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos')
      when 'alertas' then v_role in ('super_admin','admin_orcamentos')
      when 'requisicoes' then v_role in ('super_admin','admin_suprimentos')
      when 'orcamentos' then v_role in ('super_admin','admin_orcamentos')
      when 'contratos' then v_role in ('super_admin','admin_contratos')
      when 'fretes' then v_role = 'super_admin'
      when 'nota_fiscal' then v_role in ('super_admin','admin_suprimentos')
      when 'estoque_obras' then v_role in ('super_admin','admin_suprimentos')
      when 'cadastro_materiais' then v_role in ('super_admin','admin_suprimentos')
      when 'frota' then v_role = 'super_admin'
      when 'fornecedores' then v_role in ('super_admin','admin_suprimentos')
      when 'avaliacao_fornecedores' then v_role = 'super_admin'
      when 'importacoes' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos')
      when 'usuarios' then v_role = 'super_admin'
      when 'settings' then v_role = 'super_admin'
      else false
    end;
  end if;

  if v_view is not null then
    return v_view;
  end if;

  if v_manage is true then
    return true;
  end if;

  return case p_module_key
    when 'dashboard' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'alertas' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'requisicoes' then v_role in ('super_admin','admin_suprimentos','viewer_global','viewer')
    when 'orcamentos' then v_role in ('super_admin','admin_orcamentos','viewer_global','viewer')
    when 'contratos' then v_role in ('super_admin','admin_contratos','viewer_global','viewer')
    when 'fretes' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'nota_fiscal' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'estoque_obras' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'cadastro_materiais' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'frota' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'fornecedores' then v_role in ('super_admin','admin_suprimentos','viewer_global','viewer')
    when 'avaliacao_fornecedores' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')
    when 'importacoes' then v_role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos')
    when 'usuarios' then v_role = 'super_admin'
    when 'settings' then v_role = 'super_admin'
    else false
  end;
end;
$$;

create or replace function public.can_manage_embedded_state_key(p_module_key text, p_storage_key text)
returns boolean
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  v_role text;
begin
  v_role := public.get_current_user_role();

  if v_role = 'super_admin' then
    return true;
  end if;

  if p_module_key = 'fornecedores' and p_storage_key = 'seel_fornecedores_schema_v2' then
    return false;
  end if;

  if p_module_key = 'nota_fiscal' and p_storage_key = 'seel_nf_formulario_editor_v1' then
    return false;
  end if;

  if p_module_key = 'cadastro_materiais' and p_storage_key = 'seel_cadastro_itens_formulario_editor_v1' then
    return false;
  end if;

  return public.profile_has_module_permission(p_module_key, 'manage');
end;
$$;

create table if not exists public.cadastro_materiais_solicitacoes (
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

create index if not exists cadastro_materiais_codigo_idx on public.cadastro_materiais_solicitacoes (codigo);
create index if not exists cadastro_materiais_email_idx on public.cadastro_materiais_solicitacoes (lower(email_solicitante));
create index if not exists cadastro_materiais_status_idx on public.cadastro_materiais_solicitacoes (status);
create index if not exists cadastro_materiais_centro_idx on public.cadastro_materiais_solicitacoes (centro_custo);
create index if not exists cadastro_materiais_updated_idx on public.cadastro_materiais_solicitacoes (updated_at desc);

drop trigger if exists set_cadastro_materiais_updated_at on public.cadastro_materiais_solicitacoes;
create trigger set_cadastro_materiais_updated_at
before update on public.cadastro_materiais_solicitacoes
for each row execute function public.set_updated_at();

alter table public.cadastro_materiais_solicitacoes enable row level security;

drop policy if exists cadastro_materiais_select on public.cadastro_materiais_solicitacoes;
create policy cadastro_materiais_select on public.cadastro_materiais_solicitacoes
for select using (public.profile_has_module_permission('cadastro_materiais', 'view'));

drop policy if exists cadastro_materiais_insert on public.cadastro_materiais_solicitacoes;
create policy cadastro_materiais_insert on public.cadastro_materiais_solicitacoes
for insert with check (
  public.profile_has_module_permission('cadastro_materiais', 'view')
  and (
    public.profile_has_module_permission('cadastro_materiais', 'manage')
    or (
      coalesce(criado_por, auth.uid()) = auth.uid()
      and (
        email_solicitante is null
        or lower(email_solicitante) = lower(coalesce(public.get_current_user_email(), ''))
      )
    )
  )
);

drop policy if exists cadastro_materiais_update on public.cadastro_materiais_solicitacoes;
create policy cadastro_materiais_update on public.cadastro_materiais_solicitacoes
for update using (public.profile_has_module_permission('cadastro_materiais', 'manage'))
with check (public.profile_has_module_permission('cadastro_materiais', 'manage'));

drop policy if exists cadastro_materiais_delete on public.cadastro_materiais_solicitacoes;
create policy cadastro_materiais_delete on public.cadastro_materiais_solicitacoes
for delete using (public.profile_has_module_permission('cadastro_materiais', 'manage'));

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1
       from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'cadastro_materiais_solicitacoes'
     ) then
    alter publication supabase_realtime add table public.cadastro_materiais_solicitacoes;
  end if;
end;
$$;
