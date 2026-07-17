# Plano de migracao para Laravel

Este projeto deve ser migrado por etapas, preservando o Supabase como banco/Postgres e mantendo a regra central: permissoes e escopo por obra sempre validados no backend.

## Arquitetura alvo

- Laravel 11 ou superior como backend principal.
- Breeze, Jetstream ou Sanctum para autenticacao.
- Postgres/Supabase como banco de dados.
- Policies/Gates do Laravel espelhando as roles atuais:
  - `super_admin`
  - `admin_suprimentos`
  - `admin_orcamentos`
  - `admin_contratos`
  - `viewer_global`
  - `viewer`
- Frontend em Blade + Inertia/React, reaproveitando os componentes React atuais quando fizer sentido.
- Filas Laravel para importacoes pesadas de planilhas.
- Storage S3/Supabase Storage para anexos.

## Ordem recomendada

1. Congelar o schema atual do Supabase.
2. Criar projeto Laravel e apontar para o mesmo Postgres. **Iniciado em `laravel/`.**
3. Migrar autenticacao e perfis.
4. Implementar policies por modulo e por obra.
5. Migrar a Central de Dados/importacoes.
6. Migrar requisicoes, orcamentos e fornecedores.
7. Migrar contratos, fretes, frota, estoque e avaliacao de fornecedores.
8. Substituir localStorage dos HTMLs legados por tabelas reais.
9. Adicionar testes de permissao e importacao.
10. Publicar staging antes do corte final.

## Pontos criticos

- Nao expor service role key no frontend.
- Nao confiar em role enviada pelo navegador.
- Toda escrita deve passar por policy/authorization no Laravel.
- Importacoes devem registrar auditoria.
- Modulos legados embarcados devem ser convertidos para telas nativas gradualmente.

## Status iniciado

- Estrutura inicial criada em `laravel/`.
- `composer.json` preparado com Laravel, Sanctum e PhpSpreadsheet.
- Models criados para perfis, obras, requisicoes, orcamentos, contratos, fornecedores, importacoes e auditoria.
- Controller REST inicial criado para entidades principais.
- Helper de permissoes criado com as mesmas roles do frontend atual.
- Migration de referencia criada para o schema principal.

## Pendencia local

PHP e Composer ainda nao estao disponiveis nesta maquina. Por isso, o projeto Laravel foi preparado como scaffold versionavel, mas ainda nao foi possivel executar `composer install`, `php artisan key:generate` ou testes PHPUnit.
