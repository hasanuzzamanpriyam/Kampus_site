import React from 'react';
import {
    GraduationCap,
    Award,
    FileSpreadsheet,
    Compass,
    PlaneTakeoff,
    BookOpenCheck,
    ArrowRight,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

export default function ServicesGrid() {
    const services = [
        {
            title: 'College & University Admission',
            description: 'Direct university applications with fast-track offer letters, profile evaluation, and course matching.',
            icon: GraduationCap,
            iconBg: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
            badge: 'Fast-Track'
        },
        {
            title: 'Scholarship Assistance',
            description: 'Guidance on merit-based, country-specific, and fully funded university scholarship applications.',
            icon: Award,
            iconBg: 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
            badge: 'Up to 100%'
        },
        {
            title: 'Financial Documentation',
            description: 'Expert advice on bank statement verification, sponsor documentation, and visa financial compliance.',
            icon: FileSpreadsheet,
            iconBg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
            badge: '100% Compliant'
        },
        {
            title: 'Career Counselling',
            description: 'Personalized 1-on-1 career mapping to choose degrees with high post-graduation employment rates.',
            icon: Compass,
            iconBg: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400',
            badge: '1-on-1 Session'
        },
        {
            title: 'Pre-Departure Guidance',
            description: 'Comprehensive briefing on accommodation, airport pickup, currency exchange, and cultural adjustment.',
            icon: PlaneTakeoff,
            iconBg: 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
            badge: 'Full Support'
        },
        {
            title: 'Test Preparation',
            description: 'Structured training materials, mock tests, and coaching for IELTS, TOEFL, PTE, GRE, and SAT exams.',
            icon: BookOpenCheck,
            iconBg: 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400',
            badge: 'Top Scores'
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-slate-700">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Comprehensive Student Services</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        How we help — <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">End-to-end support</span>, every step of the way
                    </h2>

                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        From choosing your dream course to landing safely at your target university campus, our senior counselors are here to manage every detail.
                    </p>
                </div>

                {/* 3-COLUMN SERVICES GRID WITH DARK MODE CARD VARIATIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={index}
                                className="group relative p-7 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    {/* Icon & Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className={`p-3.5 rounded-2xl ${service.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs">
                                            {service.badge}
                                        </span>
                                    </div>

                                    {/* Service Title */}
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Service Description */}
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Learn More Action Link */}
                                <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                                    <span className="group-hover:underline">Explore Service</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Trust CTA */}
                <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 hidden sm:block" />
                        <div>
                            <div className="font-bold text-base">Need customized help with your application?</div>
                            <div className="text-xs text-slate-300">Book a free 1-on-1 session with our senior education counselor today.</div>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-all whitespace-nowrap cursor-pointer">
                        Book Free Consultation
                    </button>
                </div>

            </div>
        </section>
    );
}
