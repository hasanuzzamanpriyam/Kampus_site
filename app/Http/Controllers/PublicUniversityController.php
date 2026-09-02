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
     * Display public universities directory with Inertia SPA search, country filters, and pagination.
     */
    public function index(Request $request): Response
    {
        $universities = University::with('country:id,name,slug,country_code')
            ->withCount('courses')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = trim($request->input('search'));
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('country') && $request->input('country') !== 'All', function ($query) use ($request) {
                $country = trim($request->input('country'));
                $query->whereHas('country', function ($q) use ($country) {
                    $q->where('country_code', $country)
                      ->orWhere('slug', $country)
                      ->orWhere('name', $country);
                });
            })
            ->latest()
            ->paginate(12)
            ->withQueryString(); // Crucial for keeping filters during pagination

        // Fetch dynamic destination countries from the database
        $destinations = Country::whereHas('universities')
            ->withCount('universities')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'country_code']);

        return Inertia::render('Universities', [
            'universities' => $universities,
            'destinations' => $destinations,
            'filters' => $request->only(['search', 'country']),
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
