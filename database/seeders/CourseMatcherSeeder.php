<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\University;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseMatcherSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ensure Canada University
        $canada = Country::where('name', 'Canada')->first();
        if ($canada) {
            $uToronto = University::firstOrCreate(
                ['slug' => 'university-of-toronto'],
                [
                    'country_id' => $canada->id,
                    'name' => 'University of Toronto',
                    'location' => 'Toronto, Ontario, Canada',
                    'description' => 'A leading global research institution renowned for engineering, business, and computer science.',
                    'cover_image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80',
                    'logo' => 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
                    'features' => ['Top 20 Worldwide', 'Post-Grad Work Permit', 'Co-op Programs'],
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'beng-computer-engineering-toronto'],
                [
                    'university_id' => $uToronto->id,
                    'title' => 'BEng in Computer & Software Engineering',
                    'level' => 'Undergraduate',
                    'duration' => '4 Years Full-Time',
                    'tuition_fee' => 'CAD 42,000 / year',
                    'intake' => 'September 2026',
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'msc-applied-computing-toronto'],
                [
                    'university_id' => $uToronto->id,
                    'title' => 'MSc in Applied Computing & Artificial Intelligence',
                    'level' => 'Postgraduate',
                    'duration' => '2 Years Full-Time',
                    'tuition_fee' => 'CAD 38,000 / year',
                    'intake' => 'September 2026',
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'bba-management-finance-toronto'],
                [
                    'university_id' => $uToronto->id,
                    'title' => 'Bachelor of Business Administration (BBA) in Finance',
                    'level' => 'Undergraduate',
                    'duration' => '4 Years Full-Time',
                    'tuition_fee' => 'CAD 36,000 / year',
                    'intake' => 'September 2026',
                ]
            );
        }

        // 2. Ensure Australia University
        $australia = Country::where('name', 'Australia')->first();
        if ($australia) {
            $uMelbourne = University::firstOrCreate(
                ['slug' => 'university-of-melbourne'],
                [
                    'country_id' => $australia->id,
                    'name' => 'University of Melbourne',
                    'location' => 'Melbourne, Victoria, Australia',
                    'description' => 'Australia’s #1 ranked university renowned for high graduate employability and research excellence.',
                    'cover_image' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
                    'logo' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
                    'features' => ['Group of Eight Member', 'Melbourne Model', '3-Year PSW Visa'],
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'master-information-technology-melbourne'],
                [
                    'university_id' => $uMelbourne->id,
                    'title' => 'Master of Information Technology & Cybersecurity',
                    'level' => 'Postgraduate',
                    'duration' => '2 Years Full-Time',
                    'tuition_fee' => 'AUD 44,500 / year',
                    'intake' => 'February & July 2026',
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'bachelor-biomedicine-melbourne'],
                [
                    'university_id' => $uMelbourne->id,
                    'title' => 'Bachelor of Biomedicine & Pre-Medicine',
                    'level' => 'Undergraduate',
                    'duration' => '3 Years Full-Time',
                    'tuition_fee' => 'AUD 41,000 / year',
                    'intake' => 'February 2026',
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'llm-master-laws-melbourne'],
                [
                    'university_id' => $uMelbourne->id,
                    'title' => 'Master of Laws (LLM) in International Law',
                    'level' => 'Postgraduate',
                    'duration' => '1 Year Full-Time',
                    'tuition_fee' => 'AUD 39,000 / year',
                    'intake' => 'February & July 2026',
                ]
            );
        }

        // 3. Ensure UK Courses for Oxford
        $uOxford = University::where('slug', 'university-of-oxford')->first();
        if ($uOxford) {
            Course::firstOrCreate(
                ['slug' => 'msc-advanced-computer-science-oxford'],
                [
                    'university_id' => $uOxford->id,
                    'title' => 'MSc in Advanced Computer Science',
                    'level' => 'Postgraduate',
                    'duration' => '1 Year Full-Time',
                    'tuition_fee' => '£36,000 / year',
                    'intake' => 'October 2026',
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'foundation-engineering-oxford'],
                [
                    'university_id' => $uOxford->id,
                    'title' => 'International Foundation Programme in Engineering & Physical Sciences',
                    'level' => 'Foundation',
                    'duration' => '1 Year Full-Time',
                    'tuition_fee' => '£18,500 / year',
                    'intake' => 'September 2026',
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'phd-biomedical-engineering-oxford'],
                [
                    'university_id' => $uOxford->id,
                    'title' => 'PhD in Engineering Science & Bioengineering',
                    'level' => 'PhD',
                    'duration' => '3-4 Years Full-Time',
                    'tuition_fee' => '£28,000 / year',
                    'intake' => 'October 2026',
                ]
            );

            Course::firstOrCreate(
                ['slug' => 'ba-fine-art-oxford'],
                [
                    'university_id' => $uOxford->id,
                    'title' => 'Bachelor of Fine Art & Creative Design',
                    'level' => 'Undergraduate',
                    'duration' => '3 Years Full-Time',
                    'tuition_fee' => '£27,000 / year',
                    'intake' => 'October 2026',
                ]
            );
        }
    }
}
