import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { User, Mail, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 border border-blue-200/60 dark:border-blue-800/60">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Profile Information
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Update your administrator account name and contact email address.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5 max-w-xl">
                <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            type="text"
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                        />
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>
                    {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>
                    {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.email}</p>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                        <div>
                            <span>Your email address is unverified. </span>
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-bold underline hover:text-amber-950 dark:hover:text-amber-200"
                            >
                                Click here to re-send the verification email.
                            </Link>
                            {status === 'verification-link-sent' && (
                                <p className="mt-1 text-emerald-600 dark:text-emerald-400 font-bold">
                                    A new verification link has been sent to your email address.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Saving...' : 'Save Changes'}</span>
                    </button>

                    {recentlySuccessful && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Saved successfully!</span>
                        </div>
                    )}
                </div>
            </form>
        </section>
    );
}
