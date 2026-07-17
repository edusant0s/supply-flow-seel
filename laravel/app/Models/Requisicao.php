<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Requisicao extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $table = 'requisicoes';

    protected $guarded = [];

    protected $casts = [
        'payload' => 'array',
        'data_inclusao' => 'date',
        'data_necessidade' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
