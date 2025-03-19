<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\MonitoringLogsController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebsiteController;
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
    
    // monitoring logs data
    Route::get('/monitoring-logs-data/{website_id}', [MonitoringLogsController::class, 'show']);
  
    // Fetch all users
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

    Route::get('/users', [UserController::class, 'index']);

    // Update a user's role
    Route::put('/users/{id}', [UserController::class, 'updateRole']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // ******* manage users ******
    Route::get('/manage-users/edit/{user_id}', [ManageUserController::class, 'getUser']);
    Route::put('/manage-users/edit/{user_id}', [ManageUserController::class, 'updateUser']);
    Route::post('/manage-users/edit/{user_id}', [ManageUserController::class, 'changePassword']);
    Route::delete('/manage-users/edit/{user_id}', [ManageUserController::class, 'destroyUser']);
    // ****************************

    // delete a selected website
    Route::delete('/websites/delete/{website_id}', [WebsiteController::class, 'destroy']);

    // fetch all roles
    Route::get('/roles', [RoleController::class, 'index']);
    
    // fetch a single role with its permissions
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    
    // update a role with new permissions
    Route::put('/roles/{id}', [RoleController::class, 'update']);

    // create a new role
    Route::post('/roles', [RoleController::class, 'store']); 

    // fetch all available permissions
    Route::get('/permissions', [PermissionController::class, 'index']);
});
