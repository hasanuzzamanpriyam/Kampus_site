<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PartnerDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'partner_application_id',
        'title',
        'document_type',
        'document_number',
        'issuing_organization',
        'issue_date',
        'expiry_date',
        'file_path',
        'file_name',
        'file_type',
        'file_size',
        'description',
        'status',
        'counselor_remarks',
        'verified_at',
        'verified_by',
    ];

    protected $casts = [
        'issue_date' => 'date:Y-m-d',
        'expiry_date' => 'date:Y-m-d',
        'verified_at' => 'datetime',
    ];

    /**
     * The partner user who uploaded this document.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Associated partner application if applicable.
     */
    public function partnerApplication(): BelongsTo
    {
        return $this->belongsTo(PartnerApplication::class, 'partner_application_id');
    }

    /**
     * Staff member or admin who audited and verified this document.
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Check if the document has been approved and verified.
     */
    public function isVerified(): bool
    {
        return $this->status === 'verified';
    }

    /**
     * Check if the document requires action / was rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if the document is pending review.
     */
    public function isPending(): bool
    {
        return $this->status === 'submitted';
    }
}
