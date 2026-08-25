<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\University;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        // 1. Fetch Home Page CMS Record (SEO & Content)
        $page = Page::where('slug', 'home')->first();

        if (!$page) {
            $page = Page::create([
                'name' => 'Home',
                'slug' => 'home',
                'meta_title' => 'Kampus EduConsult — Study Abroad & University Placement',
                'meta_description' => 'Empowering ambitious students worldwide to gain admission into top global universities in UK, USA, Canada, Australia & Europe.',
                'meta_keywords' => 'study abroad, university admission, UKVI student visa, scholarship finder',
                'content' => [
                    'hero_heading' => 'Empowering your global education journey',
                    'hero_subtitle' => 'End-to-end guidance for university admission, scholarships, and student visas.',
                    'badge_text' => 'OFFICIAL BRITISH COUNCIL & ICEF PARTNER',
                    'stat_universities' => '500+',
                    'stat_acceptance' => '98%',
                    'stat_scholarships' => '$5M+'
                ],
                'is_active' => true
            ]);
        }

        // 2. Fetch Top Universities from Database
        $universities = University::withCount('courses')->take(4)->get();

        if ($universities->isEmpty()) {
            $defaultUniversities = [
                [
                    'name' => 'University of Oxford',
                    'slug' => 'university-of-oxford',
                    'location' => 'Oxford, United Kingdom',
                    'description' => 'The University of Oxford is a collegiate research university in Oxford, England.',
                    'cover_image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80',
                    'logo' => 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
                    'features' => ['QS World Rank #1', 'High Employability', '100% Research Excellence']
                ],
                [
                    'name' => 'Harvard University',
                    'slug' => 'harvard-university',
                    'location' => 'Cambridge, Massachusetts, USA',
                    'description' => 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.',
                    'cover_image' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
                    'logo' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
                    'features' => ['Ivy League Member', 'Top Business & Law', 'Need-Blind Aid']
                ],
                [
                    'name' => 'University of Helsinki',
                    'slug' => 'university-of-helsinki',
                    'location' => 'Helsinki, Finland',
                    'description' => 'The University of Helsinki is the oldest and largest institution of academic education in Finland.',
                    'cover_image' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
                    'logo' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80',
                    'features' => ['Top 1% Global Ranking', '50-100% Tuition Waivers', 'Work Permit']
                ],
                [
                    'name' => 'Middlesex University Dubai',
                    'slug' => 'middlesex-university-dubai',
                    'location' => 'Dubai Knowledge Park, UAE',
                    'description' => 'Middlesex University Dubai is the first overseas campus of Middlesex University London.',
                    'cover_image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
                    'logo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
                    'features' => ['UK Degree in Dubai', 'No IELTS Option', 'Merit Scholarships']
                ]
            ];

            foreach ($defaultUniversities as $u) {
                University::create($u);
            }

            $universities = University::withCount('courses')->take(4)->get();
        }

        // 3. Fetch Top Courses from Database
        $courses = Course::with('university')->take(6)->get();

        if ($courses->isEmpty() && $universities->isNotEmpty()) {
            $oxford = $universities->firstWhere('slug', 'university-of-oxford') ?? $universities->first();
            $harvard = $universities->firstWhere('slug', 'harvard-university') ?? $universities->first();
            $helsinki = $universities->firstWhere('slug', 'university-of-helsinki') ?? $universities->first();

            $defaultCourses = [
                ['university_id' => $oxford->id, 'title' => 'MSc in Computer Science & AI', 'slug' => 'msc-computer-science-oxford', 'level' => 'Postgraduate', 'duration' => '1 Year Full-Time', 'tuition_fee' => '£32,500 / year', 'intake' => 'September 2026'],
                ['university_id' => $harvard->id, 'title' => 'Master of Business Administration (MBA)', 'slug' => 'mba-harvard', 'level' => 'Postgraduate', 'duration' => '2 Years Full-Time', 'tuition_fee' => '$74,000 / year', 'intake' => 'September 2026'],
                ['university_id' => $helsinki->id, 'title' => 'BSc in Data Science & Machine Learning', 'slug' => 'bsc-data-science-helsinki', 'level' => 'Undergraduate', 'duration' => '3 Years Full-Time', 'tuition_fee' => '€13,000 / year', 'intake' => 'January & Sept 2026'],
                ['university_id' => $oxford->id, 'title' => 'BA in Economics & Management', 'slug' => 'ba-economics-oxford', 'level' => 'Undergraduate', 'duration' => '3 Years Full-Time', 'tuition_fee' => '£29,500 / year', 'intake' => 'September 2026'],
                ['university_id' => $harvard->id, 'title' => 'Master of Public Health (MPH)', 'slug' => 'mph-harvard', 'level' => 'Postgraduate', 'duration' => '1 Year Full-Time', 'tuition_fee' => '$62,000 / year', 'intake' => 'September 2026'],
                ['university_id' => $helsinki->id, 'title' => 'MSc in Atmospheric Sciences & Climate', 'slug' => 'msc-climate-helsinki', 'level' => 'Postgraduate', 'duration' => '2 Years Full-Time', 'tuition_fee' => '€15,000 / year', 'intake' => 'September 2026'],
            ];

            foreach ($defaultCourses as $c) {
                Course::create($c);
            }

            $courses = Course::with('university')->take(6)->get();
        }

        return Inertia::render('Home', [
            'page' => $page,
            'universities' => $universities,
            'courses' => $courses,
        ]);
    }
}
