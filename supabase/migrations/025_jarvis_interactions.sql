-- JARVIS SUPPLY: log de auditoria leve das perguntas feitas ao assistente.
-- Tabela apenas de insercao (nao ha update/delete): cada linha registra quem perguntou,
-- em qual modulo, o texto da pergunta e quais ferramentas de dados foram usadas para responder.

create table if not exists public.jarvis_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  module_key text,
  question text not null,
  tools_used text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists jarvis_interactions_user_idx on public.jarvis_interactions (user_id);
create index if not exists jarvis_interactions_created_idx on public.jarvis_interactions (created_at desc);

alter table public.jarvis_interactions enable row level security;

drop policy if exists jarvis_interactions_select on public.jarvis_interactions;
create policy jarvis_interactions_select on public.jarvis_interactions
for select using (
  user_id = auth.uid()
  or public.get_current_user_role() = 'super_admin'
);

drop policy if exists jarvis_interactions_insert on public.jarvis_interactions;
create policy jarvis_interactions_insert on public.jarvis_interactions
for insert with check (user_id = auth.uid());
