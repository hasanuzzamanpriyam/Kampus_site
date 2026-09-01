<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicUniversityController extends Controller
{
    /**
     * Display public universities directory with real database data for instant client-side interaction.
     */
    public function index(Request $request): Response
    {
        // Fetch all universities with their country and courses count
        $universities = University::with('country:id,name,slug,country_code')
            ->withCount('courses')
            ->latest()
            ->get();

        // Fetch dynamic destination countries with universities count
        $destinations = Country::whereHas('universities')
            ->withCount('universities')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'country_code']);

        return Inertia::render('Universities', [
            'universities' => $universities,
            'destinations' => $destinations,
            'filters' => [
                'search' => $request->input('search', ''),
                'destination' => $request->input('destination', 'All'),
            ],
        ]);
    }

    /**
     * Display public university details page by slug, with eager loaded courses and country.
     */
    public function show(string $slug): Response
    {
        $university = University::where('slug', $slug)
            ->with(['courses', 'country'])
            ->firstOrFail();

        return Inertia::render('UniversityDetails', [
            'university' => $university,
        ]);
    }
}
