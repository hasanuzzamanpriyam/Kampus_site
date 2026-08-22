import React, { useState } from 'react';
import {
    Filter,
    RotateCcw,
    Check,
    ChevronDown,
    GraduationCap,
    BookOpen,
    Globe
} from 'lucide-react';

export default function CourseFilters({ onFilterChange, initialFilters }) {
    const [selectedLevels, setSelectedLevels] = useState(initialFilters?.levels || []);
    const [selectedSubjects, setSelectedSubjects] = useState(initialFilters?.subjects || []);
    const [selectedDestinations, setSelectedDestinations] = useState(initialFilters?.destinations || []);

    const levelsOptions = ['Undergraduate', 'Postgraduate', 'Foundation', 'PhD'];
    const subjectsOptions = ['Business & Management', 'Engineering', 'Law', 'Medicine & Health', 'Computer Science'];
    const destinationsOptions = ['UK', 'USA', 'Finland', 'Dubai'];

    const notifyParent = (levels, subjects, destinations) => {
        if (onFilterChange) {
            onFilterChange({
                levels,
                subjects,
                destinations
            });
        }
    };

    const toggleLevel = (option) => {
        const next = selectedLevels.includes(option)
            ? selectedLevels.filter(item => item !== option)
            : [...selectedLevels, option];
        setSelectedLevels(next);
        notifyParent(next, selectedSubjects, selectedDestinations);
    };

    const toggleSubject = (option) => {
        const next = selectedSubjects.includes(option)
            ? selectedSubjects.filter(item => item !== option)
            : [...selectedSubjects, option];
        setSelectedSubjects(next);
        notifyParent(selectedLevels, next, selectedDestinations);
    };

    const toggleDestination = (option) => {
        const next = selectedDestinations.includes(option)
            ? selectedDestinations.filter(item => item !== option)
            : [...selectedDestinations, option];
        setSelectedDestinations(next);
        notifyParent(selectedLevels, selectedSubjects, next);
    };

    const handleClearAll = () => {
        setSelectedLevels([]);
        setSelectedSubjects([]);
        setSelectedDestinations([]);
        notifyParent([], [], []);
    };

    const hasActiveFilters = selectedLevels.length > 0 || selectedSubjects.length > 0 || selectedDestinations.length > 0;

    return (
        <aside className="w-full lg:w-80 shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6 transition-colors">
            
            {/* SIDEBAR HEADER & CLEAR ALL LINK */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        Filter Courses
                    </h3>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleClearAll}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear all</span>
                    </button>
                )}
            </div>

            {/* FILTER CATEGORY 1: STUDY LEVEL */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                    <span>Study Level</span>
                </div>
                <div className="space-y-2">
                    {levelsOptions.map((level) => {
                        const isChecked = selectedLevels.includes(level);
                        return (
                            <label
                                key={level}
                                onClick={() => toggleLevel(level)}
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                            >
                                <span className={`text-sm font-medium ${isChecked ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {level}
                                </span>

                                {/* Custom Styled Checkbox */}
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    isChecked
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs scale-105'
                                        : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                                }`}>
                                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="w-full h-px bg-slate-100 dark:bg-slate-800" />

            {/* FILTER CATEGORY 2: SUBJECT AREA */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Subject Area</span>
                </div>
                <div className="space-y-2">
                    {subjectsOptions.map((subject) => {
                        const isChecked = selectedSubjects.includes(subject);
                        return (
                            <label
                                key={subject}
                                onClick={() => toggleSubject(subject)}
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                            >
                                <span className={`text-sm font-medium ${isChecked ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {subject}
                                </span>

                                {/* Custom Styled Checkbox */}
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    isChecked
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs scale-105'
                                        : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                                }`}>
                                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="w-full h-px bg-slate-100 dark:bg-slate-800" />

            {/* FILTER CATEGORY 3: DESTINATION */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Destination</span>
                </div>
                <div className="space-y-2">
                    {destinationsOptions.map((dest) => {
                        const isChecked = selectedDestinations.includes(dest);
                        return (
                            <label
                                key={dest}
                                onClick={() => toggleDestination(dest)}
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                            >
                                <span className={`text-sm font-medium ${isChecked ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {dest}
                                </span>

                                {/* Custom Styled Checkbox */}
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    isChecked
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs scale-105'
                                        : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                                }`}>
                                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

        </aside>
    );
}
