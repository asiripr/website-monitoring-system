<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    public function index(Request $request)
    {
        // Eager-load the role relationship 
        $users = User::with('role')->get();

        return response()->json([
            'users' => $users,
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'role_id' => $request->user()->role_id
        ]);
    }

    // update user profile
    public function update(Request $request, $id)
    {
        // Validate that role_id is provided and is one of the allowed values
        $validated = $request->validate([
            'role_id' => ['required', 'integer', Rule::in([1, 2])],
        ]);

        // Find the user by ID (throws 404 if not found)
        $user = User::findOrFail($id);

        // Update the user's role
        $user->update($validated);

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user,
        ]);
    }

    // update user password
    public function changePassword(Request $request)
    {
        $request->validate([
            'new_password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $request->user()->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }

    // delete account
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password']
        ]);

        $request->user()->tokens()->delete();
        $request->user()->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }

    public function updateRole(Request $request, $id)
    {
        // Validate that role_id is provided and is one of the allowed values
        $validated = $request->validate([
            'role_id' => ['required', 'integer', Rule::in([1, 2])],
        ]);

        // Find the user by ID (throws 404 if not found)
        $user = User::findOrFail($id);

        // Update the user's role
        $user->update($validated);

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user,
        ]);
    }

    
}
