import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import { ShieldCheck, Calendar } from 'lucide-react';

export default function LegalPage({ title, lastUpdated, children }) {
    return (
        <Layout>
            <Head title={`${title} — Kampus EduConsult`} />

            <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12 lg:py-20 border-b border-slate-200/60 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* PAGE HEADER */}
                    <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800 space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Legal & Compliance</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {title}
                        </h1>

                        {lastUpdated && (
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                <span>Last Updated: {lastUpdated}</span>
                            </div>
                        )}
                    </div>

                    {/* MAIN READABLE CONTENT AREA WITH FULL DARK MODE SUPPORT */}
                    <div className="space-y-6 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                        {children}
                    </div>

                </div>
            </div>
        </Layout>
    );
}
