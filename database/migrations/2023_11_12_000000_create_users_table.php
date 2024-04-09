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
            $table->id();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('Auth_Type');
            $table->string('First_Name', 255)->nullable();
            $table->string('Last_Name', 255)->nullable();
            $table->string('Level', 255)->nullable();
            $table->string('Grade', 255)->nullable();
            $table->string('Phone_Number')->nullable();
            $table->string('Emergency_Name', 255)->nullable();
            $table->string('Emergency_Number')->nullable();
            $table->string('House_Number', 255)->nullable();
            $table->string('Barangay', 255)->nullable();
            $table->string('City', 255)->nullable();
            $table->string('Province', 255)->nullable();
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
