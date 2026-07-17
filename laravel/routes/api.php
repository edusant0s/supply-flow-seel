<?php

use App\Http\Controllers\Api\SupplyEntityController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', fn () => ['ok' => true, 'service' => 'supply-flow-laravel']);

    Route::get('/{entity}', [SupplyEntityController::class, 'index']);
    Route::post('/{entity}', [SupplyEntityController::class, 'store']);
    Route::patch('/{entity}/{id}', [SupplyEntityController::class, 'update']);
    Route::delete('/{entity}/{id}', [SupplyEntityController::class, 'destroy']);
});
