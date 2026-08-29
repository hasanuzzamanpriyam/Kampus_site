import React, { useState } from 'react';
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
    Share2,
    Sparkles,
    CheckCircle2,
    Image as ImageIcon,
    Upload,
    Globe,
    Layout,
    FileText
} from 'lucide-react';

export default function Index({ settings = {} }) {
    const [logoPreview, setLogoPreview] = useState(settings.site_logo ? `/storage/${settings.site_logo}` : null);
    const [footerLogoPreview, setFooterLogoPreview] = useState(settings.footer_logo ? `/storage/${settings.footer_logo}` : null);
    const [faviconPreview, setFaviconPreview] = useState(settings.site_favicon ? `/storage/${settings.site_favicon}` : null);

    const { data, setData, post, processing } = useForm({
        // Brand & Logos
        site_name: settings.site_name || 'Kampus Edu',
        header_subtitle: settings.header_subtitle || 'Educational Consultancy',
        site_logo: null,
        footer_name: settings.footer_name || settings.site_name || 'Kampus EduConsult',
        footer_subtitle: settings.footer_subtitle || settings.site_tagline || 'Global Higher Education Advisers',
        footer_logo: null,
        site_favicon: null,
        footer_description: settings.footer_description || 'Empowering ambitious students worldwide to access top-tier university education with bespoke admissions counselling, visa support, and scholarship guidance.',
        
        // General & Header
        site_tagline: settings.site_tagline || 'Global Higher Education Advisers',
        
        // Footer Contact Information (Head Office)
        head_office_address: settings.head_office_address || settings.contact_address || '124 Education Avenue, Suite 400, Oxford Street, London W1B 3AG, United Kingdom',
        head_office_phone: settings.head_office_phone || 'UK: +44 20 7946 0912 | BD: +880 1812713814',
        
        // Other Contacts
        contact_email: settings.contact_email || 'apply@kampusedu.com',
        contact_bd_hotline: settings.contact_bd_hotline || '+880 1812713814',
        operating_hours: settings.operating_hours || 'Mon - Sat: 9:00 AM - 7:00 PM',
        
        // Social Media
        facebook_url: settings.facebook_url || 'https://facebook.com/kampusedu',
        linkedin_url: settings.linkedin_url || 'https://linkedin.com/company/kampusedu',
        instagram_url: settings.instagram_url || 'https://instagram.com/kampusedu',
        youtube_url: settings.youtube_url || 'https://youtube.com/c/kampusedu',
    });

    const handleFileChange = (field, file, previewSetter) => {
        setData(field, file);
        if (file) {
            const url = URL.createObjectURL(file);
            previewSetter(url);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            forceFormData: true,
            preserveScroll: true,
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
                            <span>GLOBAL BRAND & SITE SETTINGS</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            Website Brand & Configuration
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Manage your website logos, favicon, brand titles, footer copy, head office details, and social profiles.
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer shrink-0"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* SECTION 1: BRAND LOGOS & FAVICON */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    Brand Logos & Favicon
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Upload official brand images for the navbar header, footer, and browser favicon
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* 1. Header Logo */}
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                    Header Logo
                                </label>
                                <div className="h-24 rounded-xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center p-2 overflow-hidden">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Header Logo Preview" className="max-h-full max-w-full object-contain" />
                                    ) : (
                                        <span className="text-xs text-slate-400">No logo uploaded (using default)</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="site_logo_input"
                                    className="hidden"
                                    onChange={(e) => handleFileChange('site_logo', e.target.files[0], setLogoPreview)}
                                />
                                <label
                                    htmlFor="site_logo_input"
                                    className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                                >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Upload Header Logo</span>
                                </label>
                            </div>

                            {/* 2. Footer Logo */}
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                    Footer Logo
                                </label>
                                <div className="h-24 rounded-xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center p-2 overflow-hidden">
                                    {footerLogoPreview ? (
                                        <img src={footerLogoPreview} alt="Footer Logo Preview" className="max-h-full max-w-full object-contain" />
                                    ) : (
                                        <span className="text-xs text-slate-400">No logo uploaded (using default)</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="footer_logo_input"
                                    className="hidden"
                                    onChange={(e) => handleFileChange('footer_logo', e.target.files[0], setFooterLogoPreview)}
                                />
                                <label
                                    htmlFor="footer_logo_input"
                                    className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                                >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Upload Footer Logo</span>
                                </label>
                            </div>

                            {/* 3. Site Favicon */}
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                    Website Favicon (.ico, .png)
                                </label>
                                <div className="h-24 rounded-xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center p-2 overflow-hidden">
                                    {faviconPreview ? (
                                        <img src={faviconPreview} alt="Favicon Preview" className="w-10 h-10 object-contain" />
                                    ) : (
                                        <span className="text-xs text-slate-400">No favicon uploaded</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*,.ico"
                                    id="site_favicon_input"
                                    className="hidden"
                                    onChange={(e) => handleFileChange('site_favicon', e.target.files[0], setFaviconPreview)}
                                />
                                <label
                                    htmlFor="site_favicon_input"
                                    className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                                >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Upload Favicon</span>
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* SECTION 2: BRAND TITLES & HEADINGS */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    Brand Titles & Descriptions
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Titles and subtitles for Header, Footer, and Browser Tab
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Header Brand Name (Navbar) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                    placeholder="e.g. Kampus Edu"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Header Subtitle (Navbar)
                                </label>
                                <input
                                    type="text"
                                    value={data.header_subtitle}
                                    onChange={(e) => setData('header_subtitle', e.target.value)}
                                    placeholder="e.g. Educational Consultancy"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Footer Brand Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.footer_name}
                                    onChange={(e) => setData('footer_name', e.target.value)}
                                    placeholder="e.g. Kampus EduConsult"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Footer Subtitle / Tagline
                                </label>
                                <input
                                    type="text"
                                    value={data.footer_subtitle}
                                    onChange={(e) => setData('footer_subtitle', e.target.value)}
                                    placeholder="e.g. Global Higher Education Advisers"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Footer Brand Description *
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={data.footer_description}
                                onChange={(e) => setData('footer_description', e.target.value)}
                                placeholder="Empowering ambitious students worldwide to access top-tier university education..."
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* SECTION 3: FOOTER CONTACT INFORMATION (HEAD OFFICE CONTACT) */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    Footer Head Office Contact
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Manage the "Head Office Contact" details rendered dynamically in the global website Footer
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Head Office Address *
                                </label>
                                <textarea
                                    rows={3}
                                    required
                                    value={data.head_office_address}
                                    onChange={(e) => setData('head_office_address', e.target.value)}
                                    placeholder="124 Education Avenue, Suite 400, Oxford Street, London W1B 3AG, United Kingdom"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <p className="text-[11px] text-slate-400 mt-1">
                                    Line breaks in this textarea will be preserved in the footer layout.
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Contact Numbers (Phone / Hotline) *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={data.head_office_phone}
                                        onChange={(e) => setData('head_office_phone', e.target.value)}
                                        placeholder="UK: +44 20 7946 0912 | BD: +880 1812713814"
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: OTHER CONTACTS & HOTLINES */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    Email & Support Hotlines
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Displayed in header and topbar
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    BD Hotline (TopBar)
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
                                    <Clock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: SOCIAL MEDIA LINKS */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400">
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
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
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
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
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
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
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
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
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
