import React, { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import {
    Search,
    Building2,
    BookOpen,
    GraduationCap,
    MapPin,
    Loader2,
    ArrowRight,
    X,
    Sparkles
} from 'lucide-react';

export default function TopbarSearch({ onSearch }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ universities: [], courses: [] });
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchContainerRef = useRef(null);

    // Debounced live search with 300ms delay
    useEffect(() => {
        const trimmed = query.trim();
        if (trimmed.length < 2) {
            setResults({ universities: [], courses: [] });
            setIsSearching(false);
            setIsOpen(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`/api/global-search?q=${encodeURIComponent(trimmed)}`);
                if (response.ok) {
                    const data = await response.json();
                    setResults(data);
                    setIsOpen(true);
                }
            } catch (err) {
                console.error('Error fetching global search results:', err);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsOpen(false);
        const trimmed = query.trim();
        if (!trimmed) return;

        if (onSearch) {
            onSearch(trimmed);
        } else {
            router.visit(`/universities?search=${encodeURIComponent(trimmed)}`);
        }
    };

    const hasUniversities = results.universities && results.universities.length > 0;
    const hasCourses = results.courses && results.courses.length > 0;
    const hasResults = hasUniversities || hasCourses;

    return (
        <div ref={searchContainerRef} className="relative w-full max-w-xl lg:max-w-2xl">
            {/* SEARCH INPUT FORM */}
            <form onSubmit={handleFormSubmit} className="relative w-full">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim().length >= 2 && (hasResults || isSearching)) {
                            setIsOpen(true);
                        }
                    }}
                    placeholder="Search for universities & courses..."
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium rounded-full pl-5 pr-16 py-2.5 shadow-sm border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />

                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {query.length > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('');
                                setResults({ universities: [], courses: [] });
                                setIsOpen(false);
                            }}
                            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                            aria-label="Clear search"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}

                    <button
                        type="submit"
                        className="p-1.5 rounded-full text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors cursor-pointer"
                        aria-label="Submit Search"
                    >
                        {isSearching ? (
                            <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                        ) : (
                            <Search className="w-4 h-4 stroke-[2.5]" />
                        )}
                    </button>
                </div>
            </form>

            {/* LIVE SEARCH RESULTS DROPDOWN MODAL */}
            {isOpen && query.trim().length >= 2 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-900 dark:text-slate-100 max-h-[80vh] flex flex-col">
                    
                    {/* 1. LOADING INDICATOR SKELETON */}
                    {isSearching && !hasResults && (
                        <div className="p-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Loader2 className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-spin" />
                            <span>Searching universities & programmes with AI Scout...</span>
                        </div>
                    )}

                    {/* 2. RESULTS CONTAINER */}
                    <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 custom-scrollbar">
                        
                        {/* SECTION A: UNIVERSITIES */}
                        {hasUniversities && (
                            <div>
                                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                        <span>Universities ({results.universities.length})</span>
                                    </span>
                                </div>

                                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {results.universities.map((uni) => (
                                        <Link
                                            key={uni.id}
                                            href={`/universities/${uni.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-9 h-9 rounded-xl bg-purple-100/80 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors truncate">
                                                        {uni.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                                                        <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                                                        <span>{uni.location || uni.country?.name || 'International'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50 shrink-0 ml-3">
                                                {uni.courses_count || 0} courses available
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECTION B: COURSES */}
                        {hasCourses && (
                            <div>
                                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                        <span>Courses ({results.courses.length})</span>
                                    </span>
                                </div>

                                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {results.courses.map((course) => (
                                        <Link
                                            key={course.id}
                                            href={course.university?.slug ? `/universities/${course.university.slug}` : `/courses?search=${encodeURIComponent(course.title)}`}
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-9 h-9 rounded-xl bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                                                    <BookOpen className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors truncate">
                                                        {course.title}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 flex items-center gap-1">
                                                        <Building2 className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                                                        <span>{course.university?.name || 'Partner University'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {course.level && (
                                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 shrink-0 ml-3">
                                                    {course.level}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* NO RESULTS FOUND */}
                        {!isSearching && !hasResults && (
                            <div className="py-8 px-6 text-center space-y-1.5">
                                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    No matches found for <span className="text-slate-900 dark:text-white font-bold">"{query}"</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Try checking for spelling errors or searching by subject/city keyword.
                                </p>
                            </div>
                        )}

                    </div>

                    {/* 3. VIEW ALL RESULTS ACTION FOOTER */}
                    {hasResults && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                Showing top {results.universities.length + results.courses.length} matches
                            </span>
                            <button
                                type="button"
                                onClick={handleFormSubmit}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer"
                            >
                                <span>View all results</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
