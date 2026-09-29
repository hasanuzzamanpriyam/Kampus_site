import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    Handshake,
    Search,
    Trash2,
    CheckCircle2,
    Clock,
    XCircle,
    X,
    MessageSquare,
    Building2,
    User,
    Mail,
    Phone,
    Globe,
    Sparkles,
    Calendar,
    Save,
    FileText,
    Eye,
    ShieldCheck,
    FileCheck,
    Download,
    ExternalLink,
    AlertCircle,
    Layers
} from 'lucide-react';

export default function Index({
    applications = [],
    partnerModalParagraph: initialParagraph = '',
    documentStats = { total: 0, verified: 0, pending: 0, rejected: 0 }
}) {
    const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'documents'
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [messageModal, setMessageModal] = useState(null);
    const [modalParagraph, setModalParagraph] = useState(initialParagraph);
    const [isSavingText, setIsSavingText] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Partner Document Audit Modal
    const [selectedPartnerDocModal, setSelectedPartnerDocModal] = useState(null);
    const [verifyingDocId, setVerifyingDocId] = useState(null);
    const [docRemarks, setDocRemarks] = useState('');

    const certForm = useForm({
        status: '',
        counselor_remarks: '',
    });

    const handleSaveParagraph = (e) => {
        e.preventDefault();
        setIsSavingText(true);
        setSaveSuccess(false);

        router.post('/admin/partners/popup-paragraph', {
            partner_modal_paragraph: modalParagraph,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 4000);
            },
            onError: () => {
                alert('Failed to save the partner popup paragraph. Please try again.');
            },
            onFinish: () => {
                setIsSavingText(false);
            }
        });
    };

    const filteredApplications = applications.filter(a => {
        const matchesSearch =
            a.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.country.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'All' || a.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (id, newStatus) => {
        router.put(`/admin/partners/${id}`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                alert(`Application status updated to "${newStatus}".`);
            }
        });
    };

    const handleDelete = (id, companyName) => {
        if (confirm(`Are you sure you want to delete the application from "${companyName}"? This action cannot be undone.`)) {
            router.delete(`/admin/partners/${id}`);
        }
    };

    const handleOpenDocModal = (app) => {
        setSelectedPartnerDocModal(app);
        setVerifyingDocId(null);
        setDocRemarks('');
    };

    const handleVerifyPartnerDocument = (doc, status) => {
        certForm.setData({
            status: status,
            counselor_remarks: docRemarks,
        });

        certForm.patch(route('admin.partners.documents.verify', doc.id), {
            preserveScroll: true,
            onSuccess: () => {
                setVerifyingDocId(null);
                setDocRemarks('');
                // Update local modal state immediately
                if (selectedPartnerDocModal) {
                    const docs = selectedPartnerDocModal.partner_documents || [];
                    const updated = docs.map(d =>
                        d.id === doc.id
                            ? { ...d, status: status, counselor_remarks: docRemarks, verified_at: status === 'verified' ? new Date().toISOString() : null }
                            : d
                    );
                    setSelectedPartnerDocModal({ ...selectedPartnerDocModal, partner_documents: updated });
                }
            },
        });
    };

    // Extract all documents across all partners for the dedicated "All Documents" tab
    const allPartnerDocuments = [];
    applications.forEach(app => {
        const docs = app.partner_documents || [];
        docs.forEach(d => {
            allPartnerDocuments.push({
                ...d,
                company_name: app.company_name,
                contact_person: app.contact_person,
                partner_email: app.email,
                partner_country: app.country,
                partner_app_id: app.id,
            });
        });
    });

    const filteredAllDocuments = allPartnerDocuments.filter(d => {
        const matchesSearch =
            (d.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (d.document_type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (d.company_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (d.contact_person || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'All' || d.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved':
            case 'verified':
                return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
            case 'rejected':
                return 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
            default:
                return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        }
    };

    return (
        <AdminLayout title="Partner Applications & Document Auditing">
            <Head title="Partner Applications & Verification — RMS CMS" />

            <div className="space-y-6">

                {/* 1. HEADER BANNER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>PARTNER PIPELINE & AUDIT HUB</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            Partner Agencies & Compliance Verification
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Review partnership requests, manage portal access, and audit uploaded trade licenses and corporate certifications.
                        </p>
                    </div>

                    {/* Summary counts */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{applications.filter(a => a.status === 'pending').length} Pending Apps</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{applications.filter(a => a.status === 'approved').length} Approved</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800">
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>{documentStats.total || 0} Docs ({documentStats.pending || 0} to verify)</span>
                        </div>
                    </div>
                </div>

                {/* 2. TAB NAVIGATION */}
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 w-fit">
                    <button
                        type="button"
                        onClick={() => { setActiveTab('applications'); setStatusFilter('All'); setSearchTerm(''); }}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'applications'
                                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <Handshake className="w-4 h-4" />
                        <span>Agency Applications</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold">
                            {applications.length}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => { setActiveTab('documents'); setStatusFilter('All'); setSearchTerm(''); }}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'documents'
                                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <FileCheck className="w-4 h-4" />
                        <span>Compliance Documents Auditing</span>
                        {documentStats.pending > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-extrabold animate-pulse">
                                {documentStats.pending} pending
                            </span>
                        )}
                    </button>
                </div>

                {/* 3. EDITABLE POPUP INTRO PARAGRAPH SETTINGS CARD (Visible on Applications tab) */}
                {activeTab === 'applications' && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                                        "Become a Partner" Popup Intro Paragraph
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        This paragraph is displayed on the public homepage popup, directly beneath the title and above the first form field.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowPreview(!showPreview)}
                                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{showPreview ? 'Hide Preview' : 'Live Preview'}</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveParagraph} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Intro Paragraph Content
                                </label>
                                <textarea
                                    rows={3}
                                    value={modalParagraph}
                                    onChange={(e) => setModalParagraph(e.target.value)}
                                    placeholder="Enter the introductory text that appears inside the Become a Partner popup modal..."
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 px-1">
                                    <span>Shown to prospective agencies and institutional sub-agents when opening the popup.</span>
                                    <span>{modalParagraph?.length || 0} characters</span>
                                </div>
                            </div>

                            {/* LIVE PREVIEW BOX */}
                            {showPreview && (
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-purple-300 dark:border-purple-800/60 animate-in fade-in duration-150">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3" />
                                        <span>Live Popup Preview</span>
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md shadow-xs">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600">
                                                <Handshake className="w-4 h-4" />
                                            </div>
                                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                                                Become a Partner
                                            </h4>
                                        </div>
                                        <div className="relative text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-purple-50/50 dark:bg-purple-950/20 p-2.5 pr-7 rounded-lg border border-purple-100/50 dark:border-purple-900/30">
                                            <p>{modalParagraph || <span className="italic text-slate-400">No intro paragraph specified.</span>}</p>
                                            <div className="absolute top-2 right-2 p-0.5 text-slate-400">
                                                <X className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3 pt-2">
                                {saveSuccess && (
                                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Paragraph saved successfully!</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSavingText}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>{isSavingText ? 'Saving Changes...' : 'Save Intro Paragraph'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* 4. SEARCH & FILTER BAR */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={activeTab === 'applications' ? 'Search by company, contact person, email, country...' : 'Search documents by title, type, agency name...'}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                        />
                        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                    </div>

                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs appearance-none cursor-pointer"
                        >
                            {activeTab === 'applications' ? (
                                <>
                                    <option value="All">All Application Statuses</option>
                                    <option value="pending">Pending Review</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </>
                            ) : (
                                <>
                                    <option value="All">All Document Statuses</option>
                                    <option value="submitted">Under Review (Pending)</option>
                                    <option value="verified">Verified (Approved)</option>
                                    <option value="rejected">Action Required (Rejected)</option>
                                </>
                            )}
                        </select>
                        <Sparkles className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                </div>

                {/* TAB 1: APPLICATIONS TABLE */}
                {activeTab === 'applications' && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-4 px-6 font-extrabold">Company Name</th>
                                        <th className="py-4 px-6 font-extrabold">Contact Person</th>
                                        <th className="py-4 px-6 font-extrabold">Country</th>
                                        <th className="py-4 px-6 font-extrabold">Compliance Docs</th>
                                        <th className="py-4 px-6 font-extrabold">Status</th>
                                        <th className="py-4 px-6 font-extrabold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                    {filteredApplications.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                                No partner applications found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredApplications.map((app) => {
                                            const docs = app.partner_documents || [];
                                            const pendingDocs = docs.filter(d => d.status === 'submitted').length;
                                            const verifiedDocs = docs.filter(d => d.status === 'verified').length;

                                            return (
                                                <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">

                                                    {/* Company Name */}
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                                                                <Building2 className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <span className="font-extrabold text-slate-900 dark:text-white text-sm block">
                                                                    {app.company_name}
                                                                </span>
                                                                <span className="text-[11px] text-slate-400 font-normal">
                                                                    Applied on {app.created_at ? new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Contact Person */}
                                                    <td className="py-4 px-6 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                                                                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                                <span>{app.contact_person}</span>
                                                            </div>
                                                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                                                {app.email}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Country */}
                                                    <td className="py-4 px-6 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                        <div className="flex items-center gap-1.5">
                                                            <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                            <span>{app.country}</span>
                                                        </div>
                                                    </td>

                                                    {/* Compliance Docs Badge & Audit Trigger */}
                                                    <td className="py-4 px-6">
                                                        {docs.length > 0 ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleOpenDocModal(app)}
                                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border ${pendingDocs > 0
                                                                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                                                                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                                                                    }`}
                                                                title="Click to view & audit documents"
                                                            >
                                                                <FileCheck className="w-3.5 h-3.5" />
                                                                <span>{docs.length} Doc{docs.length > 1 ? 's' : ''}</span>
                                                                {pendingDocs > 0 && (
                                                                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-500 text-white">
                                                                        {pendingDocs} to audit
                                                                    </span>
                                                                )}
                                                            </button>
                                                        ) : (
                                                            <span className="text-[11px] text-slate-400 italic">No docs uploaded</span>
                                                        )}
                                                    </td>

                                                    {/* Status Inline Dropdown */}
                                                    <td className="py-4 px-6">
                                                        <select
                                                            value={app.status}
                                                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none ${getStatusStyles(app.status)}`}
                                                        >
                                                            <option value="pending">⏳ Pending</option>
                                                            <option value="approved">✅ Approved</option>
                                                            <option value="rejected">❌ Rejected</option>
                                                        </select>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="py-4 px-6 text-right space-x-2">
                                                        {docs.length > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleOpenDocModal(app)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-xs font-extrabold border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer"
                                                                title="Verify Partner Documents"
                                                            >
                                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                                <span>Verify Docs ({docs.length})</span>
                                                            </button>
                                                        )}

                                                        {app.message && (
                                                            <button
                                                                onClick={() => setMessageModal(app)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer"
                                                                title="View Application Message"
                                                            >
                                                                <MessageSquare className="w-3.5 h-3.5" />
                                                                <span>Message</span>
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => handleDelete(app.id, app.company_name)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-bold border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 2: ALL COMPLIANCE DOCUMENTS TABLE */}
                {activeTab === 'documents' && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-4 px-6 font-extrabold">Partner Agency</th>
                                        <th className="py-4 px-6 font-extrabold">Document Title & Type</th>
                                        <th className="py-4 px-6 font-extrabold">Ref / Dates</th>
                                        <th className="py-4 px-6 font-extrabold">Status</th>
                                        <th className="py-4 px-6 font-extrabold text-right">Audit & Verification</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                    {filteredAllDocuments.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                                                <FileCheck className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                                                <p className="font-bold">No partner compliance documents found.</p>
                                                <p className="text-xs text-slate-400 mt-1">Partners will upload licenses and certificates once they log in.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAllDocuments.map((doc) => {
                                            const isVerified = doc.status === 'verified';
                                            const isRejected = doc.status === 'rejected';

                                            return (
                                                <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                                    {/* Agency */}
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                                                                <Building2 className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <span className="font-extrabold text-slate-900 dark:text-white text-xs block">
                                                                    {doc.company_name}
                                                                </span>
                                                                <span className="text-[11px] text-slate-400">
                                                                    {doc.contact_person} • {doc.partner_country}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Title & Type */}
                                                    <td className="py-4 px-6">
                                                        <div>
                                                            <span className="font-extrabold text-slate-900 dark:text-white text-xs block">
                                                                {doc.title}
                                                            </span>
                                                            <span className="inline-block px-2 py-0.5 mt-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                                                                {doc.document_type}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Ref / Dates */}
                                                    <td className="py-4 px-6 text-xs text-slate-600 dark:text-slate-400">
                                                        <div className="space-y-0.5">
                                                            {doc.document_number && (
                                                                <p className="font-mono font-bold text-[11px] text-slate-800 dark:text-slate-200">
                                                                    #{doc.document_number}
                                                                </p>
                                                            )}
                                                            {doc.expiry_date && (
                                                                <p className="text-[11px] text-slate-400">
                                                                    Expires: {doc.expiry_date}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusStyles(doc.status)}`}>
                                                            {isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : (isRejected ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />)}
                                                            <span className="capitalize">{doc.status === 'submitted' ? 'Under Review' : doc.status}</span>
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="py-4 px-6 text-right space-x-2">
                                                        {doc.file_path && (
                                                            <a
                                                                href={doc.file_path}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-colors"
                                                            >
                                                                <Download className="w-3.5 h-3.5" />
                                                                <span>View File</span>
                                                            </a>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const parentApp = applications.find(a => a.id === doc.partner_app_id) || {
                                                                    company_name: doc.company_name,
                                                                    contact_person: doc.contact_person,
                                                                    email: doc.partner_email,
                                                                    country: doc.partner_country,
                                                                    partner_documents: [doc],
                                                                };
                                                                setSelectedPartnerDocModal(parentApp);
                                                                setVerifyingDocId(doc.id);
                                                                setDocRemarks(doc.counselor_remarks || '');
                                                            }}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-purple-600 text-white dark:text-slate-900 hover:text-white dark:hover:text-white font-extrabold text-xs transition-colors cursor-pointer"
                                                        >
                                                            <ShieldCheck className="w-3.5 h-3.5" />
                                                            <span>Audit / Verify</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>

            {/* MODAL 1: VIEW APPLICATION MESSAGE */}
            {messageModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <button
                            onClick={() => setMessageModal(null)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                                <Handshake className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                    {messageModal.company_name}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Application from {messageModal.contact_person}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <span>{messageModal.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Phone className="w-4 h-4 text-blue-500" />
                                <span>{messageModal.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Globe className="w-4 h-4 text-blue-500" />
                                <span>{messageModal.country}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span>{messageModal.years_in_business}</span>
                            </div>
                        </div>

                        {messageModal.message && (
                            <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Additional Notes
                                </p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {messageModal.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL 2: PARTNER DOCUMENTS AUDIT & VERIFICATION MODAL (Just like Students!) */}
            {selectedPartnerDocModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setSelectedPartnerDocModal(null)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                                <Building2 className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        {selectedPartnerDocModal.company_name}
                                    </h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase border ${getStatusStyles(selectedPartnerDocModal.status)}`}>
                                        {selectedPartnerDocModal.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Contact: <strong className="text-slate-700 dark:text-slate-300">{selectedPartnerDocModal.contact_person}</strong> ({selectedPartnerDocModal.email}) • {selectedPartnerDocModal.country}
                                </p>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <FileCheck className="w-4 h-4 text-purple-600" />
                                    <span>Uploaded Compliance Credentials ({(selectedPartnerDocModal.partner_documents || []).length})</span>
                                </h4>
                            </div>

                            {(!selectedPartnerDocModal.partner_documents || selectedPartnerDocModal.partner_documents.length === 0) ? (
                                <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                    <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                                    <p className="font-bold text-slate-700 dark:text-slate-300">No documents uploaded yet by this partner</p>
                                    <p className="text-xs text-slate-400 mt-1">When the partner logs in, they can upload their trade licenses, tax documents, and agency accreditations.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {selectedPartnerDocModal.partner_documents.map((doc) => {
                                        const isVerified = doc.status === 'verified';
                                        const isRejected = doc.status === 'rejected';

                                        return (
                                            <div
                                                key={doc.id}
                                                className={`p-5 rounded-2xl border transition-all ${isVerified
                                                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                                                        : isRejected
                                                            ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                                                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                                                    }`}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                                    <div className="space-y-1.5 flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-extrabold uppercase">
                                                                {doc.document_type || 'Document'}
                                                            </span>
                                                            <h5 className="text-base font-extrabold text-slate-900 dark:text-white">
                                                                {doc.title}
                                                            </h5>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                                                            {doc.document_number && (
                                                                <p>Ref: <strong className="text-slate-700 dark:text-slate-200 font-mono">{doc.document_number}</strong></p>
                                                            )}
                                                            {doc.issuing_organization && (
                                                                <p>Issuer: <strong className="text-slate-700 dark:text-slate-200">{doc.issuing_organization}</strong></p>
                                                            )}
                                                            {doc.expiry_date && (
                                                                <p>Expiry: <strong className="text-slate-700 dark:text-slate-200">{doc.expiry_date}</strong></p>
                                                            )}
                                                        </div>

                                                        {doc.description && (
                                                            <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl mt-2">
                                                                {doc.description}
                                                            </p>
                                                        )}

                                                        {doc.counselor_remarks && (
                                                            <div className="text-xs p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 mt-2">
                                                                <span className="font-bold block text-[10px] uppercase tracking-wider">Current Counselor/Admin Note:</span>
                                                                {doc.counselor_remarks}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="shrink-0 flex items-center gap-2">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusStyles(doc.status)}`}>
                                                            {isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : (isRejected ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />)}
                                                            <span className="capitalize">{doc.status === 'submitted' ? 'Under Review' : doc.status}</span>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* File Link & Verification Controls */}
                                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2">
                                                        {doc.file_path ? (
                                                            <a
                                                                href={doc.file_path}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-xs"
                                                            >
                                                                <Download className="w-3.5 h-3.5" />
                                                                <span>View Document File</span>
                                                            </a>
                                                        ) : (
                                                            <span className="text-[11px] text-slate-400 italic">No document file</span>
                                                        )}
                                                    </div>

                                                    {/* Verification Trigger */}
                                                    <div className="flex items-center gap-1.5">
                                                        {verifyingDocId === doc.id ? (
                                                            <div className="flex flex-col gap-2 w-full mt-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Compliance audit remarks / reason (optional)..."
                                                                    value={docRemarks}
                                                                    onChange={(e) => setDocRemarks(e.target.value)}
                                                                    className="w-full text-xs p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                                />
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setVerifyingDocId(null)}
                                                                        className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleVerifyPartnerDocument(doc, 'rejected')}
                                                                        className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                                                                    >
                                                                        Reject / Action Required
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleVerifyPartnerDocument(doc, 'verified')}
                                                                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                                                                    >
                                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                                        <span>Verify Document</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setVerifyingDocId(doc.id);
                                                                    setDocRemarks(doc.counselor_remarks || '');
                                                                }}
                                                                className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 hover:bg-purple-600 dark:hover:bg-purple-500 text-white dark:text-slate-900 hover:text-white dark:hover:text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                                                            >
                                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                                <span>{isVerified ? 'Change Verification' : 'Audit / Verify'}</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
