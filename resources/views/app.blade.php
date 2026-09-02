<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @php
            $settings = \App\Models\Setting::pluck('value', 'key')->toArray();
            $favicon = isset($settings['site_favicon']) && !empty($settings['site_favicon']) 
                ? asset('storage/' . $settings['site_favicon']) 
                : asset('favicon.ico');
            $siteName = $settings['site_name'] ?? config('app.name', 'Kampus EduConsult');
        @endphp
        <link rel="icon" type="image/x-icon" href="{{ $favicon }}">
        <title inertia>{{ $siteName }}</title>

        <!-- Inline Theme Script (Prevents Dark Mode Flash) -->
        <script>
            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        </script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        @inertia
    </body>
</html>
