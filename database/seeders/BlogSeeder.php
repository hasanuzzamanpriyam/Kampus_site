<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'How to Choose the Right University Abroad',
                'category' => 'Guides',
                'excerpt' => 'A quick checklist for students looking to study overseas.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
            ],
            [
                'title' => 'Top 5 Scholarship Opportunities in 2025',
                'category' => 'Scholarships',
                'excerpt' => 'Explore the most generous scholarships for international students.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.',
            ],
            [
                'title' => 'Living Costs in Major Study Destinations',
                'category' => 'Finance',
                'excerpt' => 'Breakdown of monthly expenses for popular student cities.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.',
            ],
            [
                'title' => 'Visa Application Tips for International Students',
                'category' => 'Immigration',
                'excerpt' => 'Essential steps to secure your student visa without delays.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.',
            ],
            [
                'title' => 'Top 10 Student Cities Around the World',
                'category' => 'Lifestyle',
                'excerpt' => 'A curated list of cities offering vibrant student life and opportunities.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.',
            ],
        ];

        foreach ($posts as $post) {
            Blog::updateOrCreate(
                ['title' => $post['title']],
                [
                    'slug' => Str::slug($post['title']),
                    'category' => $post['category'],
                    'excerpt' => $post['excerpt'],
                    'content' => $post['content'],
                    'image' => "https://picsum.photos/seed/".Str::slug($post['title'])."/1200/600",
                    'is_published' => true,
                    'is_featured' => true,
                ]
            );
        }
    }
}
