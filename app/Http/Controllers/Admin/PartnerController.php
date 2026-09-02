<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PartnerApplication;
use App\Models\Setting;
use App\Models\User;
use App\Mail\PartnerApprovedMail;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PartnerController extends Controller
{
    /**
     * Display a listing of all partner applications.
     */
    public function index()
    {
        $applications = PartnerApplication::orderBy('id', 'desc')->get();
        $partnerModalParagraph = Setting::where('key', 'partner_modal_paragraph')->value('value') 
            ?? 'Join our global higher education network. Register your agency below to collaborate with top universities worldwide and streamline student admissions.';

        return Inertia::render('Admin/Partners/Index', [
            'applications' => $applications,
            'partnerModalParagraph' => $partnerModalParagraph,
        ]);
    }

    /**
     * Update the popup modal introductory paragraph text.
     */
    public function updatePopupParagraph(Request $request)
    {
        $validated = $request->validate([
            'partner_modal_paragraph' => 'nullable|string|max:1000',
        ]);

        Setting::updateOrCreate(
            ['key' => 'partner_modal_paragraph'],
            ['value' => $validated['partner_modal_paragraph'] ?? '']
        );

        return back()->with('success', 'Partner popup modal paragraph updated successfully.');
    }

    /**
     * Update the status of a partner application.
     */
    public function update(Request $request, $id)
    {
        $application = PartnerApplication::findOrFail($id);
        $previousStatus = $application->status;

        $validated = $request->validate([
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $application->update($validated);

        $feedbackMessage = "Application status updated to \"{$validated['status']}\".";

        // If newly approved, automatically provision user account and send welcome credentials email
        if ($validated['status'] === 'approved' && $previousStatus !== 'approved') {
            $user = User::where('email', $application->email)->first();
            $plainPassword = null;
            $isNewAccount = false;

            if (!$user) {
                $plainPassword = Str::password(10);
                $user = User::create([
                    'name' => $application->contact_person ?: $application->company_name,
                    'email' => $application->email,
                    'password' => Hash::make($plainPassword),
                ]);
                $isNewAccount = true;
            }

            // Ensure 'Partner' role exists with standard limited permissions
            $partnerRole = Role::firstOrCreate(['name' => 'Partner', 'guard_name' => 'web']);
            if ($partnerRole->wasRecentlyCreated) {
                $partnerRole->syncPermissions(['manage-universities', 'manage-courses']);
            }

            // Assign Partner role if user has no existing roles
            if ($user->roles()->count() === 0) {
                $user->assignRole($partnerRole);
            }

            // Dispatch welcome approval email
            try {
                Mail::to($user->email)->send(new PartnerApprovedMail(
                    $application,
                    $user,
                    $plainPassword,
                    $isNewAccount
                ));
                $feedbackMessage = "Partner approved! User account created and login credentials emailed to {$user->email}.";
            } catch (\Throwable $e) {
                \Log::error('Failed to send partner approval email: ' . $e->getMessage());
                $feedbackMessage = "Partner approved and user account created (role: Partner), but email dispatch failed.";
            }
        }

        return back()->with('success', $feedbackMessage);
    }

    /**
     * Remove the specified partner application.
     */
    public function destroy($id)
    {
        $application = PartnerApplication::findOrFail($id);
        $application->delete();

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partner application deleted successfully.');
    }

    /**
     * Store a new partner application from the public-facing form.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'years_in_business' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:2000',
        ]);

        PartnerApplication::create([
            ...$validated,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Thank you! Your partnership application has been submitted. Our team will contact you shortly.');
    }
}
