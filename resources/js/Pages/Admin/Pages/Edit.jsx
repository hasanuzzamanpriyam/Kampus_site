import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    Save,
    ArrowLeft,
    Globe,
    Plus,
    Trash2,
    Code,
    Sliders,
    Menu,
    LayoutList
} from 'lucide-react';

export default function Edit({ page }) {
    const initialContentPairs = page.content
        ? Object.entries(page.content).map(([k, v]) => ({ key: k, value: typeof v === 'object' ? JSON.stringify(v) : v }))
        : [];

    const [contentPairs, setContentPairs] = useState(initialContentPairs);

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

    const handleAddContentPair = () => {
        setContentPairs([...contentPairs, { key: `new_field_${contentPairs.length + 1}`, value: '' }]);
    };

    const handleRemoveContentPair = (index) => {
        const updated = contentPairs.filter((_, i) => i !== index);
        setContentPairs(updated);
    };

    const handlePairChange = (index, field, value) => {
        const updated = [...contentPairs];
        updated[index][field] = value;
        setContentPairs(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const finalJson = {};
        contentPairs.forEach(p => {
            if (p.key && p.key.trim() !== '') {
                finalJson[p.key.trim()] = p.value;
            }
        });

        const payload = {
            ...data,
            content: finalJson,
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
        <AdminLayout title={`Edit Page & SEO: ${page.name}`}>
            <Head title={`Edit ${page.name} — Kampus CMS`} />

            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* HEADER ROW WITH BACK BUTTON & SUBMIT ACTION */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/pages"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to All Pages</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <a
                            href={page.slug === 'home' ? '/' : `/${page.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors"
                        >
                            <Globe className="w-4 h-4 text-blue-500" />
                            <span>Preview Live Page</span>
                        </a>

                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
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
                                        SEO & Meta Tags Configuration
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Optimize how this page appears in Google & search engine results
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

                        {/* Meta Keywords */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Meta Keywords <span className="text-slate-400 font-normal">(Comma separated)</span>
                            </label>
                            <input
                                type="text"
                                value={data.meta_keywords}
                                onChange={(e) => setData('meta_keywords', e.target.value)}
                                placeholder="study abroad, UK universities, scholarship, visa guidance"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* SECTION 2: DYNAMIC COMPONENT JSON CONTENT EDITOR */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                                    <Sliders className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Dynamic Component Content (JSON Fields)
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Edit component text variables like Hero Headings, Subtitles & Stats numbers
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddContentPair}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add New Field</span>
                            </button>
                        </div>

                        {contentPairs.length === 0 ? (
                            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center space-y-2 border border-dashed border-slate-300 dark:border-slate-700">
                                <Code className="w-8 h-8 text-slate-400 mx-auto" />
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No dynamic content fields defined yet</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Click "Add New Field" above to map custom component parameters.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {contentPairs.map((pair, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                                    >
                                        <div className="w-full sm:w-1/3">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                                Field Key / Identifier
                                            </label>
                                            <input
                                                type="text"
                                                value={pair.key}
                                                onChange={(e) => handlePairChange(idx, 'key', e.target.value)}
                                                placeholder="e.g. hero_heading"
                                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                            />
                                        </div>

                                        <div className="w-full sm:flex-1">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                                Text Value / Content
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={pair.value}
                                                onChange={(e) => handlePairChange(idx, 'value', e.target.value)}
                                                placeholder="Field content..."
                                                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveContentPair(idx)}
                                            className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors self-end sm:self-center cursor-pointer"
                                            title="Delete Field"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SUBMIT BUTTON AT BOTTOM */}
                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-transform cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving Changes...' : 'Save Page & SEO Settings'}</span>
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}
