import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import HeroSection from '../Components/HeroSection';
import ServicesGrid from '../Components/ServicesGrid';
import Destinations from '../Components/Destinations';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';

export default function Home() {
    // Handlers to trigger Navbar AI Search & Book Call Modals from components
    const handleOpenAiSearch = () => {
        const aiSearchBtn = document.querySelector('button[aria-label="Open AI Search"], button:has(.animate-pulse)');
        if (aiSearchBtn) {
            aiSearchBtn.click();
        } else {
            // Fallback scroll to top or trigger modal
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleOpenBookCall = () => {
        const allButtons = Array.from(document.querySelectorAll('button'));
        const callBtn = allButtons.find(b => b.textContent.includes('Book a Call') || b.textContent.includes('Book a Free Call'));
        if (callBtn) {
            callBtn.click();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <Head title="Kampus EduConsult — Study Abroad Educational Consultancy" />

            {/* MAIN HOMEPAGE CONTAINER WITH CLEAN SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                
                {/* 1. HERO SECTION */}
                <HeroSection
                    onOpenAiSearch={handleOpenAiSearch}
                    onOpenBookCall={handleOpenBookCall}
                />

                {/* 2. SERVICES GRID SECTION */}
                <ServicesGrid />

                {/* 3. DESTINATIONS GRID SECTION */}
                <Destinations />

                {/* 4. JOURNEY PROCESS TIMELINE SECTION */}
                <JourneyProcess />

                {/* 5. FAQ ACCORDION SECTION */}
                <FaqSection />

            </div>
        </Layout>
    );
}
