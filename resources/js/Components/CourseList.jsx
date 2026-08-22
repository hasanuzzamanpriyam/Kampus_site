import React, { useState } from 'react';
import {
    MapPin,
    Clock,
    Calendar,
    GraduationCap,
    ArrowRight,
    Sparkles,
    Building2,
    SlidersHorizontal,
    SearchX,
    X,
    Send
} from 'lucide-react';

export default function CourseList({
    searchQuery = '',
    filters = { levels: [], subjects: [], destinations: [] }
}) {
    const [sortBy, setSortBy] = useState('popularity');
    const [selectedCourseModal, setSelectedCourseModal] = useState(null);

    const allCourses = [
        {
            id: 1,
            title: 'MSc Artificial Intelligence & Data Science',
            university: 'University of Oxford',
            location: 'Oxford, UK',
            country: 'UK',
            level: 'Postgraduate',
            subject: 'Computer Science',
            duration: '1 Year Full-Time',
            intake: 'September 2026',
            fee: '£35,000 / Year',
            feeValue: 35000,
            popularity: 99,
            code: 'OX-CS01'
        },
        {
            id: 2,
            title: 'BSc Computer Science & Software Engineering',
            university: 'Harvard University',
            location: 'Cambridge, USA',
            country: 'USA',
            level: 'Undergraduate',
            subject: 'Computer Science',
            duration: '4 Years Full-Time',
            intake: 'Fall 2026',
            fee: '$54,000 / Year',
            feeValue: 54000,
            popularity: 98,
            code: 'HU-CS50'
        },
        {
            id: 3,
            title: 'Master of Business Administration (MBA)',
            university: 'Heriot-Watt University Dubai',
            location: 'Dubai, UAE',
            country: 'Dubai',
            level: 'Postgraduate',
            subject: 'Business & Management',
            duration: '1 Year Full-Time',
            intake: 'September 2026',
            fee: 'AED 95,000 / Year',
            feeValue: 25000,
            popularity: 94,
            code: 'HW-MBA'
        },
        {
            id: 4,
            title: 'LLB Bachelor of Laws (Honours)',
            university: 'University of Helsinki',
            location: 'Helsinki, Finland',
            country: 'Finland',
            level: 'Undergraduate',
            subject: 'Law',
            duration: '3 Years Full-Time',
            intake: 'September 2026',
            fee: '€13,500 / Year',
            feeValue: 13500,
            popularity: 91,
            code: 'UH-LAW'
        },
        {
            id: 5,
            title: 'MSc Robotics & Bio-Medical Engineering',
            university: 'University of Birmingham',
            location: 'Birmingham, UK',
            country: 'UK',
            level: 'Postgraduate',
            subject: 'Engineering',
            duration: '1 Year Full-Time',
            intake: 'January 2027',
            fee: '£24,500 / Year',
            feeValue: 24500,
            popularity: 92,
            code: 'UB-ENG'
        },
        {
            id: 6,
            title: 'BSc Nursing & Global Healthcare Management',
            university: 'Aalto University',
            location: 'Espoo, Finland',
            country: 'Finland',
            level: 'Undergraduate',
            subject: 'Medicine & Health',
            duration: '3.5 Years Full-Time',
            intake: 'September 2026',
            fee: '€12,000 / Year',
            feeValue: 12000,
            popularity: 89,
            code: 'AU-MED'
        },
    ];

    // Filter Logic
    const filtered = allCourses.filter(course => {
        // Search Query
        const matchesQuery = searchQuery === '' ||
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.subject.toLowerCase().includes(searchQuery.toLowerCase());

        // Level Filter
        const matchesLevel = !filters.levels || filters.levels.length === 0 ||
            filters.levels.includes(course.level);

        // Subject Filter
        const matchesSubject = !filters.subjects || filters.subjects.length === 0 ||
            filters.subjects.includes(course.subject);

        // Destination Filter
        const matchesDestination = !filters.destinations || filters.destinations.length === 0 ||
            filters.destinations.includes(course.country);

        return matchesQuery && matchesLevel && matchesSubject && matchesDestination;
    });

    // Sorting Logic
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'fee-low') return a.feeValue - b.feeValue;
        if (sortBy === 'fee-high') return b.feeValue - a.feeValue;
        return b.popularity - a.popularity;
    });

    return (
        <div className="w-full flex-1 space-y-6">
            
            {/* HEADER: RESULTS COUNT & SORT BY DROPDOWN */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                        {sorted.length}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                        {sorted.length === 1 ? 'course available' : 'courses available'}
                    </span>
                    {searchQuery && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold">
                            "{searchQuery}"
                        </span>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 w-full sm:w-auto">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
                    <span>Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        <option value="popularity">Popularity</option>
                        <option value="fee-low">Fee: Low to High</option>
                        <option value="fee-high">Fee: High to Low</option>
                    </select>
                </div>
            </div>

            {/* HORIZONTAL LIST VIEW CARDS */}
            {sorted.length > 0 ? (
                <div className="space-y-4">
                    {sorted.map((course) => (
                        <div
                            key={course.id}
                            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                        >
                            {/* LEFT SIDE: TITLE, UNIVERSITY & LOCATION */}
                            <div className="space-y-2 lg:w-5/12">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[11px] font-extrabold uppercase">
                                        {course.subject}
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-400">
                                        {course.code}
                                    </span>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                    {course.title}
                                </h3>

                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                        <Building2 className="w-3.5 h-3.5 text-blue-500" />
                                        {course.university}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                                        {course.location}
                                    </span>
                                </div>
                            </div>

                            {/* MIDDLE GRID OF SMALL DETAILS */}
                            <div className="grid grid-cols-3 gap-3 w-full lg:w-4/12 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                                <div className="space-y-0.5 text-center">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Duration</div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1">
                                        <Clock className="w-3 h-3 text-blue-500" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                <div className="space-y-0.5 text-center border-x border-slate-200/60 dark:border-slate-700/60">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Intake</div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1">
                                        <Calendar className="w-3 h-3 text-indigo-500" />
                                        <span>{course.intake}</span>
                                    </div>
                                </div>

                                <div className="space-y-0.5 text-center">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Level</div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1">
                                        <GraduationCap className="w-3 h-3 text-emerald-500" />
                                        <span>{course.level}</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE: TUITION FEE & APPLY NOW BUTTON */}
                            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-3/12 gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                                <div className="text-left lg:text-right">
                                    <div className="text-[10px] font-bold uppercase text-slate-400">Annual Tuition</div>
                                    <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                                        {course.fee}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedCourseModal(course)}
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 hover:scale-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                                >
                                    <span>Apply Now</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* EMPTY SEARCH / FILTER STATE */
                <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 mx-auto flex items-center justify-center">
                        <SearchX className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        No courses match your active filters
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Try resetting your subject or study level filters on the sidebar to discover available programmes.
                    </p>
                </div>
            )}

            {/* COURSE APPLICATION POPUP MODAL */}
            {selectedCourseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setSelectedCourseModal(null)}
                            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3.5 mb-4">
                            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-blue-600 uppercase">{selectedCourseModal.code}</span>
                                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{selectedCourseModal.title}</h3>
                                <p className="text-xs text-slate-500">{selectedCourseModal.university}</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert(`Application submitted for ${selectedCourseModal.title}!`); setSelectedCourseModal(null); }} className="space-y-4">
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1 text-xs font-medium">
                                <div className="flex justify-between"><span>Location:</span><span className="font-bold text-slate-900 dark:text-white">{selectedCourseModal.location}</span></div>
                                <div className="flex justify-between"><span>Duration:</span><span className="font-bold text-slate-900 dark:text-white">{selectedCourseModal.duration}</span></div>
                                <div className="flex justify-between"><span>Annual Fee:</span><span className="font-bold text-blue-600 dark:text-blue-400">{selectedCourseModal.fee}</span></div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                                <input type="text" required placeholder="John Doe" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                <input type="email" required placeholder="email@example.com" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm" />
                            </div>

                            <button type="submit" className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md">
                                Submit Direct Application
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
