import React from 'react';
import { Link } from '@inertiajs/react';
import {
    MapPin,
    ArrowRight,
    Award,
    Building2,
    BookOpen,
    SearchX,
    RotateCcw
} from 'lucide-react';

export default function UniversitiesGrid({
    universities = {},
    searchQuery = '',
    selectedDestination = 'All',
    onResetFilters
}) {
    // Support both paginated object { data: [], links: [] } or simple array
    const uniList = Array.isArray(universities) ? universities : (universities?.data || []);
    const links = universities?.links || [];
    const totalItems = universities?.total ?? uniList.length;

    const hasFilters = Boolean(searchQuery.trim()) || selectedDestination !== 'All';

    // Dynamic contextual heading
    const institutionText = totalItems === 1 ? 'Institution' : 'Institutions';
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

    return (
        <section id="universities-grid-section" className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER BAR */}
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

                {/* RESPONSIVE GRID OF UNIVERSITY CARDS (3 COLUMNS DESKTOP, 2 TABLET, 1 MOBILE) */}
                {uniList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {uniList.map((uni) => {
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
                                    className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/50 hover:border-blue-500 transition-all duration-300 group shadow-xs hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                                >
                                    {/* 1. IMAGE SECTION: FIXED COMPACT HEIGHT (h-40) */}
                                    <div className="h-40 w-full relative shrink-0 overflow-hidden bg-slate-900">
                                        <img
                                            src={coverImg}
                                            alt={uni.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                                        {/* Country Badge */}
                                        {uni.country && (
                                            <div className="absolute top-3 right-3">
                                                <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20 flex items-center gap-1 shadow-md">
                                                    <span>{uni.country.name}</span>
                                                </span>
                                            </div>
                                        )}

                                        {/* Overlapping Circular Logo */}
                                        <div className="absolute -bottom-4 left-4 w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 shadow-md flex items-center justify-center font-extrabold text-xs tracking-wider z-10 overflow-hidden bg-white dark:bg-slate-900">
                                            {logoImg ? (
                                                <img
                                                    src={logoImg}
                                                    alt={uni.name}
                                                    className="w-full h-full object-contain p-0.5"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-blue-900 text-white flex items-center justify-center font-extrabold text-[11px]">
                                                    {initials}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* 2. CONTENT SECTION: EXPANDS WITH flex-1 */}
                                    <div className="p-5 pt-6 flex flex-col flex-1">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                                                {uni.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                                                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                <span className="truncate">{uni.country?.name ? `${uni.location ? uni.location + ', ' : ''}${uni.country.name}` : (uni.location || 'Global Campus')}</span>
                                            </div>
                                        </div>

                                        {/* Course Count Badge */}
                                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-2.5 py-0.5 rounded-full w-fit">
                                            <BookOpen className="w-3 h-3" />
                                            <span>{uni.courses_count ?? 0} Courses Available</span>
                                        </div>

                                        {/* Feature Badges */}
                                        {Array.isArray(uni.features) && uni.features.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {uni.features.slice(0, 2).map((feature, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200/70 dark:border-slate-700/70"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* 3. BOTTOM ACTION: PINNED TO BOTTOM WITH mt-auto */}
                                        <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-500">
                                            <span className="group-hover:underline">Explore University</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
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

                {/* Pagination Section */}
                {universities?.links && universities.links.length > 3 && (
                    <div className="flex items-center justify-center mt-12 space-x-2 flex-wrap gap-y-2">
                        {universities.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll={true}
                                    preserveState={true}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border shadow-md ${
                                        link.active
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-blue-500/20'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-white'
                                    }`}
                                />
                            ) : (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className="px-4 py-2 text-sm font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg cursor-not-allowed"
                                />
                            )
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
