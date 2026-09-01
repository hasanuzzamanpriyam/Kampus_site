import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import UniversitiesHero from '../Components/UniversitiesHero';
import UniversitiesGrid from '../Components/UniversitiesGrid';
import UniversityStatsBanner from '../Components/UniversityStatsBanner';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';

export default function Universities({ universities = [], destinations = [], filters = {} }) {
    // 100% Instant Client-Side State with ZERO page reload and ZERO loading
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [destinationFilter, setDestinationFilter] = useState(filters.destination || 'All');
    const [currentPage, setCurrentPage] = useState(1);

    const allUniversities = useMemo(() => {
        if (Array.isArray(universities)) {
            return universities;
        }
        return universities?.data || [];
    }, [universities]);

    // Live Instant Client-side filtering (0ms latency, no network call)
    const filteredUniversities = useMemo(() => {
        return allUniversities.filter((uni) => {
            // Match Destination / Country
            const matchesDestination =
                destinationFilter === 'All' ||
                (uni.country?.name && uni.country.name.toLowerCase() === destinationFilter.toLowerCase()) ||
                (uni.country?.country_code && uni.country.country_code.toLowerCase() === destinationFilter.toLowerCase()) ||
                (uni.location && uni.location.toLowerCase().includes(destinationFilter.toLowerCase()));

            // Match Search Query
            const query = searchQuery.trim().toLowerCase();
            const matchesQuery =
                !query ||
                uni.name?.toLowerCase().includes(query) ||
                uni.location?.toLowerCase().includes(query) ||
                uni.country?.name?.toLowerCase().includes(query) ||
                (Array.isArray(uni.features) && uni.features.some((f) => f.toLowerCase().includes(query)));

            return matchesDestination && matchesQuery;
        });
    }, [allUniversities, searchQuery, destinationFilter]);

    // Instant Filter/Search Handlers
    const handleSearchChange = (val) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };

    const handleDestinationChange = (val) => {
        setDestinationFilter(val);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setDestinationFilter('All');
        setCurrentPage(1);
    };

    return (
        <Layout>
            <Head title="Partner Universities — Kampus EduConsult" />

            {/* MAIN UNIVERSITIES PAGE CONTAINER */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                {/* 1. UNIVERSITIES HERO WITH LIVE SEARCH & DESTINATIONS */}
                <UniversitiesHero
                    destinations={destinations}
                    searchTerm={searchQuery}
                    destination={destinationFilter}
                    onSearchChange={handleSearchChange}
                    onDestinationChange={handleDestinationChange}
                />

                {/* 2. INSTANT FILTERED & PAGINATED UNIVERSITIES GRID (NO RELOAD / NO LOADING) */}
                <UniversitiesGrid
                    universities={filteredUniversities}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    searchQuery={searchQuery}
                    selectedDestination={destinationFilter}
                    onResetFilters={handleResetFilters}
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
