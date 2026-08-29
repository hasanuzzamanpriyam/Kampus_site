import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ConsultationBanner({
    title = 'Need customized help with your application?',
    subtitle = 'Book a free 1-on-1 session with our senior education counselor today.',
    buttonText = 'Book Free Consultation',
    className = 'mt-14'
}) {
    const handleOpenModal = () => {
        window.dispatchEvent(new CustomEvent('open-book-call-modal'));
    };

    return (
        <div className={`p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${className}`}>
            <div className="flex items-center gap-3 text-center sm:text-left">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 hidden sm:block" />
                <div>
                    <div className="font-bold text-base">{title}</div>
                    <div className="text-xs text-slate-300">{subtitle}</div>
                </div>
            </div>
            <button
                type="button"
                onClick={handleOpenModal}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-all whitespace-nowrap cursor-pointer"
            >
                {buttonText}
            </button>
        </div>
    );
}
