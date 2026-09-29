<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PartnerApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'contact_person',
        'email',
        'phone',
        'country',
        'years_in_business',
        'message',
        'status',
    ];

    /**
     * Associated user account for the approved partner.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Uploaded partner agency documents.
     */
    public function documents(): HasMany
    {
        return $this->hasMany(PartnerDocument::class, 'partner_application_id')->orderBy('id', 'desc');
    }
}
