-- Permite que usuarios ativos criem solicitacoes de contrato apenas para obras
-- as quais tenham acesso. A administracao do fluxo continua restrita por
-- policies separadas de update/delete.

drop policy if exists contratos_insert on public.contratos;

create policy contratos_insert on public.contratos
for insert with check (
  public.can_manage_contratos()
  or (
    public.current_profile_is_active()
    and public.user_can_access_obra(obra_id)
  )
);
