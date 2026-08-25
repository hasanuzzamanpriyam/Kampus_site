<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class University extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'location',
        'description',
        'cover_image',
        'logo',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    /**
     * Get the courses offered by this university.
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
