<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Obra extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $table = 'obras';

    protected $guarded = [];

    protected $casts = [
        'ativo' => 'boolean',
        'created_at' => 'datetime',
    ];
}
