<?php

namespace App\Mail;

use App\Models\PartnerApplication;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PartnerApprovedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     *
     * @var int
     */
    public $backoff = 60;

    public PartnerApplication $application;
    public User $user;
    public ?string $plainPassword;
    public bool $isNewAccount;

    /**
     * Create a new message instance.
     */
    public function __construct(
        PartnerApplication $application,
        User $user,
        ?string $plainPassword = null,
        bool $isNewAccount = true
    ) {
        $this->application = $application;
        $this->user = $user;
        $this->plainPassword = $plainPassword;
        $this->isNewAccount = $isNewAccount;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Congratulations! Your Kampus Partnership Application Has Been Approved',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.partner-approved',
            with: [
                'companyName' => $this->application->company_name,
                'contactPerson' => $this->application->contact_person,
                'email' => $this->user->email,
                'plainPassword' => $this->plainPassword,
                'isNewAccount' => $this->isNewAccount,
                'loginUrl' => route('login'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
