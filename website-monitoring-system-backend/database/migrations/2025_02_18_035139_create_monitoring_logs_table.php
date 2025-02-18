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
        Schema::create('monitoring_logs', function (Blueprint $table) {
            // auto incrementing primary key
            $table->id(); 
            // website_id = id column of websites table, and if a record of websites table deleted -> it will removed the all related logs within this as well
            $table->foreignId('website_id')->constrained('websites')->onDelete('cascade');  
            // check website availability      
            $table->enum('ststus', ['up','down']);
            // response time in ms
            $table->integer('response_time')->nullable();
            // store website last checked time
            $table->timestamp('checked_at')->useCurrent();    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring_logs');
    }
};
