<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'

        ]);

        // check if this is the first user in the system
        $isFirstUser = User::count() === 0;

        if ($isFirstUser) {
            $roleId = 1;
        } else {
            $roleId = $request->role_id ?? 2; // Default role_id = 2 for "User"
        }      

        $user = User::create(
            [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $roleId
            ]
        );

        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token
        ];

        // Register the user
        AuthController::register($user);

        // return response()->json($user, 201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'

        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => 'The provided credentials are incorrect!'
            ];
        }

        $token = $user->createToken($user->name);
        // $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out.'
        ];
    }

    function print1()
    {
        return response()->json(['message' => 'API is working!']);
    }
}
