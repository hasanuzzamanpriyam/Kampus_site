import React from 'react';
import { Link } from '@inertiajs/react';
import Marquee from 'react-fast-marquee';
import {
    Sparkles,
    ArrowRight,
    Award,
    BookOpen,
    GraduationCap,
    Quote
} from 'lucide-react';

export default function SuccessStories({ stories = [] }) {
    const defaultStories = [
        {
            id: 1,
            title: 'How Ayesha Secured a £10,000 Scholarship at University of Oxford',
            slug: 'ayesha-oxford-scholarship-success',
            category: 'Scholarship Winner',
            excerpt: 'From initial SOP review to the final visa interview, discover the step-by-step roadmap that helped Ayesha win a prestigious merit scholarship.',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 2,
            title: 'From Dhaka to Harvard: Tanvir’s Full-Ride MBA Acceptance Story',
            slug: 'tanvir-harvard-mba-journey',
            category: 'Ivy League Admission',
            excerpt: 'Read how Tanvir cracked the GMAT 740 and crafted standout leadership essays with our certified Ivy League admissions counselors.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 3,
            title: '100% Tuition Waiver in Finland: Farhan’s Tech Degree Pathway',
            slug: 'farhan-finland-tuition-waiver',
            category: 'Tuition Waiver',
            excerpt: 'How Farhan landed a 100% tuition waiver at University of Helsinki and brought his family on a residence permit seamlessly.',
            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 4,
            title: 'Fast-Track Dubai Tech Career: Sarah’s Global University Journey',
            slug: 'sarah-dubai-tech-career-journey',
            category: 'Fast-Track Visa',
            excerpt: 'Sarah received her unconditional offer and student visa in just 7 days to study AI in Dubai with zero income tax prospects.',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        },
    ];

    const displayStories = stories && stories.length > 0 ? stories : defaultStories;

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                
                {/* SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-2xl text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200/80 dark:border-blue-800">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>INSPIRING JOURNEYS</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Student Success Stories
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Real students, real admissions, and prestigious scholarships achieved through our personalized global mentorship.
                        </p>
                    </div>

                    <a
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group shrink-0"
                    >
                        <span>Explore all stories & guides</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

            </div>

            {/* MARQUEE CAROUSEL FOR SUCCESS STORIES */}
            <Marquee pauseOnHover={true} speed={35} gradient={false} className="py-6">
                {displayStories.map((story, i) => (
                    <div
                        key={story.id || i}
                        className="w-[340px] sm:w-[360px] shrink-0 mx-4 group relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 p-5 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between text-left"
                    >
                        <div>
                            {/* Top Image Banner with Category Badge */}
                            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 mb-4">
                                <img
                                    src={story.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                
                                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                                    {story.category || 'Success Story'}
                                </span>
                            </div>

                            {/* Title (2 lines clamp) */}
                            <h3 className="line-clamp-2 text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                {story.title}
                            </h3>

                            {/* Excerpt (3 lines clamp) */}
                            <p className="line-clamp-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                                {story.excerpt || story.content?.substring(0, 140) + '...'}
                            </p>
                        </div>

                        {/* Read Full Story Button */}
                        <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-700/80">
                            <Link
                                href={`/blog/${story.slug}`}
                                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors cursor-pointer"
                            >
                                <span>Read Full Story</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))}
            </Marquee>

        </section>
    );
}
