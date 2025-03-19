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

        return redirect()->back()->with('success', 'Role created successfully.');
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

        // sync the permissions -> this will remove any not in the array and add new ones
        $role->permissions()->sync($data['permissions'] ?? []);

        return redirect()->back()->with('success', 'Role updated successfully.');
    }
}
