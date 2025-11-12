<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TwoFactorController;


Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

Route::get('/', function () {
    return Inertia::render('Home');
});
Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('Home', function () {
        return Inertia::render('Home');
    })->name('Home');
    Route::get('/two-factor/setup', [TwoFactorController::class, 'show'])
        ->name('two-factor.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
