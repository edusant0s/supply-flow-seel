# Supply Flow Seel

Sistema corporativo para requisições de suprimentos, orçamentos, contratos e mapa de fornecedores.

O legado HTML foi preservado na raiz. A nova aplicação fica em `app/` e usa Vite + React + TypeScript + Supabase.

## Rodar Localmente

1. Instale dependências:

```bash
npm install
```

2. Crie `app/.env` a partir de `.env.example`:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_publica
VITE_GOOGLE_MAPS_API_KEY=sua_chave_publica_restrita_google_maps
```

3. Rode:

```bash
npm run dev
```

4. Abra `http://localhost:5173`.

## Configurar Supabase

1. Crie um projeto no Supabase free tier.
2. Em SQL Editor, execute `supabase/migrations/001_initial_supply_flow.sql`.
3. Se o projeto já existia antes deste reparo, execute também:
   - `supabase/migrations/002_allow_contract_requests.sql`
   - `supabase/migrations/003_viewer_global_orcamentos_and_storage.sql`
   - `supabase/migrations/004_viewer_global_obras_select.sql`
   - `supabase/migrations/005_orcamento_creator_delete.sql`
   - `supabase/migrations/006_viewer_global_contract_scope.sql`
   - `supabase/migrations/007_embedded_shared_fretes.sql`
   - `supabase/migrations/008_embedded_all_shared_bases.sql`
   - `supabase/migrations/009_restrict_embedded_contract_state.sql`
   - `supabase/migrations/010_contract_form_editor_seed.sql`
4. Em Auth, crie manualmente o primeiro usuário administrador.
5. Edite e execute `supabase/seed_first_super_admin.sql` com o e-mail desse usuário.
6. Configure a Edge Function `create-user`:

```bash
supabase functions deploy create-user
```

Configure tambem `ALLOWED_ORIGINS` na funcao se usar dominios diferentes dos padroes:

```bash
ALLOWED_ORIGINS=https://supply-flow-seel.vercel.app,https://edusant0s.github.io,http://localhost:5173
```

No ambiente da função, mantenha `SUPABASE_SERVICE_ROLE_KEY` somente no Supabase. Nunca coloque essa chave no frontend.

## Perfis

- `super_admin`: acesso total, usuários, obras e configurações.
- `admin_suprimentos`: RMs e fornecedores.
- `admin_orcamentos`: orçamentos.
- `admin_contratos`: contratos.
- `viewer_global`: leitura de dashboard, RMs e fornecedores sem restrição por obra. Não administra dados.
- `viewer`: leitura, limitado às obras vinculadas via RLS.

## Importar Planilhas

1. Cadastre obras em Configurações.
2. Vincule usuários comuns às obras em Usuários.
3. Entre no módulo desejado.
4. Use Importar.
5. Selecione `.xlsx`, `.xls` ou `.csv`.
6. Revise pré-visualização e erros por linha.
7. Confirme para gravar.

Chaves de atualização:

- RMs: `numero_rm`.
- Orçamentos: `numero_proposta`.
- Fornecedores: `codigo`.
- Contratos: inserção por solicitação, com campos originais em `payload`.

Campos não mapeados são preservados em `payload`.

### Importar usuarios em massa

Na aplicacao, acesse `Usuarios`, clique em `Importar usuarios`, selecione o modelo `.xlsx`, revise os erros e confirme.

Para importacao operacional via terminal, use sempre uma variavel de ambiente local para a Service Role. Nao grave essa chave em nenhum arquivo versionado.

```bash
npm run users:import -- --file "C:/caminho/modelo-importacao-usuarios.xlsx" --dry-run
```

Depois da conferencia:

```bash
$env:SUPABASE_SERVICE_ROLE_KEY="sua_service_role_key_apenas_no_terminal"
npm run users:import -- --file "C:/caminho/modelo-importacao-usuarios.xlsx" --yes
```

O script nao imprime senhas e cria/atualiza `auth.users`, `profiles` e vinculos em `user_obras`. Para `viewer_global`, a coluna `todas as obras` pode ficar em branco se o perfil ja estiver preenchido como `viewer_global`.

## Solicitação de Contratos

Usuários comuns podem abrir Contratos e clicar em `Solicitar contrato`.

- O usuário precisa estar ativo.
- O usuário precisa ter pelo menos uma obra vinculada.
- A solicitação deve ser criada para uma obra permitida.
- Usuário comum não move fase, não edita status, não exclui e não importa contratos.
- `admin_contratos` e `super_admin` administram o Kanban e o processo Compor.

## Solicitação de Orçamentos

Usuários ativos podem abrir Orçamentos e clicar em `Nova solicitação`.

- Orçamentos não usam filtro por obra nas policies.
- Usuários ativos podem criar e visualizar solicitações de orçamento.
- Anexos enviados no formulário vão para o bucket privado `supply-flow-anexos`.
- Apenas `admin_orcamentos` e `super_admin` movem status, importam planilhas e atualizam spend/saving/REQ.

## Google Maps em Fretes

O autocomplete dos enderecos de coleta e entrega no modulo de Fretes usa `VITE_GOOGLE_MAPS_API_KEY`.

- Use uma chave de navegador da Google Maps Platform, nunca uma credencial de servidor.
- Habilite `Maps JavaScript API`, `Places API (New)` e `Directions API`.
- Restrinja a chave por HTTP referrer para `http://localhost:5173/*` e para os dominios de producao, como `https://supply-flow-seel.vercel.app/*`.
- Em producao, cadastre a variavel no painel da Vercel e refaca o deploy.
- A chave de navegador aparece no frontend por natureza; a seguranca depende das restricoes de dominio e API no Google Cloud.

## Modulos Embutidos e Supabase

As abas operacionais incorporadas ao Supply Flow usam o wrapper `EmbeddedHtmlToolPage` para carregar estado inicial do Supabase e sincronizar alteracoes autorizadas:

- Fretes: solicitacoes em `fretes_solicitacoes`; formulario em `embedded_app_state`.
- Frota: veiculos, multas, medicoes e responsavel em `embedded_app_state`.
- Estoque de obras: pedidos em `estoque_obras_pedidos`; catalogo/configuracoes em `embedded_app_state`.
- Avaliacao de fornecedores: avaliacoes em `avaliacao_fornecedores_avaliacoes`; ciclos/fornecedores em `embedded_app_state`.
- Contratos: formulario detalhado e controle legado em `embedded_app_state`; solicitacoes do portal em `contratos`.

Credenciais operacionais, como service role e chaves privadas, nao devem ser salvas nesses estados nem no frontend.

## Deploy Gratuito

### GitHub Pages

Este repositorio ja inclui `.github/workflows/deploy-pages.yml`.

1. No GitHub, habilite Pages usando a branch `gh-pages` e a pasta `/`, se ainda nao estiver habilitado.
2. Cadastre os secrets `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` e `VITE_GOOGLE_MAPS_API_KEY`.
3. A cada push na `main`, o workflow executa `npm run security:scan` e publica o build em:

```text
https://edusant0s.github.io/supply-flow-seel/
```

### Vercel

- Framework: Vite.
- Build command: `npm run build`.
- Output directory: `app/dist`.
- Headers de seguranca definidos em `vercel.json`.
- Variáveis: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GOOGLE_MAPS_API_KEY`.

### Netlify

- Build command: `npm run build`.
- Publish directory: `app/dist`.
- Variáveis iguais ao Vercel.

## Scripts

```bash
npm run dev
npm run security:scan
npm run typecheck
npm run build
npm run preview
```

## PWA

O app inclui `manifest.webmanifest` e `sw.js`.

- Cacheia assets estáticos.
- Não cacheia respostas do Supabase.
- Quando offline, informa que dados operacionais exigem conexão segura.

## Observações de Migração

O Firebase antigo não foi removido. A migração recomendada é exportar os dados atuais e reimportar pelo wizard do novo sistema, validando obra e permissões antes de liberar usuários comuns.
