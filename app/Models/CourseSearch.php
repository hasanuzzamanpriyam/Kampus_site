<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseSearch extends Model
{
    use HasFactory;

    protected $fillable = [
        'keyword',
        'search_count',
    ];
}
