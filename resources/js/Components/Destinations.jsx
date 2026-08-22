import React from 'react';
import {
    Globe,
    ArrowRight,
    Sparkles,
    Building2,
    GraduationCap,
    Clock,
    Award
} from 'lucide-react';

export default function Destinations() {
    const destinations = [
        {
            country: 'UK',
            fullName: 'United Kingdom',
            flag: '🇬🇧',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
            bgGradient: 'from-blue-950/90 via-indigo-950/60 to-transparent',
            unis: '150+ Partner Universities',
            workVisa: 'Up to 3 Years Post-Study Work',
            scholarships: 'Scholarships up to £10,000',
            tag: 'Top Destination'
        },
        {
            country: 'USA',
            fullName: 'United States',
            flag: '🇺🇸',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
            bgGradient: 'from-slate-950/90 via-blue-950/60 to-transparent',
            unis: '200+ Ivy & Top STEM Colleges',
            workVisa: '3-Year OPT Extension for STEM',
            scholarships: 'Merit Grants up to $25,000/yr',
            tag: 'Highest ROI'
        },
        {
            country: 'Finland',
            fullName: 'Finland',
            flag: '🇫🇮',
            image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80',
            bgGradient: 'from-teal-950/90 via-slate-950/60 to-transparent',
            unis: '30+ Top European Institutions',
            workVisa: 'PR Pathway After Graduation',
            scholarships: '50% - 100% Tuition Waivers',
            tag: 'Europe PR'
        },
        {
            country: 'Dubai',
            fullName: 'Dubai (UAE)',
            flag: '🇦🇪',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
            bgGradient: 'from-amber-950/90 via-slate-950/60 to-transparent',
            unis: '40+ UK & US Branch Campuses',
            workVisa: '100% Fast Visa Processing',
            scholarships: 'Tax-Free Career Opportunities',
            tag: 'Fast Track'
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800">
                            <Globe className="w-3.5 h-3.5" />
                            <span>Global Higher Education Pathways</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Explore top study destinations
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Discover world-leading universities, generous scholarship options, and post-graduation career opportunities in your preferred country.
                        </p>
                    </div>

                    <a
                        href="/universities"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group shrink-0"
                    >
                        <span>View all partner universities</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* 4-COLUMN DESTINATION CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {destinations.map((dest, idx) => (
                        <div
                            key={idx}
                            className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between"
                        >
                            {/* Background Image with Zoom Effect */}
                            <div className="absolute inset-0 bg-slate-900">
                                <img
                                    src={dest.image}
                                    alt={`Study in ${dest.fullName}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                                    loading="lazy"
                                    onError={(e) => {
                                        // Styled gradient fallback if image offline
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />

                            {/* Top Badge Overlay */}
                            <div className="relative z-10 p-5 flex justify-between items-center">
                                <span className="text-2xl">{dest.flag}</span>
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/30">
                                    {dest.tag}
                                </span>
                            </div>

                            {/* Bottom Card Content */}
                            <div className="relative z-10 p-6 space-y-4">
                                <div>
                                    <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
                                        Study in
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                                        {dest.country}
                                    </h3>
                                    <p className="text-xs text-slate-300 font-medium">
                                        {dest.fullName}
                                    </p>
                                </div>

                                {/* Key Highlights */}
                                <div className="space-y-2 pt-2 border-t border-white/15 text-xs text-slate-200 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                        <span>{dest.unis}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span>{dest.workVisa}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span>{dest.scholarships}</span>
                                    </div>
                                </div>

                                {/* Explore Button */}
                                <div className="pt-2">
                                    <button className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white text-white hover:text-slate-900 font-bold text-xs backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 transition-all group-hover:shadow-md">
                                        <span>Explore Universities</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
