<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $table = 'contratos';

    protected $guarded = [];

    protected $casts = [
        'payload' => 'array',
        'prazo_urgencia' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
