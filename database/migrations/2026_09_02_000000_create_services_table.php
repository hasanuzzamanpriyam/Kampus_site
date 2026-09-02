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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('number')->nullable()->default('01');
            $table->string('title');
            $table->string('slug')->nullable();
            $table->string('badge')->nullable();
            $table->string('icon')->nullable()->default('GraduationCap');
            $table->text('description');
            $table->json('bullets')->nullable();
            $table->string('image')->nullable();
            $table->string('gradient')->nullable()->default('from-blue-600 via-indigo-600 to-slate-900');
            $table->string('glow_color')->nullable()->default('bg-blue-500/20');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
