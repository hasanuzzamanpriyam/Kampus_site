import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import CoursesHero from '../Components/CoursesHero';
import CourseFilters from '../Components/CourseFilters';
import CourseList from '../Components/CourseList';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Courses() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        levels: [],
        subjects: [],
        destinations: []
    });

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 380, behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <Head title="Find Degree Courses — Kampus EduConsult" />

            {/* MAIN COURSES PAGE CONTAINER WITH TAILWIND SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                
                {/* 1. COURSES HERO WITH GLOBAL SEARCH BAR */}
                <CoursesHero
                    initialSearch={searchQuery}
                    onSearchChange={(val) => setSearchQuery(val)}
                    onSearchSubmit={(val) => setSearchQuery(val)}
                />

                {/* 2. PAGE LAYOUT STRUCTURE: RESPONSIVE FLEX CONTAINER (FILTERS LEFT, COURSE LIST RIGHT) */}
                <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8">
                        
                        {/* LEFT SIDE: COURSE FILTERS SIDEBAR */}
                        <CourseFilters
                            initialFilters={filters}
                            onFilterChange={(newFilters) => {
                                setFilters(newFilters);
                                setCurrentPage(1);
                            }}
                        />

                        {/* RIGHT SIDE: COURSE LIST & PAGINATION */}
                        <div className="w-full flex-1 space-y-8">
                            <CourseList
                                searchQuery={searchQuery}
                                filters={filters}
                            />

                            {/* GENERIC PAGINATION COMPONENT BELOW COURSE LIST */}
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                        currentPage === 1
                                            ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-slate-700 shadow-xs'
                                    }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Previous</span>
                                </button>

                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                    {[1, 2, 3, 4].map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-extrabold transition-all ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <span className="hidden sm:inline text-slate-400 pl-1">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                        currentPage === totalPages
                                            ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-slate-700 shadow-xs'
                                    }`}
                                >
                                    <span>Next</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. 5-STEP ADMISSION ROADMAP */}
                <JourneyProcess />

                {/* 4. FAQ ACCORDION SECTION */}
                <FaqSection />

            </div>
        </Layout>
    );
}
