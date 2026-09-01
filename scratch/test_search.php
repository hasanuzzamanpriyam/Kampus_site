<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\University;
use App\Models\Course;

echo "Testing Scout University Search for 'oxford'...\n";
$unis = University::search('oxford')->query(fn($q) => $q->withCount('courses'))->get();
echo "Found " . $unis->count() . " universities.\n";
foreach ($unis as $u) {
    echo " - {$u->name} (Courses count: {$u->courses_count})\n";
}

echo "\nTesting Scout Course Search for 'computer'...\n";
$courses = Course::search('computer')->query(fn($q) => $q->with('university'))->get();
echo "Found " . $courses->count() . " courses.\n";
foreach ($courses as $c) {
    echo " - {$c->title} @ {$c->university?->name}\n";
}
