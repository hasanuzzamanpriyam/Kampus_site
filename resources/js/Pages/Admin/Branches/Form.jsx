import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    Save,
    ArrowLeft,
    Globe2,
    Sparkles,
    MapPin,
    Building2,
    Tag,
    Clock
} from 'lucide-react';

export default function Form({ branch = null }) {
    const isEdit = Boolean(branch);

    const { data, setData, post, put, processing, errors } = useForm({
        country_code: branch?.country_code || '',
        country_name: branch?.country_name || '',
        cities: branch?.cities || '',
        status_text: branch?.status_text || 'Open Now',
        sort_order: branch?.sort_order ?? 0,
        is_active: branch ? Boolean(branch.is_active) : true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/branches/${branch.id}`);
        } else {
            post('/admin/branches');
        }
    };

    return (
        <AdminLayout title={isEdit ? `Edit Branch: ${branch.country_name}` : 'Create Global Branch'}>
            <Head title={`${isEdit ? 'Edit' : 'Create'} Branch — Kampus CMS`} />

            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER ROW */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/branches"
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Sparkles className="w-3 h-3" />
                                <span>{isEdit ? 'UPDATE GLOBAL BRANCH' : 'NEW GLOBAL BRANCH'}</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                                {isEdit ? `Edit Branch: ${branch.country_name}` : 'Create New Global Branch'}
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-all cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Saving...' : (isEdit ? 'Update Branch' : 'Save Branch')}</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* MAIN FORM CARD */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                    <Globe2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Branch Location Details
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Configure country code, name, regional cities, and live operational status
                                    </p>
                                </div>
                            </div>

                            {/* Active Status Checkbox */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={Boolean(data.is_active)}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                                />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Active & Displayed</span>
                            </label>
                        </div>

                        {/* Country Code & Country Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                    Country Code (e.g., GB, BD, US) *
                                </label>
                                <div className="relative">
                                    <Tag className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        maxLength="10"
                                        value={data.country_code}
                                        onChange={(e) => setData('country_code', e.target.value.toUpperCase())}
                                        placeholder="GB"
                                        required
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-extrabold focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                                    />
                                </div>
                                {errors.country_code && <p className="text-xs font-semibold text-rose-500 mt-1">{errors.country_code}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                    Country Name *
                                </label>
                                <div className="relative">
                                    <Globe2 className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={data.country_name}
                                        onChange={(e) => setData('country_name', e.target.value)}
                                        placeholder="United Kingdom"
                                        required
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                {errors.country_name && <p className="text-xs font-semibold text-rose-500 mt-1">{errors.country_name}</p>}
                            </div>
                        </div>

                        {/* Cities / Regional Hubs */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                Cities / Regional Hubs (e.g. London (HQ), Dhaka & Sylhet) *
                            </label>
                            <div className="relative">
                                <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={data.cities}
                                    onChange={(e) => setData('cities', e.target.value)}
                                    placeholder="London (HQ Oxford St.)"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            {errors.cities && <p className="text-xs font-semibold text-rose-500 mt-1">{errors.cities}</p>}
                        </div>

                        {/* Status Text & Sort Order Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                    Status Text (e.g., Open Now, Open 9 AM EST) *
                                </label>
                                <div className="relative">
                                    <Clock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={data.status_text}
                                        onChange={(e) => setData('status_text', e.target.value)}
                                        placeholder="Open Now"
                                        required
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                {errors.status_text && <p className="text-xs font-semibold text-rose-500 mt-1">{errors.status_text}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                    Sort Order (Ascending)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.sort_order && <p className="text-xs font-semibold text-rose-500 mt-1">{errors.sort_order}</p>}
                            </div>
                        </div>

                    </div>

                    {/* LIVE CARD PREVIEW */}
                    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                Live Component Preview
                            </span>
                            <span className="text-[10px] bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full font-bold">
                                Preview
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 1. Footer Marquee Card Preview */}
                            <div className="flex items-center justify-between p-3 border border-slate-700/50 rounded-xl bg-slate-800/30">
                                <div className="flex items-center space-x-3">
                                    <span className="font-bold text-slate-100">{data.country_code || 'GB'}</span>
                                    <span className="text-slate-300 text-sm">{data.country_name || 'United Kingdom'}</span>
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full border border-teal-500/30 text-teal-400 bg-teal-500/10">
                                    {data.status_text || 'Open Now'}
                                </span>
                            </div>

                            {/* 2. Grid Card Preview */}
                            <div className="bg-slate-800 rounded-2xl p-4 flex items-center justify-between border border-slate-700/60">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-700/80 flex items-center justify-center font-black text-sm text-white">
                                        {data.country_code || 'GB'}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm">{data.country_name || 'United Kingdom'}</div>
                                        <div className="text-xs text-slate-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-blue-400" />
                                            <span>{data.cities || 'London (HQ)'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON FOOTER */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/admin/branches"
                            className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-all cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving...' : (isEdit ? 'Update Branch' : 'Create Branch')}</span>
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}
