<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    /**
     * Display a public dynamic page by slug.
     */
    public function show($slug)
    {
        $page = Page::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('PublicDynamicPage', [
            'page' => $page,
        ]);
    }
}
