<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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

}
