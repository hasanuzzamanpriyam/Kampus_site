import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    FileText,
    Globe,
    Edit3,
    Plus,
    CheckCircle2,
    XCircle,
    Sparkles,
    Eye,
    Trash2
} from 'lucide-react';

export default function Index({ pages = [] }) {
    const coreSlugs = [
        '/',
        'home',
        'about',
        'services',
        'universities',
        'courses',
        'blog',
        'contact',
        'partner-with-us',
        'partner',
        'scholarships',
        'visa-guide',
        'privacy-policy',
        'terms-of-service',
        'terms',
        'cookie-preferences',
        'accreditation'
    ];

    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete the page "${name}"? All its content will be permanently lost.`)) {
            router.delete(`/admin/pages/${id}`);
        }
    };

    return (
        <AdminLayout title="Pages & SEO Management">
            <Head title="Pages & SEO — Kampus CMS" />

            <div className="space-y-6">
                
                {/* HEADER ROW WITH ADD NEW PAGE BUTTON */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>CMS CONTENT ENGINE</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            Dynamic Pages & SEO Settings
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Configure page titles, meta descriptions, search keywords, and dynamic content text.
                        </p>
                    </div>

                    <Link
                        href="/admin/pages/create"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Page</span>
                    </Link>
                </div>

                {/* PAGES LIST TABLE */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                    <th className="py-4 px-6 font-extrabold">Page Name</th>
                                    <th className="py-4 px-6 font-extrabold">Route Slug</th>
                                    <th className="py-4 px-6 font-extrabold">Meta Title (SEO)</th>
                                    <th className="py-4 px-6 font-extrabold">Status</th>
                                    <th className="py-4 px-6 font-extrabold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                {pages.map((p) => {
                                    const isCore = coreSlugs.includes(String(p.slug).toLowerCase());

                                    return (
                                        <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                            
                                            {/* Page Name */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold border border-blue-100 dark:border-slate-700">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-extrabold text-slate-900 dark:text-white text-base">
                                                                {p.name}
                                                            </span>
                                                            {isCore && (
                                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                                    System Core
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-[11px] text-slate-400">
                                                            {p.content ? `${Object.keys(p.content).length} Dynamic Fields` : 'No custom fields'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Slug */}
                                            <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                                                /{p.slug === 'home' ? '' : p.slug}
                                            </td>

                                            {/* Meta Title */}
                                            <td className="py-4 px-6 max-w-xs truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                                                {p.meta_title || <span className="italic text-slate-400">Not configured</span>}
                                            </td>

                                            {/* Status */}
                                            <td className="py-4 px-6">
                                                {p.is_active ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        <span>Active</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                                                        <XCircle className="w-3.5 h-3.5" />
                                                        <span>Disabled</span>
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a
                                                        href={p.slug === 'home' ? '/' : `/${p.slug}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-bold"
                                                        title="Preview Live Page"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </a>

                                                    <Link
                                                        href={`/admin/pages/${p.id}/edit`}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                        <span>Edit</span>
                                                    </Link>

                                                    {/* Render Delete button ONLY for non-core custom pages */}
                                                    {!isCore && (
                                                        <button
                                                            onClick={() => handleDelete(p.id, p.name)}
                                                            className="inline-flex items-center gap-1 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/80 transition-colors text-xs font-bold cursor-pointer"
                                                            title="Delete Page"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
