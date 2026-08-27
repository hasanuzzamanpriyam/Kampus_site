<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicDestinationController extends Controller
{
    /**
     * Display destination details page by country slug, with eager loaded universities.
     */
    public function show(string $slug): Response
    {
        $country = Country::where('slug', $slug)
            ->with(['universities' => function ($query) {
                $query->withCount('courses');
            }])
            ->firstOrFail();

        return Inertia::render('DestinationDetails', [
            'country' => $country,
        ]);
    }
}
