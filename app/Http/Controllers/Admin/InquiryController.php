<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    /**
     * Display a listing of all contact inquiries.
     */
    public function index()
    {
        $messages = ContactMessage::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Inquiries/Index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Toggle the is_read status of a contact message.
     */
    public function update(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);

        $validated = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $message->update($validated);

        $status = $validated['is_read'] ? 'read' : 'unread';

        return back()->with('success', "Message marked as {$status}.");
    }

    /**
     * Remove the specified contact message.
     */
    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return redirect()->route('admin.inquiries.index')
            ->with('success', 'Contact message deleted successfully.');
    }

    /**
     * Store a new contact message from the public-facing form.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'topic' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        ContactMessage::create([
            ...$validated,
            'is_read' => false,
        ]);

        return back()->with('success', 'Thank you for reaching out! A counselor will respond within 24 hours.');
    }
}
