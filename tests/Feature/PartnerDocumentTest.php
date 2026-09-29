<?php

namespace Tests\Feature;

use App\Models\PartnerApplication;
use App\Models\PartnerDocument;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PartnerDocumentTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $partner;
    protected PartnerApplication $partnerApplication;

    protected function setUp(): void
    {
        parent::setUp();

        if (class_exists(Role::class)) {
            Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
            Role::firstOrCreate(['name' => 'Partner', 'guard_name' => 'web']);
            Role::firstOrCreate(['name' => 'Student', 'guard_name' => 'web']);
        }

        $this->admin = User::factory()->create([
            'email' => 'admin@rmsedu.com',
        ]);
        $this->admin->assignRole('Super Admin');

        $this->partner = User::factory()->create([
            'email' => 'partner@agency.com',
            'password_set_at' => now(),
        ]);
        $this->partner->assignRole('Partner');

        $this->partnerApplication = PartnerApplication::create([
            'user_id' => $this->partner->id,
            'company_name' => 'Global Edu Partners Ltd',
            'contact_person' => 'Jane Partner',
            'email' => 'partner@agency.com',
            'phone' => '+1 555 123 4567',
            'country' => 'United Kingdom',
            'years_in_business' => '5+',
            'status' => 'approved',
        ]);
    }

    public function test_partner_can_view_document_portal(): void
    {
        $response = $this
            ->actingAs($this->partner)
            ->get('/partner/documents');

        $response->assertOk();
    }

    public function test_non_partner_cannot_access_partner_documents(): void
    {
        $student = User::factory()->create();
        $student->assignRole('Student');

        $response = $this
            ->actingAs($student)
            ->get('/partner/documents');

        $response->assertForbidden();
    }

    public function test_partner_can_upload_document(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('business_license.pdf', 500, 'application/pdf');

        $response = $this
            ->actingAs($this->partner)
            ->post('/partner/documents', [
                'title' => 'Trade License 2026',
                'document_type' => 'business_license',
                'document_number' => 'BL-992123',
                'issuing_organization' => 'UK Companies House',
                'issue_date' => '2026-01-15',
                'file' => $file,
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('partner_documents', [
            'user_id' => $this->partner->id,
            'title' => 'Trade License 2026',
            'document_type' => 'business_license',
            'status' => 'submitted',
        ]);

        $doc = PartnerDocument::where('user_id', $this->partner->id)->first();
        $this->assertNotNull($doc);
        $this->assertNotNull($doc->file_path);

        $relativePath = str_replace('/storage/', '', $doc->file_path);
        Storage::disk('public')->assertExists($relativePath);
    }

    public function test_partner_can_delete_own_document(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('partner_documents/doc1.pdf', 'dummy content');

        $document = PartnerDocument::create([
            'user_id' => $this->partner->id,
            'partner_application_id' => $this->partnerApplication->id,
            'title' => 'Tax Clearance',
            'document_type' => 'tax_clearance',
            'file_path' => '/storage/partner_documents/doc1.pdf',
            'file_name' => 'doc1.pdf',
            'status' => 'submitted',
        ]);

        $response = $this
            ->actingAs($this->partner)
            ->delete("/partner/documents/{$document->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('partner_documents', ['id' => $document->id]);
        Storage::disk('public')->assertMissing('partner_documents/doc1.pdf');
    }

    public function test_partner_cannot_delete_other_partners_document(): void
    {
        $otherPartner = User::factory()->create([
            'password_set_at' => now(),
        ]);
        $otherPartner->assignRole('Partner');

        $document = PartnerDocument::create([
            'user_id' => $this->partner->id,
            'partner_application_id' => $this->partnerApplication->id,
            'title' => 'Secret Cert',
            'document_type' => 'other',
            'file_path' => '/storage/partner_documents/secret.pdf',
            'status' => 'submitted',
        ]);

        $response = $this
            ->actingAs($otherPartner)
            ->delete("/partner/documents/{$document->id}");

        $response->assertForbidden();
        $this->assertDatabaseHas('partner_documents', ['id' => $document->id]);
    }

    public function test_admin_can_view_partner_documents_in_admin_index(): void
    {
        PartnerDocument::create([
            'user_id' => $this->partner->id,
            'partner_application_id' => $this->partnerApplication->id,
            'title' => 'Accreditation Certificate',
            'document_type' => 'accreditation_certificate',
            'file_path' => '/storage/partner_documents/cert.pdf',
            'status' => 'submitted',
        ]);

        $response = $this
            ->actingAs($this->admin)
            ->get('/admin/partners');

        $response->assertOk();
    }

    public function test_admin_can_verify_partner_document(): void
    {
        $document = PartnerDocument::create([
            'user_id' => $this->partner->id,
            'partner_application_id' => $this->partnerApplication->id,
            'title' => 'Company Registration',
            'document_type' => 'business_license',
            'file_path' => '/storage/partner_documents/reg.pdf',
            'status' => 'submitted',
        ]);

        $response = $this
            ->actingAs($this->admin)
            ->patch("/admin/partners/documents/{$document->id}/verify", [
                'status' => 'verified',
                'counselor_remarks' => 'Verified against UK Companies House registrar.',
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $document->refresh();
        $this->assertSame('verified', $document->status);
        $this->assertSame('Verified against UK Companies House registrar.', $document->counselor_remarks);
        $this->assertSame($this->admin->id, $document->verified_by);
        $this->assertNotNull($document->verified_at);
    }

    public function test_admin_can_reject_partner_document(): void
    {
        $document = PartnerDocument::create([
            'user_id' => $this->partner->id,
            'partner_application_id' => $this->partnerApplication->id,
            'title' => 'Expired Tax Document',
            'document_type' => 'tax_clearance',
            'file_path' => '/storage/partner_documents/tax.pdf',
            'status' => 'submitted',
        ]);

        $response = $this
            ->actingAs($this->admin)
            ->patch("/admin/partners/documents/{$document->id}/verify", [
                'status' => 'rejected',
                'counselor_remarks' => 'Tax document is expired. Please re-upload current tax year certificate.',
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $document->refresh();
        $this->assertSame('rejected', $document->status);
        $this->assertSame('Tax document is expired. Please re-upload current tax year certificate.', $document->counselor_remarks);
    }

    public function test_partner_cannot_verify_documents(): void
    {
        $document = PartnerDocument::create([
            'user_id' => $this->partner->id,
            'title' => 'Self verification attempt',
            'document_type' => 'business_license',
            'file_path' => '/storage/partner_documents/self.pdf',
            'status' => 'submitted',
        ]);

        $response = $this
            ->actingAs($this->partner)
            ->patch("/admin/partners/documents/{$document->id}/verify", [
                'status' => 'verified',
            ]);

        $response->assertForbidden();
    }
}
