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
            'site_name' => 'Kampus Edu',
            'header_subtitle' => 'Educational Consultancy',
            'site_tagline' => 'Global Higher Education Advisers',
            'footer_name' => 'Kampus EduConsult',
            'footer_subtitle' => 'Global Higher Education Advisers',
            'footer_description' => 'Empowering ambitious students worldwide to access top-tier university education with bespoke admissions counselling, visa support, and scholarship guidance.',
            'head_office_address' => "124 Education Avenue, Suite 400, Oxford Street\nLondon W1B 3AG, United Kingdom",
            'head_office_phone' => "UK: +44 20 7946 0912 | BD: +880 1812713814",
            'contact_email' => 'apply@kampusedu.com',
            'contact_bd_hotline' => '+880 1812713814',
            'operating_hours' => 'Mon - Sat: 9:00 AM - 7:00 PM',
            'facebook_url' => 'https://facebook.com/kampusedu',
            'linkedin_url' => 'https://linkedin.com/company/kampusedu',
            'instagram_url' => 'https://instagram.com/kampusedu',
            'youtube_url' => 'https://youtube.com/c/kampusedu',
            // Contact Page Details & Map Embed
            'contact_info_title' => 'Contact Information',
            'contact_info_subtitle' => 'London Global HQ & Regional Advisory Center',
            'contact_info_address' => '1st Floor, Botanical Works, 2 Jubilee Street, London E1 3FU',
            'contact_info_email' => 'info@kampus-group.com',
            'contact_info_phone' => '020 7423 9333',
            'contact_info_hours' => 'Monday - Friday: 9:00 AM - 6:00 PM GMT',
            'contact_map_iframe' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.915783307521!2d-0.05716182337775242!3d51.51478190950346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876033580555555%3A0x123456789abcdef!2sJubilee%20St%2C%20London!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk',
        ];

        foreach ($defaults as $key => $value) {
            if (!Setting::where('key', $key)->exists()) {
                Setting::create(['key' => $key, 'value' => $value]);
            }
        }

        // Pluck key-value array format e.g. ['site_name' => 'Kampus Edu', ...]
        $settings = Setting::pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Store or update global site settings and file uploads in storage.
     */
    public function store(Request $request)
    {
        foreach ($request->except(['_token', '_method']) as $key => $value) {
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('settings', 'public');
                Setting::updateOrCreate(['key' => $key], ['value' => $path]);
            } elseif ($value !== null) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => is_array($value) ? json_encode($value) : $value]
                );
            }
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Global brand and site settings updated successfully.');
    }

    /**
     * Alias for store method.
     */
    public function update(Request $request)
    {
        return $this->store($request);
    }
}
