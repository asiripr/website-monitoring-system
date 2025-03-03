<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class ManageUserController extends Controller
{
    public function getUser($id)
    {

        $user = User::findOrFail($id);

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_id' => $user->role_id
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        // Find the user or return 404 if not found
        $user = User::findOrFail($id);

        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$user->id}", // Ensure unique email except for current user
            'role_id' => 'nullable|integer|exists:roles,id', // Ensure role_id exists in roles table
        ]);

        // Update the user
        $user->update($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'user' => $user, // Return the updated user
        ], 200);
    }

    public function changePassword(Request $request, $user_id)
    {
        // Find the user by ID or fail with 404
        $user = User::findOrFail($user_id);

        // Validate the new password and confirmation
        $validatedData = $request->validate([
            'new_password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // Update the user's password
        $user->update([
            'password' => Hash::make($validatedData['new_password']),
        ]);

        return response()->json([
            'message' => 'User password updated successfully',
        ], 200);
    }

    public function destroyUser(Request $request, $user_id)
    {
        // Find the user by ID or fail with 404
        $user = User::findOrFail($user_id);

        // Optionally: If you need to validate something (like an admin's password), add validation here.

        // Revoke tokens if using token-based auth (for example, Laravel Sanctum)
        $user->tokens()->delete();

        // Delete the user account
        $user->delete();

        return response()->json([
            'message' => 'User account deleted successfully',
        ], 200);
    }
}
