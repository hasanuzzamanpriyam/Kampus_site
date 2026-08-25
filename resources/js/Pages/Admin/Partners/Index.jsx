import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
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
    Calendar
} from 'lucide-react';

export default function Index({ applications = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [messageModal, setMessageModal] = useState(null);

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

    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
            case 'rejected':
                return 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
            default:
                return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle2 className="w-3.5 h-3.5" />;
            case 'rejected': return <XCircle className="w-3.5 h-3.5" />;
            default: return <Clock className="w-3.5 h-3.5" />;
        }
    };

    return (
        <AdminLayout title="Partner Applications">
            <Head title="Partner Applications — Kampus CMS" />

            <div className="space-y-6">

                {/* HEADER BANNER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>PARTNER PIPELINE</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            Agency Partner Applications
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Review, approve, or reject sub-agent and institutional partnership requests.
                        </p>
                    </div>

                    {/* Summary counts */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{applications.filter(a => a.status === 'pending').length} Pending</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{applications.filter(a => a.status === 'approved').length} Approved</span>
                        </div>
                    </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by company, contact person, email, country..."
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
                            <option value="All">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <Sparkles className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                </div>

                {/* PARTNER APPLICATIONS TABLE */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                    <th className="py-4 px-6 font-extrabold">Company Name</th>
                                    <th className="py-4 px-6 font-extrabold">Contact Person</th>
                                    <th className="py-4 px-6 font-extrabold">Country</th>
                                    <th className="py-4 px-6 font-extrabold">Email</th>
                                    <th className="py-4 px-6 font-extrabold">Date Applied</th>
                                    <th className="py-4 px-6 font-extrabold">Status</th>
                                    <th className="py-4 px-6 font-extrabold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                {filteredApplications.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                            No partner applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">

                                            {/* Company Name */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                                                        <Building2 className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                                                        {app.company_name}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Contact Person */}
                                            <td className="py-4 px-6 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                <div className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                    <span>{app.contact_person}</span>
                                                </div>
                                            </td>

                                            {/* Country */}
                                            <td className="py-4 px-6 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                <div className="flex items-center gap-1.5">
                                                    <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                    <span>{app.country}</span>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="py-4 px-6 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                {app.email}
                                            </td>

                                            {/* Date Applied */}
                                            <td className="py-4 px-6 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                                    <span>
                                                        {app.created_at
                                                            ? new Date(app.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                            : '—'}
                                                    </span>
                                                </div>
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
                                                {app.message && (
                                                    <button
                                                        onClick={() => setMessageModal(app)}
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer"
                                                        title="View Message"
                                                    >
                                                        <MessageSquare className="w-3.5 h-3.5" />
                                                        <span>View</span>
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(app.id, app.company_name)}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-bold border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Delete</span>
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* VIEW MESSAGE MODAL */}
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
        </AdminLayout>
    );
}
