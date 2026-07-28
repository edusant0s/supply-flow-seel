-- Libera o modulo 'orcamentos' na tabela embedded_app_state para guardar a spec
-- editavel do formulario de solicitacao de orcamento (mesmo mecanismo ja usado
-- por contratos/fretes/frota/estoque_obras/avaliacao_fornecedores).
-- Somente super_admin pode criar/editar/excluir a estrutura do formulario.
-- Leitura segue liberada pela policy de select existente (module_key <> 'contratos'
-- ja cobre qualquer outro module_key, incluindo 'orcamentos').

alter table public.embedded_app_state
drop constraint if exists embedded_app_state_module_key_check;

alter table public.embedded_app_state
add constraint embedded_app_state_module_key_check
check (module_key in ('contratos','fretes','frota','estoque_obras','avaliacao_fornecedores','orcamentos'));

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
      when 'fretes' then public.get_current_user_role() = 'super_admin'
      when 'frota' then public.get_current_user_role() = 'super_admin'
      when 'avaliacao_fornecedores' then public.get_current_user_role() = 'super_admin'
      when 'orcamentos' then public.get_current_user_role() = 'super_admin'
      else false
    end;
$$;
