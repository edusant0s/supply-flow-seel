<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json([
    'app' => 'Supply Flow SEEL',
    'backend' => 'Laravel',
    'status' => 'migration-started',
]));
