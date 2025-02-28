<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebsiteController;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// fetch csrf cookie
Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});

// fetch websites
Route::get('/websites', function () {
    return response()->json(Website::all());
});


Route::post('/add-website', [WebsiteController::class, 'store']);


// User Registration
Route::post('/register', [AuthController::class, 'register']);

// User Login
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (auth required)
Route::middleware(['auth:sanctum'])->group(function () {
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
});

Route::middleware(['auth:sanctum', 'admin'])->get('/admin/dashboard', function () {
    return response()->json(['message' => 'Welcome Admin!']);
});
