import React, { useState } from 'react';
import {
    Search,
    BookOpen,
    GraduationCap,
    Sparkles,
    ArrowRight
} from 'lucide-react';

export default function CoursesHero({
    initialSearch = '',
    onSearchChange,
    onSearchSubmit
}) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearchChange) {
            onSearchChange(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearchSubmit) {
            onSearchSubmit(searchTerm);
        }
    };

    return (
        <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-b from-blue-50/80 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            
            {/* Ambient Background Light Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none overflow-hidden">
                <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[140px]" />
                <div className="absolute top-[80px] right-[12%] w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
                
                {/* 1. TYPOGRAPHY & HEADER */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                        Find the right course for{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                            your future
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                        Browse thousands of undergraduate and postgraduate degrees across top universities in the UK, USA, Finland, and Dubai.
                    </p>
                </div>

                {/* 2. LARGE PROMINENT FLOATING SEARCH BAR */}
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-2 sm:p-2.5 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50">
                        
                        {/* Search Icon */}
                        <div className="pl-3.5 text-slate-400 flex items-center justify-center shrink-0">
                            <Search className="w-5 h-5 text-blue-500" />
                        </div>

                        {/* Text Input without internal border */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Search for a course (e.g., Data Science, Law, Business)..."
                            className="w-full bg-transparent py-2.5 px-2 text-slate-900 dark:text-white text-sm sm:text-base font-medium placeholder-slate-400 dark:placeholder-slate-500 border-0 border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none"
                        />

                        {/* Solid Brand Search Button */}
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                        >
                            <span>Search</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Popular Quick Searches */}
                    <div className="flex items-center justify-center gap-2 flex-wrap pt-4 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-400">Popular:</span>
                        {['Computer Science', 'MBA', 'Data Science & AI', 'Law', 'Engineering', 'Psychology'].map((keyword) => (
                            <button
                                key={keyword}
                                type="button"
                                onClick={() => {
                                    setSearchTerm(keyword);
                                    if (onSearchChange) onSearchChange(keyword);
                                    if (onSearchSubmit) onSearchSubmit(keyword);
                                }}
                                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium border border-slate-200/60 dark:border-slate-700/60"
                            >
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
