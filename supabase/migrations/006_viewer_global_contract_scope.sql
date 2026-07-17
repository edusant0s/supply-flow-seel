-- Permite que viewer_global acompanhe e solicite contratos em qualquer obra,
-- mantendo alteracao de status/edicao/exclusao restrita aos administradores de contratos.

create or replace function public.user_can_access_obra(target_obra_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or public.get_current_user_role() = 'viewer_global'
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
