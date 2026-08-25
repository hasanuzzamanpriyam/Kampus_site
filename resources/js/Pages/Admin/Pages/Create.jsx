import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    Save,
    ArrowLeft,
    FileText,
    Plus,
    Trash2,
    Sliders
} from 'lucide-react';

export default function Create() {
    const [contentPairs, setContentPairs] = useState([
        { key: 'body_heading', value: 'Welcome to this custom page' },
        { key: 'body_text', value: 'Add your custom page description or HTML content here.' }
    ]);

    const { data, setData, processing, errors } = useForm({
        name: '',
        slug: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        is_active: true,
        show_in_navbar: false,
        show_in_footer: false,
        content: {},
    });

    const handleNameChange = (e) => {
        const val = e.target.value;
        setData((prev) => ({
            ...prev,
            name: val,
            slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        }));
    };

    const handleAddContentPair = () => {
        setContentPairs([...contentPairs, { key: `field_${contentPairs.length + 1}`, value: '' }]);
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

        router.post('/admin/pages', payload, {
            onSuccess: () => {
                alert(`Page "${data.name}" created successfully!`);
            }
        });
    };

    return (
        <AdminLayout title="Create New Page">
            <Head title="Create New Page — Kampus CMS" />

            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* HEADER ROW */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/pages"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to All Pages</span>
                    </Link>

                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Saving...' : 'Publish Page'}</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECTION 1: METADATA, SEO & NAVIGATION TOGGLES */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Page & SEO Metadata
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Define page title, route slug, and navigation visibility
                                    </p>
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={Boolean(data.is_active)}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                                />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Published</span>
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
                                    Page Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={handleNameChange}
                                    placeholder="e.g. Student Life in UK"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.name && <span className="text-xs text-rose-500 font-semibold">{errors.name}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Route Slug *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="e.g. student-life-uk"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.slug && <span className="text-xs text-rose-500 font-semibold">{errors.slug}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Meta Title Tag (SEO)
                            </label>
                            <input
                                type="text"
                                value={data.meta_title}
                                onChange={(e) => setData('meta_title', e.target.value)}
                                placeholder="e.g. Student Life in UK — Kampus Group"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Meta Description (SEO)
                            </label>
                            <textarea
                                rows={3}
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                placeholder="Summarize page purpose for search engines..."
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* SECTION 2: PAGE CONTENT FIELDS */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                                    <Sliders className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Page Content & Text Fields
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Add dynamic headings, paragraphs, or body HTML for this page
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddContentPair}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Content Field</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {contentPairs.map((pair, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                                >
                                    <div className="w-full sm:w-1/3">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Field Key / Label
                                        </label>
                                        <input
                                            type="text"
                                            value={pair.key}
                                            onChange={(e) => handlePairChange(idx, 'key', e.target.value)}
                                            placeholder="e.g. body_heading"
                                            className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="w-full sm:flex-1">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Text Value / Paragraph
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={pair.value}
                                            onChange={(e) => handlePairChange(idx, 'value', e.target.value)}
                                            placeholder="Field text or HTML content..."
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
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-transform cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Publishing...' : 'Publish Page'}</span>
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}
