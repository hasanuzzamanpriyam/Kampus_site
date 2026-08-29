<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display global site settings.
     */
    public function index()
    {
        // Seed default key-values if not present
        $defaults = [
            'site_name' => 'Kampus EduConsult',
            'site_tagline' => 'Global Higher Education Advisers',
            'head_office_address' => "124 Education Avenue, Suite 400, Oxford Street, London W1B 3AG, United Kingdom",
            'head_office_phone' => "UK: +44 20 7946 0912 | BD: +880 1812713814",
            'contact_email' => 'apply@kampusedu.com',
            'contact_bd_hotline' => '+880 1812713814',
            'operating_hours' => 'Mon - Sat: 9:00 AM - 7:00 PM',
            'facebook_url' => 'https://facebook.com/kampusedu',
            'linkedin_url' => 'https://linkedin.com/company/kampusedu',
            'instagram_url' => 'https://instagram.com/kampusedu',
            'youtube_url' => 'https://youtube.com/c/kampusedu',
        ];

        foreach ($defaults as $key => $value) {
            if (!Setting::where('key', $key)->exists()) {
                Setting::create(['key' => $key, 'value' => $value]);
            }
        }

        // Pluck key-value array format e.g. ['head_office_address' => '...', ...]
        $settings = Setting::pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Store or update global site settings in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(['_token']);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : $value]
            );
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Global settings updated successfully.');
    }

    /**
     * Alias for store method.
     */
    public function update(Request $request)
    {
        return $this->store($request);
    }
}
