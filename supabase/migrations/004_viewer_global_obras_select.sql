-- Permite que viewer_global carregue a lista de obras para filtrar RMs.
-- O perfil continua sem permissao de escrita em obras.

drop policy if exists obras_select on public.obras;
create policy obras_select on public.obras
for select using (
  public.is_admin()
  or public.get_current_user_role() = 'viewer_global'
  or public.user_can_access_obra(id)
);
