import React from 'react';
import {
    Filter,
    RotateCcw,
    Check,
    GraduationCap,
    Globe
} from 'lucide-react';

export default function CourseFilters({
    availableLevels = [],
    availableDestinations = [],
    selectedLevels = [],
    selectedDestination = 'All',
    onLevelToggle,
    onDestinationChange,
    onClearAll,
    hasActiveFilters = false
}) {
    const defaultLevels = availableLevels.length > 0
        ? availableLevels
        : ['Undergraduate', 'Postgraduate', 'Foundation', 'PhD'];

    return (
        <aside className="w-full lg:w-80 shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6 transition-colors">
            
            {/* SIDEBAR HEADER & CLEAR ALL BUTTON */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        Filter Courses
                    </h3>
                </div>

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClearAll}
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
                <div className="space-y-1">
                    {defaultLevels.map((level) => {
                        const isChecked = selectedLevels.includes(level);
                        return (
                            <button
                                key={level}
                                type="button"
                                onClick={() => onLevelToggle && onLevelToggle(level)}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-colors cursor-pointer group ${
                                    isChecked
                                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium'
                                }`}
                            >
                                <span className="text-sm">
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
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="w-full h-px bg-slate-100 dark:bg-slate-800" />

            {/* FILTER CATEGORY 2: STUDY DESTINATION (COMPACT & SCROLLABLE) */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Study Destination</span>
                </div>

                {/* Scrollable Container */}
                <div className="max-h-[240px] overflow-y-auto pr-2 flex flex-col space-y-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                    {/* All Destinations Option */}
                    <button
                        type="button"
                        onClick={() => onDestinationChange && onDestinationChange('All')}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-colors cursor-pointer group ${
                            selectedDestination === 'All'
                                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium'
                        }`}
                    >
                        <span className="text-sm">All Destinations</span>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            selectedDestination === 'All'
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                                : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                        }`}>
                            {selectedDestination === 'All' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                    </button>

                    {/* Dynamic Database Countries */}
                    {availableDestinations.map((dest) => {
                        const isSelected = selectedDestination.toLowerCase() === dest.name.toLowerCase() ||
                                           (dest.country_code && selectedDestination.toLowerCase() === dest.country_code.toLowerCase());
                        return (
                            <button
                                key={dest.id}
                                type="button"
                                onClick={() => onDestinationChange && onDestinationChange(dest.name)}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-colors cursor-pointer group ${
                                    isSelected
                                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium'
                                }`}
                            >
                                <span className="text-sm truncate">
                                    {dest.name} {dest.country_code ? `(${dest.country_code})` : ''}
                                </span>

                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                                    isSelected
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                                        : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                                }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

        </aside>
    );
}
