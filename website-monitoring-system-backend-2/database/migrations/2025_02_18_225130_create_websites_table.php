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
        Schema::create('websites', function (Blueprint $table) {
            // auto incrementing primary key
            $table->id();
            // user_id = id column of users table, and if a record of users table deleted -> it will removed the all related logs within this as well
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // create url column with unique values
            $table->string('url')->default('https://google.com');
            // status column, only 3 values, default is 'unknown'
            $table->enum('status', ['up', 'down', 'unknown'])->default('unknown'); 
            // last checked time
            $table->timestamp('last_checked_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('websites');
    }
};
