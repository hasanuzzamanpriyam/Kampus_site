<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home'); 
});

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