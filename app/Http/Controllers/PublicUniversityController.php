<?php

namespace App\Http\Controllers;

use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicUniversityController extends Controller
{
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
