-- Ajustes de acesso:
-- - viewer_global visualiza todas as requisicoes, sem restricao por obra.
-- - Orcamentos nao usam restricao por obra: usuarios ativos podem solicitar e visualizar.
-- - Usuarios ativos podem subir anexos no bucket privado; alteracao/exclusao segue admin.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in ('super_admin','admin_suprimentos','admin_orcamentos','admin_contratos','viewer_global','viewer'));

drop policy if exists requisicoes_select on public.requisicoes;
create policy requisicoes_select on public.requisicoes
for select using (
  public.can_manage_suprimentos()
  or public.get_current_user_role() = 'viewer_global'
  or public.user_can_access_obra(obra_id)
);

drop policy if exists orcamentos_select on public.orcamentos;
create policy orcamentos_select on public.orcamentos
for select using (public.current_profile_is_active());

drop policy if exists orcamentos_insert on public.orcamentos;
create policy orcamentos_insert on public.orcamentos
for insert with check (public.current_profile_is_active());

drop policy if exists supply_flow_anexos_insert on storage.objects;
create policy supply_flow_anexos_insert on storage.objects
for insert with check (
  bucket_id = 'supply-flow-anexos'
  and public.current_profile_is_active()
);
