<?php

use App\Http\Controllers\PlayerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PlayerController::class, 'index'])->name('home');
Route::resource('game', \App\Http\Controllers\GameController::class)->only(['index', 'create', 'store', 'destroy']);
Route::resource('player', \App\Http\Controllers\PlayerController::class)->only(['index', 'show']);

/*
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
*/
