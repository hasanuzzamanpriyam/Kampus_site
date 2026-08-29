import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
    Globe,
    MapPin,
    Phone,
    Mail,
    Building2,
    X,
    Sparkles,
    ArrowRight,
    Clock
} from 'lucide-react';

export default function ContactBranches() {
    const { props } = usePage();
    const [selectedBranch, setSelectedBranch] = useState(null);

    const fallbackBranches = [
        { id: 1, country_code: 'GB', country_name: 'United Kingdom', cities: 'London (HQ Oxford St.)', status_text: 'Open Now' },
        { id: 2, country_code: 'BD', country_name: 'Bangladesh', cities: 'Dhaka & Sylhet', status_text: 'Open Now' },
        { id: 3, country_code: 'US', country_name: 'United States', cities: 'New York & Texas', status_text: 'Open 9 AM EST' },
        { id: 4, country_code: 'CA', country_name: 'Canada', cities: 'Toronto & Vancouver', status_text: 'Open 9 AM EST' },
        { id: 5, country_code: 'AU', country_name: 'Australia', cities: 'Sydney & Melbourne', status_text: 'Open 9 AM AEST' },
        { id: 6, country_code: 'FI', country_name: 'Finland', cities: 'Helsinki', status_text: 'Open 9 AM EET' },
        { id: 7, country_code: 'AE', country_name: 'United Arab Emirates', cities: 'Dubai', status_text: 'Open 9 AM GST' },
        { id: 8, country_code: 'NG', country_name: 'Nigeria', cities: 'Lagos & Abuja', status_text: 'Open 9 AM WAT' },
        { id: 9, country_code: 'IN', country_name: 'India', cities: 'New Delhi & Mumbai', status_text: 'Open 9:30 AM IST' },
    ];

    const branches = (props?.globalBranches && props.globalBranches.length > 0)
        ? props.globalBranches
        : fallbackBranches;

    return (
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* CENTERED HEADING */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
                        <Globe className="w-3.5 h-3.5" />
                        <span>GLOBAL ADVISORY NETWORK</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Our Global Branches
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                        Local offices staffed by certified counselors across South Asia, Africa, Europe, and North America.
                    </p>
                </div>

                {/* DYNAMIC GRID OF CLICKABLE BRANCH CARDS (image_30f12a.png style) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {branches.map((branch) => (
                        <div
                            key={branch.id || branch.country_code}
                            onClick={() => setSelectedBranch(branch)}
                            className="bg-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:bg-slate-700 transition cursor-pointer shadow-md border border-slate-700/60"
                        >
                            <div className="flex items-center gap-3.5 min-w-0">
                                {/* Square Country Code Badge */}
                                <div className="w-12 h-12 rounded-xl bg-slate-700 font-extrabold text-white flex items-center justify-center text-sm shrink-0 border border-slate-600 group-hover:scale-105 transition-transform">
                                    {branch.country_code}
                                </div>

                                <div className="space-y-0.5 min-w-0">
                                    <h3 className="font-extrabold text-white group-hover:text-blue-400 transition-colors text-base truncate">
                                        {branch.country_name}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1 truncate">
                                        <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                                        <span className="truncate">{branch.cities}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Right Arrow Icon */}
                            <div className="w-8 h-8 rounded-full bg-slate-700/60 text-slate-300 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all shrink-0 ml-3">
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* BRANCH DETAILS MODAL */}
            {selectedBranch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            type="button"
                            onClick={() => setSelectedBranch(null)}
                            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3.5 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                                {selectedBranch.country_code}
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Regional Office</span>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedBranch.country_name}</h3>
                                <p className="text-xs text-slate-500">{selectedBranch.cities}</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs font-medium text-slate-600 dark:text-slate-300 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2.5">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span>{selectedBranch.cities} Regional Center</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                                    <span className="text-teal-600 dark:text-teal-400 font-bold">{selectedBranch.status_text || 'Open Now'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedBranch(null);
                                    window.dispatchEvent(new CustomEvent('open-book-call-modal'));
                                }}
                                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
                            >
                                Book Consultation for {selectedBranch.country_name}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
