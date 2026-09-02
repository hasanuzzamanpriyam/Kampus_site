import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    ArrowRight,
    AlertCircle,
    KeyRound
} from 'lucide-react';

export default function PartnerSetupAccount({ initialEmail = '', isEmailAvailable = true, partnerName = '' }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: initialEmail || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('partner.setup.store'));
    };

    const isMinLength = data.password.length >= 8;
    const isMatching = data.password.length > 0 && data.password === data.password_confirmation;

    return (
        <GuestLayout>
            <Head title="Set Password — Partner Portal" />

            {/* HEADER TYPOGRAPHY */}
            <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Partner Account Setup</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Set Your Password
                </h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {partnerName ? `Welcome, ${partnerName}! ` : ''}
                    Please configure your permanent password to complete your Partner Portal activation.
                </p>
            </div>

            {/* NOTICE IF EMAIL IS MISSING */}
            {!isEmailAvailable && (
                <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <div>
                        <span className="font-bold block">Email address required</span>
                        <span>Your partner application did not have a registered email. Please enter your primary business email address below.</span>
                    </div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">

                {/* EMAIL ADDRESS INPUT */}
                <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Business Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Mail className="w-4 h-4" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            required
                            placeholder="partner@youragency.com"
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs font-semibold text-rose-400 pt-0.5">{errors.email}</p>
                    )}
                </div>

                {/* NEW PASSWORD INPUT */}
                <div className="space-y-1.5">
                    <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Create Permanent Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Lock className="w-4 h-4" />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            required
                            placeholder="Minimum 8 characters"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs font-semibold text-rose-400 pt-0.5">{errors.password}</p>
                    )}
                </div>

                {/* CONFIRM PASSWORD INPUT */}
                <div className="space-y-1.5">
                    <label htmlFor="password_confirmation" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Confirm Permanent Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <KeyRound className="w-4 h-4" />
                        </div>
                        <input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            required
                            placeholder="Re-enter your password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password_confirmation && (
                        <p className="text-xs font-semibold text-rose-400 pt-0.5">{errors.password_confirmation}</p>
                    )}
                </div>

                {/* REAL-TIME VALIDATION INDICATORS */}
                <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${isMinLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isMinLength ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span>At least 8 characters long</span>
                    </div>
                    <div className={`flex items-center gap-2 ${isMatching ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isMatching ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span>Passwords match</span>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing || !isMinLength || !isMatching}
                        className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>{processing ? 'Saving Password...' : 'Save Password & Enter Portal'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* SIGN OUT / SWITCH ACCOUNT */}
                <div className="pt-3 text-center border-t border-slate-800/80">
                    <button
                        type="button"
                        onClick={() => router.post(route('logout'))}
                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Sign out and continue later
                    </button>
                </div>

            </form>
        </GuestLayout>
    );
}
