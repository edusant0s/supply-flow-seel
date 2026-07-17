<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $table = 'audit_logs';

    protected $guarded = [];

    public const UPDATED_AT = null;

    protected $casts = [
        'antes' => 'array',
        'depois' => 'array',
        'created_at' => 'datetime',
    ];
}
