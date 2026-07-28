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

  if v_role = 'super_admin' then
    return true;
  end if;

  if p_module_key = 'fornecedores' and p_storage_key = 'seel_fornecedores_schema_v2' then
    return false;
  end if;

  return
    (p_module_key = 'fretes' and v_role = 'super_admin')
    or (p_module_key = 'frota' and v_role = 'super_admin')
    or (p_module_key = 'avaliacao_fornecedores' and v_role = 'super_admin')
    or (p_module_key = 'contratos' and v_role in ('super_admin', 'admin_contratos'))
    or (p_module_key = 'fornecedores' and v_role in ('super_admin', 'admin_suprimentos'));
end;
$$;
