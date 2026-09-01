import React from 'react';
import { Mail, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactHero() {
    return (
        <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            
            {/* Ambient Background Light Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[380px] pointer-events-none overflow-hidden">
                <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[130px]" />
                <div className="absolute top-[60px] right-[15%] w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[110px]" />
            </div>

            {/* Subtle Dot Grid Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">

                {/* 2. MAIN HEADING */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
                    Get in touch with{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                        our experts
                    </span>
                </h1>

                {/* 3. SUBTITLE PARAGRAPH */}
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                    Whether you have a question about studying abroad, universities, visas, or anything else, our team is ready to answer all your questions.
                </p>

            </div>
        </section>
    );
}
