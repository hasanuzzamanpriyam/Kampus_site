<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\PartnerApplication;
use App\Models\PartnerDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PartnerDocumentController extends Controller
{
    /**
     * Ensure current user is an authorized partner or staff admin.
     */
    protected function authorizePartnerOrAdmin(Request $request): void
    {
        $user = $request->user();
        if (!$user || (!$user->isPartner() && !$user->isAdmin())) {
            abort(403, 'Unauthorized access to partner portal.');
        }
    }

    /**
     * Display the partner's document management portal.
     */
    public function index(Request $request): Response
    {
        $this->authorizePartnerOrAdmin($request);

        $user = $request->user();

        // Find partner application matching user or email
        $partnerApp = $user->partnerApplication 
            ?? PartnerApplication::where('email', $user->email)->first();

        // Retrieve partner's documents
        $documents = PartnerDocument::with('verifier:id,name')
            ->where(function ($q) use ($user, $partnerApp) {
                $q->where('user_id', $user->id);
                if ($partnerApp) {
                    $q->orWhere('partner_application_id', $partnerApp->id);
                }
            })
            ->orderBy('id', 'desc')
            ->get();

        $stats = [
            'total' => $documents->count(),
            'verified' => $documents->where('status', 'verified')->count(),
            'pending' => $documents->where('status', 'submitted')->count(),
            'rejected' => $documents->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Partner/Documents', [
            'documents' => $documents,
            'stats' => $stats,
            'partnerApp' => $partnerApp,
        ]);
    }

    /**
     * Store a new partner compliance document.
     */
    public function store(Request $request)
    {
        $this->authorizePartnerOrAdmin($request);

        $user = $request->user();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
            'document_number' => 'nullable|string|max:255',
            'issuing_organization' => 'nullable|string|max:255',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after_or_equal:issue_date',
            'description' => 'nullable|string|max:1000',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:10240', // 10MB max
        ]);

        $partnerApp = $user->partnerApplication 
            ?? PartnerApplication::where('email', $user->email)->first();

        $uploaded = $request->file('file');
        $storedPath = $uploaded->store('partner_documents', 'public');
        $filePath = '/storage/' . $storedPath;
        $fileName = $uploaded->getClientOriginalName();
        $fileType = $uploaded->getClientOriginalExtension();
        $fileSize = $uploaded->getSize();

        PartnerDocument::create([
            'user_id' => $user->id,
            'partner_application_id' => $partnerApp?->id,
            'title' => $validated['title'],
            'document_type' => $validated['document_type'],
            'document_number' => $validated['document_number'] ?? null,
            'issuing_organization' => $validated['issuing_organization'] ?? null,
            'issue_date' => $validated['issue_date'] ?? null,
            'expiry_date' => $validated['expiry_date'] ?? null,
            'description' => $validated['description'] ?? null,
            'file_path' => $filePath,
            'file_name' => $fileName,
            'file_type' => $fileType,
            'file_size' => $fileSize,
            'status' => 'submitted',
        ]);

        return back()->with('success', 'Document uploaded successfully! Our compliance team will review and verify it.');
    }

    /**
     * Update an existing partner document or re-upload a revised file.
     */
    public function update(Request $request, $id)
    {
        $this->authorizePartnerOrAdmin($request);

        $user = $request->user();

        $partnerApp = $user->partnerApplication 
            ?? PartnerApplication::where('email', $user->email)->first();

        $document = PartnerDocument::findOrFail($id);

        if (!$user->isAdmin() && $document->user_id !== $user->id && (!$partnerApp || $document->partner_application_id !== $partnerApp->id)) {
            abort(403, 'Unauthorized access to this document.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
            'document_number' => 'nullable|string|max:255',
            'issuing_organization' => 'nullable|string|max:255',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after_or_equal:issue_date',
            'description' => 'nullable|string|max:1000',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png,webp|max:10240',
        ]);

        $data = [
            'title' => $validated['title'],
            'document_type' => $validated['document_type'],
            'document_number' => $validated['document_number'] ?? null,
            'issuing_organization' => $validated['issuing_organization'] ?? null,
            'issue_date' => $validated['issue_date'] ?? null,
            'expiry_date' => $validated['expiry_date'] ?? null,
            'description' => $validated['description'] ?? null,
        ];

        // If replacing file
        if ($request->hasFile('file')) {
            if ($document->file_path && str_starts_with($document->file_path, '/storage/')) {
                $oldRel = str_replace('/storage/', '', $document->file_path);
                Storage::disk('public')->delete($oldRel);
            }

            $uploaded = $request->file('file');
            $storedPath = $uploaded->store('partner_documents', 'public');
            $data['file_path'] = '/storage/' . $storedPath;
            $data['file_name'] = $uploaded->getClientOriginalName();
            $data['file_type'] = $uploaded->getClientOriginalExtension();
            $data['file_size'] = $uploaded->getSize();

            // Re-upload resets status to submitted for review
            $data['status'] = 'submitted';
            $data['verified_at'] = null;
            $data['verified_by'] = null;
        }

        $document->update($data);

        return back()->with('success', 'Document updated successfully!');
    }

    /**
     * Delete a partner document.
     */
    public function destroy(Request $request, $id)
    {
        $this->authorizePartnerOrAdmin($request);

        $user = $request->user();

        $partnerApp = $user->partnerApplication 
            ?? PartnerApplication::where('email', $user->email)->first();

        $document = PartnerDocument::findOrFail($id);

        if (!$user->isAdmin() && $document->user_id !== $user->id && (!$partnerApp || $document->partner_application_id !== $partnerApp->id)) {
            abort(403, 'Unauthorized access to this document.');
        }

        if ($document->file_path && str_starts_with($document->file_path, '/storage/')) {
            $oldRel = str_replace('/storage/', '', $document->file_path);
            Storage::disk('public')->delete($oldRel);
        }

        $document->delete();

        return back()->with('success', 'Document deleted successfully.');
    }
}
