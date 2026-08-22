import React from 'react';
import {
    MapPin,
    ArrowRight,
    Award,
    Building2,
    Sparkles,
    SearchX,
    CheckCircle2
} from 'lucide-react';

export default function UniversitiesGrid({ searchQuery = '', selectedDestination = 'All' }) {
    const universities = [
        {
            id: 1,
            name: 'University of Oxford',
            destination: 'UK',
            location: 'Oxford, United Kingdom',
            ranking: 'Top 5 Global',
            image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
            logoText: 'OX',
            logoBg: 'bg-blue-900 text-white',
            features: ['Scholarships Available', 'Post-Study Work Visa', 'Russell Group']
        },
        {
            id: 2,
            name: 'Harvard University',
            destination: 'USA',
            location: 'Cambridge, MA, United States',
            ranking: 'Top 5 Global',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
            logoText: 'HU',
            logoBg: 'bg-red-900 text-white',
            features: ['STEM 3-Yr OPT', 'Need-Based Financial Aid', 'Ivy League']
        },
        {
            id: 3,
            name: 'University of Helsinki',
            destination: 'Finland',
            location: 'Helsinki, Finland',
            ranking: 'Top 100 Global',
            image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
            logoText: 'UH',
            logoBg: 'bg-teal-800 text-white',
            features: ['100% Tuition Waiver', 'Fast PR Pathway', 'Nordic Research']
        },
        {
            id: 4,
            name: 'Heriot-Watt University Dubai',
            destination: 'Dubai',
            location: 'Dubai International Academic City, UAE',
            ranking: 'Top 300 Global',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
            logoText: 'HW',
            logoBg: 'bg-amber-800 text-white',
            features: ['UK Degree in Dubai', '100% Visa Guarantee', 'Tax-Free Campus']
        },
        {
            id: 5,
            name: 'University of Birmingham',
            destination: 'UK',
            location: 'Birmingham, United Kingdom',
            ranking: 'Top 100 Global',
            image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
            logoText: 'UB',
            logoBg: 'bg-indigo-900 text-white',
            features: ['£10,000 Bursaries', '2-Year PSW Visa', 'Red Brick Uni']
        },
        {
            id: 6,
            name: 'New York University (NYU)',
            destination: 'USA',
            location: 'New York City, United States',
            ranking: 'Top 30 Global',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
            logoText: 'NYU',
            logoBg: 'bg-purple-900 text-white',
            features: ['Global Internship Network', 'STEM Programs', 'Manhattan Campus']
        },
        {
            id: 7,
            name: 'Aalto University',
            destination: 'Finland',
            location: 'Espoo / Helsinki, Finland',
            ranking: 'Top 150 Global',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
            logoText: 'AU',
            logoBg: 'bg-emerald-900 text-white',
            features: ['50% Scholarship', 'Design & Tech Hub', 'Innovation Grants']
        },
        {
            id: 8,
            name: 'University of Wollongong Dubai',
            destination: 'Dubai',
            location: 'Knowledge Park, Dubai, UAE',
            ranking: 'Top 200 Global',
            image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
            logoText: 'UOW',
            logoBg: 'bg-blue-800 text-white',
            features: ['Australian Curriculum', 'Dual Campus Transfer', 'Fast Admissions']
        },
    ];

    // Filter Logic based on searchQuery and selectedDestination
    const filteredUniversities = universities.filter((uni) => {
        const matchesDestination =
            selectedDestination === 'All' ||
            uni.destination.toLowerCase() === selectedDestination.toLowerCase();

        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
            !query ||
            uni.name.toLowerCase().includes(query) ||
            uni.location.toLowerCase().includes(query) ||
            uni.features.some((f) => f.toLowerCase().includes(query));

        return matchesDestination && matchesQuery;
    });

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER BAR */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Showing <span className="text-blue-600 dark:text-blue-400">{filteredUniversities.length}</span> Partner Institutions
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Verified official higher education admissions partners
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Admissions Open 2026</span>
                    </div>
                </div>

                {/* RESPONSIVE GRID LAYOUT (1 COL MOBILE, 2 TABLET, 3 DESKTOP) */}
                {filteredUniversities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredUniversities.map((uni) => (
                            <div
                                key={uni.id}
                                className="group relative rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                            >
                                <div>
                                    {/* TOP: RECTANGULAR CAMPUS IMAGE WITH OVERLAPPING LOGO */}
                                    <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                                        <img
                                            src={uni.image}
                                            alt={uni.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                                        {/* Top Ranking Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1 shadow-md">
                                                <Award className="w-3 h-3" />
                                                <span>{uni.ranking}</span>
                                            </span>
                                        </div>

                                        {/* OVERLAPPING CIRCULAR UNIVERSITY LOGO ON BOTTOM-LEFT */}
                                        <div className="absolute -bottom-5 left-5 w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-md flex items-center justify-center font-extrabold text-xs tracking-wider z-10 overflow-hidden">
                                            <div className={`w-full h-full ${uni.logoBg} flex items-center justify-center font-extrabold`}>
                                                {uni.logoText}
                                            </div>
                                        </div>
                                    </div>

                                    {/* MIDDLE CONTENT: NAME & LOCATION */}
                                    <div className="p-6 pt-8 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                                {uni.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                <span>{uni.location}</span>
                                            </div>
                                        </div>

                                        {/* FEATURE BADGES */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {uni.features.map((feature, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-200/70 dark:border-slate-700/70 shadow-2xs"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM: HORIZONTAL DIVIDER & EXPLORE LINK */}
                                <div className="px-6 pb-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                                    <span className="group-hover:underline">Explore University</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* EMPTY STATE WHEN NO RESULTS MATCH */
                    <div className="text-center py-16 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 mx-auto flex items-center justify-center">
                            <SearchX className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            No universities found
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                            No institutions matched your search term "{searchQuery}" in "{selectedDestination}". Try clearing your search query or selecting "All Destinations".
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}
