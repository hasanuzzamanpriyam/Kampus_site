import React, { useState } from 'react';
import {
    Sparkles,
    ArrowRight,
    PhoneCall,
    Award,
    Users,
    Star,
    CheckCircle2,
    Search,
    GraduationCap,
    Send,
    X,
    Globe,
    Check
} from 'lucide-react';

export default function HeroSection({ onOpenAiSearch, onOpenBookCall }) {
    const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

    const stats = [
        {
            value: '24',
            unit: 'Years',
            label: 'of experience',
            icon: Award,
            color: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            value: '10,000+',
            unit: 'Students',
            label: 'placed globally',
            icon: Users,
            color: 'from-indigo-500 to-purple-600',
            textColor: 'text-indigo-600 dark:text-indigo-400'
        },
        {
            value: '4.8/5',
            unit: 'Rating',
            label: 'Student rating',
            icon: Star,
            color: 'from-amber-400 to-orange-500',
            textColor: 'text-amber-500 dark:text-amber-400'
        },
        {
            value: '100%',
            unit: 'Free',
            label: 'Free services',
            icon: CheckCircle2,
            color: 'from-emerald-500 to-teal-600',
            textColor: 'text-emerald-600 dark:text-emerald-400'
        },
    ];

    const countries = [
        { name: 'United Kingdom', flag: '🇬🇧', unis: '150+ Partner Universities' },
        { name: 'United States', flag: '🇺🇸', unis: '200+ STEM & Ivy Pathways' },
        { name: 'Finland', flag: '🇫🇮', unis: 'Pathway to Tuition Grants' },
        { name: 'Dubai (UAE)', flag: '🇦🇪', unis: 'Fast 100% Visa Guarantee' },
    ];

    return (
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-slate-50 dark:bg-slate-950 transition-colors">
            {/* Ambient Background Blur Patterns */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden">
                <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-[100px] right-[-100px] w-[450px] h-[450px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[140px]" />
                <div className="absolute top-[250px] left-[30%] w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px]" />
            </div>

            {/* Subtle Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: HERO CONTENT */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                        
                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 text-xs font-semibold tracking-wide border border-blue-200/80 dark:border-blue-700/60 shadow-xs backdrop-blur-md">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            <span>ICEF & British Council Certified Guidance</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                            Building global futures, <br className="hidden sm:inline" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                                from dreams to degrees.
                            </span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                            Expert, unbiased guidance to top universities across the <strong className="font-semibold text-slate-900 dark:text-white">UK</strong>, <strong className="font-semibold text-slate-900 dark:text-white">USA</strong>, <strong className="font-semibold text-slate-900 dark:text-white">Finland</strong> and <strong className="font-semibold text-slate-900 dark:text-white">Dubai</strong>, completely free.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                            <button
                                onClick={() => setAssessmentModalOpen(true)}
                                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>Get Free Assessment</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={onOpenBookCall}
                                className="px-7 py-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold text-base border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 shadow-xs hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                            >
                                <PhoneCall className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span>Book a Call</span>
                            </button>
                        </div>

                        {/* Trust Micro-bullets */}
                        <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-emerald-500" />
                                <span>Zero Service Charge</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-emerald-500" />
                                <span>Fast 48-Hour Offer Letter</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-emerald-500" />
                                <span>Visa & Scholarship Support</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: FLOATING INTERACTIVE GLASS CARD */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
                            
                            {/* Card Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-base">Top Global Destinations</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Direct admission & visa support</p>
                                    </div>
                                </div>
                                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-300/40 dark:border-emerald-800/60">
                                    98% Visa Pass
                                </span>
                            </div>

                            {/* Destination Badges */}
                            <div className="space-y-2.5">
                                {countries.map((c, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{c.flag}</span>
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {c.name}
                                                </div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">{c.unis}</div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                ))}
                            </div>

                            {/* Student Rating Footer */}
                            <div className="pt-2 flex items-center justify-between bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900 p-4 rounded-2xl text-white">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <div className="w-7 h-7 rounded-full bg-blue-400 border-2 border-slate-900 flex items-center justify-center font-bold text-[10px]">A</div>
                                        <div className="w-7 h-7 rounded-full bg-indigo-400 border-2 border-slate-900 flex items-center justify-center font-bold text-[10px]">S</div>
                                        <div className="w-7 h-7 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center font-bold text-[10px]">R</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                                            ))}
                                        </div>
                                        <div className="text-[11px] text-slate-300 font-medium">Over 10,000+ Happy Students</div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-blue-300 bg-white/10 px-2.5 py-1 rounded-lg">
                                    Trusted
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* STATS BAR SECTION */}
                <div className="mt-14 lg:mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 ${stat.textColor} group-hover:scale-110 transition-transform`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            {stat.unit}
                                        </span>
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* AI MATCHER BANNER SECTION */}
                <div className="mt-8">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-5 sm:p-6 shadow-xl border border-indigo-500/30">
                        {/* Glow decorative graphics */}
                        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-56 h-56 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start sm:items-center gap-3.5">
                                <div className="p-3 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shrink-0 mt-0.5 sm:mt-0">
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                                            New
                                        </span>
                                        <span className="font-bold text-base text-white">
                                            AI Course Matcher
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-normal">
                                        Not sure where to study? Get matched in 60 seconds.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onOpenAiSearch}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
                            >
                                <span>Start matching</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* FREE ASSESSMENT MODAL */}
            {assessmentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setAssessmentModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Get Free Assessment</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Check your eligibility for UK, USA, Finland & Dubai</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert('Free assessment request submitted! Our senior counselor will contact you shortly.'); setAssessmentModalOpen(false); }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="rahul@example.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone (WhatsApp)</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+880 1700 000 000"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Study Country</label>
                                <select className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option value="UK">United Kingdom</option>
                                    <option value="USA">United States</option>
                                    <option value="Finland">Finland</option>
                                    <option value="Dubai">Dubai (UAE)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-transform"
                            >
                                Submit Free Assessment Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
