import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import UniversitiesHero from '../Components/UniversitiesHero';
import UniversitiesGrid from '../Components/UniversitiesGrid';
import UniversityStatsBanner from '../Components/UniversityStatsBanner';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';

export default function Universities() {
    // State management for search input and destination filter
    const [searchQuery, setSearchQuery] = useState('');
    const [destinationFilter, setDestinationFilter] = useState('All');

    // Handler when user submits search or selects destination in UniversitiesHero
    const handleSearchUpdate = ({ searchTerm, destination }) => {
        setSearchQuery(searchTerm);
        setDestinationFilter(destination);
    };

    return (
        <Layout>
            <Head title="Partner Universities — Kampus EduConsult" />

            {/* MAIN UNIVERSITIES PAGE CONTAINER WITH TAILWIND SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                {/* 1. UNIVERSITIES HERO WITH CONTROLLED SEARCH & DESTINATION DROPDOWN */}
                <UniversitiesHero
                    initialSearch={searchQuery}
                    initialDestination={destinationFilter}
                    onSearch={handleSearchUpdate}
                />

                {/* 2. FILTERED UNIVERSITIES RESPONSIVE GRID */}
                <UniversitiesGrid
                    searchQuery={searchQuery}
                    selectedDestination={destinationFilter}
                />

                {/* 3. DARK SLATE GLOBAL NETWORK STATS BANNER */}
                <UniversityStatsBanner />

                {/* 4. ADMISSION ROADMAP */}
                <JourneyProcess />

                {/* 5. FAQ ACCORDION */}
                <FaqSection />
            </div>
        </Layout>
    );
}
