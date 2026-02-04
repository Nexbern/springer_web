'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';

interface Notice {
    _id: string;
    title: string;
    content: string;
    date: string;
    createdAt: string;
}

export default function NoticesManagementPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch('/api/notices');
            const data = await response.json();
            setNotices(data.notices || []);
        } catch (error) {
            console.error('Failed to fetch notices:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const url = editingNotice
                ? `/api/notices/${editingNotice._id}`
                : '/api/notices';
            const method = editingNotice ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save notice');
            }

            await fetchNotices();
            handleCloseModal();
        } catch (error: any) {
            alert(error.message || 'Failed to save notice');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notice?')) return;

        try {
            const response = await fetch(`/api/notices/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete notice');
            }

            await fetchNotices();
        } catch (error) {
            alert('Failed to delete notice');
        }
    };

    const handleEdit = (notice: Notice) => {
        setEditingNotice(notice);
        setFormData({
            title: notice.title,
            content: notice.content,
            date: new Date(notice.date).toISOString().split('T')[0],
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingNotice(null);
        setFormData({
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-springer-red" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-springer-charcoal">
                        Notices Management
                    </h1>
                    <p className="text-springer-gray mt-1">
                        Manage school notices and announcements
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-springer-red text-white rounded-lg hover:bg-red-700 transition"
                >
                    <Plus className="w-5 h-5" />
                    Create Notice
                </button>
            </div>

            {/* Notices Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-springer-gray uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {notices.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-springer-gray">
                                        No notices found. Create your first notice!
                                    </td>
                                </tr>
                            ) : (
                                notices.map((notice) => (
                                    <tr key={notice._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-springer-charcoal">
                                                {notice.title}
                                            </div>
                                            <div className="text-sm text-springer-gray line-clamp-1">
                                                {notice.content}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-springer-gray">
                                            {format(new Date(notice.date), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-springer-gray">
                                            {format(new Date(notice.createdAt), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(notice)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(notice._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-springer-charcoal">
                                {editingNotice ? 'Edit Notice' : 'Create Notice'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none"
                                    placeholder="Enter notice title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Content *
                                </label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none resize-none"
                                    placeholder="Enter notice content"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 border border-gray-300 text-springer-gray rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-springer-red text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingNotice ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
