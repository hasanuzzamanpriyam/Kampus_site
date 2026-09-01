import React from 'react';
import {
    BookOpen,
    Clock,
    Calendar,
    ArrowRight,
    Sparkles,
    User
} from 'lucide-react';

export default function BlogHero({
    featuredPost = {
        title: 'How to Make the Most of University Alumni Networks',
        category: 'Study Abroad',
        excerpt: 'When students choose a university, they often focus on rankings, tuition fees, and courses. But there is another resource that can remain valuable long after graduation...',
        date: 'August 21, 2026',
        readTime: '5 min read',
        author: 'Sarah Jenkins',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        slug: 'make-the-most-of-alumni-networks'
    }
}) {
    return (
        <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            
            {/* Ambient Top Glow Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none overflow-hidden">
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[140px]" />
                <div className="absolute top-[100px] right-[10%] w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
            </div>

            {/* Subtle Dot Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
                
                {/* 1. SECTION TYPOGRAPHY & HEADER */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                        Study abroad <br className="hidden sm:inline" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                            guides & advice
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                        Insights, tips, and the latest news on studying overseas, universities, visas, and student life.
                    </p>
                </div>

                {/* 2. PROMINENT FEATURED BLOG POST CARD (DESKTOP: IMAGE 50% LEFT, TEXT RIGHT; MOBILE: STACKED) */}
                <div className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden hover:shadow-3xl hover:border-blue-500/40 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                        
                        {/* FEATURED IMAGE (50% WIDTH ON DESKTOP) WITH SUBTLE OVERLAY & HOVER ZOOM */}
                        <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-[420px] w-full overflow-hidden bg-slate-900">
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                loading="lazy"
                            />
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                            {/* Top Badge */}
                            <div className="absolute top-5 left-5">
                                <span className="px-3.5 py-1.5 rounded-full bg-blue-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                                    Featured Post
                                </span>
                            </div>
                        </div>

                        {/* TEXT CONTENT COLUMN */}
                        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-4">
                            
                            {/* Category Badge & Metadata */}
                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
                                <span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800 font-bold uppercase tracking-wider">
                                    {featuredPost.category}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                    <span>{featuredPost.date}</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{featuredPost.readTime}</span>
                                </span>
                            </div>

                            {/* Post Title */}
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug tracking-tight">
                                {featuredPost.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-normal line-clamp-3">
                                {featuredPost.excerpt}
                            </p>

                            {/* Read More Link / Button */}
                            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                    <User className="w-3.5 h-3.5 text-slate-400" />
                                    <span>By {featuredPost.author}</span>
                                </div>

                                <a
                                    href={`/blog/${featuredPost.slug || 'make-the-most-of-alumni-networks'}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                                >
                                    <span>Read Full Article</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                </a>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
