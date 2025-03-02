<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MonitoringLogsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebsiteController;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// fetch csrf cookie
Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});

// returns detailed logs for a specific website
Route::get('/websites/{id}', [WebsiteController::class, 'show']); // ***

// User Registration
Route::post('/register', [AuthController::class, 'register']);

// User Login
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (auth required)
Route::middleware(['auth:sanctum'])->group(function () {


    // add new website
    Route::post('/add-website', [WebsiteController::class, 'store']);

    // returns all websites with their status
    Route::get('/websites', [WebsiteController::class, 'index']);

    // returns all monitoring logs
    Route::get('/monitoring-logs', [MonitoringLogsController::class, 'index']);

    Route::get('/monitoring-logs-data/{website_id}', [MonitoringLogsController::class, 'show']);
    
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Token revoked, logged out successfully'], 200);
    });
    // profile update
    Route::put('/user', [UserController::class, 'update']);
    // change password
    Route::post('/user/password', [UserController::class, 'changePassword']);
    // account delete
    Route::delete('/user', [UserController::class, 'destroy']);

    // // returns all websites with their status
    // Route::get('/websites', [WebsiteController::class, 'index']);

    // // returns detailed logs for a specific website
    // Route::get('/websites/{id}', [WebsiteController::class, 'show']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});
