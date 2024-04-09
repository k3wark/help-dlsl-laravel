<?php

use App\Models\Report;
use App\Models\User;
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
        Schema::create('s_e_c_u_r_i_t_y_s', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Report::class);
            $table->string('Concern', 255)->nullable();
            $table->string('Other_Information', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_e_c_u_r_i_t_y_s');
    }
};
