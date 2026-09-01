import React from 'react';
import { Link } from '@inertiajs/react';
import Marquee from 'react-fast-marquee';
import {
    Globe,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Building2
} from 'lucide-react';

export default function Destinations({ countries = [] }) {
    const defaultDestinations = [
        {
            id: 1,
            name: 'United Kingdom',
            slug: 'united-kingdom',
            country_code: 'GB',
            subtitle: '150+ Partner Universities',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
            features: ['Up to 3 Years Post-Study Work Visa', 'Scholarships up to £10,000'],
        },
        {
            id: 2,
            name: 'United States',
            slug: 'united-states',
            country_code: 'US',
            subtitle: '200+ Top Ranked Colleges',
            image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
            features: ['3-Year STEM OPT Extension', 'Merit Aid & Assistantships'],
        },
        {
            id: 3,
            name: 'Finland',
            slug: 'finland',
            country_code: 'FI',
            subtitle: '98% Visa Success Rate',
            image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80',
            features: ['PR Pathway After Graduation', '50-100% Tuition Waivers'],
        },
        {
            id: 4,
            name: 'United Arab Emirates',
            slug: 'united-arab-emirates',
            country_code: 'AE',
            subtitle: 'Global Tech & Business Hubs',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
            features: ['100% Fast Student Visa', 'Tax-Free Career Opportunities'],
        },
        {
            id: 5,
            name: 'Canada',
            slug: 'canada',
            country_code: 'CA',
            subtitle: 'Post-Study Work Permits',
            image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
            features: ['3-Year Post-Grad Work Permit', 'Express Entry PR Pathway'],
        },
        {
            id: 6,
            name: 'Australia',
            slug: 'australia',
            country_code: 'AU',
            subtitle: 'High Quality Education',
            image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
            features: ['Post-Study Work Rights', 'High Quality Life & Study'],
        },
    ];

    const displayList = countries && countries.length > 0 ? countries : defaultDestinations;

    const renderCard = (c, indexKey) => {
        const bulletPoints = Array.isArray(c.features) && c.features.length > 0
            ? c.features
            : ['Top Ranked Accredited Institutions', 'Post-Study Work & Visa Guidance'];

        return (
            <div
                key={indexKey}
                className="group/card relative w-[250px] md:w-[300px] h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between shrink-0 mx-3"
            >
                {/* Background Image with Smooth Scale Zoom */}
                <div className="absolute inset-0 bg-slate-950">
                    <img
                        src={c.image || 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'}
                        alt={`Study in ${c.name}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-80"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                </div>

                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 opacity-90 group-hover/card:opacity-95 transition-opacity" />

                {/* Top Badges: Country Code & Featured */}
                <div className="relative z-10 p-5 flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/30 font-mono shadow-sm">
                        {c.country_code || 'DEST'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/80 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>FEATURED</span>
                    </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 space-y-4">
                    <div>
                        <div className="text-[11px] font-extrabold text-blue-400 uppercase tracking-wider mb-1">
                            Study Destination
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover/card:text-blue-300 transition-colors whitespace-normal">
                            {c.name}
                        </h3>
                        {c.subtitle && (
                            <p className="text-xs text-slate-300 font-medium mt-1 whitespace-normal">
                                {c.subtitle}
                            </p>
                        )}
                    </div>

                    {/* Features Bullet List */}
                    <div className="space-y-2 pt-3 border-t border-white/15 text-xs text-slate-200 font-medium whitespace-normal">
                        {bulletPoints.slice(0, 2).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span className="line-clamp-1">{feat}</span>
                            </div>
                        ))}
                    </div>

                    {/* Action Button: Explore Universities */}
                    <div className="pt-2">
                        <Link
                            href={`/destinations/${c.slug}`}
                            className="w-full py-2.5 px-4 rounded-2xl bg-white/15 hover:bg-white text-white hover:text-slate-900 font-extrabold text-xs backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 transition-all group-hover/card:shadow-md cursor-pointer"
                        >
                            <span>Explore Universities</span>
                            <ArrowRight className="w-4 h-4 group-hover/card:translate-x-1.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800 transition-colors overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                
                {/* SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Explore top study destinations
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 text-base">
                            Discover world-leading universities, generous scholarship options, and post-graduation career opportunities in your preferred country.
                        </p>
                    </div>

                    <a
                        href="/universities"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group shrink-0"
                    >
                        <span>View all partner universities</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

            </div>

            {/* SEAMLESS INFINITE MARQUEE CAROUSEL POWERED BY REACT-FAST-MARQUEE */}
            <Marquee pauseOnHover={true} speed={40} gradient={false} className="py-4">
                {displayList.map((country, i) => renderCard(country, country.id || i))}
            </Marquee>

        </section>
    );
}
