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
        Schema::table('blogs', function (Blueprint $table) {
            if (!Schema::hasColumn('blogs', 'search_count')) {
                $table->unsignedBigInteger('search_count')->default(0)->after('is_published');
            }
        });

        if (!Schema::hasTable('blog_searches')) {
            Schema::create('blog_searches', function (Blueprint $table) {
                $table->id();
                $table->string('keyword')->unique();
                $table->unsignedBigInteger('search_count')->default(1);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('blog_searches')) {
            Schema::dropIfExists('blog_searches');
        }

        Schema::table('blogs', function (Blueprint $table) {
            if (Schema::hasColumn('blogs', 'search_count')) {
                $table->dropColumn('search_count');
            }
        });
    }
};
