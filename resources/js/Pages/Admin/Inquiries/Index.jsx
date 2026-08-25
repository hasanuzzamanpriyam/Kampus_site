import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';
import {
    Mail,
    Search,
    Trash2,
    CheckCircle2,
    Circle,
    X,
    MessageSquare,
    User,
    Phone,
    Tag,
    Sparkles,
    Calendar,
    Eye,
    EyeOff,
    Filter,
    MailOpen
} from 'lucide-react';

export default function Index({ messages = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [readFilter, setReadFilter] = useState('All');
    const [messageModal, setMessageModal] = useState(null);

    const unreadCount = messages.filter(m => !m.is_read).length;

    const filteredMessages = messages.filter(m => {
        const matchesSearch =
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.topic || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRead =
            readFilter === 'All' ||
            (readFilter === 'Unread' && !m.is_read) ||
            (readFilter === 'Read' && m.is_read);
        return matchesSearch && matchesRead;
    });

    const handleToggleRead = (id, currentIsRead) => {
        router.put(`/admin/inquiries/${id}`, {
            is_read: !currentIsRead,
        }, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete the message from "${name}"? This action cannot be undone.`)) {
            router.delete(`/admin/inquiries/${id}`);
        }
    };

    const handleViewMessage = (msg) => {
        setMessageModal(msg);
        // Auto-mark as read when viewing
        if (!msg.is_read) {
            handleToggleRead(msg.id, false);
        }
    };

    return (
        <AdminLayout title="Inquiries & Messages">
            <Head title="Inquiries — Kampus CMS" />

            <div className="space-y-6">

                {/* HEADER BANNER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>INBOX</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            Student Inquiries & Messages
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Review and respond to contact form submissions from prospective students.
                        </p>
                    </div>

                    {unreadCount > 0 && (
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-600 text-white text-xs font-extrabold shadow-md shadow-blue-600/30">
                            <MailOpen className="w-4 h-4" />
                            <span>{unreadCount} Unread</span>
                        </div>
                    )}
                </div>

                {/* SEARCH & FILTER BAR */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name, email, or topic..."
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                        />
                        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                    </div>

                    <div className="relative">
                        <select
                            value={readFilter}
                            onChange={(e) => setReadFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs appearance-none cursor-pointer"
                        >
                            <option value="All">All Messages</option>
                            <option value="Unread">Unread Only</option>
                            <option value="Read">Read Only</option>
                        </select>
                        <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                </div>

                {/* MESSAGES TABLE */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                    <th className="py-4 px-6 font-extrabold">Name</th>
                                    <th className="py-4 px-6 font-extrabold">Email</th>
                                    <th className="py-4 px-6 font-extrabold">Topic</th>
                                    <th className="py-4 px-6 font-extrabold">Date</th>
                                    <th className="py-4 px-6 font-extrabold">Status</th>
                                    <th className="py-4 px-6 font-extrabold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                {filteredMessages.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                            No messages found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <tr
                                            key={msg.id}
                                            className={`transition-colors ${
                                                !msg.is_read
                                                    ? 'bg-blue-50/60 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                                                    : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                                            }`}
                                        >
                                            {/* Name */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    {!msg.is_read && (
                                                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 animate-pulse" />
                                                    )}
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                                                        !msg.is_read
                                                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                                    }`}>
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <span className={`text-sm ${!msg.is_read ? 'font-extrabold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>
                                                        {msg.name}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="py-4 px-6 text-xs font-medium text-slate-600 dark:text-slate-400">
                                                {msg.email}
                                            </td>

                                            {/* Topic */}
                                            <td className="py-4 px-6">
                                                {msg.topic ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md font-bold border border-indigo-200/60 dark:border-indigo-800">
                                                        <Tag className="w-3 h-3" />
                                                        {msg.topic}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">—</span>
                                                )}
                                            </td>

                                            {/* Date */}
                                            <td className="py-4 px-6 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                                    <span>
                                                        {msg.created_at
                                                            ? new Date(msg.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                            : '—'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="py-4 px-6">
                                                {msg.is_read ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Read
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                        <Circle className="w-3.5 h-3.5" />
                                                        Unread
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button
                                                    onClick={() => handleViewMessage(msg)}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                                                    title="View Message"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>View</span>
                                                </button>

                                                <button
                                                    onClick={() => handleToggleRead(msg.id, msg.is_read)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                                                        msg.is_read
                                                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                                                            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                                                    }`}
                                                    title={msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                                                >
                                                    {msg.is_read ? <EyeOff className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    <span>{msg.is_read ? 'Unread' : 'Read'}</span>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(msg.id, msg.name)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-bold border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
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
                            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                    {messageModal.name}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {messageModal.topic || 'No topic specified'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm mb-5">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                                <span>{messageModal.email}</span>
                            </div>
                            {messageModal.phone && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span>{messageModal.phone}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                                <span>
                                    {messageModal.created_at
                                        ? new Date(messageModal.created_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                        : '—'}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Message
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {messageModal.message}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
