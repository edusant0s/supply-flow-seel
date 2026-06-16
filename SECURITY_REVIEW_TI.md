# Revisao de Seguranca - Orientacoes TI

## Medidas aplicadas neste ciclo

- Removidos valores reais de `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` do `.env.example`.
- Removidos arquivos `.temp` do Supabase CLI que estavam versionados.
- `.gitignore` reforcado para `.env`, `.env.*`, `.vercel/`, `.temp/`, certificados e arquivos de chave.
- Adicionado `npm run security:scan` para bloquear segredos obvios em arquivos versionados.
- Workflow do GitHub Pages passou a exigir `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` via GitHub Secrets.
- GitHub Secrets `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` configurados no repositorio.
- `vercel.json` passou a aplicar headers basicos de hardening.
- Edge Function `create-user` passou a validar `role` no backend e a restringir CORS por origem.

## Recomendacoes ja atendidas pela arquitetura

- `SUPABASE_SERVICE_ROLE_KEY` fica somente na Edge Function, nunca no frontend.
- Login e sessao usam Supabase Auth.
- Permissoes reais ficam nas policies/RLS do Supabase, nao apenas no frontend.
- Dados sensiveis operacionais nao sao cacheados pelo service worker.
- Deploy usa variaveis de ambiente do Vercel/GitHub, nao arquivos `.env` versionados.

## Pendencias operacionais

- Rotacionar a anon key/chaves do Supabase se a regra interna considerar a anon key como credencial vazada, porque ela apareceu no historico Git antes desta correcao.
- Confirmar no Vercel que as mesmas variaveis existem em Production, Preview e Development.
- Configurar `ALLOWED_ORIGINS` na Edge Function se houver novo dominio alem de Vercel, GitHub Pages e localhost.
- Habilitar Secret Scanning/Push Protection no GitHub.
- Separar Supabase de desenvolvimento e producao quando o sistema for liberado para uso corporativo.
- Rotacionar credenciais periodicamente e apos qualquer suspeita de exposicao.
