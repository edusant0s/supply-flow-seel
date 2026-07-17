<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Orcamento extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $table = 'orcamentos';

    protected $guarded = [];

    protected $casts = [
        'payload' => 'array',
        'valor_inicial' => 'decimal:2',
        'valor_final' => 'decimal:2',
        'saving' => 'decimal:2',
        'quantidade_req' => 'decimal:2',
        'data_solicitacao' => 'date',
        'data_entrega_cotacoes' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
