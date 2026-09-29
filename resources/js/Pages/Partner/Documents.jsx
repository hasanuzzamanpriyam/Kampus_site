import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import AdminLayout from '../Admin/Layouts/AdminLayout';
import {
    FileText,
    UploadCloud,
    CheckCircle2,
    Clock,
    XCircle,
    Download,
    Eye,
    Edit3,
    Trash2,
    PlusCircle,
    X,
    Building2,
    ShieldCheck,
    Calendar,
    Sparkles,
    AlertCircle,
    ExternalLink,
    FileCheck,
    Search,
    RefreshCw
} from 'lucide-react';

export default function Documents({ documents = [], stats = {}, partnerApp = null }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Document Form
    const docForm = useForm({
        title: '',
        document_type: 'Trade License / Business Registration',
        document_number: '',
        issuing_organization: '',
        issue_date: '',
        expiry_date: '',
        description: '',
        file: null,
    });

    const handleOpenUploadModal = (doc = null) => {
        if (doc) {
            setEditingDoc(doc);
            docForm.setData({
                title: doc.title || '',
                document_type: doc.document_type || 'Trade License / Business Registration',
                document_number: doc.document_number || '',
                issuing_organization: doc.issuing_organization || '',
                issue_date: doc.issue_date || '',
                expiry_date: doc.expiry_date || '',
                description: doc.description || '',
                file: null,
            });
        } else {
            setEditingDoc(null);
            docForm.reset();
            docForm.setData({
                title: '',
                document_type: 'Trade License / Business Registration',
                document_number: '',
                issuing_organization: '',
                issue_date: '',
                expiry_date: '',
                description: '',
                file: null,
            });
        }
        setIsUploadModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (editingDoc) {
            docForm.post(route('partner.documents.update', editingDoc.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsUploadModalOpen(false);
                    docForm.reset();
                    setEditingDoc(null);
                },
            });
        } else {
            docForm.post(route('partner.documents.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsUploadModalOpen(false);
                    docForm.reset();
                },
            });
        }
    };

    const handleDeleteDoc = (id, title) => {
        if (confirm(`Are you sure you want to remove the document "${title}"?`)) {
            router.delete(route('partner.documents.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const filteredDocs = documents.filter((doc) => {
        const matchesSearch =
            (doc.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (doc.document_type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (doc.issuing_organization || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (doc.document_number || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || doc.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'verified':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Action Required</span>
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Under Review</span>
                    </span>
                );
        }
    };

    return (
        <AdminLayout title="Partner Compliance Documents">
            <Head title="Company Documents — RMS Partner Portal" />

            <div className="space-y-6">

                {/* 1. HEADER BANNER */}
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>AGENCY COMPLIANCE & VERIFICATION HUB</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Company Verification Documents
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                            Upload trade licenses, official tax registrations, academic agency accreditations, and representative credentials. Our compliance team verifies your documentation to activate global university direct-dispatch privileges.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleOpenUploadModal()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/30 hover:scale-[1.02] transition-all cursor-pointer shrink-0 self-start md:self-auto"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Upload New Document</span>
                    </button>
                </div>

                {/* 2. STATS OVERVIEW CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Documents</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.total || 0}</p>
                            <p className="text-[11px] text-slate-400">Uploaded credentials</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Verified</p>
                            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.verified || 0}</p>
                            <p className="text-[11px] text-slate-400">Approved by admin</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Under Review</p>
                            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{stats.pending || 0}</p>
                            <p className="text-[11px] text-slate-400">Awaiting audit</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-rose-500 uppercase tracking-wider">Action Needed</p>
                            <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{stats.rejected || 0}</p>
                            <p className="text-[11px] text-slate-400">Requires correction</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 3. SEARCH & STATUS FILTER */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search documents by title, type, license #, or organization..."
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
                            <option value="all">All Verification Statuses</option>
                            <option value="submitted">Under Review (Pending)</option>
                            <option value="verified">Verified (Approved)</option>
                            <option value="rejected">Action Required (Rejected)</option>
                        </select>
                        <Sparkles className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                </div>

                {/* 4. DOCUMENTS GRID / LIST */}
                {filteredDocs.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
                        <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-200/60 dark:border-blue-800/60">
                            <UploadCloud className="w-8 h-8" />
                        </div>
                        <div className="max-w-md mx-auto space-y-1">
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                {searchTerm || statusFilter !== 'all' ? 'No matching documents found' : 'No documents uploaded yet'}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Try adjusting your search criteria or resetting filters to see other uploaded documents.'
                                    : 'Upload your company trade license, certificate of incorporation, or tax clearance document to verify your agency.'}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleOpenUploadModal()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 cursor-pointer"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Upload Document Now</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredDocs.map((doc) => {
                            const isVerified = doc.status === 'verified';
                            const isRejected = doc.status === 'rejected';

                            return (
                                <div
                                    key={doc.id}
                                    className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between shadow-xs ${isVerified
                                            ? 'border-emerald-200/80 dark:border-emerald-900/40'
                                            : isRejected
                                                ? 'border-rose-200/80 dark:border-rose-900/40'
                                                : 'border-slate-200 dark:border-slate-800'
                                        }`}
                                >
                                    <div className="space-y-3.5">
                                        {/* Status Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-extrabold border border-blue-200/60 dark:border-blue-800/60">
                                                {doc.document_type || 'Document'}
                                            </span>
                                            {getStatusBadge(doc.status)}
                                        </div>

                                        {/* Title & Document Number */}
                                        <div>
                                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                                                {doc.title}
                                            </h4>
                                            {doc.document_number && (
                                                <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                                                    Ref/ID: {doc.document_number}
                                                </p>
                                            )}
                                        </div>

                                        {/* Details metadata */}
                                        <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
                                            {doc.issuing_organization && (
                                                <div className="flex items-center gap-1.5 col-span-2">
                                                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span className="truncate">Issuer: <strong className="text-slate-800 dark:text-slate-200">{doc.issuing_organization}</strong></span>
                                                </div>
                                            )}
                                            {doc.issue_date && (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span>Issued: {doc.issue_date}</span>
                                                </div>
                                            )}
                                            {doc.expiry_date && (
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span>Expires: {doc.expiry_date}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        {doc.description && (
                                            <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                                                {doc.description}
                                            </p>
                                        )}

                                        {/* Admin Remarks / Counselor Feedback Notice */}
                                        {doc.counselor_remarks && (
                                            <div className={`p-3 rounded-xl text-xs space-y-1 ${isRejected
                                                    ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200'
                                                    : 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                                                }`}>
                                                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                                                    {isRejected ? <AlertCircle className="w-3 h-3 text-rose-500" /> : <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                                    <span>Admin Audit Note</span>
                                                </div>
                                                <p className="leading-relaxed">{doc.counselor_remarks}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            {doc.file_path ? (
                                                <a
                                                    href={doc.file_path}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-colors"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                    <span>View Document</span>
                                                </a>
                                            ) : (
                                                <span className="text-[11px] text-slate-400 italic">No file attached</span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenUploadModal(doc)}
                                                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                title="Edit Details / Re-upload"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDeleteDoc(doc.id, doc.title)}
                                                className="p-2 rounded-xl text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                                title="Delete Document"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>

            {/* 5. UPLOAD & EDIT DOCUMENT MODAL */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                <FileCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                    {editingDoc ? 'Update Company Document' : 'Upload Verification Document'}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Documents are audited by administrators to grant institutional partnerships.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {/* Document Title */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Document Title <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Official Trade License 2026, Tax Exemption Clearance"
                                    value={docForm.data.title}
                                    onChange={(e) => docForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {docForm.errors.title && (
                                    <p className="mt-1 text-xs text-rose-500">{docForm.errors.title}</p>
                                )}
                            </div>

                            {/* Document Type Dropdown */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Document Category <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={docForm.data.document_type}
                                    onChange={(e) => docForm.setData('document_type', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                                >
                                    <option value="Trade License / Business Registration">Trade License / Business Registration</option>
                                    <option value="Tax / VAT Clearance Certificate">Tax / VAT Clearance Certificate</option>
                                    <option value="Education Agency Accreditation (ICEF / British Council / QEAC)">Education Agency Accreditation (ICEF / British Council / QEAC)</option>
                                    <option value="Director / Owner Passport or National ID">Director / Owner Passport or National ID</option>
                                    <option value="Bank Solvency / Financial Guarantee">Bank Solvency / Financial Guarantee</option>
                                    <option value="Signed Partnership MoU / Agreement">Signed Partnership MoU / Agreement</option>
                                    <option value="Other Official Verification Credential">Other Official Verification Credential</option>
                                </select>
                            </div>

                            {/* Ref Number & Issuing Org */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                        License / ID / Ref Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. TL-889342-BD, VAT-99120"
                                        value={docForm.data.document_number}
                                        onChange={(e) => docForm.setData('document_number', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                        Issuing Organization / Authority
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. City Corporation, Chamber of Commerce"
                                        value={docForm.data.issuing_organization}
                                        onChange={(e) => docForm.setData('issuing_organization', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Issue Date & Expiry Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                        Issue Date
                                    </label>
                                    <input
                                        type="date"
                                        value={docForm.data.issue_date}
                                        onChange={(e) => docForm.setData('issue_date', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                        Expiry Date (if applicable)
                                    </label>
                                    <input
                                        type="date"
                                        value={docForm.data.expiry_date}
                                        onChange={(e) => docForm.setData('expiry_date', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Description / Additional Notes */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    Notes or Explanations (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Provide any additional context or instructions regarding this document..."
                                    value={docForm.data.description}
                                    onChange={(e) => docForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* File Upload Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                    {editingDoc ? 'Upload Replacement File (Optional)' : 'Document File (PDF, JPG, PNG, WEBP) *'}
                                </label>
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                                    <input
                                        type="file"
                                        required={!editingDoc}
                                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                                        onChange={(e) => docForm.setData('file', e.target.files[0])}
                                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                                    />
                                    <p className="text-[11px] text-slate-400 mt-2">
                                        Maximum allowed file size: 10MB.
                                    </p>
                                </div>
                                {editingDoc && editingDoc.file_name && (
                                    <p className="mt-1 text-xs text-slate-400">
                                        Current file: <span className="font-semibold text-slate-600 dark:text-slate-300">{editingDoc.file_name}</span>
                                    </p>
                                )}
                                {docForm.errors.file && (
                                    <p className="mt-1 text-xs text-rose-500">{docForm.errors.file}</p>
                                )}
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={docForm.processing}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 cursor-pointer disabled:opacity-50"
                                >
                                    {docForm.processing ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>Uploading Document...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>{editingDoc ? 'Save Changes' : 'Submit for Verification'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
