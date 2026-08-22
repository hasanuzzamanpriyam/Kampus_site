import React, { useState } from 'react';
import { Search, Phone, Handshake, Sparkles } from 'lucide-react';

export default function TopBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        } else {
            window.location.href = `/universities?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className="w-full bg-[#1E1B3A] text-white py-3 px-4 md:px-8 border-b border-slate-800/80 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                
                {/* CENTER/LEFT: WIDE ROUNDED SEARCH BAR */}
                <div className="max-w-xl lg:max-w-2xl w-full">
                    <form onSubmit={handleSearchSubmit} className="relative w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for universities & courses"
                            className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium rounded-full pl-5 pr-11 py-2.5 shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                            aria-label="Submit Search"
                        >
                            <Search className="w-4 h-4 stroke-[2.5]" />
                        </button>
                    </form>
                </div>

                {/* RIGHT SIDE: CONTACT & BECOME A PARTNER ACTION */}
                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                    
                    {/* Country Code & Phone Hotline (Hidden on extra small mobile screens) */}
                    <div className="hidden sm:flex items-center gap-2.5 text-xs font-extrabold text-white">
                        <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-md border border-purple-700/50">
                            BD
                        </span>
                        <a
                            href="tel:+8801812713814"
                            className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5 text-white" />
                            <span className="tracking-wide">+880 1812713814</span>
                        </a>
                    </div>

                    {/* Vertical Divider Line */}
                    <div className="hidden sm:block border-l border-slate-700 h-5" />

                    {/* Partner Button */}
                    <button
                        onClick={() => alert('Partner registration application opened!')}
                        className="bg-white hover:bg-slate-100 text-slate-900 dark:bg-slate-100 dark:hover:bg-white font-extrabold text-xs px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <Handshake className="w-3.5 h-3.5 text-purple-700" />
                        <span>Become a Partner</span>
                    </button>

                </div>

            </div>
        </div>
    );
}
