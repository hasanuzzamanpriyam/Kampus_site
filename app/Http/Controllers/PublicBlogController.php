<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicBlogController extends Controller
{
    /**
     * Display a listing of published blogs with pagination.
     */
    public function index(Request $request): Response
    {
        $query = Blog::where('is_published', true);

        // Optional search filter
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Optional category filter
        if ($request->filled('category') && $request->input('category') !== 'All') {
            $query->where('category', $request->input('category'));
        }

        $blogs = $query->latest()->paginate(9)->withQueryString();

        $categories = Blog::where('is_published', true)
            ->distinct()
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->pluck('category')
            ->values();

        return Inertia::render('Public/Blogs/Index', [
            'blogs' => $blogs,
            'categories' => $categories,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', 'All'),
            ],
        ]);
    }

    /**
     * Display the specified blog post by slug.
     */
    public function show(string $slug): Response
    {
        $blog = Blog::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Fetch 3 related/recent published blogs for the bottom section
        $relatedBlogs = Blog::where('id', '!=', $blog->id)
            ->where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Public/Blogs/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
        ]);
    }
}
