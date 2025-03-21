<?php

namespace Database\Seeders;

use App\Models\RolePermissions as ModelsRolePermissions;
use Illuminate\Database\Seeder;

class RolePermissions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rolePermissions = [
            ['role_id' => 1, 'permission' => 'manage_users'],
        ];

        foreach ($rolePermissions as $rolePermission) {
            ModelsRolePermissions::create($rolePermission);
        }
    }
}
