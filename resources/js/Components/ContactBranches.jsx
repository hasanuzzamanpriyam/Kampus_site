import React, { useState } from 'react';
import {
    Globe,
    MapPin,
    Phone,
    Mail,
    Building2,
    X,
    Sparkles,
    ArrowRight
} from 'lucide-react';

export default function ContactBranches() {
    const [selectedBranch, setSelectedBranch] = useState(null);

    const branches = [
        { country: 'United Kingdom', flag: '🇬🇧', city: 'London (HQ)', phone: '+44 20 7423 9333', email: 'uk@kampus-group.com', address: '1st Floor, Botanical Works, 2 Jubilee Street, London E1 3FU' },
        { country: 'Bangladesh', flag: '🇧🇩', city: 'Dhaka & Sylhet', phone: '+880 1700 000 000', email: 'bd@kampus-group.com', address: 'Level 4, Banani C/A, Dhaka' },
        { country: 'India', flag: '🇮🇳', city: 'New Delhi & Mumbai', phone: '+91 11 4000 0000', email: 'india@kampus-group.com', address: 'Connaught Place, New Delhi' },
        { country: 'Ghana', flag: '🇬🇭', city: 'Accra', phone: '+233 30 200 0000', email: 'ghana@kampus-group.com', address: 'Airport Residential Area, Accra' },
        { country: 'Kenya', flag: '🇰🇪', city: 'Nairobi', phone: '+254 20 000 0000', email: 'kenya@kampus-group.com', address: 'Westlands, Nairobi' },
        { country: 'Nepal', flag: '🇳🇵', city: 'Kathmandu', phone: '+977 1 400 0000', email: 'nepal@kampus-group.com', address: 'Putalisadak, Kathmandu' },
        { country: 'Nigeria', flag: '🇳🇬', city: 'Lagos & Abuja', phone: '+234 1 000 0000', email: 'nigeria@kampus-group.com', address: 'Victoria Island, Lagos' },
        { country: 'Pakistan', flag: '🇵🇰', city: 'Lahore & Islamabad', phone: '+92 42 000 0000', email: 'pk@kampus-group.com', address: 'Gulberg III, Lahore' },
        { country: 'Sri Lanka', flag: '🇱🇰', city: 'Colombo', phone: '+94 11 000 0000', email: 'sl@kampus-group.com', address: 'Colombo 03, Sri Lanka' },
    ];

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
                        Local offices staffed by certified counselors across South Asia, Africa, and Europe.
                    </p>
                </div>

                {/* 9-COUNTRY GRID OF CLICKABLE BRANCH CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {branches.map((branch, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedBranch(branch)}
                            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3.5">
                                {/* Flag Emoji Badge */}
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                    <span>{branch.flag}</span>
                                </div>

                                <div className="space-y-0.5">
                                    <h3 className="font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base">
                                        {branch.country}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-blue-500" />
                                        <span>{branch.city}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Click Arrow Icon */}
                            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all shrink-0">
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
                            onClick={() => setSelectedBranch(null)}
                            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3.5 mb-6">
                            <div className="text-4xl p-2 rounded-2xl bg-slate-100 dark:bg-slate-800">
                                {selectedBranch.flag}
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Regional Office</span>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedBranch.country}</h3>
                                <p className="text-xs text-slate-500">{selectedBranch.city}</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs font-medium text-slate-600 dark:text-slate-300 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span>{selectedBranch.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>{selectedBranch.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <span>{selectedBranch.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={() => { alert(`Consultation request sent to ${selectedBranch.country} branch office!`); setSelectedBranch(null); }}
                                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                            >
                                Contact {selectedBranch.country} Office
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
