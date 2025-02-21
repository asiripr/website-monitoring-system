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
        Schema::create('users', function (Blueprint $table) {
            // auto incrementing primary key
            $table->id();
            // create name column 
            $table->string('name');
            // create emails column with unique values
            $table->string('email')->unique();
            // email verified time
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            // role_id = id column of roles table, and if a record of roles table deleted -> it will removed the all related recodes within this as well
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
