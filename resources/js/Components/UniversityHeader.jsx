import React, { useState } from 'react';
import {
    MapPin,
    ExternalLink,
    Download,
    Send,
    Award,
    CheckCircle2,
    Building2,
    X,
    Sparkles,
    GraduationCap
} from 'lucide-react';

export default function UniversityHeader({
    university = {
        name: 'University of Oxford',
        location: 'Oxford, Oxfordshire, United Kingdom',
        website: 'https://www.ox.ac.uk',
        ranking: '#1 Times Higher Education World University Rankings',
        coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
        logoText: 'OX',
        logoBg: 'bg-blue-900 text-white',
        established: 'Est. 1096',
        type: 'Public Research University'
    }
}) {
    const [applyModalOpen, setApplyModalOpen] = useState(false);

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 transition-colors">
            
            {/* 1. FULL-WIDTH COVER IMAGE BANNER (HEIGHT 64-72) */}
            <div className="relative w-full h-64 sm:h-72 lg:h-80 bg-slate-900 overflow-hidden">
                <img
                    src={university.coverImage}
                    alt={`${university.name} Cover`}
                    className="w-full h-full object-cover opacity-85"
                />
                
                {/* Dark Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                {/* Top Ranking Badge */}
                <div className="absolute top-6 right-6">
                    <span className="px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30 shadow-md flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        <span>{university.ranking}</span>
                    </span>
                </div>
            </div>

            {/* 2. OVERLAPPING CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 sm:-mt-24 pb-8">
                <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
                    
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        
                        {/* LEFT & CENTER: LOGO & DETAILS */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
                            
                            {/* SQUARE PROFILE / LOGO IMAGE WITH PRONOUNCED OVERLAP & SHADOW */}
                            <div className="-mt-14 sm:-mt-16 shrink-0">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white dark:bg-slate-800 p-2 shadow-2xl border-4 border-white dark:border-slate-800 flex items-center justify-center overflow-hidden">
                                    <div className={`w-full h-full rounded-xl ${university.logoBg} flex flex-col items-center justify-center font-extrabold text-2xl tracking-wider shadow-inner`}>
                                        <span>{university.logoText}</span>
                                        <span className="text-[9px] font-medium text-blue-200 uppercase tracking-widest mt-0.5">
                                            {university.established}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* TEXT DETAILS */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                                        {university.type}
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    {university.name}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                                        <span>{university.location}</span>
                                    </div>

                                    <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>

                                    <a
                                        href={university.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                                    >
                                        <span>Official Website</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: ACTION BUTTONS */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                            
                            {/* Secondary Button: Download Brochure */}
                            <a
                                href="#brochure"
                                onClick={(e) => { e.preventDefault(); alert('University brochure download started!'); }}
                                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 transition-all"
                            >
                                <Download className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                <span>Download Brochure</span>
                            </a>

                            {/* Primary Button: Apply Now */}
                            <button
                                onClick={() => setApplyModalOpen(true)}
                                className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                <span>Apply Now</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* DIRECT APPLICATION MODAL */}
            {applyModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setApplyModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Apply to {university.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Fast-track official application submission</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert(`Application to ${university.name} submitted successfully!`); setApplyModalOpen(false); }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="email@example.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone (WhatsApp)</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+880 1700 000 000"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Intended Degree Level</label>
                                <select className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option value="Bachelors">Undergraduate (Bachelor's Degree)</option>
                                    <option value="Masters">Postgraduate (Master's Degree / MSc / MA)</option>
                                    <option value="PhD">Doctorate / PhD Research</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-transform"
                            >
                                Submit Official Application
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
