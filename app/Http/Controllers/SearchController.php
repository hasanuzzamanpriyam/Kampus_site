<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\University;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Live search for universities and courses using Laravel Scout.
     */
    public function search(Request $request)
    {
        $query = trim((string) $request->input('q', ''));

        if (mb_strlen($query) < 1) {
            return response()->json([
                'universities' => [],
                'courses' => [],
            ]);
        }

        // 1. Search Universities using Laravel Scout with course count & country relationship
        $universities = University::search($query)
            ->query(function ($q) {
                $q->withCount('courses')
                  ->with('country:id,name,country_code');
            })
            ->take(5)
            ->get();

        // 2. Search Courses using Laravel Scout with university relationship
        $courses = Course::search($query)
            ->query(function ($q) {
                $q->with('university:id,name,slug,location,cover_image');
            })
            ->take(5)
            ->get();

        return response()->json([
            'universities' => $universities,
            'courses' => $courses,
        ]);
    }
}
