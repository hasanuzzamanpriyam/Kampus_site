import React from 'react';
import {
    GraduationCap,
    Award,
    FileSpreadsheet,
    Compass,
    Plane,
    BookOpenCheck,
    ArrowRight,
    CheckCircle2,
    Sparkles
} from 'lucide-react';

export default function DetailedServices() {
    const services = [
        {
            number: '01',
            title: 'College & University Admission',
            description: 'We simplify the complex admission process. Our team helps you choose the right course, craft compelling SOPs, organize your documents, and submit flawless applications to top global institutions.',
            bullets: ['Profile evaluation & university shortlisting', 'Professional SOP & LOR editing', 'Fast-track application processing'],
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
            icon: GraduationCap,
            badge: 'Admissions'
        },
        {
            number: '02',
            title: 'Scholarship Assistance',
            description: 'Studying abroad doesn\'t have to be a financial burden. We identify scholarships and bursaries that match your profile and guide you through the essay writing and application deadlines.',
            bullets: ['Up to 100% tuition fee waivers', 'Merit-based & country-specific grants', 'Scholarship essay & interview prep'],
            image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1000&q=80',
            icon: Award,
            badge: 'Scholarships'
        },
        {
            number: '03',
            title: 'Financial Documentation',
            description: 'Visa approvals heavily depend on flawless financial proof. Get expert guidance on preparing bank statements, income proofs, and sponsorship letters accurately and on time.',
            bullets: ['Bank statement verification', 'UKVI & Embassy financial compliance', 'Sponsorship affidavit structuring'],
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
            icon: FileSpreadsheet,
            badge: 'Financials'
        },
        {
            number: '04',
            title: 'Career Counselling',
            description: 'Not sure what to study? We provide expert advice tailored to your academic background and career aspirations to help you find the best path for your future.',
            bullets: ['1-on-1 career mapping sessions', 'High-demand job market analysis', 'Post-graduation PR pathway advice'],
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
            icon: Compass,
            badge: 'Counselling'
        },
        {
            number: '05',
            title: 'Visa & Pre-Departure Guidance',
            description: 'Navigate the UKVI and other visa processes with confidence. Once approved, we provide travel prep, orientation, and accommodation support so you arrive ready for day one.',
            bullets: ['100% visa filing assistance', 'Mock visa interview preparation', 'Airport pickup & student accommodation'],
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80',
            icon: Plane,
            badge: 'Visa & Travel'
        },
        {
            number: '06',
            title: 'Test Preparation',
            description: 'Achieve the scores you need. We offer expert guidance and resources for IELTS, TOEFL, GRE, GMAT, and SAT to ensure you meet your university\'s entry requirements.',
            bullets: ['IELTS, TOEFL, PTE & GRE coaching', 'Comprehensive mock test series', 'University IELTS waiver guidance'],
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
            icon: BookOpenCheck,
            badge: 'Test Prep'
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECTION HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>In-Depth Service Breakdown</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Tailored consultancy services for your journey
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-base">
                        Explore how our counselors guide you from initial inquiry through to campus arrival.
                    </p>
                </div>

                {/* ZIG-ZAG ALTERNATING LIST */}
                <div className="space-y-20 lg:space-y-28">
                    {services.map((service, index) => {
                        const isEven = index % 2 === 0;
                        const IconComponent = service.icon;

                        return (
                            <div
                                key={index}
                                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                                    isEven ? '' : 'lg:flex-row-reverse'
                                }`}
                            >
                                {/* IMAGE COLUMN (ALTERNATING SIDE ON DESKTOP) */}
                                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 group">
                                        <div className="h-[300px] sm:h-[380px] w-full relative bg-slate-900">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                                loading="lazy"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                                            
                                            {/* Badge */}
                                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                                <span className="px-3.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 flex items-center gap-1.5">
                                                    <IconComponent className="w-3.5 h-3.5 text-blue-400" />
                                                    <span>{service.badge}</span>
                                                </span>
                                            </div>

                                            <div className="absolute bottom-4 right-4 text-white/50 text-4xl font-extrabold">
                                                {service.number}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* TEXT COLUMN */}
                                <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                        <span>Service {service.number}</span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-normal">
                                        {service.description}
                                    </p>

                                    {/* Bullet Points */}
                                    <div className="space-y-2.5 pt-2">
                                        {service.bullets.map((b, i) => (
                                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{b}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Link */}
                                    <div className="pt-3">
                                        <button className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group">
                                            <span>Discuss with us</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
