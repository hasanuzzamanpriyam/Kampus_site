<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Country;
use App\Models\University;
use App\Models\Course;

class CountryUniversityCourseSeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['name' => 'United Kingdom', 'code' => 'GB'],
            ['name' => 'United States',   'code' => 'US'],
            ['name' => 'Canada',          'code' => 'CA'],
            ['name' => 'Australia',       'code' => 'AU'],
            ['name' => 'Germany',         'code' => 'DE'],
            ['name' => 'India',           'code' => 'IN'],
            ['name' => 'Nigeria',         'code' => 'NG'],
            ['name' => 'Japan',           'code' => 'JP'],
            ['name' => 'Brazil',          'code' => 'BR'],
            ['name' => 'South Africa',    'code' => 'ZA'],
            ['name' => 'France',          'code' => 'FR'],
            ['name' => 'China',           'code' => 'CN'],
        ];

        $universities = [
            'United Kingdom' => [
                ['name' => 'University of Oxford', 'location' => 'Oxford'],
                ['name' => 'University of Cambridge', 'location' => 'Cambridge'],
                ['name' => 'London School of Economics', 'location' => 'London'],
            ],
            'United States' => [
                ['name' => 'Harvard University', 'location' => 'Cambridge, MA'],
                ['name' => 'Stanford University', 'location' => 'Stanford, CA'],
                ['name' => 'Massachusetts Institute of Technology', 'location' => 'Cambridge, MA'],
            ],
            'Canada' => [
                ['name' => 'University of Toronto', 'location' => 'Toronto'],
                ['name' => 'University of British Columbia', 'location' => 'Vancouver'],
                ['name' => 'McGill University', 'location' => 'Montreal'],
            ],
            'Australia' => [
                ['name' => 'University of Melbourne', 'location' => 'Melbourne'],
                ['name' => 'University of Sydney', 'location' => 'Sydney'],
                ['name' => 'Australian National University', 'location' => 'Canberra'],
            ],
            'Germany' => [
                ['name' => 'Technical University of Munich', 'location' => 'Munich'],
                ['name' => 'Heidelberg University', 'location' => 'Heidelberg'],
                ['name' => 'LMU Munich', 'location' => 'Munich'],
            ],
            'India' => [
                ['name' => 'Indian Institute of Technology Delhi', 'location' => 'Delhi'],
                ['name' => 'University of Delhi', 'location' => 'Delhi'],
                ['name' => 'Indian Institute of Science', 'location' => 'Bangalore'],
            ],
            'Nigeria' => [
                ['name' => 'University of Lagos', 'location' => 'Lagos'],
                ['name' => 'Obafemi Awolowo University', 'location' => 'Ile-Ife'],
                ['name' => 'University of Nigeria Nsukka', 'location' => 'Nsukka'],
            ],
            'Japan' => [
                ['name' => 'University of Tokyo', 'location' => 'Tokyo'],
                ['name' => 'Kyoto University', 'location' => 'Kyoto'],
                ['name' => 'Osaka University', 'location' => 'Osaka'],
            ],
            'Brazil' => [
                ['name' => 'University of São Paulo', 'location' => 'São Paulo'],
                ['name' => 'Federal University of Rio de Janeiro', 'location' => 'Rio de Janeiro'],
                ['name' => 'Pontifical Catholic University of Rio Grande do Sul', 'location' => 'Porto Alegre'],
            ],
            'South Africa' => [
                ['name' => 'University of Cape Town', 'location' => 'Cape Town'],
                ['name' => 'University of the Witwatersrand', 'location' => 'Johannesburg'],
                ['name' => 'Stellenbosch University', 'location' => 'Stellenbosch'],
            ],
            'France' => [
                ['name' => 'Sorbonne University', 'location' => 'Paris'],
                ['name' => 'École Polytechnique', 'location' => 'Palaiseau'],
                ['name' => 'University of Lyon', 'location' => 'Lyon'],
            ],
            'China' => [
                ['name' => 'Tsinghua University', 'location' => 'Beijing'],
                ['name' => 'Peking University', 'location' => 'Beijing'],
                ['name' => 'Fudan University', 'location' => 'Shanghai'],
            ],
        ];

        $courses = [
            // Sample for a few universities; other universities will reuse these patterns
            'University of Oxford' => [
                ['title' => 'BSc Computer Science', 'level' => 'Undergraduate', 'duration' => '3 years', 'tuition_fee' => '£9,250', 'intake' => 'October'],
                ['title' => 'MSc Artificial Intelligence', 'level' => 'Postgraduate', 'duration' => '1 year', 'tuition_fee' => '£15,000', 'intake' => 'January'],
            ],
            'Harvard University' => [
                ['title' => 'BA Economics', 'level' => 'Undergraduate', 'duration' => '4 years', 'tuition_fee' => '$50,000', 'intake' => 'September'],
                ['title' => 'MBA', 'level' => 'Postgraduate', 'duration' => '2 years', 'tuition_fee' => '$70,000', 'intake' => 'August'],
            ],
            // generic fallback for any university not explicitly listed – two generic courses
        ];

        // Ensure every university has at least two generic courses if not defined above
        foreach ($universities as $countryUnis) {
            foreach ($countryUnis as $uni) {
                if (!isset($courses[$uni['name']])) {
                    $courses[$uni['name']] = [
                        ['title' => 'Bachelor of Arts', 'level' => 'Undergraduate', 'duration' => '3 years', 'tuition_fee' => 'Varies', 'intake' => 'September'],
                        ['title' => 'Master of Science', 'level' => 'Postgraduate', 'duration' => '2 years', 'tuition_fee' => 'Varies', 'intake' => 'January'],
                    ];
                }
            }
        }

        foreach ($countries as $c) {
            $country = Country::updateOrCreate(
                ['name' => $c['name']],
                [
                    'slug' => Str::slug($c['name']),
                    'country_code' => $c['code'],
                    'image' => "https://picsum.photos/seed/".Str::slug($c['name'])."/800/600",
                    'subtitle' => null,

                ]
            );

            foreach ($universities[$c['name']] ?? [] as $u) {
$university = University::updateOrCreate(
                    ['slug' => Str::slug($u['name'])],
                    [
                        'country_id' => $country->id,
                        'name' => $u['name'],
                        'location' => $u['location'],
                        'description' => null,
                        'cover_image' => "https://picsum.photos/seed/".Str::slug($u['name'])."/1200/600",
                        'logo' => "https://picsum.photos/seed/logo-".Str::slug($u['name'])."/200/200",
                        'features' => null,
                    ]
                );

                foreach ($courses[$u['name']] as $crs) {
                    Course::updateOrCreate(
                        ['slug' => Str::slug($u['name']).'-'.Str::slug($crs['title']), 'university_id' => $university->id],
                        [
                            'title' => $crs['title'],
                            'level' => $crs['level'],
                            'duration' => $crs['duration'],
                            'tuition_fee' => $crs['tuition_fee'],
                            'intake' => $crs['intake'],
                        ]
                    );
                }
            }
        }
    }
}
