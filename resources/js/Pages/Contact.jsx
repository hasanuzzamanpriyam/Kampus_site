import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import ContactHero from '../Components/ContactHero';
import ContactContent from '../Components/ContactContent';
import ContactBranches from '../Components/ContactBranches';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';

export default function Contact() {
    return (
        <Layout>
            <Head title="Contact Us — Kampus EduConsult" />

            {/* MAIN CONTACT PAGE CONTAINER WITH TAILWIND SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                {/* 1. CONTACT HERO SECTION */}
                <ContactHero />

                {/* 2. CONTACT FORM & INFO TWO-COLUMN SECTION */}
                <ContactContent />

                {/* 3. GLOBAL BRANCHES NETWORK GRID */}
                <ContactBranches />

                {/* 4. 5-STEP ADMISSION ROADMAP */}
                <JourneyProcess />

                {/* 5. FAQ ACCORDION SECTION */}
                <FaqSection />
            </div>
        </Layout>
    );
}
