import React from 'react';
import {
    Sparkles,
    CheckCircle2,
    GraduationCap,
    ShieldCheck,
    Award
} from 'lucide-react';

export default function ServicesHero({ content = {} }) {
    const heading = content?.hero_heading || content?.hero?.title;
    const subtitle = content?.hero_subtitle || content?.hero?.subtitle;

    return (
        <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors text-center">
            
            {/* Ambient Top Glow Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none overflow-hidden">
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[140px]" />
                <div className="absolute top-[100px] right-[15%] w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
            </div>

            {/* Subtle Dot Pattern Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">

                {/* 2. Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                    {heading ? (
                        heading
                    ) : (
                        <>
                            End-to-end support, <br className="hidden sm:inline" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                                every step of the way
                            </span>
                        </>
                    )}
                </h1>

                {/* 3. Centered Paragraph */}
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
                    {subtitle || 'From choosing the right university to arriving safely at your destination, we provide expert, personalised assistance. Our British Council certified experts ensure your journey from dreams to degrees is seamless and completely free.'}
                </p>

                {/* 4. Feature Trust Micro-Badges */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>100% Free Guidance</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span>500+ Partner Universities</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <span>British Council Certified</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
