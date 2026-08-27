import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
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

export default function HeroSection({ onOpenAiSearch, onOpenBookCall, content = {}, countries = [] }) {
    const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

    const heading = content?.hero_heading || 'Building global futures, from dreams to degrees.';
    const subtitle = content?.hero_subtitle || 'Expert, unbiased guidance to top universities across the UK, USA, Finland and Dubai, completely free.';
    const badgeText = content?.badge_text || 'ICEF & British Council Certified Guidance';

    const stats = [
        {
            value: content?.stat_universities || '500+',
            unit: 'Partners',
            label: 'global universities',
            icon: Award,
            color: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            value: content?.stat_acceptance || '98%',
            unit: 'Visa Success',
            label: 'approval rate',
            icon: Users,
            color: 'from-indigo-500 to-purple-600',
            textColor: 'text-indigo-600 dark:text-indigo-400'
        },
        {
            value: content?.stat_scholarships || '$5M+',
            unit: 'Funding',
            label: 'scholarships awarded',
            icon: Star,
            color: 'from-amber-400 to-orange-500',
            textColor: 'text-amber-500 dark:text-amber-400'
        },
        {
            value: '100%',
            unit: 'Free',
            label: 'counseling services',
            icon: CheckCircle2,
            color: 'from-emerald-500 to-teal-600',
            textColor: 'text-emerald-600 dark:text-emerald-400'
        }
    ];

    const defaultCountries = [
        {
            name: 'United Kingdom',
            slug: 'united-kingdom',
            country_code: 'GB',
            subtitle: '150+ Partner Universities',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        },
        {
            name: 'United States',
            slug: 'united-states',
            country_code: 'US',
            subtitle: '200+ STEM & Ivy Pathways',
            image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
        },
        {
            name: 'Finland',
            slug: 'finland',
            country_code: 'FI',
            subtitle: 'Pathway to Tuition Grants',
            image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80',
        },
        {
            name: 'Dubai (UAE)',
            slug: 'united-arab-emirates',
            country_code: 'AE',
            subtitle: 'Fast 100% Visa Guarantee',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        },
    ];

    const heroCountries = countries && countries.length >= 4 ? countries.slice(0, 4) : defaultCountries;

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
                            <span>{badgeText}</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                            {heading}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                            {subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                            <button
                                onClick={() => setAssessmentModalOpen(true)}
                                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>Get Free Assessment</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={onOpenBookCall}
                                className="px-7 py-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold text-base border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 shadow-xs hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer"
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
                                <span>100% Visa File Review</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: DYNAMIC ANIMATED COUNTRY CARDS WITH BACKGROUND IMAGES */}
                    <div className="lg:col-span-5 relative">
                        <div className="grid grid-cols-2 gap-4">
                            {heroCountries.map((c, idx) => (
                                <Link
                                    key={c.id || idx}
                                    href={`/destinations/${c.slug || 'united-kingdom'}`}
                                    className="group relative h-44 sm:h-48 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between p-5 text-left"
                                >
                                    {/* Country Background Image */}
                                    <div className="absolute inset-0 bg-slate-950">
                                        <img
                                            src={c.image || 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'}
                                            alt={c.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-75"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80';
                                            }}
                                        />
                                    </div>

                                    {/* Dark Gradient Overlay for Crisp Text Legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40 group-hover:via-slate-950/65 transition-all" />

                                    {/* Top Row: Country Code Badge & Hover Arrow */}
                                    <div className="relative z-10 flex items-center justify-between">
                                        <span className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-black font-mono border border-white/30 shadow-xs">
                                            {c.country_code || (c.name ? c.name.substring(0, 2).toUpperCase() : 'GB')}
                                        </span>
                                        <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-blue-600 transition-all">
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Bottom Row: Name & Subtitle */}
                                    <div className="relative z-10 space-y-1">
                                        <h3 className="font-extrabold text-white text-base sm:text-lg group-hover:text-blue-300 transition-colors leading-tight">
                                            {c.name}
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-slate-300 group-hover:text-white font-medium line-clamp-1 transition-colors">
                                            {c.subtitle || c.unis || 'Partner Universities'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* BOTTOM STATS STRIP */}
                <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
                    {stats.map((st, i) => {
                        const IconComp = st.icon;
                        return (
                            <div
                                key={i}
                                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs flex items-center gap-4"
                            >
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${st.color} text-white shrink-0 shadow-sm`}>
                                    <IconComp className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                        {st.value}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        {st.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* FREE ELIGIBILITY ASSESSMENT MODAL */}
            {assessmentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setAssessmentModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Quick Eligibility Check</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Get personalized university options in 24 hours</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert('Assessment submitted! Our counselors will reach out to you within 24 hours.'); setAssessmentModalOpen(false); }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Hasanuzzaman Priyam"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp Number</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+880 1812713814"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Highest Academic Qualification</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option value="HSC/A-Level">HSC / A-Level / High School</option>
                                    <option value="Bachelor">Bachelor Degree (Graduate)</option>
                                    <option value="Masters">Masters Degree</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
                            >
                                Submit Free Assessment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
