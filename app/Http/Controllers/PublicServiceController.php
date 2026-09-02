<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Faq;
use Inertia\Inertia;

class PublicServiceController extends Controller
{
    /**
     * Display the dynamic services page.
     */
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        $faqs = Faq::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return Inertia::render('Services', [
            'services' => $services,
            'faqs' => $faqs,
        ]);
    }
}
