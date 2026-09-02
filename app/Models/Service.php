<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'title',
        'slug',
        'badge',
        'icon',
        'description',
        'bullets',
        'image',
        'gradient',
        'glow_color',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'bullets' => 'array',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
    ];
}
