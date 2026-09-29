import React from 'react';
import AdminLayout from '@/Pages/Admin/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { UserCircle, Shield, KeyRound, AlertTriangle, ArrowLeft, GraduationCap, Handshake } from 'lucide-react';
import UserAvatar from '@/Components/UserAvatar';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isStudent = user?.is_student;
    const isPartner = user?.is_partner;

    const content = (
        <div className="max-w-5xl space-y-6">
            {/* 1. HEADER BANNER */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <UserAvatar user={user} size="xl" className="shrink-0" />
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                            {isStudent ? <GraduationCap className="w-3.5 h-3.5" /> : (isPartner ? <Handshake className="w-3.5 h-3.5" /> : <UserCircle className="w-3.5 h-3.5" />)}
                            <span>{isStudent ? 'STUDENT PROFILE & AVATAR' : (isPartner ? 'PARTNER ACCOUNT SETTINGS' : 'ADMIN PROFILE & SECURITY')}</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            {isStudent ? 'My Profile & Avatar' : (isPartner ? 'Partner Profile & Security' : 'Admin Profile & Security')}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {isStudent
                                ? 'Upload your photo, personalize your name, and keep your email and login security up to date.'
                                : 'Manage your personal profile details, upload your avatar image, change security passwords, and configure account access.'}
                        </p>
                    </div>
                </div>

                {isStudent && (
                    <Link
                        href="/student/dashboard"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </Link>
                )}
            </div>

            {/* 2. PROFILE INFORMATION CARD */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                />
            </div>

            {/* 3. UPDATE PASSWORD CARD */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <UpdatePasswordForm />
            </div>

            {/* 4. DANGER ZONE: DELETE ACCOUNT CARD */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-200/80 dark:border-rose-900/40 shadow-xs">
                <DeleteUserForm />
            </div>
        </div>
    );

    if (isStudent) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 flex justify-center text-slate-900 dark:text-slate-100">
                <Head title="Profile & Avatar — Student Portal" />
                <div className="w-full max-w-5xl">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <AdminLayout title="Profile & Account Settings">
            <Head title="Profile Settings — RMS CMS" />
            {content}
        </AdminLayout>
    );
}
