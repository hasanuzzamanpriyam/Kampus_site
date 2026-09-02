import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import ServicesHero from '../Components/ServicesHero';
import DetailedServices from '../Components/DetailedServices';
import JourneyProcess from '../Components/JourneyProcess';
import ServicesCta from '../Components/ServicesCta';
import FaqSection from '../Components/FaqSection';

export default function Services({ services = [], faqs = [] }) {
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
            <Head title="Our Services — Kampus EduConsult" />

            {/* MAIN SERVICES PAGE CONTAINER WITH TAILWIND SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                {/* 1. SERVICES HERO SECTION */}
                <ServicesHero />

                {/* 2. DETAILED ZIG-ZAG SERVICES BREAKDOWN */}
                <DetailedServices services={services} />

                {/* 3. 5-STEP ADMISSION ROADMAP */}
                <JourneyProcess />

                {/* 4. PREMIUM CTA BANNER SECTION */}
                <ServicesCta onOpenBookCall={handleOpenBookCall} />

                {/* 5. FREQUENTLY ASKED QUESTIONS */}
                <FaqSection faqs={faqs} />
            </div>
        </Layout>
    );
}
