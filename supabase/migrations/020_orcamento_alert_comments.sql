-- Comentarios seguros para a central de alertas de orcamentos.
-- Evita liberar UPDATE amplo para viewers; a RPC apenas anexa comentario/log.

create or replace function public.append_orcamento_comment(
  p_orcamento_id uuid,
  p_text text
)
returns public.orcamentos
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles%rowtype;
  v_orcamento public.orcamentos%rowtype;
  v_is_manager boolean;
  v_now timestamptz := now();
  v_comment jsonb;
  v_log jsonb;
  v_payload jsonb;
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

  if length(trim(coalesce(p_text, ''))) < 2 then
    raise exception 'Comentario vazio.';
  end if;

  if length(trim(p_text)) > 4000 then
    raise exception 'Comentario muito longo.';
  end if;

  select *
  into v_orcamento
  from public.orcamentos
  where id = p_orcamento_id
  for update;

  if not found then
    raise exception 'Solicitacao de orcamento nao encontrada.';
  end if;

  v_is_manager := v_profile.role in ('super_admin', 'admin_orcamentos');

  if not (
    v_is_manager
    or v_orcamento.criado_por = auth.uid()
    or lower(coalesce(v_orcamento.email_solicitante, '')) = lower(coalesce(v_profile.email, ''))
  ) then
    raise exception 'Sem permissao para comentar nesta solicitacao.';
  end if;

  v_comment := jsonb_build_object(
    'id', 'comment-' || replace(gen_random_uuid()::text, '-', ''),
    'at', v_now,
    'text', trim(p_text),
    'authorName', coalesce(v_profile.nome, 'Supply Flow'),
    'authorEmail', coalesce(v_profile.email, ''),
    'authorRole', coalesce(v_profile.role, ''),
    'targetEmail', case when v_is_manager then coalesce(v_orcamento.email_solicitante, '') else '' end,
    'source', case when v_is_manager then 'admin' else 'solicitante' end
  );

  v_log := jsonb_build_object(
    'id', 'log-' || replace(gen_random_uuid()::text, '-', ''),
    'at', v_now,
    'action', case when v_is_manager then 'Comentario enviado ao solicitante' else 'Resposta do solicitante' end,
    'detail', trim(p_text),
    'userName', coalesce(v_profile.nome, 'Supply Flow'),
    'userEmail', coalesce(v_profile.email, '')
  );

  v_payload := coalesce(v_orcamento.payload, '{}'::jsonb);
  v_payload := jsonb_set(
    v_payload,
    '{comentarios}',
    coalesce(v_payload->'comentarios', '[]'::jsonb) || jsonb_build_array(v_comment),
    true
  );
  v_payload := jsonb_set(
    v_payload,
    '{logs}',
    coalesce(v_payload->'logs', '[]'::jsonb) || jsonb_build_array(v_log),
    true
  );

  if v_is_manager then
    v_payload := jsonb_set(
      v_payload,
      '{alertas_solicitante}',
      coalesce(v_payload->'alertas_solicitante', '[]'::jsonb) || jsonb_build_array(
        jsonb_build_object(
          'id', v_comment->>'id',
          'at', v_now,
          'type', 'comentario',
          'targetEmail', coalesce(v_orcamento.email_solicitante, ''),
          'message', trim(p_text),
          'read', false
        )
      ),
      true
    );
  end if;

  update public.orcamentos
  set payload = v_payload,
      updated_at = now()
  where id = p_orcamento_id
  returning * into v_orcamento;

  return v_orcamento;
end;
$$;

grant execute on function public.append_orcamento_comment(uuid, text) to authenticated;
