import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import { ArrowLeft, Save, Globe, Sparkles } from 'lucide-react';

export default function Form({ country = null }) {
    const isEdit = !!country;

    const { data, setData, post, put, processing, errors } = useForm({
        name: country?.name || '',
        slug: country?.slug || '',
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setData((prev) => ({
            ...prev,
            name: value,
            slug: !isEdit && !prev.slugIsCustom ? value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(`/admin/countries/${country.id}`);
        } else {
            post('/admin/countries');
        }
    };

    return (
        <AdminLayout title={isEdit ? `Edit Country: ${country.name}` : 'Create Destination Country'}>
            <Head title={`${isEdit ? 'Edit Country' : 'Create Country'} — Kampus CMS`} />

            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* HEADER NAV & ACTION */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/countries"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Countries List</span>
                    </Link>
                </div>

                {/* MAIN FORM CARD */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{isEdit ? 'UPDATE DESTINATION' : 'NEW DESTINATION'}</span>
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                            {isEdit ? 'Edit Destination Details' : 'Add New Destination Country'}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Set up country names and URL slugs used to group universities and study destinations.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* COUNTRY NAME */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Country Name <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={handleNameChange}
                                    placeholder="e.g. United Kingdom, Finland, United States"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs font-semibold text-rose-500 pt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* URL SLUG */}
                        <div className="space-y-2">
                            <label htmlFor="slug" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                URL Slug <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
                                    /
                                </div>
                                <input
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="e.g. united-kingdom"
                                    required
                                    className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            {errors.slug && (
                                <p className="text-xs font-semibold text-rose-500 pt-1">{errors.slug}</p>
                            )}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                            <Link
                                href="/admin/countries"
                                className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Saving...' : isEdit ? 'Update Country' : 'Create Country'}</span>
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </AdminLayout>
    );
}
