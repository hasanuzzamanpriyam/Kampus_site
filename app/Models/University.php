<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class University extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id',
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
     * Get the country this university belongs to.
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Get the courses offered by this university.
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
