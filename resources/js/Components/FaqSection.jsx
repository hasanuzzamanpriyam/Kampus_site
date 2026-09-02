import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
    Plus,
    Minus,
    HelpCircle,
    MessageCircle,
    PhoneCall
} from 'lucide-react';

export default function FaqSection({
    faqs = null,
    badge = 'Got Questions? We Have Answers',
    title = 'Frequently asked questions',
    subtitle = 'Everything you need to know about study abroad admissions, scholarships, and visa processing.'
}) {
    const { props } = usePage();
    const activeFaqs = (faqs && Array.isArray(faqs) && faqs.length > 0) ? faqs : (props?.faqs || []);

    const [openFaqId, setOpenFaqId] = useState(activeFaqs.length > 0 ? (activeFaqs[0].id || 0) : null);

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    if (!activeFaqs || activeFaqs.length === 0) {
        return null;
    }

    return (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {title}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-base">
                        {subtitle}
                    </p>
                </div>

                {/* DYNAMIC ACCORDION CONTAINER */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-2">
                    {activeFaqs.map((faq, index) => {
                        const faqIdentifier = faq.id !== undefined ? faq.id : index;
                        const isOpen = openFaqId === faqIdentifier;

                        return (
                            <div
                                key={faqIdentifier}
                                className="border-b border-slate-100 dark:border-slate-800/80 last:border-none pb-2 pt-2"
                            >
                                {/* Clickable Header */}
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(faqIdentifier)}
                                    className="w-full text-left py-4 px-3 flex items-center justify-between gap-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none group cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-base sm:text-lg font-bold transition-colors ${
                                        isOpen
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                    }`}>
                                        {faq.question}
                                    </span>

                                    {/* Plus / Minus Indicator Icon */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                                        isOpen
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-950 group-hover:text-blue-600'
                                    }`}>
                                        {isOpen ? (
                                            <Minus className="w-4 h-4 transition-transform" />
                                        ) : (
                                            <Plus className="w-4 h-4 transition-transform" />
                                        )}
                                    </div>
                                </button>

                                {/* Collapsible Body with Smooth Grid Animation */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-3 pb-5 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Help Contact Box */}
                <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-left">
                        <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white text-base">Still have questions?</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Can't find the answer you're looking for? Speak with our admissions desk.</div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const callBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Book a Call') || b.textContent.includes('Book a Free Call'));
                            if (callBtn) callBtn.click();
                        }}
                        className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer"
                    >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Ask a Counselor</span>
                    </button>
                </div>

            </div>
        </section>
    );
}
