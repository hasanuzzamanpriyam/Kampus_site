import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import {
    Calendar,
    Clock,
    User,
    ArrowLeft,
    Share2,
    BookOpen,
    Sparkles,
    CheckCircle2,
    ChevronRight,
    MessageSquare,
    PhoneCall,
    Bookmark
} from 'lucide-react';

export default function BlogPostDetails({ slug }) {
    // Database / Array of all blog articles
    const posts = {
        'countries-leading-in-robotics-education': {
            title: 'Countries Leading in Robotics Education',
            category: 'Destinations',
            date: 'August 21, 2026',
            readTime: '4 min read',
            author: 'Dr. Marcus Vance',
            authorRole: 'Senior Education Specialist',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
            excerpt: 'Robotics is no longer a futuristic concept. Top universities across Germany, Japan, USA & UK are offering cutting-edge robotics degrees with direct AI industry labs.',
            content: `
                <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                    Robotics and Autonomous Systems are rapidly redefining industries from precision healthcare to aerospace manufacturing. As artificial intelligence advances exponentially in 2026, international students seeking careers in robotics must choose study destinations that offer a strong balance of theoretical computer science, mechanical engineering labs, and direct industrial partnerships.
                </p>

                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">1. Germany — The Engineering Powerhouse</h2>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Germany remains the undisputed leader in European industrial automation. Institutions like the Technical University of Munich (TUM) and RWTH Aachen University offer specialized Master’s programs in Mechatronics and Robotics with tuition waivers for international students. Students gain direct access to R&D centers partnered with BMW, Siemens, and Bosch.
                </p>

                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">2. United States — AI & Autonomous Systems Hub</h2>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    The US leads in software-driven robotics, computer vision, and neural network integration. Top institutions like Carnegie Mellon University (CMU), MIT, and Stanford offer world-renowned robotics institutes. Graduates benefit from 3-year STEM OPT extensions, enabling them to work with Silicon Valley tech leaders.
                </p>

                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">3. United Kingdom — Pioneer in Surgical & Field Robotics</h2>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    UK universities like Imperial College London, University of Bristol, and University of Edinburgh lead breakthroughs in medical robotics and autonomous drone navigation. With the UK Graduate Route visa, students can stay and work in the UK for 2 years after completing their degree.
                </p>

                <div class="my-8 p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                    <h4 class="text-base font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2 mb-2">
                        💡 Key Takeaway for International Applicants
                    </h4>
                    <p class="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                        When applying for Robotics degrees, focus on programs that combine ROS (Robot Operating System), C++, Python, and physical hardware lab access. Ensure your application highlights prior coursework in linear algebra, control systems, and programming.
                    </p>
                </div>

                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">How Kampus EduConsult Helps You Apply</h2>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Our certified education advisers assist with profile evaluations, university selection, SOP writing for STEM programs, and scholarship applications across the UK, USA, Germany, and Finland.
                </p>
            `
        },
        'why-students-choose-dual-degrees': {
            title: 'Why More Students Are Choosing Dual Degrees',
            category: 'Academic Writing',
            date: 'August 21, 2026',
            readTime: '6 min read',
            author: 'Sarah Jenkins',
            authorRole: 'Higher Education Strategist',
            authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
            excerpt: 'Dual degree programs allow international students to earn qualifications from two prestigious universities simultaneously, doubling career prospects.',
            content: `
                <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                    Dual degree programs (also known as double degrees) are revolutionizing international higher education. By studying across two partnering universities—often in different countries—students gain two full diplomas in a compressed timeframe.
                </p>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Double the Global Network</h2>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Graduating with degrees from both a UK university and a European business school provides alumni connections and job market leverage in two economic zones.
                </p>
            `
        },
        'make-the-most-of-alumni-networks': {
            title: 'How to Make the Most of University Alumni Networks',
            category: 'Study Abroad',
            date: 'August 21, 2026',
            readTime: '5 min read',
            author: 'Sarah Jenkins',
            authorRole: 'Higher Education Strategist',
            authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
            excerpt: 'Learn how connecting with university alumni can unlock hidden job opportunities, mentorship, and global career growth.',
            content: `
                <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                    When choosing a university, students often focus on campus facilities and tuition fees. However, a university’s global alumni network is often its most valuable lifelong asset.
                </p>
            `
        }
    };

    // Find requested post or build fallback default post
    const defaultPost = {
        title: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'International Education Guide',
        category: 'Study Abroad Guides',
        date: 'August 2026',
        readTime: '5 min read',
        author: 'Kampus Editorial Team',
        authorRole: 'Global Education Advisers',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Comprehensive guidance for international students applying to top global universities.',
        content: `
            <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                Studying abroad opens unprecedented opportunities for personal growth, academic excellence, and international career development. Whether you are aiming for UKVI Tier 4 student visas, US F-1 STEM programs, or European tuition waivers, detailed preparation is key.
            </p>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Strategic Application Planning</h2>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Ensure your academic transcripts, statement of purpose (SOP), letters of recommendation, and English language proficiency scores (IELTS/PTE/TOEFL) are prepared 6 to 9 months before admission intakes.
            </p>
        `
    };

    const post = posts[slug] || defaultPost;

    return (
        <Layout>
            <Head title={`${post.title} — Kampus Blog`} />

            <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-10 lg:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* BREADCRUMB & BACK LINK */}
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Articles</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {/* ARTICLE TITLE */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    {/* AUTHOR & DATE METADATA ROW */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                            <img
                                src={post.authorAvatar}
                                alt={post.author}
                                className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
                            />
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">{post.author}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{post.authorRole}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <span>{post.date}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-slate-400" />
                                <span>{post.readTime}</span>
                            </span>
                        </div>
                    </div>

                    {/* FEATURED BANNER IMAGE */}
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* ARTICLE BODY PROSE */}
                    <div
                        className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CALL TO ACTION COUNSELING BOX */}
                    <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl space-y-4 my-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>FREE STUDENT COUNSELING</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-white">
                            Ready to pursue higher education abroad?
                        </h3>
                        <p className="text-sm text-blue-100 leading-relaxed max-w-2xl">
                            Our certified education advisers provide 1-on-1 guidance for university applications, merit scholarships, bank financial proof, and visa file submission.
                        </p>
                        <div className="pt-2 flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={() => window.dispatchEvent(new CustomEvent('open-book-call-modal'))}
                                className="px-6 py-3 rounded-2xl bg-white text-blue-700 font-extrabold text-xs hover:bg-blue-50 shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                            >
                                <PhoneCall className="w-4 h-4" />
                                <span>Book Free Counseling Call</span>
                            </button>
                            <Link
                                href="/universities"
                                className="px-6 py-3 rounded-2xl bg-blue-800/60 text-white font-extrabold text-xs border border-blue-400/40 hover:bg-blue-800 transition-all inline-flex items-center gap-2"
                            >
                                <span>Browse Partner Universities</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
