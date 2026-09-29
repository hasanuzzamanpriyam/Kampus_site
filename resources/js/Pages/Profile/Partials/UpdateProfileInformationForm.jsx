import React, { useRef, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { User, Mail, Save, CheckCircle2, AlertCircle, Camera, Trash2, Sparkles, RefreshCw } from 'lucide-react';
import UserAvatar from '@/Components/UserAvatar';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, post, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
            avatar: null,
            remove_avatar: false,
            _method: 'patch',
        });

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData((prev) => ({
                ...prev,
                avatar: file,
                remove_avatar: false,
            }));
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveAvatar = () => {
        setData((prev) => ({
            ...prev,
            avatar: null,
            remove_avatar: true,
        }));
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // Always post with _method: 'patch' and forceFormData to ensure files or removal are sent
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewUrl(null);
            },
        });
    };

    const hasCustomAvatar = previewUrl || (!data.remove_avatar && user.avatar);

    return (
        <section className={className}>
            <header className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 border border-blue-200/60 dark:border-blue-800/60">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Profile & Avatar Settings
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Customize your profile image, personal name, and contact email address.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">

                {/* 1. AVATAR UPLOAD SECTION */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                            Profile Avatar / Image
                        </label>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                            <Sparkles className="w-3 h-3" />
                            <span>Default: First Letters of Name</span>
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        {/* Avatar Display */}
                        <div className="relative group">
                            <UserAvatar
                                user={user}
                                name={data.name || user.name}
                                avatar={previewUrl || (data.remove_avatar ? null : user.avatar)}
                                size="2xl"
                                className="ring-4 ring-white dark:ring-slate-900 shadow-md transition-transform group-hover:scale-105"
                            />
                            {previewUrl && (
                                <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase shadow-xs">
                                    New
                                </span>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex-1 space-y-2.5 text-center sm:text-left">
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {hasCustomAvatar
                                    ? 'You have a custom profile image active. You can replace it anytime or revert to your default initials avatar.'
                                    : 'No custom photo uploaded. The system is displaying your default avatar using the first letters of your name.'}
                            </p>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    id="avatar-input"
                                />

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
                                >
                                    <Camera className="w-3.5 h-3.5" />
                                    <span>{hasCustomAvatar ? 'Change Photo' : 'Upload Avatar'}</span>
                                </button>

                                {hasCustomAvatar && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveAvatar}
                                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Use Default Initials</span>
                                    </button>
                                )}
                            </div>

                            <p className="text-[11px] text-slate-400">
                                Supports JPG, PNG, WEBP up to 5MB.
                            </p>
                            {errors.avatar && (
                                <p className="text-xs text-rose-500 font-medium">{errors.avatar}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. FULL NAME */}
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

                {/* 3. EMAIL ADDRESS */}
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
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {processing ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Saving Profile...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>

                    {recentlySuccessful && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Saved successfully!</span>
                        </div>
                    )}
                </div>
            </form>
        </section>
    );
}
