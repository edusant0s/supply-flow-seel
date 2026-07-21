-- Permite que usuarios ativos leiam o modelo do formulario de contratos.
-- A edicao do modelo segue restrita pelas policies de insert/update/delete.

drop policy if exists embedded_app_state_select on public.embedded_app_state;

create policy embedded_app_state_select on public.embedded_app_state
for select using (
  public.current_profile_is_active()
  and (
    module_key <> 'contratos'
    or storage_key = 'seel_form_google_forms_v8_sem_mapa_sem_un'
    or public.can_manage_embedded_module('contratos')
  )
);
