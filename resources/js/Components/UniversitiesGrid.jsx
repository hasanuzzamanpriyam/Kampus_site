import React from 'react';
import { Link } from '@inertiajs/react';
import {
    MapPin,
    ArrowRight,
    Award,
    Building2,
    BookOpen,
    SearchX,
    ChevronLeft,
    ChevronRight,
    X,
    RotateCcw
} from 'lucide-react';

export default function UniversitiesGrid({
    universities = [],
    currentPage = 1,
    onPageChange,
    searchQuery = '',
    selectedDestination = 'All',
    onResetFilters
}) {
    const ITEMS_PER_PAGE = 12;
    const totalItems = universities.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUniversities = universities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const hasFilters = Boolean(searchQuery.trim()) || selectedDestination !== 'All';

    // Dynamic contextual heading
    const institutionText = totalItems === 1 ? 'Partner Institution' : 'Partner Institutions';
    let filterContext = '';
    if (searchQuery.trim() && selectedDestination !== 'All') {
        filterContext = ` matching "${searchQuery.trim()}" in ${selectedDestination}`;
    } else if (selectedDestination !== 'All') {
        filterContext = ` in ${selectedDestination}`;
    } else if (searchQuery.trim()) {
        filterContext = ` matching "${searchQuery.trim()}"`;
    }

    // Dynamic contextual subtitle
    const subtitleText = hasFilters
        ? `Found ${totalItems} ${totalItems === 1 ? 'institution' : 'institutions'} matching your criteria.`
        : 'Verified official higher education admissions partners worldwide';

    const handlePageClick = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        if (onPageChange) {
            onPageChange(page);
        }
        // Smooth scroll to top of grid section
        const element = document.getElementById('universities-grid-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="universities-grid-section" className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER BAR - COMPLETELY DYNAMIC */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Showing <span className="text-blue-600 dark:text-blue-400">{totalItems}</span> {institutionText}{filterContext}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {subtitleText}
                        </p>
                    </div>

                    {/* Active Filters Reset Pill */}
                    {hasFilters && onResetFilters && (
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-3 h-3 text-blue-500" />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>

                {/* RESPONSIVE GRID OF UNIVERSITY CARDS */}
                {paginatedUniversities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedUniversities.map((uni) => {
                            const coverImg = uni.cover_image
                                ? (uni.cover_image.startsWith('http') ? uni.cover_image : `/storage/${uni.cover_image}`)
                                : (uni.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80');

                            const logoImg = uni.logo
                                ? (uni.logo.startsWith('http') ? uni.logo : `/storage/${uni.logo}`)
                                : null;

                            const initials = (uni.name || 'UN')
                                .split(' ')
                                .map((w) => w[0])
                                .join('')
                                .substring(0, 2)
                                .toUpperCase();

                            return (
                                <Link
                                    key={uni.id}
                                    href={`/universities/${uni.slug}`}
                                    className="group relative rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                                >
                                    <div>
                                        {/* TOP: CAMPUS COVER IMAGE WITH OVERLAPPING LOGO */}
                                        <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                                            <img
                                                src={coverImg}
                                                alt={uni.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                                            {/* Country Badge */}
                                            {uni.country && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20 flex items-center gap-1 shadow-md">
                                                        <span>{uni.country.name}</span>
                                                    </span>
                                                </div>
                                            )}

                                            {/* OVERLAPPING CIRCULAR LOGO */}
                                            <div className="absolute -bottom-5 left-5 w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-md flex items-center justify-center font-extrabold text-xs tracking-wider z-10 overflow-hidden bg-white dark:bg-slate-900">
                                                {logoImg ? (
                                                    <img
                                                        src={logoImg}
                                                        alt={uni.name}
                                                        className="w-full h-full object-contain p-1"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-blue-900 text-white flex items-center justify-center font-extrabold text-xs">
                                                        {initials}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* MIDDLE CONTENT: NAME, LOCATION & COURSE COUNT */}
                                        <div className="p-6 pt-8 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                                    {uni.name}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1.5">
                                                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                    <span>{uni.country?.name ? `${uni.location ? uni.location + ', ' : ''}${uni.country.name}` : (uni.location || 'Global Campus')}</span>
                                                </div>
                                            </div>

                                            {/* COURSE COUNT BADGE */}
                                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-3 py-1 rounded-full w-fit">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span>{uni.courses_count ?? 0} Courses Available</span>
                                            </div>

                                            {/* FEATURE BADGES */}
                                            {Array.isArray(uni.features) && uni.features.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {uni.features.slice(0, 3).map((feature, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-200/70 dark:border-slate-700/70 shadow-2xs"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* BOTTOM: HORIZONTAL DIVIDER & EXPLORE LINK */}
                                    <div className="px-6 pb-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                                        <span className="group-hover:underline">Explore University</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
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
                            No institutions matched your search filters. Try clearing your search query or selecting a different study destination.
                        </p>
                        {hasFilters && onResetFilters && (
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={onResetFilters}
                                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer inline-flex items-center gap-1.5"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Clear all filters</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. INSTANT 0MS CLIENT-SIDE PAGINATION CONTROLS */}
                {totalPages > 1 && (
                    <div className="mt-14 flex justify-center items-center gap-2 flex-wrap">
                        {/* Previous Button */}
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => handlePageClick(currentPage - 1)}
                            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                currentPage === 1
                                    ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-50'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs'
                            }`}
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Previous</span>
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                type="button"
                                onClick={() => handlePageClick(pageNum)}
                                className={`w-10 h-10 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                                    pageNum === currentPage
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs'
                                }`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageClick(currentPage + 1)}
                            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                currentPage === totalPages
                                    ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-50'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs'
                            }`}
                        >
                            <span>Next</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}
