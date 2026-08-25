<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'university_id',
        'title',
        'slug',
        'level',
        'duration',
        'tuition_fee',
        'intake',
    ];

    /**
     * Get the university that offers this course.
     */
    public function university(): BelongsTo
    {
        return $this->belongsTo(University::class);
    }
}
