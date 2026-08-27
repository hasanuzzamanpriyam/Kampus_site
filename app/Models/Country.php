<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'country_code',
        'subtitle',
        'image',
    ];

    /**
     * Get the universities located in this country.
     */
    public function universities(): HasMany
    {
        return $this->hasMany(University::class);
    }
}
