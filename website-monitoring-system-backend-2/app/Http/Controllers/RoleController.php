<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json([
            'roles' => Role::with('permissions')->get()
        ]);
    }

    public function show($id)
    {
        $role = Role::with('permissions')->find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        return response()->json(['role' => $role]);
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'name' => 'required|unique:roles,name',
            'description' => 'nullable|string',
            'permissions' => 'array',
        ]);

        $role = Role::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);

        // attach selected permissions
        if (!empty($data['permissions'])) {
            $role->permissions()->attach($data['permissions']);
        }

        return response()->json(['message' => 'Role created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);

        $data = $request->validate([
            'name' => "required|unique:roles,name,{$role->id}",
            'description' => 'nullable|string',
            'permissions' => 'array',
        ]);

        $role->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);

        // Sync permissions
        $role->permissions()->sync($data['permissions'] ?? []);

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'role' => $role
        ], 200);
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);

        // Prevent deletion of protected roles (admin and user)
        if ($role->id === 1 || $role->id === 2) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete protected system roles'
            ], 403);
        }

        // Check if role is assigned to any users
        if ($role->users()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete role that is assigned to users'
            ], 400);
        }

        $role->delete();

        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully'
        ], 200);
    }
}
