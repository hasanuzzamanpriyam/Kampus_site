import React, { useState } from 'react';
import {
    PhoneCall,
    ClipboardCheck,
    Sparkles,
    ArrowRight,
    GraduationCap,
    X
} from 'lucide-react';

export default function ServicesCta({ onOpenBookCall }) {
    const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

    return (
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* BANNER CONTAINER WITH DEEP DARK BLUE BRAND BG & ABSTRACT SVG GRAPHICS */}
                <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-blue-500/20 overflow-hidden">
                    
                    {/* ABSTRACT BACKGROUND SVG SHAPES & GLOW ORBS */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Abstract Geometric Grid Lines SVG Overlay */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#cta-grid)" />
                    </svg>

                    <div className="relative z-10 max-w-3xl space-y-6">
                        
                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-700/50 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            <span>Start Your Global Future</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Ready to start your journey?
                        </h2>

                        {/* Paragraph */}
                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                            Book a free consultation with our expert advisors today and take the first step towards your global future. Our British Council certified counselors are here to help you get admitted into top universities.
                        </p>

                        {/* Two Buttons Side-by-Side (Mobile Stacked) */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                            {/* Primary Button (White background, Dark text) */}
                            <button
                                type="button"
                                onClick={() => window.dispatchEvent(new CustomEvent('open-book-call-modal'))}
                                className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-base shadow-xl shadow-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <PhoneCall className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                                <span>Book a Free Call</span>
                            </button>

                            {/* Secondary Button (Outline button, White border, White text) */}
                            <button
                                onClick={() => setAssessmentModalOpen(true)}
                                className="px-8 py-4 rounded-full bg-transparent hover:bg-white/10 border-2 border-white/80 hover:border-white text-white font-bold text-base shadow-xs transition-all flex items-center justify-center gap-2"
                            >
                                <ClipboardCheck className="w-5 h-5 text-blue-300" />
                                <span>Take Free Assessment</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            {/* FREE ASSESSMENT MODAL */}
            {assessmentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setAssessmentModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Take Free Assessment</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Evaluate your profile for UK, USA, Canada & Australia</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert('Assessment submitted successfully! An advisor will reach out shortly.'); setAssessmentModalOpen(false); }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number (WhatsApp)</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+880 1700 000 000"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Country</label>
                                <select className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option value="UK">United Kingdom</option>
                                    <option value="USA">United States</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-transform"
                            >
                                Submit Free Assessment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
