import React from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function TabGallery({ images }) {
    const galleryItems = images || [
        {
            url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
            caption: 'Historic Campus Quadrangle & Radcliffe Camera'
        },
        {
            url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
            caption: 'Bodleian Library & Research Study Hall'
        },
        {
            url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
            caption: 'Modern AI & Science Research Center'
        },
        {
            url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
            caption: 'Student Residence Halls & Living Quarters'
        },
        {
            url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            caption: 'International Student Activity Center'
        },
        {
            url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
            caption: 'Lecture Theatre & Academic Auditorium'
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Campus Life & Facilities Gallery
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Explore historic libraries, modern laboratories, student dormitories, and vibrant campus quads.
                </p>
            </div>

            {/* 6-IMAGE MASONRY / CSS GRID (2 COLUMNS MOBILE, 3-4 COLUMNS DESKTOP) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {galleryItems.map((item, idx) => {
                    const imageUrl = typeof item === 'string' ? item : item.url;
                    const captionText = typeof item === 'string' ? `Campus View ${idx + 1}` : item.caption;

                    return (
                        <div
                            key={idx}
                            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-900"
                        >
                            <img
                                src={imageUrl}
                                alt={captionText}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                                loading="lazy"
                            />
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                            {/* Hover Caption */}
                            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                                <div className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
                                    <ImageIcon className="w-3 h-3" />
                                    <span>Facility Photo {idx + 1}</span>
                                </div>
                                <div className="text-sm font-semibold leading-snug">
                                    {captionText}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
