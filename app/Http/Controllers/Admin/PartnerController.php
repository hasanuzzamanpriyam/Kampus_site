<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PartnerApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerController extends Controller
{
    /**
     * Display a listing of all partner applications.
     */
    public function index()
    {
        $applications = PartnerApplication::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Partners/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Update the status of a partner application.
     */
    public function update(Request $request, $id)
    {
        $application = PartnerApplication::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $application->update($validated);

        return back()->with('success', "Application status updated to \"{$validated['status']}\".");
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
