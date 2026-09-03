import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Check,
    ArrowRight,
    HelpCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

export default function DynamicPageSections({ sections = [] }) {
    if (!sections || !Array.isArray(sections) || sections.length === 0) {
        return null;
    }

    return (
        <div className="w-full flex flex-col space-y-0">
            {sections.map((sec, idx) => (
                <section
                    key={sec.id || idx}
                    className={`py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 dark:border-slate-800 transition-colors ${
                        idx % 2 === 0
                            ? 'bg-white dark:bg-slate-900'
                            : 'bg-slate-50/70 dark:bg-slate-950'
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* SECTION: TWO-COLUMN IMAGE + TEXT CONTENT */}
                        {sec.type === 'image_text' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                                <div className={`space-y-6 ${
                                    sec.image_position === 'left' ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6 lg:order-1'
                                }`}>
                                    <div className="space-y-3">
                                        {sec.subtitle && (
                                            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                                {sec.subtitle}
                                            </span>
                                        )}
                                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                            {sec.title}
                                        </h2>
                                    </div>

                                    {sec.content && (
                                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                                            {sec.content}
                                        </p>
                                    )}

                                    {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                                        <div className="space-y-2.5 pt-2">
                                            {sec.bullets.map((b, bIdx) => (
                                                <div key={bIdx} className="flex items-start gap-3">
                                                    <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                    </div>
                                                    <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                                                        {b}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {sec.image && (
                                    <div className={`${
                                        sec.image_position === 'left' ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6 lg:order-2'
                                    }`}>
                                        <div className="relative group overflow-hidden rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900">
                                            <img
                                                src={sec.image}
                                                alt={sec.title || 'Page Section Image'}
                                                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SECTION: PHOTO GALLERY GRID */}
                        {sec.type === 'gallery' && (
                            <div className="space-y-8 text-center sm:text-left">
                                <div className="space-y-2">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                        {sec.title || 'Photo Gallery'}
                                    </h2>
                                    {sec.subtitle && (
                                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
                                            {sec.subtitle}
                                        </p>
                                    )}
                                </div>

                                <div className={`grid gap-6 ${
                                    sec.columns === 2
                                        ? 'grid-cols-1 md:grid-cols-2'
                                        : sec.columns === 4
                                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                }`}>
                                    {(sec.images || []).map((img, imgIdx) => (
                                        <div
                                            key={imgIdx}
                                            className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 h-64 sm:h-72"
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.caption || `Gallery Image ${imgIdx}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                                            
                                            <div className="absolute bottom-0 inset-x-0 p-5 space-y-1 text-left">
                                                {img.subtitle && (
                                                    <div className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                                                        {img.subtitle}
                                                    </div>
                                                )}
                                                <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                                                    {img.caption || 'Campus Highlight'}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECTION: FEATURE CARDS GRID */}
                        {sec.type === 'features' && (
                            <div className="space-y-8 text-center sm:text-left">
                                <div className="space-y-2">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                        {sec.title || 'Key Highlights'}
                                    </h2>
                                    {sec.subtitle && (
                                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
                                            {sec.subtitle}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                    {(sec.items || []).map((card, cIdx) => (
                                        <div
                                            key={cIdx}
                                            className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 space-y-4 text-left flex flex-col justify-between"
                                        >
                                            <div className="space-y-3">
                                                {card.badge && (
                                                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800">
                                                        {card.badge}
                                                    </span>
                                                )}
                                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white pt-1">
                                                    {card.title}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {card.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECTION: PROSE ARTICLE */}
                        {sec.type === 'prose' && (
                            <div className="max-w-4xl mx-auto space-y-6 text-left">
                                {sec.title && (
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
                                        {sec.title}
                                    </h2>
                                )}
                                <div className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                                    {sec.content}
                                </div>
                            </div>
                        )}

                        {/* SECTION: CTA BANNER */}
                        {sec.type === 'cta' && (
                            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 border border-blue-800/60 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                                <div className="space-y-2 max-w-2xl">
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                                        {sec.title || 'Ready to begin your journey?'}
                                    </h3>
                                    <p className="text-sm sm:text-base text-blue-200">
                                        {sec.subtitle || 'Book a free consultation with our senior educational advisors today.'}
                                    </p>
                                </div>

                                <Link
                                    href={sec.button_link || '/contact'}
                                    className="px-8 py-4 rounded-full bg-white text-slate-950 font-extrabold text-sm hover:bg-blue-50 shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                                >
                                    <span>{sec.button_text || 'Get Started Now'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}

                    </div>
                </section>
            ))}
        </div>
    );
}
