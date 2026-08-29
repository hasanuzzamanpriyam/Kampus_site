import React from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import PageBuilder from '../../../Components/Admin/PageBuilder';
import {
    Save,
    ArrowLeft,
    Globe,
    FileText,
    Sliders,
    Sparkles
} from 'lucide-react';

export default function Edit({ page }) {
    const { data, setData, processing, errors } = useForm({
        name: page.name || '',
        slug: page.slug || '',
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
        is_active: Boolean(page.is_active),
        show_in_navbar: Boolean(page.show_in_navbar),
        show_in_footer: Boolean(page.show_in_footer),
        content: page.content || {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            is_active: data.is_active ? 1 : 0,
            show_in_navbar: data.show_in_navbar ? 1 : 0,
            show_in_footer: data.show_in_footer ? 1 : 0,
        };

        router.put(`/admin/pages/${page.id}`, payload, {
            onSuccess: () => {
                alert(`Page "${page.name}" updated successfully!`);
            }
        });
    };

    return (
        <AdminLayout title={`Edit Page & Layout: ${page.name}`}>
            <Head title={`Edit ${page.name} — Kampus CMS`} />

            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* HEADER ROW WITH BACK BUTTON & SUBMIT ACTION */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/pages"
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Sparkles className="w-3 h-3" />
                                <span>VISUAL PAGE BUILDER</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                                Customize Page: {page.name}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={page.slug === 'home' ? '/' : `/${page.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                            <Globe className="w-4 h-4 text-blue-500" />
                            <span>Preview Live Page</span>
                        </a>

                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-all cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving Changes...' : 'Save Page & SEO'}</span>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECTION 1: SEARCH ENGINE OPTIMIZATION (SEO) SETTINGS & NAVIGATION TOGGLES */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        SEO & Navigation Settings
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Configure page name, slug, search tags, and menu placement
                                    </p>
                                </div>
                            </div>

                            {/* Published Status Toggle */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={Boolean(data.is_active)}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                                />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Page Published</span>
                            </label>
                        </div>

                        {/* NAVIGATION MENU VISIBILITY TOGGLES */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                Navigation Placement:
                            </span>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(data.show_in_navbar)}
                                        onChange={(e) => setData('show_in_navbar', e.target.checked)}
                                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                                    />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Show link in Navbar</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(data.show_in_footer)}
                                        onChange={(e) => setData('show_in_footer', e.target.checked)}
                                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                                    />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Show link in Footer</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Page Display Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Route URL Slug
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Meta Title */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Meta Title Tag <span className="text-slate-400 font-normal">(Recommended 50 - 60 characters)</span>
                            </label>
                            <input
                                type="text"
                                value={data.meta_title}
                                onChange={(e) => setData('meta_title', e.target.value)}
                                placeholder="e.g. Kampus EduConsult — Global Higher Education Advisers"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.meta_title && <span className="text-xs text-rose-500 font-semibold">{errors.meta_title}</span>}
                        </div>

                        {/* Meta Description */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Meta Description <span className="text-slate-400 font-normal">(Recommended 120 - 160 characters)</span>
                            </label>
                            <textarea
                                rows={3}
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                placeholder="Summarize page content for search engines..."
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.meta_description && <span className="text-xs text-rose-500 font-semibold">{errors.meta_description}</span>}
                        </div>
                    </div>

                    {/* SECTION 2: DYNAMIC VISUAL PAGE BUILDER & SECTIONS */}
                    <PageBuilder
                        content={data.content}
                        onChange={(newContent) => setData('content', newContent)}
                    />

                    {/* SUBMIT BUTTON AT BOTTOM */}
                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-transform cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving Changes...' : 'Save Page & Publish'}</span>
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}
