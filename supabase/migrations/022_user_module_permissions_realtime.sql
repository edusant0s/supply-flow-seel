-- Permissoes granulares por modulo e atualizacao em tempo real.
-- A UI usa esta matriz para menu/acoes; o banco tambem valida por RLS.

alter table public.profiles
add column if not exists module_permissions jsonb not null default '{}'::jsonb;

create index if not exists profiles_module_permissions_gin_idx
on public.profiles using gin (module_permissions);

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

create or replace function public.can_manage_embedded_module(p_module_key text)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select public.profile_has_module_permission(p_module_key, 'manage');
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

  return public.profile_has_module_permission(p_module_key, 'manage');
end;
$$;

drop policy if exists requisicoes_select on public.requisicoes;
create policy requisicoes_select on public.requisicoes
for select using (
  public.profile_has_module_permission('requisicoes', 'view')
  and (
    public.profile_has_module_permission('requisicoes', 'manage')
    or public.user_can_access_obra(obra_id)
  )
);

drop policy if exists requisicoes_insert on public.requisicoes;
create policy requisicoes_insert on public.requisicoes
for insert with check (public.profile_has_module_permission('requisicoes', 'manage'));

drop policy if exists requisicoes_update on public.requisicoes;
create policy requisicoes_update on public.requisicoes
for update using (public.profile_has_module_permission('requisicoes', 'manage'))
with check (public.profile_has_module_permission('requisicoes', 'manage'));

drop policy if exists requisicoes_delete on public.requisicoes;
create policy requisicoes_delete on public.requisicoes
for delete using (public.profile_has_module_permission('requisicoes', 'manage'));

drop policy if exists orcamentos_select on public.orcamentos;
create policy orcamentos_select on public.orcamentos
for select using (public.profile_has_module_permission('orcamentos', 'view'));

drop policy if exists orcamentos_insert on public.orcamentos;
create policy orcamentos_insert on public.orcamentos
for insert with check (
  public.profile_has_module_permission('orcamentos', 'view')
  and (
    criado_por is null
    or criado_por = auth.uid()
    or public.profile_has_module_permission('orcamentos', 'manage')
  )
);

drop policy if exists orcamentos_update on public.orcamentos;
create policy orcamentos_update on public.orcamentos
for update using (public.profile_has_module_permission('orcamentos', 'manage'))
with check (public.profile_has_module_permission('orcamentos', 'manage'));

drop policy if exists orcamentos_delete on public.orcamentos;
create policy orcamentos_delete on public.orcamentos
for delete using (
  public.profile_has_module_permission('orcamentos', 'view')
  and (
    public.profile_has_module_permission('orcamentos', 'manage')
    or criado_por = auth.uid()
    or (
      criado_por is null
      and lower(coalesce(email_solicitante, '')) = lower(coalesce(public.get_current_user_email(), ''))
    )
  )
);

drop policy if exists contratos_select on public.contratos;
create policy contratos_select on public.contratos
for select using (
  public.profile_has_module_permission('contratos', 'view')
  and (
    public.profile_has_module_permission('contratos', 'manage')
    or public.user_can_access_obra(obra_id)
  )
);

drop policy if exists contratos_insert on public.contratos;
create policy contratos_insert on public.contratos
for insert with check (
  public.profile_has_module_permission('contratos', 'view')
  and (
    public.profile_has_module_permission('contratos', 'manage')
    or public.user_can_access_obra(obra_id)
  )
);

drop policy if exists contratos_update on public.contratos;
create policy contratos_update on public.contratos
for update using (public.profile_has_module_permission('contratos', 'manage'))
with check (public.profile_has_module_permission('contratos', 'manage'));

drop policy if exists contratos_delete on public.contratos;
create policy contratos_delete on public.contratos
for delete using (public.profile_has_module_permission('contratos', 'manage'));

drop policy if exists fornecedores_select on public.fornecedores;
create policy fornecedores_select on public.fornecedores
for select using (public.profile_has_module_permission('fornecedores', 'view'));

drop policy if exists fornecedores_insert on public.fornecedores;
create policy fornecedores_insert on public.fornecedores
for insert with check (public.profile_has_module_permission('fornecedores', 'manage'));

drop policy if exists fornecedores_update on public.fornecedores;
create policy fornecedores_update on public.fornecedores
for update using (public.profile_has_module_permission('fornecedores', 'manage'))
with check (public.profile_has_module_permission('fornecedores', 'manage'));

drop policy if exists fornecedores_delete on public.fornecedores;
create policy fornecedores_delete on public.fornecedores
for delete using (public.profile_has_module_permission('fornecedores', 'manage'));

drop policy if exists importacoes_select on public.importacoes;
create policy importacoes_select on public.importacoes
for select using (
  public.profile_has_module_permission('importacoes', 'view')
  and (
    public.is_super_admin()
    or (tipo = 'requisicoes' and public.profile_has_module_permission('requisicoes', 'manage'))
    or (tipo = 'fornecedores' and public.profile_has_module_permission('fornecedores', 'manage'))
    or (tipo = 'orcamentos' and public.profile_has_module_permission('orcamentos', 'manage'))
    or (tipo = 'contratos' and public.profile_has_module_permission('contratos', 'manage'))
    or (tipo = 'frota' and public.profile_has_module_permission('frota', 'manage'))
  )
);

drop policy if exists importacoes_insert on public.importacoes;
create policy importacoes_insert on public.importacoes
for insert with check (
  usuario_id = auth.uid()
  and public.profile_has_module_permission('importacoes', 'manage')
  and (
    public.is_super_admin()
    or (tipo = 'requisicoes' and public.profile_has_module_permission('requisicoes', 'manage'))
    or (tipo = 'fornecedores' and public.profile_has_module_permission('fornecedores', 'manage'))
    or (tipo = 'orcamentos' and public.profile_has_module_permission('orcamentos', 'manage'))
    or (tipo = 'contratos' and public.profile_has_module_permission('contratos', 'manage'))
    or (tipo = 'frota' and public.profile_has_module_permission('frota', 'manage'))
  )
);

drop policy if exists embedded_app_state_select on public.embedded_app_state;
create policy embedded_app_state_select on public.embedded_app_state
for select using (public.profile_has_module_permission(module_key, 'view'));

drop policy if exists embedded_app_state_insert on public.embedded_app_state;
create policy embedded_app_state_insert on public.embedded_app_state
for insert with check (public.can_manage_embedded_state_key(module_key, storage_key));

drop policy if exists embedded_app_state_update on public.embedded_app_state;
create policy embedded_app_state_update on public.embedded_app_state
for update using (public.can_manage_embedded_state_key(module_key, storage_key))
with check (public.can_manage_embedded_state_key(module_key, storage_key));

drop policy if exists embedded_app_state_delete on public.embedded_app_state;
create policy embedded_app_state_delete on public.embedded_app_state
for delete using (public.can_manage_embedded_state_key(module_key, storage_key));

drop policy if exists fretes_solicitacoes_select on public.fretes_solicitacoes;
create policy fretes_solicitacoes_select on public.fretes_solicitacoes
for select using (public.profile_has_module_permission('fretes', 'view'));

drop policy if exists fretes_solicitacoes_insert on public.fretes_solicitacoes;
create policy fretes_solicitacoes_insert on public.fretes_solicitacoes
for insert with check (
  public.profile_has_module_permission('fretes', 'view')
  and (
    public.profile_has_module_permission('fretes', 'manage')
    or criado_por = auth.uid()
    or criado_por is null
  )
);

drop policy if exists fretes_solicitacoes_update on public.fretes_solicitacoes;
create policy fretes_solicitacoes_update on public.fretes_solicitacoes
for update using (public.profile_has_module_permission('fretes', 'manage'))
with check (public.profile_has_module_permission('fretes', 'manage'));

drop policy if exists fretes_solicitacoes_delete on public.fretes_solicitacoes;
create policy fretes_solicitacoes_delete on public.fretes_solicitacoes
for delete using (public.profile_has_module_permission('fretes', 'manage'));

drop policy if exists estoque_obras_pedidos_select on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_select on public.estoque_obras_pedidos
for select using (
  public.profile_has_module_permission('estoque_obras', 'view')
  and (
    public.profile_has_module_permission('estoque_obras', 'manage')
    or criado_por = auth.uid()
    or lower(coalesce(requester_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists estoque_obras_pedidos_insert on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_insert on public.estoque_obras_pedidos
for insert with check (
  public.profile_has_module_permission('estoque_obras', 'view')
  and (
    public.profile_has_module_permission('estoque_obras', 'manage')
    or lower(coalesce(requester_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists estoque_obras_pedidos_update on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_update on public.estoque_obras_pedidos
for update using (public.profile_has_module_permission('estoque_obras', 'manage'))
with check (public.profile_has_module_permission('estoque_obras', 'manage'));

drop policy if exists estoque_obras_pedidos_delete on public.estoque_obras_pedidos;
create policy estoque_obras_pedidos_delete on public.estoque_obras_pedidos
for delete using (public.profile_has_module_permission('estoque_obras', 'manage'));

drop policy if exists avaliacao_fornecedores_avaliacoes_select on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_select on public.avaliacao_fornecedores_avaliacoes
for select using (
  public.profile_has_module_permission('avaliacao_fornecedores', 'view')
  and (
    public.profile_has_module_permission('avaliacao_fornecedores', 'manage')
    or criado_por = auth.uid()
    or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists avaliacao_fornecedores_avaliacoes_insert on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_insert on public.avaliacao_fornecedores_avaliacoes
for insert with check (
  public.profile_has_module_permission('avaliacao_fornecedores', 'view')
  and (
    public.profile_has_module_permission('avaliacao_fornecedores', 'manage')
    or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists avaliacao_fornecedores_avaliacoes_update on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_update on public.avaliacao_fornecedores_avaliacoes
for update using (
  public.profile_has_module_permission('avaliacao_fornecedores', 'manage')
  or (
    public.profile_has_module_permission('avaliacao_fornecedores', 'view')
    and (
      criado_por = auth.uid()
      or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
    )
  )
)
with check (
  public.profile_has_module_permission('avaliacao_fornecedores', 'manage')
  or lower(coalesce(avaliador_email, '')) = lower(coalesce(public.get_current_user_email(), ''))
);

drop policy if exists avaliacao_fornecedores_avaliacoes_delete on public.avaliacao_fornecedores_avaliacoes;
create policy avaliacao_fornecedores_avaliacoes_delete on public.avaliacao_fornecedores_avaliacoes
for delete using (
  public.profile_has_module_permission('avaliacao_fornecedores', 'manage')
  or criado_por = auth.uid()
);

drop policy if exists fornecedores_cadastros_select on public.fornecedores_cadastros;
create policy fornecedores_cadastros_select on public.fornecedores_cadastros
for select using (
  public.profile_has_module_permission('fornecedores', 'view')
  and (
    public.profile_has_module_permission('fornecedores', 'manage')
    or criado_por = auth.uid()
    or lower(coalesce(email_solicitante, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists fornecedores_cadastros_insert on public.fornecedores_cadastros;
create policy fornecedores_cadastros_insert on public.fornecedores_cadastros
for insert with check (
  public.profile_has_module_permission('fornecedores', 'view')
  and (
    public.profile_has_module_permission('fornecedores', 'manage')
    or lower(coalesce(email_solicitante, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists fornecedores_cadastros_update on public.fornecedores_cadastros;
create policy fornecedores_cadastros_update on public.fornecedores_cadastros
for update using (public.profile_has_module_permission('fornecedores', 'manage'))
with check (public.profile_has_module_permission('fornecedores', 'manage'));

drop policy if exists fornecedores_cadastros_delete on public.fornecedores_cadastros;
create policy fornecedores_cadastros_delete on public.fornecedores_cadastros
for delete using (public.profile_has_module_permission('fornecedores', 'manage'));

drop policy if exists nf_simples_remessa_select on public.nf_simples_remessa_solicitacoes;
create policy nf_simples_remessa_select on public.nf_simples_remessa_solicitacoes
for select using (
  public.profile_has_module_permission('nota_fiscal', 'view')
  and (
    public.profile_has_module_permission('nota_fiscal', 'manage')
    or criado_por = auth.uid()
    or lower(coalesce(email_solicitante, '')) = lower(coalesce(public.get_current_user_email(), ''))
  )
);

drop policy if exists nf_simples_remessa_insert on public.nf_simples_remessa_solicitacoes;
create policy nf_simples_remessa_insert on public.nf_simples_remessa_solicitacoes
for insert with check (
  public.profile_has_module_permission('nota_fiscal', 'view')
  and (
    public.profile_has_module_permission('nota_fiscal', 'manage')
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
for update using (public.profile_has_module_permission('nota_fiscal', 'manage'))
with check (public.profile_has_module_permission('nota_fiscal', 'manage'));

drop policy if exists nf_simples_remessa_delete on public.nf_simples_remessa_solicitacoes;
create policy nf_simples_remessa_delete on public.nf_simples_remessa_solicitacoes
for delete using (public.profile_has_module_permission('nota_fiscal', 'manage'));

do $$
declare
  v_table text;
  v_tables text[] := array[
    'profiles',
    'user_obras',
    'obras',
    'requisicoes',
    'orcamentos',
    'contratos',
    'fornecedores',
    'importacoes',
    'embedded_app_state',
    'fretes_solicitacoes',
    'nf_simples_remessa_solicitacoes',
    'estoque_obras_pedidos',
    'avaliacao_fornecedores_avaliacoes',
    'fornecedores_cadastros'
  ];
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    foreach v_table in array v_tables loop
      if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public'
          and table_name = v_table
      )
      and not exists (
        select 1
        from pg_publication_tables
        where pubname = 'supabase_realtime'
          and schemaname = 'public'
          and tablename = v_table
      ) then
        execute format('alter publication supabase_realtime add table public.%I', v_table);
      end if;
    end loop;
  end if;
end $$;
