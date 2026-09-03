<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Page;

$affected = Page::whereIn('slug', ['privacy-policy', 'terms-of-service', 'cookie-preferences', 'accreditation'])
    ->update(['show_in_footer' => false]);

echo "Updated show_in_footer for {$affected} pages.\n";

$pages = Page::whereIn('slug', ['privacy-policy', 'terms-of-service', 'cookie-preferences', 'accreditation'])
    ->get(['name', 'slug', 'show_in_footer']);

foreach ($pages as $p) {
    echo "{$p->name} ({$p->slug}): show_in_footer = " . ($p->show_in_footer ? 'TRUE' : 'FALSE') . "\n";
}
