<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\PublicDestinationController;
use App\Http\Controllers\PublicUniversityController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\UniversityController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;

// Public Dynamic Home Route (Using original HomeController)
Route::get('/', HomeController::class)->name('home');

Route::get('/about', function () {
    return Inertia::render('About'); 
});

Route::get('/services', function () {
    return Inertia::render('Services'); 
});

Route::get('/universities', function () {
    return Inertia::render('Universities'); 
});

Route::get('/destinations/{slug}', [PublicDestinationController::class, 'show'])->name('destinations.show');
Route::get('/universities/{slug}', [PublicUniversityController::class, 'show'])->name('universities.show');

Route::get('/blog', function () {
    return Inertia::render('Blog'); 
})->name('blog.index');

Route::get('/blog/{slug}', function ($slug) {
    return Inertia::render('BlogPostDetails', [
        'slug' => $slug
    ]);
})->name('blog.show');

Route::get('/contact', function () {
    return Inertia::render('Contact'); 
});

Route::get('/courses', function () {
    return Inertia::render('Courses'); 
});

Route::get('/partner', function () {
    return Inertia::render('PartnerWithUs'); 
});

Route::get('/partner-with-us', function () {
    return Inertia::render('PartnerWithUs'); 
});

Route::get('/scholarships', function () {
    return Inertia::render('Scholarships'); 
});

Route::get('/visa-guide', function () {
    return Inertia::render('VisaGuide'); 
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy'); 
});

Route::get('/terms-of-service', function () {
    return Inertia::render('TermsOfService'); 
});

Route::get('/terms', function () {
    return Inertia::render('TermsOfService'); 
});

Route::get('/cookie-preferences', function () {
    return Inertia::render('CookiePreferences'); 
});

Route::get('/accreditation', function () {
    return Inertia::render('Accreditation'); 
});

// Public Partner Application, Contact & Call Booking Submission Routes
Route::post('/partner/apply', [PartnerController::class, 'store'])->name('partner.apply');
Route::post('/contact/submit', [InquiryController::class, 'store'])->name('contact.submit');
Route::post('/book-call', [FrontendController::class, 'bookCall'])->name('book-call.submit');

// SECURED ADMIN CMS ROUTES (Protected by 'auth' middleware)
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // Global Settings Routes
    Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('admin.settings.update');

    // Pages & SEO Routes
    Route::get('/pages', [PageController::class, 'index'])->name('admin.pages.index');
    Route::get('/pages/create', [PageController::class, 'create'])->name('admin.pages.create');
    Route::post('/pages', [PageController::class, 'store'])->name('admin.pages.store');
    Route::post('/pages/upload-image', [PageController::class, 'uploadImage'])->name('admin.pages.upload-image');
    Route::get('/pages/{id}/edit', [PageController::class, 'edit'])->name('admin.pages.edit');
    Route::put('/pages/{id}', [PageController::class, 'update'])->name('admin.pages.update');
    Route::delete('/pages/{id}', [PageController::class, 'destroy'])->name('admin.pages.destroy');

    // Countries CRUD Routes
    Route::resource('countries', CountryController::class)->names([
        'index' => 'admin.countries.index',
        'create' => 'admin.countries.create',
        'store' => 'admin.countries.store',
        'edit' => 'admin.countries.edit',
        'update' => 'admin.countries.update',
        'destroy' => 'admin.countries.destroy',
    ]);

    // Universities CRUD Routes
    Route::resource('universities', UniversityController::class)->names([
        'index' => 'admin.universities.index',
        'create' => 'admin.universities.create',
        'store' => 'admin.universities.store',
        'edit' => 'admin.universities.edit',
        'update' => 'admin.universities.update',
        'destroy' => 'admin.universities.destroy',
    ]);

    // Courses CRUD Routes
    Route::resource('courses', CourseController::class)->names([
        'index' => 'admin.courses.index',
        'create' => 'admin.courses.create',
        'store' => 'admin.courses.store',
        'edit' => 'admin.courses.edit',
        'update' => 'admin.courses.update',
        'destroy' => 'admin.courses.destroy',
    ]);

    // Blog Posts CRUD Routes
    Route::resource('blog', BlogController::class)->names([
        'index' => 'admin.blog.index',
        'create' => 'admin.blog.create',
        'store' => 'admin.blog.store',
        'edit' => 'admin.blog.edit',
        'update' => 'admin.blog.update',
        'destroy' => 'admin.blog.destroy',
    ]);
    Route::patch('/blogs/{blog}/toggle-featured', [BlogController::class, 'toggleFeatured'])->name('admin.blogs.toggle-featured');

    // FAQs CRUD Routes
    Route::resource('faqs', FaqController::class)->names([
        'index' => 'admin.faqs.index',
        'create' => 'admin.faqs.create',
        'store' => 'admin.faqs.store',
        'edit' => 'admin.faqs.edit',
        'update' => 'admin.faqs.update',
        'destroy' => 'admin.faqs.destroy',
    ]);
    Route::patch('/faqs/{faq}/toggle-status', [FaqController::class, 'toggleStatus'])->name('admin.faqs.toggle-status');

    // Partner Applications Routes (admin management)
    Route::resource('partners', PartnerController::class)->only(['index', 'update', 'destroy'])->names([
        'index' => 'admin.partners.index',
        'update' => 'admin.partners.update',
        'destroy' => 'admin.partners.destroy',
    ]);

    // Inquiries & Contact Messages Routes (admin management)
    Route::resource('inquiries', InquiryController::class)->only(['index', 'update', 'destroy'])->names([
        'index' => 'admin.inquiries.index',
        'update' => 'admin.inquiries.update',
        'destroy' => 'admin.inquiries.destroy',
    ]);

    // Roles & Permissions Management Routes
    Route::resource('roles', RoleController::class)->except(['create', 'show', 'edit'])->names([
        'index' => 'admin.roles.index',
        'store' => 'admin.roles.store',
        'update' => 'admin.roles.update',
        'destroy' => 'admin.roles.destroy',
    ]);

    // User Management Routes
    Route::resource('users', UserController::class)->only(['index', 'update', 'destroy'])->names([
        'index' => 'admin.users.index',
        'update' => 'admin.users.update',
        'destroy' => 'admin.users.destroy',
    ]);
});

// Profile Management Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Include Breeze Auth Routes (login, register, logout, password.request)
require __DIR__.'/auth.php';

// Dynamic Catch-All Public Page Route (Placed at the VERY END)
Route::get('/{slug}', [PublicPageController::class, 'show'])->name('pages.show');
