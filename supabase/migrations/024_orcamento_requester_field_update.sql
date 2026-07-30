-- Permite que o solicitante ajuste apenas prazo de entrega das cotacoes
-- e responsavel atribuido, sem liberar UPDATE amplo em orcamentos.

create or replace function public.update_orcamento_requester_fields(
  p_orcamento_id uuid,
  p_data_entrega_cotacoes date,
  p_atribuido_a text
)
returns public.orcamentos
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles%rowtype;
  v_orcamento public.orcamentos%rowtype;
  v_now timestamptz := now();
  v_assigned text := nullif(trim(coalesce(p_atribuido_a, '')), '');
  v_payload jsonb;
  v_log jsonb;
begin
  if auth.uid() is null then
    raise exception 'Usuario nao autenticado.';
  end if;

  select *
  into v_profile
  from public.profiles
  where id = auth.uid()
    and ativo = true;

  if not found then
    raise exception 'Perfil ativo nao encontrado.';
  end if;

  select *
  into v_orcamento
  from public.orcamentos
  where id = p_orcamento_id
  for update;

  if not found then
    raise exception 'Solicitacao de orcamento nao encontrada.';
  end if;

  if not (
    v_orcamento.criado_por = auth.uid()
    or lower(coalesce(v_orcamento.email_solicitante, '')) = lower(coalesce(v_profile.email, ''))
  ) then
    raise exception 'Somente o solicitante pode ajustar estes campos.';
  end if;

  if length(coalesce(v_assigned, '')) > 300 then
    raise exception 'Campo Atribuido a muito longo.';
  end if;

  v_log := jsonb_build_object(
    'id', 'log-' || replace(gen_random_uuid()::text, '-', ''),
    'at', v_now,
    'action', 'Solicitante atualizou prazo/atribuicao',
    'detail', 'Entrega cotacoes: ' || coalesce(p_data_entrega_cotacoes::text, '-') || ' | Atribuido a: ' || coalesce(v_assigned, '-'),
    'userName', coalesce(v_profile.nome, 'Solicitante'),
    'userEmail', coalesce(v_profile.email, '')
  );

  v_payload := coalesce(v_orcamento.payload, '{}'::jsonb);
  v_payload := jsonb_set(v_payload, '{data_entrega_cotacoes}', coalesce(to_jsonb(p_data_entrega_cotacoes), 'null'::jsonb), true);
  v_payload := jsonb_set(v_payload, '{atribuido_a}', coalesce(to_jsonb(v_assigned), 'null'::jsonb), true);
  v_payload := jsonb_set(v_payload, '{orcamentista}', coalesce(to_jsonb(v_assigned), 'null'::jsonb), true);
  v_payload := jsonb_set(
    v_payload,
    '{logs}',
    coalesce(v_payload->'logs', '[]'::jsonb) || jsonb_build_array(v_log),
    true
  );

  update public.orcamentos
  set data_entrega_cotacoes = p_data_entrega_cotacoes,
      atribuido_a = v_assigned,
      payload = v_payload,
      updated_at = now()
  where id = p_orcamento_id
  returning * into v_orcamento;

  return v_orcamento;
end;
$$;

grant execute on function public.update_orcamento_requester_fields(uuid, date, text) to authenticated;
