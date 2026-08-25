import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    Settings,
    Save,
    Building2,
    Mail,
    Phone,
    MapPin,
    Clock,
    Globe,
    Share2,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

export default function Index({ settings = {} }) {
    const { data, setData, post, processing } = useForm({
        site_name: settings.site_name || 'Kampus EduConsult',
        site_tagline: settings.site_tagline || 'Global Higher Education Advisers',
        contact_email: settings.contact_email || 'apply@kampusedu.com',
        contact_phone: settings.contact_phone || '+44 20 7946 0912',
        contact_bd_hotline: settings.contact_bd_hotline || '+880 1812713814',
        contact_address: settings.contact_address || '124 Education Avenue, Suite 400, Oxford Street, London W1B 3AG, United Kingdom',
        operating_hours: settings.operating_hours || 'Mon - Sat: 9:00 AM - 7:00 PM',
        facebook_url: settings.facebook_url || 'https://facebook.com/kampusedu',
        linkedin_url: settings.linkedin_url || 'https://linkedin.com/company/kampusedu',
        instagram_url: settings.instagram_url || 'https://instagram.com/kampusedu',
        youtube_url: settings.youtube_url || 'https://youtube.com/c/kampusedu',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            onSuccess: () => {
                alert('Global site settings saved successfully!');
            }
        });
    };

    return (
        <AdminLayout title="Global Site Settings">
            <Head title="Global Settings — Kampus CMS" />

            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* HEADER ROW */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>GLOBAL CONFIGURATION</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            Website Brand & Contact Settings
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Configure global website brand text, hotline numbers, office addresses, and social media handles.
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer shrink-0"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Saving...' : 'Save Global Settings'}</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECTION 1: GENERAL BRAND INFO */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    General Brand Info
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Main consultancy title and sub-heading
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Website Brand Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                    placeholder="e.g. Kampus EduConsult"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Brand Tagline / Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={data.site_tagline}
                                    onChange={(e) => setData('site_tagline', e.target.value)}
                                    placeholder="e.g. Global Higher Education Advisers"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: CONTACT INFORMATION & HOTLINES */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    Contact & Office Information
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Displayed in header, topbar, and website footer
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Support Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="apply@kampusedu.com"
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    UK Head Office Phone
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="+44 20 7946 0912"
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    BD Hotline Number (TopBar)
                                </label>
                                <input
                                    type="text"
                                    value={data.contact_bd_hotline}
                                    onChange={(e) => setData('contact_bd_hotline', e.target.value)}
                                    placeholder="+880 1812713814"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Operating Hours
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.operating_hours}
                                        onChange={(e) => setData('operating_hours', e.target.value)}
                                        placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <Clock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Head Office Physical Address
                            </label>
                            <textarea
                                rows={2}
                                value={data.contact_address}
                                onChange={(e) => setData('contact_address', e.target.value)}
                                placeholder="Full street address..."
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* SECTION 3: SOCIAL MEDIA LINKS */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    Social Media Profiles
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Links for footer social icons
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Facebook URL
                                </label>
                                <input
                                    type="url"
                                    value={data.facebook_url}
                                    onChange={(e) => setData('facebook_url', e.target.value)}
                                    placeholder="https://facebook.com/..."
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    value={data.linkedin_url}
                                    onChange={(e) => setData('linkedin_url', e.target.value)}
                                    placeholder="https://linkedin.com/..."
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Instagram URL
                                </label>
                                <input
                                    type="url"
                                    value={data.instagram_url}
                                    onChange={(e) => setData('instagram_url', e.target.value)}
                                    placeholder="https://instagram.com/..."
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    YouTube URL
                                </label>
                                <input
                                    type="url"
                                    value={data.youtube_url}
                                    onChange={(e) => setData('youtube_url', e.target.value)}
                                    placeholder="https://youtube.com/..."
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON AT BOTTOM */}
                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-transform cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving...' : 'Save Global Settings'}</span>
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}
