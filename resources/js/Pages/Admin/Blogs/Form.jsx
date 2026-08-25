import React, { useRef } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    Save,
    ArrowLeft,
    Newspaper,
    Upload,
    Sparkles,
    Type,
    Tag,
    FileText,
    Image,
    CheckSquare
} from 'lucide-react';

export default function Form({ blog = null }) {
    const isEdit = !!blog;
    const fileInputRef = useRef(null);

    const { data, setData, processing, errors } = useForm({
        title: blog?.title || '',
        slug: blog?.slug || '',
        category: blog?.category || 'Study Abroad',
        excerpt: blog?.excerpt || '',
        content: blog?.content || '',
        image: null,
        is_published: blog ? Boolean(blog.is_published) : true,
    });

    const [imagePreview, setImagePreview] = React.useState(blog?.image || '');

    const categories = ['Study Abroad', 'Destinations', 'Career Outcomes', 'Academic Writing'];

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setData((prev) => ({
            ...prev,
            title: val,
            slug: isEdit
                ? prev.slug
                : val.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '')
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            // CRITICAL: Use POST with _method: 'put' for Inertia file uploads
            router.post(`/admin/blog/${blog.id}`, {
                ...data,
                _method: 'put',
            }, {
                forceFormData: true,
                onSuccess: () => {
                    alert(`Blog post "${data.title}" updated successfully!`);
                }
            });
        } else {
            router.post('/admin/blog', data, {
                forceFormData: true,
                onSuccess: () => {
                    alert(`Blog post "${data.title}" created successfully!`);
                }
            });
        }
    };

    return (
        <AdminLayout title={isEdit ? `Edit Post: ${blog.title}` : 'Add New Blog Post'}>
            <Head title={isEdit ? `Edit ${blog.title} — Kampus CMS` : 'Add Blog Post — Kampus CMS'} />

            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER ROW */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Blog Posts</span>
                    </Link>

                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Saving...' : (isEdit ? 'Update Post' : 'Publish Post')}</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* SECTION 1: POST CONTENT */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                                <Newspaper className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    Post Content & Details
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Write the blog post title, slug, and full article body
                                </p>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Post Title *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="e.g. Complete Guide to UK Student Visa 2026"
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <Type className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                            </div>
                            {errors.title && <span className="text-xs text-rose-500 font-semibold">{errors.title}</span>}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Route Slug *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="e.g. complete-guide-uk-student-visa-2026"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.slug && <span className="text-xs text-rose-500 font-semibold">{errors.slug}</span>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Category *
                            </label>
                            <div className="relative">
                                <select
                                    required
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <Tag className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            </div>
                            {errors.category && <span className="text-xs text-rose-500 font-semibold">{errors.category}</span>}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Short Excerpt
                                <span className="text-slate-400 font-normal ml-2">(shown in blog listing card)</span>
                            </label>
                            <textarea
                                rows={2}
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                placeholder="A brief 1-2 sentence summary of this blog post..."
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Full Content */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Full Article Content *
                            </label>
                            <textarea
                                rows={12}
                                required
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Write your full blog post content here. You can use plain text or HTML formatting..."
                                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                            />
                            {errors.content && <span className="text-xs text-rose-500 font-semibold">{errors.content}</span>}
                        </div>
                    </div>

                    {/* SECTION 2: FEATURE IMAGE & PUBLISH STATUS */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                                    <Image className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Featured Image & Publish
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Upload a cover image and control publication status
                                    </p>
                                </div>
                            </div>

                            {/* Published Status Toggle */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={Boolean(data.is_published)}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                                />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Published</span>
                            </label>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-4">
                            {imagePreview && (
                                <div className="w-full h-48 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Feature Image
                                </label>
                                <div className="flex items-center gap-3">
                                    <label className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 cursor-pointer flex items-center gap-2">
                                        <Upload className="w-4 h-4 text-blue-500" />
                                        <span>Choose Image File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <span className="text-xs text-slate-400">
                                        {data.image ? data.image.name : (blog?.image ? 'Current image will be kept' : 'No file chosen')}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-2">Recommended: 1200×630px, JPG or PNG, max 5MB.</p>
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON AT BOTTOM */}
                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-transform cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving...' : (isEdit ? 'Update Blog Post' : 'Publish Blog Post')}</span>
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}
