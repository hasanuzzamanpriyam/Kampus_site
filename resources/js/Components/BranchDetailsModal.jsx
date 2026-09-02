import React, { useEffect } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    X,
    ExternalLink,
    Sparkles
} from 'lucide-react';

export const extractMapUrl = (input, fallbackAddress = '') => {
    if (input) {
        const match = input.match(/src=["']([^"']+)["']/);
        if (match && match[1]) return match[1];
        if (input.trim().startsWith('http')) return input.trim();
    }
    
    if (fallbackAddress) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(fallbackAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }

    return null;
};

export default function BranchDetailsModal({ branch, onClose }) {
    if (!branch) return null;

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const fallbackQuery = (branch.address ? `${branch.address}, ` : '') + `${branch.cities}, ${branch.country_name}`;
    const mapSrc = extractMapUrl(branch.map_iframe, fallbackQuery);
    const googleMapsDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackQuery)}`;

    const handleAction = () => {
        onClose();
        if (branch.booking_url) {
            window.open(branch.booking_url, '_blank', 'noopener,noreferrer');
        } else {
            window.dispatchEvent(new CustomEvent('open-book-call-modal'));
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
                
                {/* CLOSE BUTTON */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer z-10"
                    aria-label="Close branch modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* HEADER: COUNTRY BADGE & TITLES */}
                <div className="flex items-center gap-3.5 mb-5 pr-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
                        {branch.country_code}
                    </div>
                    <div className="min-w-0">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                            REGIONAL OFFICE
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                            {branch.country_name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {branch.cities}
                        </p>
                    </div>
                </div>

                {/* DETAILS CONTAINER CARD */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3 text-xs font-medium text-slate-600 dark:text-slate-300 mb-4">
                    
                    {/* Address */}
                    <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Office Address</span>
                            <span className="font-semibold text-slate-900 dark:text-white leading-snug block">
                                {branch.address || `${branch.cities} Regional Center`}
                            </span>
                        </div>
                    </div>

                    {/* Phone Number */}
                    {branch.phone && (
                        <div className="flex items-start gap-2.5">
                            <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Phone / WhatsApp</span>
                                <a 
                                    href={`tel:${branch.phone.replace(/\s+/g, '')}`} 
                                    className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                                >
                                    {branch.phone}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    {branch.email && (
                        <div className="flex items-start gap-2.5">
                            <Mail className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Direct Email</span>
                                <a 
                                    href={`mailto:${branch.email}`} 
                                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline block truncate"
                                >
                                    {branch.email}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Operating Status */}
                    <div className="flex items-center gap-2.5 pt-1 border-t border-slate-200/60 dark:border-slate-700/50">
                        <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                        <span className="text-teal-600 dark:text-teal-400 font-bold">
                            {branch.status_text || 'Open Now'}
                        </span>
                    </div>

                </div>

                {/* INTERACTIVE MAP LOCATION */}
                {mapSrc && (
                    <div className="space-y-1.5 mb-5">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Branch Location Map
                            </span>
                            <a
                                href={googleMapsDirectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                            >
                                <span>Open in Maps</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-44 bg-slate-900 shadow-inner relative">
                            <iframe
                                title={`${branch.country_name} Branch Location`}
                                src={mapSrc}
                                className="w-full h-full border-0 opacity-90 filter contrast-105"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                )}

                {/* BOOK CONSULTATION BUTTON */}
                <div>
                    <button
                        type="button"
                        onClick={handleAction}
                        className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>Book Consultation for {branch.country_name}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
