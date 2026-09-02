import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import {
    MapPin,
    Mail,
    Phone,
    Clock,
    Send,
    CheckCircle2,
    Sparkles,
    Building2
} from 'lucide-react';

export default function ContactContent() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        topic: 'General Inquiry',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        router.post('/contact/submit', {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            topic: formData.topic,
            message: formData.message,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Thank you for reaching out! A counselor will respond within 24 hours.');
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    topic: 'General Inquiry',
                    message: ''
                });
            },
            onError: () => {
                alert('There was an error sending your message. Please check your details and try again.');
            },
            onFinish: () => {
                setIsSubmitted(false);
            }
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* TWO-COLUMN GRID (LEFT: CONTACT FORM, RIGHT: CONTACT INFO & GOOGLE MAPS) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* LEFT COLUMN: CONTACT FORM (7 COLS ON DESKTOP) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                                Send us a message
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                Fill out the form below and our advisors will respond within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Full Name */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    Full Name <span className="text-blue-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>

                            {/* Email & Phone Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                        Email Address <span className="text-blue-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="email@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                        Phone Number <span className="text-blue-600">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+44 20 7423 9333"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Topic Select */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    Topic of Interest
                                </label>
                                <select
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="University Admission">University Admission</option>
                                    <option value="Visa & UKVI Compliance">Visa & UKVI Compliance</option>
                                    <option value="Scholarship Guidance">Scholarship Guidance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    Message <span className="text-blue-600">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us about your educational background and desired country..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>

                            {/* Solid Brand-Colored Send Message Button */}
                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                                <span>{isSubmitted ? 'Sending Message...' : 'Send Message'}</span>
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: CONTACT INFORMATION & GOOGLE MAPS PLACEHOLDER (5 COLS ON DESKTOP) */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* DISTINCT CARD CONTAINER */}
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-7 lg:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-6">
                            
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    Contact Information
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    London Global HQ & Regional Advisory Center
                                </p>
                            </div>

                            <div className="space-y-5 text-sm">
                                
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-bold uppercase text-slate-400">HQ Address</div>
                                        <div className="font-semibold text-slate-900 dark:text-white leading-snug">
                                            1st Floor, Botanical Works, 2 Jubilee Street, London E1 3FU
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-bold uppercase text-slate-400">Email Us</div>
                                        <a href="mailto:info@kampus-group.com" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                            info@kampus-group.com
                                        </a>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-bold uppercase text-slate-400">Call Us</div>
                                        <a href="tel:02074239333" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600">
                                            020 7423 9333
                                        </a>
                                    </div>
                                </div>

                                {/* Office Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-bold uppercase text-slate-400">Office Hours</div>
                                        <div className="font-semibold text-slate-900 dark:text-white">
                                            Monday - Friday: 9:00 AM - 6:00 PM GMT
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* GOOGLE MAPS EMBEDDED IFRAME PLACEHOLDER */}
                        <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200/80 dark:border-slate-800 h-52 bg-slate-900 relative">
                            <iframe
                                title="London HQ Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.915783307521!2d-0.05716182337775242!3d51.51478190950346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876033580555555%3A0x123456789abcdef!2sJubilee%20St%2C%20London!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                                className="w-full h-full border-0 opacity-90 filter grayscale-[20%] contrast-105"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
