<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AdminAccessSecurityTest extends TestCase
{
    use RefreshDatabase;

    protected User $student;
    protected User $admin;
    protected User $partner;

    protected function setUp(): void
    {
        parent::setUp();

        if (class_exists(Role::class)) {
            Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
            Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
            Role::firstOrCreate(['name' => 'Partner', 'guard_name' => 'web']);
            Role::firstOrCreate(['name' => 'Student', 'guard_name' => 'web']);
        }

        // Occupy ID 1 so subsequent users don't automatically become Super Admin via ID 1
        $this->admin = User::factory()->create(['id' => 1, 'email' => 'superadmin@rmsedu.com']);
        $this->admin->assignRole('Super Admin');

        $this->student = User::factory()->create([
            'email' => 'student@example.com',
        ]);
        $this->student->assignRole('Student');

        $this->partner = User::factory()->create([
            'email' => 'partner@agency.com',
            'password_set_at' => now(),
        ]);
        $this->partner->assignRole('Partner');
    }

    public function test_student_cannot_access_admin_dashboard(): void
    {
        $response = $this
            ->actingAs($this->student)
            ->get('/admin/dashboard');

        $response->assertForbidden();
    }

    public function test_student_cannot_access_admin_root(): void
    {
        $response = $this
            ->actingAs($this->student)
            ->get('/admin');

        $response->assertForbidden();
    }

    public function test_student_cannot_access_admin_students_directory(): void
    {
        $response = $this
            ->actingAs($this->student)
            ->get('/admin/students');

        $response->assertForbidden();
    }

    public function test_student_cannot_access_admin_settings(): void
    {
        $response = $this
            ->actingAs($this->student)
            ->get('/admin/settings');

        $response->assertForbidden();
    }

    public function test_student_cannot_access_admin_partner_documents(): void
    {
        $response = $this
            ->actingAs($this->student)
            ->get('/admin/partner/documents');

        $response->assertForbidden();
    }

    public function test_student_cannot_access_admin_user_management(): void
    {
        $response = $this
            ->actingAs($this->student)
            ->get('/admin/users');

        $response->assertForbidden();
    }

    public function test_partner_can_access_admin_dashboard(): void
    {
        $response = $this
            ->actingAs($this->partner)
            ->get('/admin/dashboard');

        $response->assertOk();
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $response = $this
            ->actingAs($this->admin)
            ->get('/admin/dashboard');

        $response->assertOk();
    }
}
