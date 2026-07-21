-- Consolida a estrutura permitida para as bases dos modulos embutidos no Supabase.
-- Nao cria payloads vazios para nao sobrepor bases locais ainda nao sincronizadas.

alter table public.embedded_app_state
drop constraint if exists embedded_app_state_module_key_check;

alter table public.embedded_app_state
add constraint embedded_app_state_module_key_check
check (module_key in ('contratos','fretes','frota','estoque_obras','avaliacao_fornecedores'));
