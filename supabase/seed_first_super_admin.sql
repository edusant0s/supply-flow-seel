-- Execute depois de criar o primeiro usuário manualmente no Supabase Auth.
-- Troque o e-mail abaixo pelo e-mail real do administrador principal.

insert into public.profiles (id, nome, email, role, ativo)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'nome', 'Administrador Seel'),
  u.email,
  'super_admin',
  true
from auth.users u
where lower(u.email) = lower('admin@seel.com.br')
on conflict (id) do update set
  nome = excluded.nome,
  email = excluded.email,
  role = 'super_admin',
  ativo = true,
  updated_at = now();
