import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import UniversityHeader from '../Components/UniversityHeader';
import UniversityTabs from '../Components/UniversityTabs';
import JourneyProcess from '../Components/JourneyProcess';
import FaqSection from '../Components/FaqSection';

export default function UniversityDetails({ slug = 'university-of-oxford' }) {
    // Dynamic dataset mapping based on route slug
    const universitiesMap = {
        'university-of-oxford': {
            name: 'University of Oxford',
            location: 'Oxford, Oxfordshire, United Kingdom',
            website: 'https://www.ox.ac.uk',
            ranking: '#1 Times Higher Education World University Rankings',
            coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
            logoText: 'OX',
            logoBg: 'bg-blue-900 text-white',
            established: 'Est. 1096',
            type: 'Public Research University',
            description: 'The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world\'s second-oldest university in continuous operation.',
            courses: [
                { code: 'CS101', name: 'BSc Computer Science', level: 'Undergraduate', duration: '3 Years Full-Time', tuition: '£35,000 / Year', intake: 'September 2026', desc: 'Comprehensive study of software engineering, artificial intelligence, data structures, and computer systems.' },
                { code: 'DS202', name: 'MSc Data Science & AI', level: 'Postgraduate', duration: '1 Year Full-Time', tuition: '£38,500 / Year', intake: 'September 2026', desc: 'Advanced machine learning, big data analytics, neural networks, and statistical modeling.' },
                { code: 'MBA90', name: 'Master of Business Administration (MBA)', level: 'Postgraduate', duration: '1 Year Full-Time', tuition: '£52,000 / Year', intake: 'September 2026', desc: 'Strategic management, financial analysis, global marketing, and executive leadership.' },
                { code: 'ENG40', name: 'MEng Engineering Science', level: 'Undergraduate', duration: '4 Years Full-Time', tuition: '£36,200 / Year', intake: 'September 2026', desc: 'Multi-disciplinary engineering covering mechanical, electrical, and civil systems.' },
            ],
            gallery: [
                { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80', caption: 'Historic Quadrangle & Radcliffe Camera' },
                { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', caption: 'Bodleian Library Study Halls' },
                { url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', caption: 'Science & AI Laboratories' },
                { url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80', caption: 'Student Residence Halls' },
                { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', caption: 'International Student Activity Desk' },
                { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', caption: 'Academic Lecture Theatre' },
            ],
            admissionReqs: [
                'High School Diploma / A-Levels (AAA or equivalent) for Undergraduate',
                'Bachelor\'s Degree with First Class / 2:1 Honours for Postgraduate',
                'IELTS Academic 7.0 (no band below 6.5) or TOEFL iBT 100',
                'Statement of Purpose (SOP) & 2 Academic Reference Letters',
                'Valid Passport copy & financial proof for UKVI Tier-4 Student Visa'
            ]
        },
        'harvard-university': {
            name: 'Harvard University',
            location: 'Cambridge, Massachusetts, United States',
            website: 'https://www.harvard.edu',
            ranking: '#4 QS World University Rankings',
            coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
            logoText: 'HU',
            logoBg: 'bg-red-900 text-white',
            established: 'Est. 1636',
            type: 'Private Ivy League University',
            description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the United States and among the most prestigious in the world.',
            courses: [
                { code: 'CS50', name: 'BSc Computer Science', level: 'Undergraduate', duration: '4 Years Full-Time', tuition: '$54,000 / Year', intake: 'Fall 2026', desc: 'Introduction to the intellectual enterprises of computer science and the art of programming.' },
                { code: 'MBA1', name: 'Harvard Business School MBA', level: 'Postgraduate', duration: '2 Years Full-Time', tuition: '$73,440 / Year', intake: 'Fall 2026', desc: 'General management curriculum focusing on real-world case studies and leadership.' },
            ],
            gallery: [
                { url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', caption: 'Harvard Yard & Widener Library' },
                { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80', caption: 'Harvard Business School Campus' },
            ],
            admissionReqs: [
                'SAT/ACT Scores or Test-Optional Pathway',
                'High School Transcript & GPA 3.8+',
                'IELTS 7.5 or TOEFL 100+',
                'Common Application Essay & Counselor Recommendation'
            ]
        },
    };

    // Fallback data if slug doesn't match predefined map
    const currentUniversity = universitiesMap[slug] || {
        name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'University of Oxford',
        location: 'United Kingdom',
        website: 'https://www.ox.ac.uk',
        ranking: 'Top 100 Global University',
        coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
        logoText: slug ? slug.substring(0, 2).toUpperCase() : 'UN',
        logoBg: 'bg-blue-900 text-white',
        established: 'Partner Institution',
        type: 'Public Research University',
        description: 'World-renowned partner institution providing top-tier academic degrees, research facilities, and global career prospects.',
        courses: [
            { code: 'UG10', name: 'Bachelor of Science (BSc)', level: 'Undergraduate', duration: '3 Years Full-Time', tuition: '£22,000 / Year', intake: 'September 2026', desc: 'Degree program with specialized academic tracks.' },
            { code: 'PG20', name: 'Master of Science (MSc)', level: 'Postgraduate', duration: '1 Year Full-Time', tuition: '£24,500 / Year', intake: 'September 2026', desc: 'Postgraduate research & coursework degree.' },
        ],
        gallery: [
            { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80', caption: 'Campus Grounds' },
            { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', caption: 'Library & Facilities' },
        ],
        admissionReqs: [
            'High School / Undergraduate Transcripts',
            'IELTS 6.5 or equivalent English test',
            'Statement of Purpose & References'
        ]
    };

    return (
        <Layout>
            <Head title={`${currentUniversity.name} — Kampus EduConsult`} />

            {/* MAIN CONTAINER WRAPPED IN LAYOUT WITH SECTION SPACING */}
            <div className="w-full flex flex-col space-y-0 selection:bg-blue-600 selection:text-white">
                
                {/* 1. UNIVERSITY HEADER WITH COVER & OVERLAPPING LOGO */}
                <UniversityHeader university={currentUniversity} />

                {/* 2. TABBED CONTENT AREA (ABOUT, GALLERY, COURSES, ADMISSION) */}
                <UniversityTabs university={currentUniversity} />

                {/* 3. 5-STEP ADMISSION ROADMAP */}
                <JourneyProcess />

                {/* 4. FREQUENTLY ASKED QUESTIONS */}
                <FaqSection />

            </div>
        </Layout>
    );
}
