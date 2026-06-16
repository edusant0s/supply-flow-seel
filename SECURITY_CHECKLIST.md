# Checklist de Segurança

- [x] Login com Supabase Auth.
- [x] Sessão persistente via SDK Supabase, sem gravar dados sensíveis manualmente em `localStorage`.
- [x] Frontend usa somente `VITE_SUPABASE_ANON_KEY`.
- [x] `.env`, `.env.*`, `.vercel/`, `.temp/` e certificados/chaves locais ignorados no Git.
- [x] `.env.example` contem somente placeholders, sem URL/chave real.
- [x] `npm run security:scan` bloqueia JWTs, URLs reais do Supabase, connection strings e chaves comuns em arquivos versionados.
- [x] Workflow do GitHub Pages exige GitHub Secrets e nao usa `.env.example` como fallback de producao.
- [x] Headers de seguranca configurados no Vercel: `nosniff`, `DENY` iframe, `Referrer-Policy` e `Permissions-Policy`.
- [x] Edge Function `create-user` valida `role` no backend e restringe CORS por origem configuravel.
- [x] GitHub Secret Scanning e Push Protection habilitados no repositorio.
- [x] GitHub Vulnerability Alerts e Dependabot Security Updates habilitados.
- [x] `service_role` restrita à Edge Function `create-user`.
- [x] Tabelas sensíveis com RLS ativado.
- [x] Funções auxiliares: `get_current_user_role`, `user_can_access_obra`, `is_admin`.
- [x] `viewer` não tem policy de update/delete.
- [x] `viewer` só pode inserir solicitação de contrato quando vinculado à obra da solicitação.
- [x] `viewer_global` visualiza todas as requisições sem ganhar permissões de escrita.
- [x] Dados com `obra_id` filtrados por `user_obras`.
- [x] Orçamentos não aplicam filtro por obra por decisão de regra de negócio.
- [x] `admin_contratos` limitado à tabela de contratos.
- [x] `admin_suprimentos` limitado a requisições e fornecedores.
- [x] `admin_orcamentos` limitado a orçamentos.
- [x] Usuário inativo bloqueado no frontend e pelas funções RLS.
- [x] Importação disponível somente para administradores autorizados.
- [x] Upload de anexos permitido para usuários ativos no bucket privado; update/delete restritos a admins.
- [x] Audit logs para insert/update/delete nas entidades principais.
- [x] PWA não cacheia chamadas Supabase.
- [x] `npm audit --omit=dev` sem vulnerabilidades.

Validações manuais obrigatórias antes de produção:

- [ ] Testar chamada direta ao Supabase como `viewer` tentando acessar obra não vinculada.
- [ ] Testar update/delete via API como `viewer`.
- [ ] Testar `viewer_global` lendo todas as RMs e falhando em update/delete.
- [ ] Testar usuário comum criando orçamento com anexo e falhando ao mover status.
- [ ] Testar `admin_contratos` tentando alterar RMs, orçamentos, fornecedores e usuários.
- [ ] Testar usuário inativo tentando logar.
- [ ] Confirmar que `SUPABASE_SERVICE_ROLE_KEY` não existe em `.env` do frontend.
- [ ] Revisar policies de Storage caso anexos passem a exigir escopo por obra no caminho do arquivo.
- [ ] Rotacionar a anon key/credenciais do Supabase se a politica interna tratar anon key como credencial exposta, pois ela ja apareceu no historico Git antes desta limpeza.
- [ ] Separar projetos/chaves Supabase de desenvolvimento e producao.
- [ ] Revisar periodicamente plugins/conectores MCP usados no ambiente de desenvolvimento.
