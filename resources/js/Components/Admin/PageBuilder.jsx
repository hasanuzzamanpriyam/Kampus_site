import React, { useState } from 'react';
import {
    Plus,
    Trash2,
    Upload,
    Image,
    Layout,
    Layers,
    FileText,
    Grid,
    CheckCircle2,
    Sparkles,
    MoveUp,
    MoveDown,
    Link as LinkIcon,
    Eye,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

export default function PageBuilder({ content = {}, onChange }) {
    // Structure of content: { hero: {...}, sections: [...] }
    const heroData = content?.hero || {
        badge: content?.hero_badge || '',
        title: content?.hero_title || '',
        subtitle: content?.hero_subtitle || '',
        image: content?.hero_image || '',
    };

    const initialSections = Array.isArray(content?.sections) ? content.sections : [];

    const [hero, setHero] = useState(heroData);
    const [sections, setSections] = useState(initialSections);
    const [uploadingBlock, setUploadingBlock] = useState(null);

    const updateAll = (newHero, newSections) => {
        setHero(newHero);
        setSections(newSections);
        onChange({
            ...content,
            hero: newHero,
            sections: newSections,
        });
    };

    const handleHeroChange = (field, value) => {
        const updated = { ...hero, [field]: value };
        updateAll(updated, sections);
    };

    // Generic file upload to /admin/pages/upload-image
    const handleFileUpload = async (file, onUploaded) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const res = await fetch('/admin/pages/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            if (data.url) {
                onUploaded(data.url);
            }
        } catch (err) {
            console.error('Image upload error:', err);
            alert('Failed to upload image. Please try again or provide an image URL.');
        }
    };

    // Add a new section
    const addSection = (type) => {
        let newSec = { id: Date.now(), type };

        if (type === 'image_text') {
            newSec = {
                ...newSec,
                title: 'Section Heading',
                subtitle: 'Key Program Information',
                content: 'Add detailed paragraphs and descriptions regarding this topic.',
                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
                image_position: 'right',
                bullets: ['Accredited Global Curriculum', 'Dedicated Career & Visa Guidance'],
            };
        } else if (type === 'gallery') {
            newSec = {
                ...newSec,
                title: 'Campus & Student Life Gallery',
                subtitle: 'Explore our state-of-the-art facilities and vibrant environment',
                columns: 3,
                images: [
                    { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80', caption: 'Modern Lecture Theatres', subtitle: 'Interactive Learning' },
                    { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', caption: 'Research & Innovation Labs', subtitle: 'Cutting-Edge Tech' },
                    { url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', caption: 'Student Hub & Library', subtitle: '24/7 Study Areas' },
                ],
            };
        } else if (type === 'features') {
            newSec = {
                ...newSec,
                title: 'Why Choose This Program',
                subtitle: 'Key advantages and student support services',
                items: [
                    { title: 'Global Recognition', description: 'Degrees valued by leading multinational employers worldwide.', badge: 'Top Tier' },
                    { title: 'Scholarship Grants', description: 'Merit-based scholarships covering up to 50-100% tuition fees.', badge: 'Financial Aid' },
                    { title: 'Post-Study Work', description: 'Eligible for 2-3 years international post-study work permits.', badge: 'Work Visa' },
                ],
            };
        } else if (type === 'prose') {
            newSec = {
                ...newSec,
                title: 'Overview & Academic Guidelines',
                content: 'Write comprehensive article sections, guidelines, admission requirements, or policies here.',
            };
        } else if (type === 'cta') {
            newSec = {
                ...newSec,
                title: 'Ready to start your journey?',
                subtitle: 'Speak with our senior admissions advisors today for a tailored evaluation.',
                button_text: 'Book a Free Consultation',
                button_link: '/contact',
            };
        }

        const updated = [...sections, newSec];
        updateAll(hero, updated);
    };

    const removeSection = (idx) => {
        const updated = sections.filter((_, i) => i !== idx);
        updateAll(hero, updated);
    };

    const updateSection = (idx, field, val) => {
        const updated = [...sections];
        updated[idx][field] = val;
        updateAll(hero, updated);
    };

    const moveSection = (idx, dir) => {
        const targetIdx = idx + dir;
        if (targetIdx < 0 || targetIdx >= sections.length) return;
        const updated = [...sections];
        const temp = updated[idx];
        updated[idx] = updated[targetIdx];
        updated[targetIdx] = temp;
        updateAll(hero, updated);
    };

    return (
        <div className="space-y-8">

            {/* 1. HERO BANNER BUILDER */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        <Layout className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                            Page Hero & Header Banner
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Configure the top banner with custom background imagery and intro title
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                            Hero Badge / Tag
                        </label>
                        <input
                            type="text"
                            value={hero.badge}
                            onChange={(e) => handleHeroChange('badge', e.target.value)}
                            placeholder="e.g. OFFICIAL ADMISSIONS PROGRAM"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                            Hero Main Title
                        </label>
                        <input
                            type="text"
                            value={hero.title}
                            onChange={(e) => handleHeroChange('title', e.target.value)}
                            placeholder="e.g. Empowering Your Education in the UK"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-extrabold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Hero Subtitle / Description
                    </label>
                    <textarea
                        rows={2}
                        value={hero.subtitle}
                        onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                        placeholder="Comprehensive guidance, scholarship options, and university insights..."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Hero Background Image Upload */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Hero Cover Background Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {hero.image && (
                            <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                                <img src={hero.image} alt="Hero Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <input
                            type="text"
                            value={hero.image}
                            onChange={(e) => handleHeroChange('image', e.target.value)}
                            placeholder="Image URL (or choose file below)..."
                            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono"
                        />
                        <label className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2 shrink-0">
                            <Upload className="w-4 h-4" />
                            <span>Upload Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e.target.files[0], (url) => handleHeroChange('image', url))}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* 2. DYNAMIC CONTENT SECTIONS BUILDER */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-500" />
                            <span>Custom Page Sections & Media Blocks</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Add unlimited image-content blocks, multi-image galleries, and interactive feature grids.
                        </p>
                    </div>

                    {/* Section Type Selector Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => addSection('image_text')}
                            className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold hover:bg-blue-100 flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Image & Content</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => addSection('gallery')}
                            className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold hover:bg-purple-100 flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                            <Grid className="w-3.5 h-3.5" />
                            <span>+ Multiple Images Gallery</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => addSection('features')}
                            className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>+ Feature Cards</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => addSection('prose')}
                            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span>+ Text Block</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => addSection('cta')}
                            className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>+ CTA Banner</span>
                        </button>
                    </div>
                </div>

                {sections.length === 0 && (
                    <div className="p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3">
                        <Image className="w-12 h-12 text-slate-400 mx-auto" />
                        <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
                            No content sections added yet
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                            Click any of the buttons above (e.g. <strong>+ Image & Content</strong>, <strong>+ Multiple Images Gallery</strong>, or <strong>+ Feature Cards</strong>) to customize your page layout.
                        </p>
                    </div>
                )}

                {/* RENDER ACTIVE SECTIONS */}
                <div className="space-y-6">
                    {sections.map((sec, idx) => (
                        <div
                            key={sec.id || idx}
                            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 relative"
                        >
                            {/* SECTION HEADER BAR */}
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-black uppercase">
                                        Section #{idx + 1}
                                    </span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                        {sec.type === 'image_text' && '🖼️ Image + Content Split'}
                                        {sec.type === 'gallery' && '📸 Multi-Image Gallery Grid'}
                                        {sec.type === 'features' && '✨ Feature Highlights Grid'}
                                        {sec.type === 'prose' && '📝 Longform Article / Text'}
                                        {sec.type === 'cta' && '🚀 Call To Action Banner'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Reorder Buttons */}
                                    <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => moveSection(idx, -1)}
                                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 cursor-pointer"
                                        title="Move Up"
                                    >
                                        <MoveUp className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        disabled={idx === sections.length - 1}
                                        onClick={() => moveSection(idx, 1)}
                                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 cursor-pointer"
                                        title="Move Down"
                                    >
                                        <MoveDown className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeSection(idx)}
                                        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-100 cursor-pointer ml-2"
                                        title="Remove Section"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* SECTION TYPE 1: IMAGE + TEXT (SPLIT) */}
                            {sec.type === 'image_text' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Section Title
                                            </label>
                                            <input
                                                type="text"
                                                value={sec.title || ''}
                                                onChange={(e) => updateSection(idx, 'title', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Subtitle / Tag
                                            </label>
                                            <input
                                                type="text"
                                                value={sec.subtitle || ''}
                                                onChange={(e) => updateSection(idx, 'subtitle', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                            Paragraph Body
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={sec.content || ''}
                                            onChange={(e) => updateSection(idx, 'content', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                                        />
                                    </div>

                                    {/* Bullet Points */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                                                Highlight Bullet Points
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const bullets = sec.bullets || [];
                                                    updateSection(idx, 'bullets', [...bullets, 'New highlight point']);
                                                }}
                                                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                                            >
                                                + Add Bullet
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {(sec.bullets || []).map((b, bIdx) => (
                                                <div key={bIdx} className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    <input
                                                        type="text"
                                                        value={b}
                                                        onChange={(e) => {
                                                            const newB = [...sec.bullets];
                                                            newB[bIdx] = e.target.value;
                                                            updateSection(idx, 'bullets', newB);
                                                        }}
                                                        className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newB = sec.bullets.filter((_, i) => i !== bIdx);
                                                            updateSection(idx, 'bullets', newB);
                                                        }}
                                                        className="p-1 text-rose-400 hover:text-rose-600"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section Image & Alignment */}
                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                                        <div className="sm:col-span-2">
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Image URL or Upload
                                            </label>
                                            <div className="flex items-center gap-2">
                                                {sec.image && (
                                                    <img src={sec.image} alt="Thumb" className="w-12 h-12 rounded-lg object-cover border border-slate-700" />
                                                )}
                                                <input
                                                    type="text"
                                                    value={sec.image || ''}
                                                    onChange={(e) => updateSection(idx, 'image', e.target.value)}
                                                    placeholder="https://images.unsplash.com/..."
                                                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                                                />
                                                <label className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shrink-0">
                                                    <Upload className="w-3.5 h-3.5" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleFileUpload(e.target.files[0], (url) => updateSection(idx, 'image', url))}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Image Position
                                            </label>
                                            <select
                                                value={sec.image_position || 'right'}
                                                onChange={(e) => updateSection(idx, 'image_position', e.target.value)}
                                                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                                            >
                                                <option value="right">Image on Right</option>
                                                <option value="left">Image on Left</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION TYPE 2: MULTIPLE IMAGES GALLERY */}
                            {sec.type === 'gallery' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Gallery Title
                                            </label>
                                            <input
                                                type="text"
                                                value={sec.title || ''}
                                                onChange={(e) => updateSection(idx, 'title', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Columns Layout
                                            </label>
                                            <select
                                                value={sec.columns || 3}
                                                onChange={(e) => updateSection(idx, 'columns', Number(e.target.value))}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                                            >
                                                <option value={2}>2 Columns (Large Photos)</option>
                                                <option value={3}>3 Columns (Standard Grid)</option>
                                                <option value={4}>4 Columns (Compact Grid)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Images List */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                                                Gallery Photos ({sec.images ? sec.images.length : 0})
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const imgs = sec.images || [];
                                                    updateSection(idx, 'images', [
                                                        ...imgs,
                                                        { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80', caption: 'Photo Caption', subtitle: 'Subtitle' }
                                                    ]);
                                                }}
                                                className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-200 cursor-pointer"
                                            >
                                                + Add Photo
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {(sec.images || []).map((img, imgIdx) => (
                                                <div key={imgIdx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 relative group">
                                                    <div className="h-28 rounded-xl bg-slate-900 overflow-hidden relative">
                                                        <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newImgs = sec.images.filter((_, i) => i !== imgIdx);
                                                                updateSection(idx, 'images', newImgs);
                                                            }}
                                                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white shadow-md hover:bg-rose-700 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={img.url}
                                                            onChange={(e) => {
                                                                const newImgs = [...sec.images];
                                                                newImgs[imgIdx].url = e.target.value;
                                                                updateSection(idx, 'images', newImgs);
                                                            }}
                                                            placeholder="Photo URL..."
                                                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-900 dark:text-white"
                                                        />
                                                        <label className="p-1.5 rounded-lg bg-blue-600 text-white cursor-pointer shrink-0">
                                                            <Upload className="w-3.5 h-3.5" />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleFileUpload(e.target.files[0], (url) => {
                                                                    const newImgs = [...sec.images];
                                                                    newImgs[imgIdx].url = url;
                                                                    updateSection(idx, 'images', newImgs);
                                                                })}
                                                            />
                                                        </label>
                                                    </div>

                                                    <input
                                                        type="text"
                                                        value={img.caption || ''}
                                                        onChange={(e) => {
                                                            const newImgs = [...sec.images];
                                                            newImgs[imgIdx].caption = e.target.value;
                                                            updateSection(idx, 'images', newImgs);
                                                        }}
                                                        placeholder="Caption (e.g. Modern Library)"
                                                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION TYPE 3: FEATURE CARDS */}
                            {sec.type === 'features' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Section Heading
                                            </label>
                                            <input
                                                type="text"
                                                value={sec.title || ''}
                                                onChange={(e) => updateSection(idx, 'title', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Subtitle
                                            </label>
                                            <input
                                                type="text"
                                                value={sec.subtitle || ''}
                                                onChange={(e) => updateSection(idx, 'subtitle', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Cards Grid */}
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                                                Cards List
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const items = sec.items || [];
                                                    updateSection(idx, 'items', [
                                                        ...items,
                                                        { title: 'New Feature Card', description: 'Description of this highlight.', badge: 'Highlight' }
                                                    ]);
                                                }}
                                                className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                                            >
                                                + Add Card
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {(sec.items || []).map((card, cIdx) => (
                                                <div key={cIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 relative">
                                                    <div className="flex items-center justify-between">
                                                        <input
                                                            type="text"
                                                            value={card.badge || ''}
                                                            onChange={(e) => {
                                                                const newItems = [...sec.items];
                                                                newItems[cIdx].badge = e.target.value;
                                                                updateSection(idx, 'items', newItems);
                                                            }}
                                                            placeholder="Badge (e.g. 100% Visa)"
                                                            className="w-2/3 px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-extrabold uppercase text-emerald-600"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newItems = sec.items.filter((_, i) => i !== cIdx);
                                                                updateSection(idx, 'items', newItems);
                                                            }}
                                                            className="text-rose-400 hover:text-rose-600"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={card.title || ''}
                                                        onChange={(e) => {
                                                            const newItems = [...sec.items];
                                                            newItems[cIdx].title = e.target.value;
                                                            updateSection(idx, 'items', newItems);
                                                        }}
                                                        placeholder="Card Title"
                                                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                                                    />
                                                    <textarea
                                                        rows={2}
                                                        value={card.description || ''}
                                                        onChange={(e) => {
                                                            const newItems = [...sec.items];
                                                            newItems[cIdx].description = e.target.value;
                                                            updateSection(idx, 'items', newItems);
                                                        }}
                                                        placeholder="Short description..."
                                                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION TYPE 4: PROSE / TEXT BLOCK */}
                            {sec.type === 'prose' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                            Article / Section Heading
                                        </label>
                                        <input
                                            type="text"
                                            value={sec.title || ''}
                                            onChange={(e) => updateSection(idx, 'title', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                            Body Content (HTML or Markdown)
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={sec.content || ''}
                                            onChange={(e) => updateSection(idx, 'content', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm leading-relaxed"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* SECTION TYPE 5: CALL TO ACTION BANNER */}
                            {sec.type === 'cta' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Banner Title
                                            </label>
                                            <input
                                                type="text"
                                                value={sec.title || ''}
                                                onChange={(e) => updateSection(idx, 'title', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                                Button Action Label
                                            </label>
                                            <input
                                                type="text"
                                                value={sec.button_text || 'Book a Free Consultation'}
                                                onChange={(e) => updateSection(idx, 'button_text', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                                            Banner Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            value={sec.subtitle || ''}
                                            onChange={(e) => updateSection(idx, 'subtitle', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
