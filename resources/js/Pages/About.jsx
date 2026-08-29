import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import AboutHero from '../Components/AboutHero';
import AboutMission from '../Components/AboutMission';
import AboutValues from '../Components/AboutValues';
import AboutCommitment from '../Components/AboutCommitment';
import FaqSection from '../Components/FaqSection';

export default function About() {
    return (
        <Layout>
            <Head title="About Us — Kampus EduConsult" />

            {/* MAIN ABOUT PAGE CONTAINER WITH PREMIUM AGENCY SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                {/* 1. ABOUT HERO SECTION */}
                <AboutHero />

                {/* 2. OUR MISSION SECTION */}
                <AboutMission />

                {/* 3. WHAT WE STAND FOR (VALUES SECTION) */}
                <AboutValues />

                {/* 4. OUR COMMITMENT (DARK NAVY ETHICS & ACCREDITATION SECTION) */}
                <AboutCommitment />

                {/* 5. DYNAMIC FREQUENTLY ASKED QUESTIONS */}
                <FaqSection />
            </div>
        </Layout>
    );
}
