import React from 'react';
import {
    Calendar,
    Clock,
    ArrowRight,
    Tag,
    BookOpen,
    SearchX
} from 'lucide-react';

export default function BlogGrid({ selectedCategory = 'All' }) {
    const posts = [
        {
            id: 1,
            title: 'Countries Leading in Robotics Education',
            category: 'Destinations',
            date: '21 Aug 2026',
            readTime: '4 min read',
            excerpt: 'Robotics is no longer a futuristic concept. Top universities across Germany, Japan, and the USA are offering cutting-edge robotics degrees with direct AI industry labs.',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
            slug: 'countries-leading-in-robotics-education'
        },
        {
            id: 2,
            title: 'Why More Students Are Choosing Dual Degrees',
            category: 'Academic Writing',
            date: '21 Aug 2026',
            readTime: '6 min read',
            excerpt: 'Studying abroad has traditionally meant choosing one university. Dual degree programs now allow students to earn qualifications from two top institutions simultaneously.',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
            slug: 'why-students-choose-dual-degrees'
        },
        {
            id: 3,
            title: 'Best Countries to Study Urban Planning',
            category: 'Study Abroad',
            date: '21 Aug 2026',
            readTime: '5 min read',
            excerpt: 'Cities are changing rapidly. Population growth and climate goals are driving unprecedented demand for qualified urban planners and sustainable architects.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=800&q=80',
            slug: 'best-countries-to-study-urban-planning'
        },
        {
            id: 4,
            title: 'How to Secure Merit Scholarships in UK & USA',
            category: 'Scholarships',
            date: '18 Aug 2026',
            readTime: '7 min read',
            excerpt: 'Scholarship deadlines open early. Here is a step-by-step roadmap for writing winning scholarship essays and securing up to 100% tuition fee waivers.',
            image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
            slug: 'secure-merit-scholarships-uk-usa'
        },
        {
            id: 5,
            title: 'Navigating UKVI Student Visa Requirements in 2026',
            category: 'Visas & Permits',
            date: '15 Aug 2026',
            readTime: '5 min read',
            excerpt: 'Key updates to financial proof requirements, CAS generation, biometric appointments, and post-study work visa eligibility for international students.',
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
            slug: 'navigating-ukvi-student-visa-2026'
        },
        {
            id: 6,
            title: 'Top High-Paying Post-Graduation Career Pathways',
            category: 'Career Outcomes',
            date: '12 Aug 2026',
            readTime: '6 min read',
            excerpt: 'Explore high-demand STEM careers with 3-year post-study work rights in data science, finance, bio-tech, and renewable energy management.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            slug: 'top-high-paying-career-pathways'
        },
    ];

    // Filter posts by selectedCategory
    const filteredPosts = posts.filter(post =>
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* SECTION TITLE & FILTER COUNTER */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Latest Articles & Guides
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredPosts.length}</span> articles in category "<span className="font-bold text-slate-700 dark:text-slate-200">{selectedCategory}</span>"
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span>Updated Weekly</span>
                    </div>
                </div>

                {/* 3-COLUMN CSS GRID LAYOUT */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="group relative rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                            >
                                <div>
                                    {/* TOP: 16:9 ASPECT RATIO IMAGE WITH FULLY ROUNDED CORNERS & ZOOM */}
                                    <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

                                        {/* Category Badge Overlapping Top Image */}
                                        <div className="absolute bottom-3 left-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* MIDDLE CONTENT: TITLE & EXCERPT */}
                                    <div className="p-6 space-y-3">
                                        {/* Post Title with Line-Clamp-2 */}
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                            {post.title}
                                        </h3>

                                        {/* Excerpt with Line-Clamp-3 */}
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-normal line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </div>

                                {/* BOTTOM FOOTER: DATE & READ MORE LINK */}
                                <div className="px-6 pb-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                        <span>{post.date}</span>
                                    </div>

                                    <a
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                                    >
                                        <span>Read more</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* EMPTY CATEGORY FILTER STATE */
                    <div className="text-center py-16 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 mx-auto flex items-center justify-center">
                            <SearchX className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            No articles found in "{selectedCategory}"
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                            No blog posts matched the category filter. Try selecting "All" or another category tab above.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}
