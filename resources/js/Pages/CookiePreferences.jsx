import React, { useState } from 'react';
import LegalPage from './LegalPage';
import { Cookie, Check, ShieldCheck } from 'lucide-react';

export default function CookiePreferences({ page = null }) {
    const [preferences, setPreferences] = useState({
        necessary: true, // Always true & locked
        analytics: true,
        marketing: false,
        functional: true
    });

    const [savedNotice, setSavedNotice] = useState(false);

    const handleSave = () => {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleAcceptAll = () => {
        setPreferences({
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    const handleNecessaryOnly = () => {
        setPreferences({
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    return (
        <LegalPage title="Cookie Preferences" lastUpdated="August 2026" page={page}>
            <p>
                Kampus EduConsult uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and deliver personalized university recommendations.
            </p>

            {/* INTERACTIVE TOGGLE CARD PANEL */}
            <div className="my-8 p-6 lg:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                            <Cookie className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Manage Consent Preferences</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Customize your cookie preferences below</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleNecessaryOnly}
                            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                        >
                            Necessary Only
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 cursor-pointer"
                        >
                            Accept All
                        </button>
                    </div>
                </div>

                {savedNotice && (
                    <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                        <Check className="w-4 h-4" />
                        <span>Your cookie preferences have been saved successfully!</span>
                    </div>
                )}

                <div className="space-y-5">
                    {/* Necessary Cookies (Locked) */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Strictly Necessary Cookies</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Required for website security, page navigation, and theme preferences.</p>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                            Always Active
                        </span>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Performance & Analytics Cookies</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Helps us understand how visitors interact with course search tools and pages.</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                            className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                        />
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Marketing & Target Advertising</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Used to deliver relevant university event announcements and scholarship alerts.</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                            className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleSave}
                        className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">What Are Cookies?</h2>
            <p>
                Cookies are small text files stored on your computer or mobile device when you visit websites. They are widely used to make websites work efficiently and provide valuable analytical reporting.
            </p>
        </LegalPage>
    );
}
