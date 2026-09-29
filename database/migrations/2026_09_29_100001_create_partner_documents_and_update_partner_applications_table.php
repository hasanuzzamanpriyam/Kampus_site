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
        // 1. Add user_id to partner_applications table if missing
        if (Schema::hasTable('partner_applications') && !Schema::hasColumn('partner_applications', 'user_id')) {
            Schema::table('partner_applications', function (Blueprint $table) {
                $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->nullOnDelete();
            });
        }

        // 2. Partner Documents Table
        if (!Schema::hasTable('partner_documents')) {
            Schema::create('partner_documents', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('partner_application_id')->nullable()->constrained('partner_applications')->nullOnDelete();
                $table->string('title');
                $table->string('document_type')->default('Trade License'); // Trade License, Company Registration, Tax Certificate, Accreditation, Director ID, Bank Solvency, MoU, Other
                $table->string('document_number')->nullable();
                $table->string('issuing_organization')->nullable();
                $table->date('issue_date')->nullable();
                $table->date('expiry_date')->nullable();
                $table->string('file_path')->nullable();
                $table->string('file_name')->nullable();
                $table->string('file_type')->nullable();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->text('description')->nullable();
                $table->string('status')->default('submitted'); // submitted, verified, rejected
                $table->text('counselor_remarks')->nullable(); // Admin / counselor notes and feedback
                $table->timestamp('verified_at')->nullable();
                $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partner_documents');

        if (Schema::hasTable('partner_applications') && Schema::hasColumn('partner_applications', 'user_id')) {
            Schema::table('partner_applications', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            });
        }
    }
};
