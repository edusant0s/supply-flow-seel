create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null unique,
  role text not null check (role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer')),
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.obras (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  codigo text unique,
  centro_custo text,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.user_obras (
  user_id uuid not null references public.profiles(id) on delete cascade,
  obra_id uuid not null references public.obras(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, obra_id)
);

create table if not exists public.requisicoes (
  id uuid primary key default gen_random_uuid(),
  numero_rm text,
  obra_id uuid references public.obras(id),
  centro_custo text,
  solicitante text,
  comprador text,
  categoria text,
  status text not null default 'RM',
  prioridade text,
  data_inclusao date,
  data_necessidade date,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orcamentos (
  id uuid primary key default gen_random_uuid(),
  obra_id uuid references public.obras(id),
  criado_por uuid references public.profiles(id) default auth.uid(),
  numero_proposta text,
  nome_solicitante text,
  email_solicitante text,
  cliente text,
  local_obra text,
  tipo_orcamento text,
  status text not null default 'nao_iniciado',
  data_solicitacao date,
  data_entrega_cotacoes date,
  fornecedor text,
  valor_inicial numeric,
  valor_final numeric,
  saving numeric,
  quantidade_req numeric,
  observacoes text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contratos (
  id uuid primary key default gen_random_uuid(),
  obra_id uuid references public.obras(id),
  solicitante text,
  email_solicitante text,
  centro_custo text,
  tipo_documento text,
  urgencia text,
  prazo_urgencia date,
  status text not null default 'Não Iniciado',
  fase_compor text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fornecedores (
  id uuid primary key default gen_random_uuid(),
  codigo text,
  nome text not null,
  categoria text,
  produto_servico text,
  cidade text,
  uf text,
  regiao text,
  telefone text,
  email text,
  site text,
  cadastro_ativo boolean not null default false,
  latitude numeric,
  longitude numeric,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.importacoes (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('requisicoes','orcamentos','contratos','fornecedores')),
  arquivo_nome text not null,
  usuario_id uuid references public.profiles(id),
  total_linhas integer not null default 0,
  sucesso boolean not null default false,
  erros jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid,
  acao text not null,
  entidade text not null,
  entidade_id uuid,
  antes jsonb,
  depois jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists requisicoes_numero_rm_key on public.requisicoes (numero_rm);
create unique index if not exists orcamentos_numero_proposta_key on public.orcamentos (numero_proposta);
create unique index if not exists fornecedores_codigo_key on public.fornecedores (codigo);
create index if not exists requisicoes_obra_status_idx on public.requisicoes (obra_id, status);
create index if not exists orcamentos_obra_status_idx on public.orcamentos (obra_id, status);
create index if not exists contratos_obra_status_idx on public.contratos (obra_id, status);
create index if not exists fornecedores_busca_idx on public.fornecedores (uf, categoria, cadastro_ativo);
create index if not exists user_obras_user_idx on public.user_obras (user_id);
create index if not exists user_obras_obra_idx on public.user_obras (obra_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists set_requisicoes_updated_at on public.requisicoes;
create trigger set_requisicoes_updated_at before update on public.requisicoes for each row execute function public.set_updated_at();
drop trigger if exists set_orcamentos_updated_at on public.orcamentos;
create trigger set_orcamentos_updated_at before update on public.orcamentos for each row execute function public.set_updated_at();
drop trigger if exists set_contratos_updated_at on public.contratos;
create trigger set_contratos_updated_at before update on public.contratos for each row execute function public.set_updated_at();
drop trigger if exists set_fornecedores_updated_at on public.fornecedores;
create trigger set_fornecedores_updated_at before update on public.fornecedores for each row execute function public.set_updated_at();

create or replace function public.get_current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role from public.profiles p where p.id = auth.uid() and p.ativo = true;
$$;

create or replace function public.current_profile_is_active()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select p.ativo from public.profiles p where p.id = auth.uid()), false);
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.get_current_user_role() = 'super_admin';
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.get_current_user_role() in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos');
$$;

create or replace function public.can_manage_suprimentos()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.get_current_user_role() in ('super_admin','admin_suprimentos');
$$;

create or replace function public.can_manage_orcamentos()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.get_current_user_role() in ('super_admin','admin_orcamentos');
$$;

create or replace function public.can_manage_contratos()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.get_current_user_role() in ('super_admin','admin_contratos');
$$;

create or replace function public.user_can_access_obra(target_obra_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or (
      target_obra_id is not null
      and exists (
        select 1
        from public.user_obras uo
        where uo.user_id = auth.uid()
          and uo.obra_id = target_obra_id
      )
    );
$$;

create or replace function public.write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  row_id uuid;
begin
  row_id := coalesce(new.id, old.id);
  insert into public.audit_logs(usuario_id, acao, entidade, entidade_id, antes, depois)
  values (auth.uid(), tg_op, tg_table_name, row_id, to_jsonb(old), to_jsonb(new));
  return coalesce(new, old);
end;
$$;

drop trigger if exists audit_requisicoes on public.requisicoes;
create trigger audit_requisicoes after insert or update or delete on public.requisicoes for each row execute function public.write_audit_log();
drop trigger if exists audit_orcamentos on public.orcamentos;
create trigger audit_orcamentos after insert or update or delete on public.orcamentos for each row execute function public.write_audit_log();
drop trigger if exists audit_contratos on public.contratos;
create trigger audit_contratos after insert or update or delete on public.contratos for each row execute function public.write_audit_log();
drop trigger if exists audit_fornecedores on public.fornecedores;
create trigger audit_fornecedores after insert or update or delete on public.fornecedores for each row execute function public.write_audit_log();

alter table public.profiles enable row level security;
alter table public.obras enable row level security;
alter table public.user_obras enable row level security;
alter table public.requisicoes enable row level security;
alter table public.orcamentos enable row level security;
alter table public.contratos enable row level security;
alter table public.fornecedores enable row level security;
alter table public.importacoes enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
for select using (id = auth.uid() or public.is_super_admin());
drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles
for insert with check (public.is_super_admin());
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
for update using (public.is_super_admin()) with check (public.is_super_admin());
drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete on public.profiles
for delete using (public.is_super_admin());

drop policy if exists obras_select on public.obras;
create policy obras_select on public.obras
for select using (
  public.is_admin()
  or public.get_current_user_role() = 'viewer_global'
  or public.user_can_access_obra(id)
);
drop policy if exists obras_insert on public.obras;
create policy obras_insert on public.obras
for insert with check (public.is_super_admin());
drop policy if exists obras_update on public.obras;
create policy obras_update on public.obras
for update using (public.is_super_admin()) with check (public.is_super_admin());
drop policy if exists obras_delete on public.obras;
create policy obras_delete on public.obras
for delete using (public.is_super_admin());

drop policy if exists user_obras_select on public.user_obras;
create policy user_obras_select on public.user_obras
for select using (user_id = auth.uid() or public.is_super_admin());
drop policy if exists user_obras_insert on public.user_obras;
create policy user_obras_insert on public.user_obras
for insert with check (public.is_super_admin());
drop policy if exists user_obras_update on public.user_obras;
create policy user_obras_update on public.user_obras
for update using (public.is_super_admin()) with check (public.is_super_admin());
drop policy if exists user_obras_delete on public.user_obras;
create policy user_obras_delete on public.user_obras
for delete using (public.is_super_admin());

drop policy if exists requisicoes_select on public.requisicoes;
create policy requisicoes_select on public.requisicoes
for select using (
  public.can_manage_suprimentos()
  or public.get_current_user_role() = 'viewer_global'
  or public.user_can_access_obra(obra_id)
);
drop policy if exists requisicoes_insert on public.requisicoes;
create policy requisicoes_insert on public.requisicoes
for insert with check (public.can_manage_suprimentos());
drop policy if exists requisicoes_update on public.requisicoes;
create policy requisicoes_update on public.requisicoes
for update using (public.can_manage_suprimentos()) with check (public.can_manage_suprimentos());
drop policy if exists requisicoes_delete on public.requisicoes;
create policy requisicoes_delete on public.requisicoes
for delete using (public.can_manage_suprimentos());

drop policy if exists orcamentos_select on public.orcamentos;
create policy orcamentos_select on public.orcamentos
for select using (public.current_profile_is_active());
drop policy if exists orcamentos_insert on public.orcamentos;
create policy orcamentos_insert on public.orcamentos
for insert with check (
  public.current_profile_is_active()
  and (
    criado_por is null
    or criado_por = auth.uid()
    or public.can_manage_orcamentos()
  )
);
drop policy if exists orcamentos_update on public.orcamentos;
create policy orcamentos_update on public.orcamentos
for update using (public.can_manage_orcamentos()) with check (public.can_manage_orcamentos());
drop policy if exists orcamentos_delete on public.orcamentos;
create policy orcamentos_delete on public.orcamentos
for delete using (
  public.can_manage_orcamentos()
  or criado_por = auth.uid()
  or (
    criado_por is null
    and lower(coalesce(email_solicitante, '')) = lower(coalesce((
      select p.email
      from public.profiles p
      where p.id = auth.uid()
        and p.ativo = true
    ), ''))
  )
);

drop policy if exists contratos_select on public.contratos;
create policy contratos_select on public.contratos
for select using (public.can_manage_contratos() or public.user_can_access_obra(obra_id));
drop policy if exists contratos_insert on public.contratos;
create policy contratos_insert on public.contratos
for insert with check (
  public.can_manage_contratos()
  or (
    public.current_profile_is_active()
    and public.user_can_access_obra(obra_id)
  )
);
drop policy if exists contratos_update on public.contratos;
create policy contratos_update on public.contratos
for update using (public.can_manage_contratos()) with check (public.can_manage_contratos());
drop policy if exists contratos_delete on public.contratos;
create policy contratos_delete on public.contratos
for delete using (public.can_manage_contratos());

drop policy if exists fornecedores_select on public.fornecedores;
create policy fornecedores_select on public.fornecedores
for select using (public.current_profile_is_active());
drop policy if exists fornecedores_insert on public.fornecedores;
create policy fornecedores_insert on public.fornecedores
for insert with check (public.can_manage_suprimentos());
drop policy if exists fornecedores_update on public.fornecedores;
create policy fornecedores_update on public.fornecedores
for update using (public.can_manage_suprimentos()) with check (public.can_manage_suprimentos());
drop policy if exists fornecedores_delete on public.fornecedores;
create policy fornecedores_delete on public.fornecedores
for delete using (public.can_manage_suprimentos());

drop policy if exists importacoes_select on public.importacoes;
create policy importacoes_select on public.importacoes
for select using (
  public.is_super_admin()
  or (tipo in ('requisicoes','fornecedores') and public.can_manage_suprimentos())
  or (tipo = 'orcamentos' and public.can_manage_orcamentos())
  or (tipo = 'contratos' and public.can_manage_contratos())
);
drop policy if exists importacoes_insert on public.importacoes;
create policy importacoes_insert on public.importacoes
for insert with check (
  usuario_id = auth.uid()
  and (
    public.is_super_admin()
    or (tipo in ('requisicoes','fornecedores') and public.can_manage_suprimentos())
    or (tipo = 'orcamentos' and public.can_manage_orcamentos())
    or (tipo = 'contratos' and public.can_manage_contratos())
  )
);

drop policy if exists audit_logs_select on public.audit_logs;
create policy audit_logs_select on public.audit_logs
for select using (public.is_super_admin());

insert into storage.buckets (id, name, public)
values ('supply-flow-anexos', 'supply-flow-anexos', false)
on conflict (id) do nothing;

drop policy if exists supply_flow_anexos_select on storage.objects;
create policy supply_flow_anexos_select on storage.objects
for select using (bucket_id = 'supply-flow-anexos' and public.current_profile_is_active());
drop policy if exists supply_flow_anexos_insert on storage.objects;
create policy supply_flow_anexos_insert on storage.objects
for insert with check (bucket_id = 'supply-flow-anexos' and public.current_profile_is_active());
drop policy if exists supply_flow_anexos_update on storage.objects;
create policy supply_flow_anexos_update on storage.objects
for update using (bucket_id = 'supply-flow-anexos' and public.is_admin()) with check (bucket_id = 'supply-flow-anexos' and public.is_admin());
drop policy if exists supply_flow_anexos_delete on storage.objects;
create policy supply_flow_anexos_delete on storage.objects
for delete using (bucket_id = 'supply-flow-anexos' and public.is_admin());
