<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

#[Fillable(['name', 'email', 'avatar', 'password', 'password_set_at'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = ['initials'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password_set_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Student conversations.
     */
    public function studentConversations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(StudentConversation::class, 'user_id');
    }

    /**
     * Student personal & academic profile.
     */
    public function studentProfile(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(StudentProfile::class, 'user_id');
    }

    /**
     * Student credentials and certificates.
     */
    public function certificates(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(StudentCertificate::class, 'user_id')->orderBy('issue_date', 'desc');
    }

    /**
     * Student extracurricular awards and achievements.
     */
    public function achievements(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(StudentAchievement::class, 'user_id')->orderBy('achievement_date', 'desc');
    }

    /**
     * Student admission applications.
     */
    public function studentApplications(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(StudentApplication::class, 'user_id');
    }

    /**
     * Partner compliance and agency verification documents.
     */
    public function partnerDocuments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PartnerDocument::class, 'user_id')->orderBy('id', 'desc');
    }

    /**
     * Associated partner application.
     */
    public function partnerApplication(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(PartnerApplication::class, 'user_id');
    }

    /**
     * Generate the first letters / initials from the user's name.
     */
    public function getInitialsAttribute(): string
    {
        $name = trim($this->name ?? '');
        if (empty($name)) {
            return 'U';
        }

        $parts = preg_split('/\s+/', $name);
        if (count($parts) === 1) {
            return mb_strtoupper(mb_substr($parts[0], 0, min(2, mb_strlen($parts[0]))));
        }

        return mb_strtoupper(mb_substr($parts[0], 0, 1) . mb_substr(end($parts), 0, 1));
    }

    /**
     * Determine if the user is an administrator or staff member.
     */
    public function isAdmin(): bool
    {
        return $this->id === 1 || $this->hasAnyRole(['Super Admin', 'Admin', 'Editor']);
    }

    /**
     * Determine if the user is an educational partner.
     */
    public function isPartner(): bool
    {
        return $this->hasRole('Partner');
    }

    /**
     * Determine if the user is a student (either explicitly assigned or non-staff default).
     */
    public function isStudent(): bool
    {
        if ($this->isAdmin() || $this->isPartner()) {
            return false;
        }

        return true;
    }
}
