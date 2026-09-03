import React, { useState } from 'react';
import {
    Info,
    Image as ImageIcon,
    BookOpen
} from 'lucide-react';
import TabAbout from './TabAbout';
import TabGallery from './TabGallery';
import TabCourses from './TabCourses';

export default function UniversityTabs({
    university = {
        name: 'University of Oxford',
        established: 'Est. 1096',
        description: 'The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world\'s second-oldest university in continuous operation.',
        courses: [
            { code: 'CS101', name: 'BSc Computer Science', level: 'Undergraduate', duration: '3 Years Full-Time', tuition: '£35,000 / Year', intake: 'September 2026' },
            { code: 'DS202', name: 'MSc Data Science & AI', level: 'Postgraduate', duration: '1 Year Full-Time', tuition: '£38,500 / Year', intake: 'September 2026' },
            { code: 'MBA90', name: 'Master of Business Administration (MBA)', level: 'Postgraduate', duration: '1 Year Full-Time', tuition: '£52,000 / Year', intake: 'September 2026' },
            { code: 'ENG40', name: 'MEng Engineering Science', level: 'Undergraduate', duration: '4 Years Full-Time', tuition: '£36,200 / Year', intake: 'September 2026' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
        ]
    }
}) {
    const [activeTab, setActiveTab] = useState('about');

    const tabs = [
        { id: 'about', label: 'About', icon: Info },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'courses', label: 'Courses', icon: BookOpen },
    ];

    return (
        <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* 1. TAB MENU BAR (HORIZONTAL SCROLLABLE ON MOBILE, PILL BUTTON STYLING) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80 dark:border-slate-800">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 2. DYNAMIC CONTENT AREA CONTAINER */}
                <div className="pt-2 min-h-[350px]">
                    
                    {/* TAB 1: ABOUT */}
                    {activeTab === 'about' && (
                        <TabAbout university={university} />
                    )}

                    {/* TAB 2: GALLERY */}
                    {activeTab === 'gallery' && (
                        <TabGallery images={university.gallery} />
                    )}

                    {/* TAB 3: COURSES */}
                    {activeTab === 'courses' && (
                        <TabCourses courses={university.courses} />
                    )}
                </div>

            </div>
        </div>
    );
}
