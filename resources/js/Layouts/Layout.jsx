import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '../Contexts/ThemeProvider';
import TopBar from '../Components/TopBar';
import {
    GraduationCap,
    Globe,
    Sparkles,
    PhoneCall,
    Calendar,
    Search,
    Menu,
    X,
    ChevronRight,
    MapPin,
    Mail,
    Phone,
    Clock,
    ArrowUp,
    CheckCircle2,
    Award,
    BookOpen,
    Building2,
    Users,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Send,
    Sun,
    Moon
} from 'lucide-react';

export default function Layout({ children }) {
    const { url } = usePage();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAiSearchOpen, setIsAiSearchOpen] = useState(false);
    const [isBookCallOpen, setIsBookCallOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    // Track scroll for enhanced shadow on sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Universities', href: '/universities' },
        { name: 'Courses', href: '/courses' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    const globalBranches = [
        { country: 'Bangladesh', cities: 'Dhaka (Gulshan-2), Chattogram', flag: '🇧🇩', hotline: '+880 1812713814', status: 'Open Now' },
        { country: 'United Kingdom', cities: 'London (HQ Oxford St.)', flag: '🇬🇧', hotline: '+44 20 7946 0912', status: 'Open Now' },
        { country: 'United States', cities: 'New York (Manhattan)', flag: '🇺🇸', hotline: '+1 212 555 0198', status: 'Open 9 AM EST' },
        { country: 'Canada', cities: 'Toronto (Financial Dist.)', flag: '🇨🇦', hotline: '+1 416 555 0147', status: 'Open 9 AM EST' },
        { country: 'Australia', cities: 'Sydney (CBD Square)', flag: '🇦🇺', hotline: '+61 2 9385 1000', status: 'Open Tomorrow' },
    ];

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Counseling Services', href: '/services' },
        { name: 'Partner Universities', href: '/universities' },
        { name: 'Popular Courses', href: '/courses' },
        { name: 'Scholarship Finder', href: '/scholarships' },
        { name: 'Student Visa Guide', href: '/visa-guide' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased">
            
            {/* 1. GLOBAL TOP BAR WITH WIDE SEARCH & BECOME A PARTNER ACTION */}
            <TopBar />

            {/* STICKY NAVBAR WITH TRANSLUCENT FROSTED GLASS EFFECT */}
            <header
                className={`sticky top-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-200/70 dark:border-slate-800/70 py-3'
                        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 py-4'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        
                        {/* 1. Left Side: Brand Logo */}
                        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                                        Kampus
                                    </span>
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider dark:bg-blue-900/60 dark:text-blue-300">
                                        Edu
                                    </span>
                                </div>
                                <span className="text-[11px] font-medium text-slate-500 tracking-wide dark:text-slate-400">
                                    Educational Consultancy
                                </span>
                            </div>
                        </Link>

                        {/* 2. Center: Navigation Links with Rounded Pill Shape & Hover Effects */}
                        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/50">
                            {navLinks.map((link) => {
                                const isActive = url === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-semibold'
                                                : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            {/* Center AI Search Trigger Button */}
                            <button
                                onClick={() => setIsAiSearchOpen(true)}
                                className="ml-1 px-3.5 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 text-indigo-700 dark:text-indigo-300 hover:from-indigo-600 hover:to-blue-600 hover:text-white transition-all duration-300 flex items-center gap-1.5 border border-indigo-200/50 dark:border-indigo-800/50 group"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:text-white animate-pulse" />
                                <span>AI Search</span>
                                <span className="bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                                    PRO
                                </span>
                            </button>
                        </nav>

                        {/* 3. Right Side: Theme Toggle Button, Primary CTA "Book a Call", & Mobile Hamburger */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            
                            {/* DARK / LIGHT MODE TOGGLE BUTTON */}
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60"
                                aria-label="Toggle Dark/Light Mode"
                                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-4 h-4 text-amber-400" />
                                ) : (
                                    <Moon className="w-4 h-4 text-slate-700" />
                                )}
                            </button>

                            <button
                                onClick={() => setIsAiSearchOpen(true)}
                                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                aria-label="Open AI Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => setIsBookCallOpen(true)}
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white text-sm font-semibold shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <PhoneCall className="w-4 h-4" />
                                <span>Book a Call</span>
                            </button>

                            {/* Mobile Hamburger Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Toggle Mobile Navigation"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200 shadow-xl">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                                        url === link.href
                                            ? 'bg-blue-600 text-white font-semibold'
                                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsAiSearchOpen(true);
                                }}
                                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-medium text-base mt-1"
                            >
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-600" />
                                    <span>AI Course & University Search</span>
                                </div>
                                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                    AI
                                </span>
                            </button>

                            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsBookCallOpen(true);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-base shadow-md shadow-blue-600/30"
                                >
                                    <PhoneCall className="w-5 h-5" />
                                    <span>Book a Free Call</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* MAIN CONTENT CONTAINER */}
            <main className="flex-1 w-full">
                {children}
            </main>

            {/* MULTI-COLUMN DARK & CLEAN FOOTER */}
            <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
                        {/* COLUMN 1: Logo & Company Description */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-extrabold text-xl text-white tracking-tight">
                                        Kampus <span className="text-blue-400">EduConsult</span>
                                    </span>
                                    <span className="text-[11px] text-slate-400">Global Higher Education Advisers</span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed">
                                Empowering ambitious students worldwide to gain admission into top global universities in the UK, USA, Canada, Australia, & Europe. End-to-end admission, visa, and scholarship support.
                            </p>

                            <div className="pt-1">
                                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Connect With Us</h4>
                                <div className="flex items-center gap-2.5">
                                    {[
                                        { icon: Facebook, href: '#', label: 'Facebook' },
                                        { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                        { icon: Instagram, href: '#', label: 'Instagram' },
                                        { icon: Youtube, href: '#', label: 'YouTube' }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            aria-label={social.label}
                                            className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all"
                                        >
                                            <social.icon className="w-4 h-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>ICEF & British Council Certified Partner</span>
                            </div>
                        </div>

                        {/* COLUMN 2: Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-blue-500 pl-3">
                                Quick Links
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                {quickLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all group"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* COLUMN 3: Global Branches List */}
                        <div className="space-y-4" id="branches">
                            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-blue-500 pl-3">
                                Global Branches
                            </h3>
                            <div className="space-y-3">
                                {globalBranches.map((branch, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 hover:border-slate-700 transition-colors"
                                    >
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-semibold text-white flex items-center gap-2">
                                                <span>{branch.flag}</span>
                                                <span>{branch.country}</span>
                                            </span>
                                            <span className="text-[10px] font-medium bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-full border border-slate-700">
                                                {branch.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                                            <span>{branch.cities}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COLUMN 4: Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-blue-500 pl-3">
                                Head Office Contact
                            </h3>
                            <div className="space-y-3.5 text-sm text-slate-400">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                    <span>
                                        124 Education Avenue, Suite 400, Oxford Street, London W1B 3AG, United Kingdom
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                                    <span>UK: +44 20 7946 0912</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                                    <span>BD Hotline: +880 1812713814</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                                    <span>apply@kampusedu.com</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                                    <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={() => setIsBookCallOpen(true)}
                                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-medium text-xs border border-blue-500/40 flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        <span>Schedule Free Counseling</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM ROW: Copyright & Legal Links */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                        <div>
                            © {new Date().getFullYear()} <span className="text-white font-medium">Kampus Educational Consultancy Ltd</span>. All rights reserved.
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
                            <a href="#" className="hover:text-white transition-colors">Accreditation</a>
                            
                            <button
                                onClick={scrollToTop}
                                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all ml-2"
                                aria-label="Back to Top"
                            >
                                <ArrowUp className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* AI SEARCH MODAL DRAWER OVERLAY */}
            {isAiSearchOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setIsAiSearchOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                                <Sparkles className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI University & Course Matcher</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Ask anything e.g. "Find top Masters in Data Science in UK with scholarships"</p>
                            </div>
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Type your query, major, country, or budget preference..."
                                className="w-full pl-11 pr-24 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                autoFocus
                            />
                            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
                            <button
                                className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                            >
                                <span>Match AI</span>
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Suggested Queries:</span>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    '🇬🇧 UK Universities with 100% Scholarship',
                                    '🇨🇦 Software Engineering Masters Canada',
                                    '🇺🇸 Low Tuition Fees USA Universities',
                                    '📜 Student Visa Requirements 2026'
                                ].map((tag, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSearchQuery(tag)}
                                        className="text-xs bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-900/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* BOOK A CALL MODAL */}
            {isBookCallOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setIsBookCallOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                <PhoneCall className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Book Free Counseling Call</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Speak directly with an expert study abroad advisor</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert('Counseling call requested successfully!'); setIsBookCallOpen(false); }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Tanvir Ahmed"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number (with WhatsApp)</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+880 1812713814"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Destination</label>
                                <select className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option value="UK">United Kingdom</option>
                                    <option value="USA">United States</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Europe">Europe / Germany</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-transform"
                            >
                                Confirm Call Appointment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
