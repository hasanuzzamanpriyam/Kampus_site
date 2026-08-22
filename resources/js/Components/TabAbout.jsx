import React from 'react';
import {
    Calendar,
    Users,
    Award,
    Building2,
    Globe2,
    Home,
    CheckCircle2
} from 'lucide-react';

export default function TabAbout({ university }) {
    const defaultData = {
        name: university?.name || 'University of Oxford',
        founded: university?.established || 'Founded: 1096',
        students: '25,000+ Active Students',
        acceptanceRate: '15% Competitive',
        intStudents: '38% International',
        campusType: 'Historic & Urban Collegiate',
        accommodation: 'Guaranteed 1st Year Housing',
    };

    const keyFacts = [
        { label: 'Founded Year', value: defaultData.founded, icon: Calendar, color: 'text-blue-600' },
        { label: 'Student Population', value: defaultData.students, icon: Users, color: 'text-indigo-600' },
        { label: 'Acceptance Rate', value: defaultData.acceptanceRate, icon: Award, color: 'text-emerald-600' },
        { label: 'International Students', value: defaultData.intStudents, icon: Globe2, color: 'text-purple-600' },
        { label: 'Campus Type', value: defaultData.campusType, icon: Building2, color: 'text-amber-600' },
        { label: 'Student Housing', value: defaultData.accommodation, icon: Home, color: 'text-cyan-600' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* 1. SECTION HEADING */}
            <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    About {university?.name || 'the University'}
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
            </div>

            {/* 2-COLUMN GRID (PARAGRAPHS LEFT, KEY FACTS RIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* LEFT SIDE: DESCRIPTIVE PARAGRAPHS */}
                <div className="lg:col-span-7 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-base">
                    <p>
                        {university?.description || 
                            `${university?.name || 'This university'} is a world-leading institution renowned for academic excellence, ground-breaking research, and a vibrant multicultural student environment. Established with a rich history of intellectual achievement, it consistently ranks among the top global higher education destinations.`
                        }
                    </p>

                    <p>
                        With state-of-the-art laboratories, historic libraries, and modern student centers, the campus fosters an inspiring ecosystem for learning across law, medicine, engineering, business, and artificial intelligence. Students benefit from direct industry placements, research grants, and global career networking opportunities.
                    </p>

                    <p>
                        Our international admissions counselors provide direct liaison with the university's admissions office, assisting international applicants with profile evaluation, document verification, scholarship applications, and UKVI/visa compliance.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {['World-Class Faculty', 'Post-Study Work Support', 'Generous Merit Scholarships', 'Research Innovation'].map((tag, idx) => (
                            <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>{tag}</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: KEY FACTS GRID */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">Key Facts & Figures</h3>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            Verified
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {keyFacts.map((fact, i) => {
                            const IconComp = fact.icon;
                            return (
                                <div key={i} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        <IconComp className={`w-4 h-4 ${fact.color}`} />
                                        <span>{fact.label}</span>
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        {fact.value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
