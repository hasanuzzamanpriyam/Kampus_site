<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    /**
     * Store automated multi-step call booking request as ContactMessage.
     */
    public function bookCall(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'level_of_study' => 'required|string|max:255',
            'date' => 'required|string|max:255',
            'time' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        ContactMessage::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'topic' => 'Call Booking: ' . $validated['destination'],
            'message' => "Level of Study: {$validated['level_of_study']}\nPreferred Date: {$validated['date']}\nPreferred Time: {$validated['time']}\nCountry of Residence: {$validated['country']}\n\n[Automated Call Booking Request]",
            'is_read' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your call booking request has been submitted successfully.',
        ]);
    }
}
