<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $table = 'fornecedores';

    protected $guarded = [];

    protected $casts = [
        'cadastro_ativo' => 'boolean',
        'payload' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
