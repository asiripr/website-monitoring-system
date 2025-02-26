<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WebsiteController;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

// fetch csrf cookie
// Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});

// add new website
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/add-website', [WebsiteController::class, 'store']);
// });

    Route::post('/add-website', [WebsiteController::class, 'store']);


// User Registration
Route::post('/register', [AuthController::class, 'register']);
    // ->middleware(['web', 'auth:sanctum', EnsureFrontendRequestsAreStateful::class]);

// User Login
Route::post('/login', [AuthController::class, 'login']);
    // ->middleware(['web', 'auth:sanctum', EnsureFrontendRequestsAreStateful::class]);

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

