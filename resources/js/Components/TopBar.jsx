import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Phone, Handshake, X, Send, Sparkles, Building2, User, Mail, Globe } from 'lucide-react';
import TopbarSearch from './TopbarSearch';

export default function TopBar({ onSearch }) {
    const { props } = usePage();
    const hotline = props?.globalSettings?.contact_bd_hotline || '+880 1812713814';
    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        yearsInBusiness: '1-3 years',
        message: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        router.post('/partner/apply', {
            company_name: formData.companyName,
            contact_person: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            years_in_business: formData.yearsInBusiness,
            message: formData.message,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Thank you! Your agency partnership application has been submitted successfully. Our team will contact you shortly.');
                setFormData({
                    companyName: '',
                    contactPerson: '',
                    email: '',
                    phone: '',
                    country: '',
                    yearsInBusiness: '1-3 years',
                    message: ''
                });
                setIsPartnerModalOpen(false);
            },
            onError: () => {
                alert('There was an error submitting your application. Please check your details and try again.');
            },
            onFinish: () => {
                setIsSubmitted(false);
            }
        });
    };

    return (
        <>
            <div className="w-full bg-[#1E1B3A] text-white py-3 px-4 md:px-8 border-b border-slate-800/80 relative z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    
                    {/* CENTER/LEFT: LIVE DEBOUNCED SCOUT SEARCH */}
                    <TopbarSearch onSearch={onSearch} />

                    {/* RIGHT SIDE: CONTACT & BECOME A PARTNER ACTION */}
                    <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                        
                        {/* Country Code & Phone Hotline */}
                        <div className="hidden sm:flex items-center gap-2.5 text-xs font-extrabold text-white">
                            <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-md border border-purple-700/50">
                                BD
                            </span>
                            <a
                                href={`tel:${hotline.replace(/\s+/g, '')}`}
                                className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
                            >
                                <Phone className="w-3.5 h-3.5 text-white" />
                                <span className="tracking-wide">{hotline}</span>
                            </a>
                        </div>

                        {/* Vertical Divider Line */}
                        <div className="hidden sm:block border-l border-slate-700 h-5" />

                        {/* Partner Button: OPENS DIALOGUE POPUP MODAL */}
                        <button
                            onClick={() => setIsPartnerModalOpen(true)}
                            className="bg-white hover:bg-slate-100 text-slate-900 dark:bg-slate-100 dark:hover:bg-white font-extrabold text-xs px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                            <Handshake className="w-3.5 h-3.5 text-purple-700" />
                            <span>Become a Partner</span>
                        </button>

                    </div>

                </div>
            </div>

            {/* PARTNER REGISTRATION DIALOGUE POPUP MODAL */}
            {isPartnerModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
                        
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsPartnerModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
                            aria-label="Close dialogue"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* MODAL HEADER */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                                <Handshake className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    Become a Kampus Partner
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Join our global higher education network. Register your agency below.
                                </p>
                            </div>
                        </div>

                        {/* PARTNER REGISTRATION FORM */}
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            
                            {/* Agency Name */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                    Company / Agency Name <span className="text-purple-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    placeholder="e.g. Overseas Edu Consultancy"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            {/* Contact Person */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                    Contact Person Name <span className="text-purple-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    placeholder="e.g. Tanvir Ahmed"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            {/* Email & Phone Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        Email Address <span className="text-purple-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="partner@agency.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        Phone (WhatsApp) <span className="text-purple-600">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+880 1812713814"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Country & Years in Business Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        Country / Location <span className="text-purple-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        placeholder="e.g. Bangladesh"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        Years in Business
                                    </label>
                                    <select
                                        value={formData.yearsInBusiness}
                                        onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    >
                                        <option value="Less than 1 year">Less than 1 year</option>
                                        <option value="1-3 years">1-3 years</option>
                                        <option value="3-5 years">3-5 years</option>
                                        <option value="5+ years">5+ years</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message / Additional Information */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                    Additional Information / Notes
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us briefly about your student volume or target recruitment destinations..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-extrabold text-sm shadow-md shadow-purple-600/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer mt-2"
                            >
                                <Send className="w-4 h-4" />
                                <span>{isSubmitted ? 'Submitting Application...' : 'Submit Partner Application'}</span>
                            </button>

                        </form>

                    </div>
                </div>
            )}
        </>
    );
}
