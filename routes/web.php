<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\UniversityController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\CourseController;

// Public Dynamic Home Route
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

Route::get('/universities/{slug}', function ($slug) {
    return Inertia::render('UniversityDetails', [
        'slug' => $slug
    ]);
});

Route::get('/blog', function () {
    return Inertia::render('Blog'); 
});

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

// Admin CMS Routes
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    });

    // Global Settings Routes
    Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('admin.settings.update');

    // Pages & SEO Routes
    Route::get('/pages', [PageController::class, 'index'])->name('admin.pages.index');
    Route::get('/pages/create', [PageController::class, 'create'])->name('admin.pages.create');
    Route::post('/pages', [PageController::class, 'store'])->name('admin.pages.store');
    Route::get('/pages/{id}/edit', [PageController::class, 'edit'])->name('admin.pages.edit');
    Route::put('/pages/{id}', [PageController::class, 'update'])->name('admin.pages.update');
    Route::delete('/pages/{id}', [PageController::class, 'destroy'])->name('admin.pages.destroy');

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
});

// Dynamic Catch-All Public Page Route (Placed at the VERY END)
Route::get('/{slug}', [PublicPageController::class, 'show'])->name('pages.show');