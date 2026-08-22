import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import BlogHero from '../Components/BlogHero';
import BlogCategories from '../Components/BlogCategories';
import BlogGrid from '../Components/BlogGrid';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Blog() {
    // State management for category filter and pagination
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <Head title="Our Blog — Study Abroad Guides & Advice" />

            {/* MAIN BLOG PAGE CONTAINER WITH TAILWIND SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                
                {/* 1. BLOG HERO WITH PROMINENT FEATURED POST */}
                <BlogHero />

                {/* 2. CATEGORIES FILTER PILL LIST */}
                <BlogCategories
                    selectedCategory={activeCategory}
                    onSelectCategory={(category) => {
                        setActiveCategory(category);
                        setCurrentPage(1);
                    }}
                />

                {/* 3. DYNAMIC FILTERED BLOG POSTS GRID */}
                <BlogGrid selectedCategory={activeCategory} />

                {/* 4. PAGINATION CONTROLS SECTION */}
                <div className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                        
                        {/* Previous Button */}
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

                        {/* Page Indicator Numbers */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold transition-all ${
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

                        {/* Next Button */}
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

                {/* 5. 5-STEP ADMISSION ROADMAP */}
                <JourneyProcess />

                {/* 6. FAQ ACCORDION SECTION */}
                <FaqSection />

            </div>
        </Layout>
    );
}
