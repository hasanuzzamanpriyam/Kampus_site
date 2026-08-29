<?php

namespace App\Http\Middleware;

use App\Models\Page;
use App\Models\Faq;
use App\Models\Branch;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'nav_pages' => fn () => Page::where('is_active', true)
                ->where('show_in_navbar', true)
                ->select('id', 'name', 'slug')
                ->get(),
            'footer_pages' => fn () => Page::where('is_active', true)
                ->where('show_in_footer', true)
                ->select('id', 'name', 'slug')
                ->get(),
            'faqs' => fn () => Faq::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get(),
            'globalBranches' => fn () => Branch::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get(),
            'globalSettings' => fn () => Setting::pluck('value', 'key')->toArray(),
        ];
    }
}
