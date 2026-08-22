import React, { useState } from 'react';
import { Tag, Sparkles } from 'lucide-react';

export default function BlogCategories({ onSelectCategory, selectedCategory = 'All' }) {
    const [activeCategory, setActiveCategory] = useState(selectedCategory);

    const categories = [
        'All',
        'Study Abroad',
        'Career Outcomes',
        'Destinations',
        'Academic Writing',
        'Visas & Permits',
        'Scholarships'
    ];

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (onSelectCategory) {
            onSelectCategory(category);
        }
    };

    return (
        <section className="py-6 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    
                    {/* Category Label Icon */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 pr-2 border-r border-slate-200 dark:border-slate-800">
                        <Tag className="w-3.5 h-3.5 text-blue-500" />
                        <span>Filter Topics</span>
                    </div>

                    {/* HORIZONTAL SCROLLABLE CATEGORY PILL LIST */}
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none w-full">
                        {categories.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-600 scale-[1.02]'
                                            : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {isActive && <Sparkles className="w-3 h-3 text-white animate-pulse" />}
                                    <span>{category}</span>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
