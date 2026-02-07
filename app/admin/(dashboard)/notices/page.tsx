'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Edit, Trash2, Loader2, X, FileText } from 'lucide-react';
import { format } from 'date-fns';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Button } from '@/components/ui/button';

const noticeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    date: z.string().min(1, 'Date is required'),
    pdfUrl: z.string().optional(),
    pdfFileName: z.string().optional(),
});

type NoticeFormData = z.infer<typeof noticeSchema>;

interface Notice {
    _id: string;
    title: string;
    content: string;
    date: string;
    pdfUrl?: string;
    pdfFileName?: string;
    createdAt: string;
}

export default function NoticesManagementPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [noticeToDelete, setNoticeToDelete] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<NoticeFormData>({
        resolver: zodResolver(noticeSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0],
            pdfUrl: '',
            pdfFileName: '',
        }
    });

    const pdfUrl = watch('pdfUrl');
    const pdfFileName = watch('pdfFileName');

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

    const onSubmit = async (data: NoticeFormData) => {
        try {
            const url = editingNotice
                ? `/api/notices/${editingNotice._id}`
                : '/api/notices';
            const method = editingNotice ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save notice');
            }

            await fetchNotices();
            handleCloseModal();
        } catch (error: any) {
            alert(error.message || 'Failed to save notice');
        }
    };

    const handleDeleteClick = (id: string) => {
        setNoticeToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!noticeToDelete) return;

        try {
            const response = await fetch(`/api/notices/${noticeToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete notice');
            }

            await fetchNotices();
        } catch (error) {
            alert('Failed to delete notice');
        } finally {
            setIsDeleteDialogOpen(false);
            setNoticeToDelete(null);
        }
    };

    const handleEdit = (notice: Notice) => {
        setEditingNotice(notice);
        reset({
            title: notice.title,
            content: notice.content,
            date: new Date(notice.date).toISOString().split('T')[0],
            pdfUrl: notice.pdfUrl || '',
            pdfFileName: notice.pdfFileName || '',
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingNotice(null);
        reset({
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0],
            pdfUrl: '',
            pdfFileName: '',
        });
    };

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        setUploadingPdf(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'pdf');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to upload PDF');
            }

            const data = await response.json();
            setValue('pdfUrl', data.url, { shouldValidate: true });
            setValue('pdfFileName', data.fileName, { shouldValidate: true });
        } catch (error: any) {
            alert(error.message || 'Failed to upload PDF');
        } finally {
            setUploadingPdf(false);
        }
    };

    const handleRemovePdf = () => {
        setValue('pdfUrl', '', { shouldValidate: true });
        setValue('pdfFileName', '', { shouldValidate: true });
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
                                            <div className="flex items-center gap-2">
                                                <div className="text-sm font-medium text-springer-charcoal">
                                                    {notice.title}
                                                </div>
                                                {notice.pdfUrl && (
                                                    <a
                                                        href={notice.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 transition"
                                                        title="Download PDF"
                                                    >
                                                        <FileText className="w-3 h-3" />
                                                        PDF
                                                    </a>
                                                )}
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
                                                    onClick={() => handleDeleteClick(notice._id)}
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
            <Dialog open={showModal} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-2xl h-[92vh] flex flex-col p-0 overflow-hidden gap-0">
                    <DialogHeader className="p-6 border-b shrink-0">
                        <DialogTitle>
                            {editingNotice ? 'Edit Notice' : 'Create Notice'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Title *
                                </label>
                                <input
                                    {...register('title')}
                                    className={`w-full placeholder:text-sm px-4 py-2 border rounded-lg outline-none transition ${errors.title
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter notice title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Content *
                                </label>
                                <textarea
                                    {...register('content')}
                                    rows={6}
                                    className={`w-full placeholder:text-sm px-4 py-2 border rounded-lg outline-none resize-none transition ${errors.content
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter notice content"
                                />
                                {errors.content && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.content.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    {...register('date')}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.date
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.date.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    PDF Attachment (Optional)
                                </label>
                                {pdfUrl ? (
                                    <div className="flex items-center gap-3 p-4 bg-red-50/50 border border-red-100 rounded-lg">
                                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                            <FileText className="w-5 h-5 text-springer-red" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-springer-charcoal truncate">
                                                {pdfFileName}
                                            </p>
                                            <a
                                                href={pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-springer-red hover:underline font-medium"
                                            >
                                                View PDF
                                            </a>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemovePdf}
                                            className="p-2 text-springer-gray hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50">
                                        <input
                                            type="file"
                                            id="notice-pdf"
                                            accept=".pdf"
                                            onChange={handlePdfUpload}
                                            disabled={uploadingPdf}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="notice-pdf"
                                            className="flex flex-col items-center cursor-pointer"
                                        >
                                            <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 mb-2">
                                                <FileText className="w-6 h-6 text-springer-red" />
                                            </div>
                                            <span className="text-sm font-medium text-springer-charcoal text-center px-4">
                                                Click to upload notice PDF
                                            </span>
                                            <span className="text-xs text-springer-gray mt-1">
                                                PDF file only (Max. 10MB)
                                            </span>
                                        </label>
                                        {uploadingPdf && (
                                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                                                <Loader2 className="w-6 h-6 animate-spin text-springer-red" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50/50 shrink-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseModal}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                className="bg-springer-red hover:bg-red-700 text-white min-w-[100px]"
                            >
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                {editingNotice ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Notice"
                description="Are you sure you want to delete this notice?"
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    );
}
