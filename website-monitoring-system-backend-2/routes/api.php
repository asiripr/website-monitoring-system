<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

// User Registration
Route::post('/register', [AuthController::class, 'register'])
    ->middleware(['web', 'auth:sanctum', EnsureFrontendRequestsAreStateful::class]);

// User Login
Route::post('/login', [AuthController::class, 'login'])
    ->middleware(['web', 'auth:sanctum', EnsureFrontendRequestsAreStateful::class]);

// Protected routes (auth required)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum', 'admin'])->get('/admin/dashboard', function () {
    return response()->json(['message' => 'Welcome Admin!']);
});

