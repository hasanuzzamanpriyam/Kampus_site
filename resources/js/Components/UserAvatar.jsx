import React, { useState } from 'react';

/**
 * Reusable user avatar component with dynamic initials fallback.
 * If user has an avatar image, it displays the image.
 * If no image is provided or if the image fails to load, it defaults to
 * displaying the first letters / initials of the name with a vibrant gradient.
 */
export default function UserAvatar({
    user = null,
    name = '',
    avatar = null,
    size = 'md',
    className = '',
    indicator = null, // e.g. 'online' | 'verified'
}) {
    const [imageError, setImageError] = useState(false);

    const displayName = user?.name || name || 'User';
    const avatarUrl = !imageError ? (user?.avatar || avatar || null) : null;

    // Generate initials (First letters of name)
    const getInitials = (text) => {
        if (!text) return 'U';
        const clean = text.trim();
        if (!clean) return 'U';
        const parts = clean.split(/\s+/).filter(Boolean);
        if (parts.length === 1) {
            return parts[0].slice(0, Math.min(2, parts[0].length)).toUpperCase();
        }
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const initials = user?.initials || getInitials(displayName);

    // Color gradient presets based on name hash for unique, consistent identity
    const getGradient = (text) => {
        const gradients = [
            'from-blue-600 to-indigo-600 text-white',
            'from-purple-600 to-pink-600 text-white',
            'from-emerald-600 to-teal-700 text-white',
            'from-amber-500 to-orange-600 text-white',
            'from-cyan-600 to-blue-700 text-white',
            'from-violet-600 to-purple-800 text-white',
            'from-rose-500 to-rose-700 text-white',
        ];
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = text.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % gradients.length;
        return gradients[index];
    };

    const sizeClasses = {
        xs: 'w-6 h-6 text-[10px] font-bold',
        sm: 'w-8 h-8 text-xs font-bold',
        md: 'w-10 h-10 text-sm font-extrabold',
        lg: 'w-12 h-12 text-base font-extrabold',
        xl: 'w-16 h-16 text-lg font-black',
        '2xl': 'w-20 h-20 sm:w-24 sm:h-24 text-xl sm:text-2xl font-black',
        '3xl': 'w-28 h-28 sm:w-32 sm:h-32 text-2xl sm:text-3xl font-black',
    };

    const currentSize = sizeClasses[size] || sizeClasses.md;
    const gradient = getGradient(displayName);

    return (
        <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={displayName}
                    onError={() => setImageError(true)}
                    className={`${currentSize} rounded-full object-cover ring-2 ring-white/60 dark:ring-slate-800 shadow-xs`}
                />
            ) : (
                <div
                    className={`${currentSize} rounded-full bg-gradient-to-tr ${gradient} flex items-center justify-center tracking-wider ring-2 ring-white/60 dark:ring-slate-800 shadow-xs select-none`}
                    title={displayName}
                >
                    <span>{initials}</span>
                </div>
            )}

            {/* Optional Status Indicator dot */}
            {indicator === 'verified' && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            )}
            {indicator === 'online' && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white dark:border-slate-900 rounded-full" />
            )}
        </div>
    );
}
