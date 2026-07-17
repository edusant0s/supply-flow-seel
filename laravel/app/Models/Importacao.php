<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Importacao extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $table = 'importacoes';

    protected $guarded = [];

    public const UPDATED_AT = null;

    protected $casts = [
        'sucesso' => 'boolean',
        'erros' => 'array',
        'created_at' => 'datetime',
    ];
}
