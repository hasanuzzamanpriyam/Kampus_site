import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import PartnerHero from '../Components/PartnerHero';
import PartnerBenefits from '../Components/PartnerBenefits';
import PartnerForm from '../Components/PartnerForm';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';

export default function PartnerWithUs() {
    return (
        <Layout>
            <Head title="Become a Partner — Kampus EduConsult" />

            {/* MAIN CONTAINER WRAPPED IN LAYOUT WITH DARK MODE & SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-purple-600 selection:text-white bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
                
                {/* 1. HERO SECTION */}
                <PartnerHero />

                {/* 2. PARTNER BENEFITS GRID */}
                <PartnerBenefits />

                {/* 3. PARTNER APPLICATION FORM */}
                <PartnerForm />

                {/* 4. 5-STEP ADMISSION ROADMAP */}
                <JourneyProcess />

                {/* 5. FAQ ACCORDION SECTION */}
                <FaqSection />

            </div>
        </Layout>
    );
}
