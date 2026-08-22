import React, { useState } from 'react';
import {
    Building2,
    Search,
    MapPin,
    Filter,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

export default function UniversitiesHero({ onSearch, initialSearch = '', initialDestination = 'All' }) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [destination, setDestination] = useState(initialDestination);

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        if (onSearch) {
            onSearch({ searchTerm, destination });
        }
    };

    return (
        <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors text-center">
            
            {/* Ambient Background Blur Graphics */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] pointer-events-none overflow-hidden">
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[140px]" />
                <div className="absolute top-[120px] left-[10%] w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
            </div>

            {/* Subtle Dot Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                
                {/* 1. Top Badge */}
                <div>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest border border-blue-200/80 dark:border-blue-800 shadow-2xs backdrop-blur-md">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>PARTNER UNIVERSITIES</span>
                    </span>
                </div>

                {/* 2. Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                    Find your dream <br className="hidden sm:inline" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                        university
                    </span>
                </h1>

                {/* 3. Centered Paragraph */}
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
                    Explore our network of world-class partner institutions across the UK, USA, Finland, and Dubai. Filter by destination to find the perfect fit for your academic goals.
                </p>

                {/* 4. PROMINENT FLOATING SEARCH & FILTER BAR (GLASSMORPHISM CARD) */}
                <div className="pt-4">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="max-w-4xl mx-auto rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-3 sm:p-4 transition-all duration-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                            
                            {/* Input 1 (Text): Search universities by name */}
                            <div className="md:col-span-6 relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search universities by name, program, or city..."
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                                />
                            </div>

                            {/* Input 2 (Select/Dropdown): Destination */}
                            <div className="md:col-span-4 relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                </div>
                                <select
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full pl-10 pr-8 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="All">All Destinations</option>
                                    <option value="UK">United Kingdom (UK)</option>
                                    <option value="USA">United States (USA)</option>
                                    <option value="Finland">Finland</option>
                                    <option value="Dubai">Dubai (UAE)</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                                    <Filter className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Button: Solid brand-colored Search Button */}
                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>Search</span>
                                </button>
                            </div>

                        </div>
                    </form>
                </div>

                {/* Popular Tags */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">Quick Filters:</span>
                    {['Russell Group UK', 'STEM USA', 'Finland Tuition Waivers', 'Dubai US Campuses'].map((tag, i) => (
                        <button
                            key={i}
                            onClick={() => { setSearchTerm(tag); if (onSearch) onSearch({ searchTerm: tag, destination }); }}
                            className="bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200/80 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs"
                        >
                            {tag}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}
