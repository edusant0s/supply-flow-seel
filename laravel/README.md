# Supply Flow SEEL - Laravel backend

Inicio da migracao do Supply Flow para Laravel.

Este diretorio ainda nao substitui o frontend atual em Vite/React. Ele cria a base do backend Laravel para migrar o sistema por etapas, mantendo o banco Postgres/Supabase e as regras de permissao.

## Requisitos locais

- PHP 8.2+
- Composer
- Extensoes PHP comuns do Laravel: `pdo_pgsql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo`

No ambiente atual desta maquina, `php` e `composer` ainda nao estao instalados. Quando estiverem disponiveis:

```bash
cd laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

## Banco

Configure o `.env` apontando para o Postgres/Supabase:

```env
DB_CONNECTION=pgsql
DB_HOST=...
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=...
DB_PASSWORD=...
```

## Escopo inicial

- Models para os principais dominios.
- Rotas REST iniciais para entidades.
- Helper central de roles/modulos.
- Controller inicial para listar, criar, editar e excluir registros.
- Estrutura pronta para evoluir autenticacao, policies e importacoes.

## Proximos passos

1. Instalar PHP/Composer.
2. Rodar `composer install`.
3. Ligar autenticacao real via Sanctum ou JWT Supabase.
4. Converter os controles de permissao para Policies/Gates.
5. Migrar a Central de Dados para filas Laravel.
6. Migrar gradualmente os modulos React/HTML para Inertia ou Blade.
