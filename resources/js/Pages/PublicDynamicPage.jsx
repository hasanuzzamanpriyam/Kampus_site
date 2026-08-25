import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import { Calendar, Sparkles } from 'lucide-react';

export default function PublicDynamicPage({ page }) {
    const metaTitle = page?.meta_title || `${page?.name} — Kampus Group`;
    const metaDescription = page?.meta_description || 'Learn more about Kampus Educational Consultancy services and programs.';
    const metaKeywords = page?.meta_keywords || 'study abroad, university admission';

    return (
        <Layout>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
            </Head>

            <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12 lg:py-20 border-b border-slate-200/60 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* PAGE HEADER */}
                    <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800 space-y-4 text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Kampus EduConsult</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {page?.name}
                        </h1>

                        {page?.updated_at && (
                            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                <span>Published Page • Updated {new Date(page.updated_at).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>

                    {/* DYNAMIC CONTENT PROSE CONTAINER */}
                    {page?.content && Object.keys(page.content).length > 0 ? (
                        <div className="prose prose-slate dark:prose-invert max-w-none mt-8 space-y-6">
                            {Object.entries(page.content).map(([key, value]) => (
                                <div key={key} className="mb-6">
                                    {key.toLowerCase().includes('heading') || key.toLowerCase().includes('title') ? (
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-2">
                                            {String(value)}
                                        </h2>
                                    ) : (
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                                            {String(value)}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No content available.</p>
                    )}

                </div>
            </div>
        </Layout>
    );
}
