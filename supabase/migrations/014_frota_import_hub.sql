-- Permite que a central de importacoes registre a base compartilhada de frota.
-- A base operacional da frota continua em embedded_app_state e so super_admin pode gravar.

alter table public.importacoes
drop constraint if exists importacoes_tipo_check;

alter table public.importacoes
add constraint importacoes_tipo_check
check (tipo in ('requisicoes','orcamentos','contratos','fornecedores','frota'));

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
