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
        if (!Schema::hasTable('course_searches')) {
            Schema::create('course_searches', function (Blueprint $table) {
                $table->id();
                $table->string('keyword')->unique();
                $table->unsignedBigInteger('search_count')->default(1);
                $table->timestamps();
            });
        }

        Schema::table('courses', function (Blueprint $table) {
            if (!Schema::hasColumn('courses', 'search_count')) {
                $table->unsignedBigInteger('search_count')->default(0)->after('tuition_fee');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_searches');

        Schema::table('courses', function (Blueprint $table) {
            if (Schema::hasColumn('courses', 'search_count')) {
                $table->dropColumn('search_count');
            }
        });
    }
};
