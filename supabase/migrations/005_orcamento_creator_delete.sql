-- Permite exclusao de solicitacoes de orcamento por admin_orcamentos/super_admin
-- ou pelo usuario que criou a solicitacao.

alter table public.orcamentos
  add column if not exists criado_por uuid references public.profiles(id);

alter table public.orcamentos
  alter column criado_por set default auth.uid();

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
