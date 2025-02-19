<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('role_permissions', function (Blueprint $table) {
            // auto incrementing primary key
            $table->id();
            // role_id = id column of roles table, and if a record of roles table deleted -> it will removed the all related records within this as well
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
            // role_id = id column of roles table, and if a record of roles table deleted -> it will removed the all related records within this as well
            $table->foreignId('permission_id')->constrained('permissions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_permissions');
    }
};
