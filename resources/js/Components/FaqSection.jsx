import React, { useState } from 'react';
import {
    Plus,
    Minus,
    HelpCircle,
    MessageCircle,
    PhoneCall,
    Sparkles
} from 'lucide-react';

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    const faqs = [
        {
            question: 'Where can I study?',
            answer: 'We partner with over 500+ top-ranked universities across the UK, USA, Canada, Australia, Finland, and Dubai (UAE). Our senior education counselors analyze your academic background, budget, and career goals to shortlist the ideal target destinations.'
        },
        {
            question: 'Can I get a scholarship?',
            answer: 'Yes! Most of our partner universities offer merit-based scholarships, country-specific grants, and tuition fee waivers ranging from £2,000 up to 100% full tuition coverage. We guide you through writing compelling personal statements and scholarship applications.'
        },
        {
            question: 'How much does it cost to live in the UK?',
            answer: 'According to UKVI student visa guidelines, living costs in the UK are estimated at approximately £9,207 per academic year (outside London) and £12,006 per academic year (inside London). This budget covers accommodation, food, utilities, and daily travel.'
        },
        {
            question: 'Are Kampus consultancy services really 100% free?',
            answer: 'Yes, 100%! Our counseling, university application processing, document review, and visa guidance services are completely free for students. We are officially contracted and funded directly by our partner universities globally.'
        },
        {
            question: 'What are the English language test requirements?',
            answer: 'Universities accept IELTS (typically 6.0 – 7.0 overall), TOEFL iBT, PTE Academic, or Duolingo English Tests. Additionally, several UK and European universities offer IELTS waivers based on high school or undergraduate Medium of Instruction (MOI) certificates.'
        },
        {
            question: 'How long does it take to get a university offer letter?',
            answer: 'Conditional offer letters are usually issued within 48 hours to 2 weeks, depending on the university and course selection. Our fast-track application system ensures your application is processed with priority.'
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Got Questions? We Have Answers</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Frequently asked questions
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-base">
                        Everything you need to know about study abroad admissions, scholarships, and visa processing.
                    </p>
                </div>

                {/* ACCORDION CONTAINER */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-2">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border-b border-slate-100 dark:border-slate-800/80 last:border-none pb-2 pt-2"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left py-4 px-3 flex items-center justify-between gap-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none group"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-base sm:text-lg font-bold transition-colors ${
                                        isOpen
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                    }`}>
                                        {faq.question}
                                    </span>

                                    {/* Plus Icon that rotates when opened */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                                        isOpen
                                            ? 'bg-blue-600 text-white rotate-45 shadow-md shadow-blue-600/30'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-950 group-hover:text-blue-600'
                                    }`}>
                                        <Plus className="w-5 h-5 transition-transform" />
                                    </div>
                                </button>

                                {/* Animated Expandable Answer */}
                                {isOpen && (
                                    <div className="px-3 pb-5 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                                        {faq.answer}
                                    </div>
                                )}
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
                    <button className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2">
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Ask a Counselor</span>
                    </button>
                </div>

            </div>
        </section>
    );
}
