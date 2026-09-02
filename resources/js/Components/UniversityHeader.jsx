import React from 'react';
import {
    MapPin,
    ExternalLink,
    PhoneCall,
    Award,
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
    const handleOpenBookCall = () => {
        const allButtons = Array.from(document.querySelectorAll('button'));
        const callBtn = allButtons.find(b => b.textContent.includes('Book a Call') || b.textContent.includes('Book a Free Call'));
        if (callBtn) {
            callBtn.click();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

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
                {university.ranking && (
                    <div className="absolute top-6 right-6">
                        <span className="px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30 shadow-md flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            <span>{university.ranking}</span>
                        </span>
                    </div>
                )}
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
                                    <div className={`w-full h-full rounded-xl ${university.logoBg || 'bg-blue-900 text-white'} flex flex-col items-center justify-center font-extrabold text-2xl tracking-wider shadow-inner`}>
                                        <span>{university.logoText}</span>
                                        <span className="text-[9px] font-medium text-blue-200 uppercase tracking-widest mt-0.5">
                                            {university.established}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* TEXT DETAILS */}
                            <div className="space-y-2">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    {university.name}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                                        <span>{university.location}</span>
                                    </div>

                                    {university.website && (
                                        <>
                                            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                                            <a
                                                href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                                            >
                                                <span>Official Website</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: BOOK A CALL BUTTON */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleOpenBookCall}
                                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <PhoneCall className="w-4 h-4" />
                                <span>Book a Call</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
