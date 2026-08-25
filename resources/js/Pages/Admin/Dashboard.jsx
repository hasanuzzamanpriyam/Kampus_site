import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from './Layouts/AdminLayout';
import {
    Building2,
    BookOpen,
    Handshake,
    Mail,
    TrendingUp,
    Users,
    ArrowUpRight,
    Sparkles,
    FileText,
    Settings
} from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { title: 'Total Universities', value: '150+', change: '+12 this month', icon: Building2, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-950' },
        { title: 'Active Courses', value: '1,240', change: '+45 added', icon: BookOpen, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-950' },
        { title: 'Partner Applications', value: '84', change: '12 pending review', icon: Handshake, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-950' },
        { title: 'Inquiries Received', value: '342', change: '+24 today', icon: Mail, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-950' },
    ];

    return (
        <AdminLayout title="CMS Overview & Dashboard">
            <Head title="Admin Dashboard — Kampus CMS" />

            <div className="space-y-8">
                
                {/* WELCOME BANNER */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
                    <div className="relative z-10 space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase border border-blue-500/30">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Kampus CMS v2.4</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                            Welcome to your Management Dashboard
                        </h2>
                        <p className="text-slate-300 text-sm max-w-2xl">
                            Manage global settings, dynamic pages, universities, courses, partner applications, and student inquiries in real time.
                        </p>
                    </div>
                </div>

                {/* 4 STATS METRIC CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                            <div
                                key={idx}
                                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start justify-between"
                            >
                                <div className="space-y-1">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        {item.title}
                                    </span>
                                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                        {item.value}
                                    </div>
                                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 pt-1">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        <span>{item.change}</span>
                                    </span>
                                </div>

                                <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                                    <IconComp className="w-6 h-6" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* RECENT ACTIVITY & QUICK ACTIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Quick Management Shortcuts */}
                    <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Quick Management Shortcuts
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { name: 'Edit Global Site Settings', desc: 'Logos, phone numbers & footers', href: '/admin/settings', icon: Settings },
                                { name: 'Manage SEO & Pages', desc: 'Hero titles, meta tags & content', href: '/admin/pages', icon: FileText },
                                { name: 'Manage Universities', desc: 'Add or update campus details', href: '/admin/universities', icon: Building2 },
                                { name: 'Manage Course Database', desc: 'Tuition fees, intakes & degrees', href: '/admin/courses', icon: BookOpen },
                            ].map((short, i) => (
                                <a
                                    key={i}
                                    href={short.href}
                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500 transition-colors space-y-1 block group"
                                >
                                    <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold text-sm">
                                        <div className="flex items-center gap-2">
                                            <short.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <span>{short.name}</span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {short.desc}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* System Status Panel */}
                    <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            System Status & Database
                        </h3>

                        <div className="space-y-3 text-xs">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <span className="text-slate-600 dark:text-slate-300 font-medium">Laravel Database Status</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <span className="text-slate-600 dark:text-slate-300 font-medium">Inertia.js Frontend Adapter</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded">Active</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <span className="text-slate-600 dark:text-slate-300 font-medium">Dark / Light Mode Provider</span>
                                <span className="font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded">Synced</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}
