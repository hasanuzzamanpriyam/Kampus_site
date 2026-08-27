import React from 'react';
import {
    Globe,
    ArrowRight,
    Building2,
    Clock,
    Award
} from 'lucide-react';

export default function Destinations({ countries = [] }) {
    // Default fallback if database countries array is empty
    const defaultDestinations = [
        {
            id: 1,
            name: 'United Kingdom',
            country_code: 'GB',
            subtitle: '150+ Partner Universities',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 2,
            name: 'United States',
            country_code: 'US',
            subtitle: '200+ Top Ranked Colleges',
            image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 3,
            name: 'Finland',
            country_code: 'FI',
            subtitle: '98% Visa Success Rate',
            image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 4,
            name: 'United Arab Emirates',
            country_code: 'AE',
            subtitle: 'Global Tech & Business Hubs',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        },
    ];

    const displayCountries = countries && countries.length > 0 ? countries : defaultDestinations;

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

                {/* DYNAMIC 4-COLUMN DESTINATION CARDS GRID WITH SMOOTH HOVER ANIMATION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {displayCountries.map((c) => (
                        <div
                            key={c.id || c.name}
                            className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between"
                        >
                            {/* Background Image with Zoom Effect */}
                            <div className="absolute inset-0 bg-slate-950">
                                <img
                                    src={c.image || 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'}
                                    alt={`Study in ${c.name}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                            </div>

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 opacity-90 group-hover:opacity-95 transition-opacity" />

                            {/* Top Badge Overlay: Country Code */}
                            <div className="relative z-10 p-5 flex justify-between items-center">
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/30 font-mono shadow-sm">
                                    {c.country_code || 'DEST'}
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-blue-600/80 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider">
                                    Featured
                                </span>
                            </div>

                            {/* Bottom Card Content */}
                            <div className="relative z-10 p-6 space-y-4">
                                <div>
                                    <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                                        Study Destination
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                                        {c.name}
                                    </h3>
                                    {c.subtitle && (
                                        <p className="text-xs text-slate-300 font-medium mt-1">
                                            {c.subtitle}
                                        </p>
                                    )}
                                </div>

                                {/* Key Highlights */}
                                <div className="space-y-2 pt-3 border-t border-white/15 text-xs text-slate-200 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                        <span>Top Ranked Accredited Institutions</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span>Post-Study Work & Visa Guidance</span>
                                    </div>
                                </div>

                                {/* Explore Button with Smooth Hover Slide */}
                                <div className="pt-2">
                                    <a
                                        href={`/universities?search=${encodeURIComponent(c.name)}`}
                                        className="w-full py-3 px-4 rounded-2xl bg-white/15 hover:bg-white text-white hover:text-slate-900 font-extrabold text-xs backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
                                    >
                                        <span>Explore Universities</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
