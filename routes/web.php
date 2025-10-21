<?php

use App\Http\Controllers\PlayerController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PlayerController::class, 'index'])->name('home');
Route::resource('game', \App\Http\Controllers\GameController::class)->only(['index']);
Route::resource('player', \App\Http\Controllers\PlayerController::class)->only(['index', 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('game', \App\Http\Controllers\GameController::class)->only(['create', 'store', 'destroy']);
    Route::resource('player', \App\Http\Controllers\PlayerController::class)->only(['update', 'store']);
});

/*
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
*/
