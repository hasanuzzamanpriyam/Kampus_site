import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Trash2, AlertTriangle, Lock } from 'lucide-react';
import Modal from '@/Components/Modal';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="flex items-center gap-3 pb-5 border-b border-rose-100 dark:border-rose-950/60">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0 border border-rose-200/60 dark:border-rose-800/60">
                    <Trash2 className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-base font-extrabold text-rose-600 dark:text-rose-400">
                        Delete Account
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Permanently delete your administrator account and revoke access to this CMS.
                    </p>
                </div>
            </header>

            <div className="max-w-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Once your account is deleted, all administrator records, sessions, and assigned permissions will be permanently removed. Before proceeding, please ensure another super administrator is active to maintain system access.
            </div>

            <div>
                <button
                    type="button"
                    onClick={confirmUserDeletion}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                </button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 sm:p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                Are you sure you want to delete your account?
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                This action is permanent and cannot be undone.
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        Please enter your password to confirm you would like to permanently delete your administrator account.
                    </p>

                    <div className="mb-6">
                        <label htmlFor="delete_password" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                            Confirm Password <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="delete_password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                placeholder="Enter password to confirm"
                            />
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        </div>
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                        >
                            {processing ? 'Deleting...' : 'Delete Account'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
