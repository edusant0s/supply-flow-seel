<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->string('email')->unique();
            $table->string('role');
            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });

        Schema::create('obras', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->string('codigo')->nullable()->index();
            $table->string('centro_custo')->nullable()->index();
            $table->boolean('ativo')->default(true);
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('user_obras', function (Blueprint $table) {
            $table->uuid('user_id');
            $table->uuid('obra_id');
            $table->primary(['user_id', 'obra_id']);
            $table->foreign('obra_id')->references('id')->on('obras')->cascadeOnDelete();
        });

        Schema::create('requisicoes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('numero_rm')->nullable()->unique();
            $table->uuid('obra_id')->nullable()->index();
            $table->string('centro_custo')->nullable()->index();
            $table->string('solicitante')->nullable();
            $table->string('comprador')->nullable()->index();
            $table->string('categoria')->nullable()->index();
            $table->string('status')->default('RM')->index();
            $table->string('prioridade')->nullable();
            $table->date('data_inclusao')->nullable();
            $table->date('data_necessidade')->nullable();
            $table->jsonb('payload')->default('{}');
            $table->timestamps();
            $table->foreign('obra_id')->references('id')->on('obras')->nullOnDelete();
        });

        Schema::create('orcamentos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('obra_id')->nullable()->index();
            $table->uuid('criado_por')->nullable()->index();
            $table->string('numero_proposta')->nullable()->unique();
            $table->string('nome_solicitante')->nullable();
            $table->string('email_solicitante')->nullable();
            $table->string('cliente')->nullable();
            $table->string('local_obra')->nullable();
            $table->string('tipo_orcamento')->nullable();
            $table->string('status')->default('nao_iniciado')->index();
            $table->date('data_solicitacao')->nullable();
            $table->date('data_entrega_cotacoes')->nullable();
            $table->string('fornecedor')->nullable();
            $table->decimal('valor_inicial', 14, 2)->nullable();
            $table->decimal('valor_final', 14, 2)->nullable();
            $table->decimal('saving', 14, 2)->nullable();
            $table->decimal('quantidade_req', 14, 2)->nullable();
            $table->text('observacoes')->nullable();
            $table->jsonb('payload')->default('{}');
            $table->timestamps();
            $table->foreign('obra_id')->references('id')->on('obras')->nullOnDelete();
        });

        Schema::create('contratos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('obra_id')->nullable()->index();
            $table->string('solicitante')->nullable();
            $table->string('email_solicitante')->nullable();
            $table->string('centro_custo')->nullable()->index();
            $table->string('tipo_documento')->nullable();
            $table->string('urgencia')->nullable();
            $table->date('prazo_urgencia')->nullable();
            $table->string('status')->default('Nao Iniciado')->index();
            $table->string('fase_compor')->nullable();
            $table->jsonb('payload')->default('{}');
            $table->timestamps();
            $table->foreign('obra_id')->references('id')->on('obras')->nullOnDelete();
        });

        Schema::create('fornecedores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('codigo')->nullable()->unique();
            $table->string('nome');
            $table->string('categoria')->nullable()->index();
            $table->string('produto_servico')->nullable();
            $table->string('cidade')->nullable()->index();
            $table->string('uf')->nullable()->index();
            $table->string('regiao')->nullable()->index();
            $table->string('telefone')->nullable();
            $table->string('email')->nullable();
            $table->string('site')->nullable();
            $table->boolean('cadastro_ativo')->default(false)->index();
            $table->decimal('latitude', 11, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->jsonb('payload')->default('{}');
            $table->timestamps();
        });

        Schema::create('importacoes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tipo')->index();
            $table->string('arquivo_nome');
            $table->uuid('usuario_id')->nullable()->index();
            $table->integer('total_linhas')->default(0);
            $table->boolean('sucesso')->default(false);
            $table->jsonb('erros')->nullable();
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('usuario_id')->nullable()->index();
            $table->string('acao')->index();
            $table->string('entidade')->index();
            $table->uuid('entidade_id')->nullable()->index();
            $table->jsonb('antes')->nullable();
            $table->jsonb('depois')->nullable();
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('importacoes');
        Schema::dropIfExists('fornecedores');
        Schema::dropIfExists('contratos');
        Schema::dropIfExists('orcamentos');
        Schema::dropIfExists('requisicoes');
        Schema::dropIfExists('user_obras');
        Schema::dropIfExists('obras');
        Schema::dropIfExists('profiles');
    }
};
