<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = [
            [
                'country_code' => 'GB',
                'country_name' => 'United Kingdom',
                'cities' => 'London (HQ Oxford St.)',
                'status_text' => 'Open Now',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'country_code' => 'BD',
                'country_name' => 'Bangladesh',
                'cities' => 'Dhaka & Sylhet',
                'status_text' => 'Open Now',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'country_code' => 'US',
                'country_name' => 'United States',
                'cities' => 'New York & Texas',
                'status_text' => 'Open 9 AM EST',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'country_code' => 'CA',
                'country_name' => 'Canada',
                'cities' => 'Toronto & Vancouver',
                'status_text' => 'Open 9 AM EST',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'country_code' => 'AU',
                'country_name' => 'Australia',
                'cities' => 'Sydney & Melbourne',
                'status_text' => 'Open 9 AM AEST',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'country_code' => 'FI',
                'country_name' => 'Finland',
                'cities' => 'Helsinki',
                'status_text' => 'Open 9 AM EET',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'country_code' => 'AE',
                'country_name' => 'United Arab Emirates',
                'cities' => 'Dubai',
                'status_text' => 'Open 9 AM GST',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'country_code' => 'NG',
                'country_name' => 'Nigeria',
                'cities' => 'Lagos & Abuja',
                'status_text' => 'Open 9 AM WAT',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'country_code' => 'IN',
                'country_name' => 'India',
                'cities' => 'New Delhi & Mumbai',
                'status_text' => 'Open 9:30 AM IST',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'country_code' => 'PK',
                'country_name' => 'Pakistan',
                'cities' => 'Lahore & Islamabad',
                'status_text' => 'Open 9 AM PKT',
                'is_active' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(
                ['country_code' => $branch['country_code'], 'country_name' => $branch['country_name']],
                $branch
            );
        }
    }
}
