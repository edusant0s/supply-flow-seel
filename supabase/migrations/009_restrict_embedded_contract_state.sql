-- O processo detalhado de contratos embutido e sua configuracao sao area administrativa.
-- Solicitantes/viewers continuam usando a tabela nativa public.contratos com suas policies.

drop policy if exists embedded_app_state_select on public.embedded_app_state;
create policy embedded_app_state_select on public.embedded_app_state
for select using (
  public.current_profile_is_active()
  and (
    module_key <> 'contratos'
    or public.can_manage_embedded_module('contratos')
  )
);
