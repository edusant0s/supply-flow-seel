-- Remove o JARVIS SUPPLY: a funcionalidade foi retirada do aplicativo.

drop policy if exists jarvis_interactions_select on public.jarvis_interactions;
drop policy if exists jarvis_interactions_insert on public.jarvis_interactions;
drop table if exists public.jarvis_interactions;
