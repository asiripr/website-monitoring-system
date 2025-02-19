<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

// User Registration
Route::post('/register', [RegisteredUserController::class, 'store']);

// User Login
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// User logout -> reomve the session
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// define the CSRF cookie endpoint
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
