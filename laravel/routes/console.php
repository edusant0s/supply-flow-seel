<?php

use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Support\Facades\Artisan;

Artisan::command('supply:status', function (ClosureCommand $command) {
    $command->info('Supply Flow Laravel backend scaffold is ready.');
});
