'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader2, X,  } from 'lucide-react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Button } from '@/components/ui/button';

interface StudentAchiever {
    _id: string;
    name: string;
    imageUrl: string;
    heading: string;
    description: string;
    order: number;
    createdAt: string;
}

export default function AchieversManagementPage() {
    const [achievers, setAchievers] = useState<StudentAchiever[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAchiever, setEditingAchiever] = useState<StudentAchiever | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        heading: '',
        description: '',
        order: 0,
    });
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [achieverToDelete, setAchieverToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchAchievers();
    }, []);

    const fetchAchievers = async () => {
        try {
            const response = await fetch('/api/achievers');
            const data = await response.json();
            setAchievers(data.achievers || []);
        } catch (error) {
            console.error('Failed to fetch achievers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const url = editingAchiever
                ? `/api/achievers/${editingAchiever._id}`
                : '/api/achievers';
            const method = editingAchiever ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save achiever');
            }

            await fetchAchievers();
            handleCloseModal();
        } catch (error: any) {
            alert(error.message || 'Failed to save achiever');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setAchieverToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!achieverToDelete) return;

        try {
            const response = await fetch(`/api/achievers/${achieverToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete achiever');
            }

            await fetchAchievers();
        } catch (error) {
            alert('Failed to delete achiever');
        } finally {
            setIsDeleteDialogOpen(false);
            setAchieverToDelete(null);
        }
    };

    const handleEdit = (achiever: StudentAchiever) => {
        setEditingAchiever(achiever);
        setFormData({
            name: achiever.name,
            imageUrl: achiever.imageUrl,
            heading: achiever.heading,
            description: achiever.description,
            order: achiever.order,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingAchiever(null);
        setFormData({
            name: '',
            imageUrl: '',
            heading: '',
            description: '',
            order: 0,
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'image');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to upload image');
            }

            const data = await response.json();
            setFormData(prev => ({
                ...prev,
                imageUrl: data.url,
            }));
        } catch (error: any) {
            alert(error.message || 'Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            imageUrl: '',
        }));
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
                        Student Achievers Management
                    </h1>
                    <p className="text-springer-gray mt-1">
                        Manage student achievements and accomplishments
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-springer-red text-white rounded-lg hover:bg-red-700 transition"
                >
                    <Plus className="w-5 h-5" />
                    Add Achiever
                </button>
            </div>

            {/* Achievers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievers.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-springer-gray">
                        No achievers found. Add your first achiever!
                    </div>
                ) : (
                    achievers.map((achiever) => (
                        <div
                            key={achiever._id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
                        >
                            <div className="relative h-48 bg-gray-100">
                                <Image
                                    src={achiever.imageUrl}
                                    alt={achiever.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-springer-charcoal mb-1">
                                    {achiever.name}
                                </h3>
                                <p className="text-sm text-springer-red font-medium mb-2">
                                    {achiever.heading}
                                </p>
                                <p className="text-sm text-springer-gray line-clamp-2 mb-4">
                                    {achiever.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-springer-gray">
                                        Order: {achiever.order}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(achiever)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(achiever._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            <Dialog open={showModal} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-2xl h-[92vh] flex flex-col p-0 overflow-hidden gap-0">
                    <DialogHeader className="p-6 border-b shrink-0">
                        <DialogTitle>
                            {editingAchiever ? 'Edit Achiever' : 'Add Achiever'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Student Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full placeholder:text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none"
                                    placeholder="Enter student name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Student Image *
                                </label>
                                {formData.imageUrl ? (
                                    <div className="space-y-3">
                                        <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200">
                                            <Image
                                                src={formData.imageUrl}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="text-sm text-red-600 hover:underline flex items-center gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" /> Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50">
                                        <input
                                            type="file"
                                            id="achiever-image"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploadingImage}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="achiever-image"
                                            className="flex flex-col items-center cursor-pointer"
                                        >
                                            <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 mb-2">
                                                <Plus className="w-6 h-6 text-springer-red" />
                                            </div>
                                            <span className="text-sm font-medium text-springer-charcoal">
                                                Click to upload student image
                                            </span>
                                            <span className="text-xs text-springer-gray mt-1">
                                                PNG, JPG or JPEG (Max. 5MB)
                                            </span>
                                        </label>
                                        {uploadingImage && (
                                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                                                <Loader2 className="w-6 h-6 animate-spin text-springer-red" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Heading *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.heading}
                                    onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                                    className="w-full placeholder:text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none"
                                    placeholder="e.g., Class 10 Topper, State Level Cricket"
                                />
                                <p className="text-xs text-springer-gray mt-1">
                                    Mention class for academic achievements or sport name for sports achievements
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={2}
                                    className="w-full placeholder:text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none resize-none"
                                    placeholder="Describe the achievement (e.g., marks obtained, tournament details)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-springer-red focus:border-transparent outline-none"
                                    placeholder="0"
                                />
                                <p className="text-xs text-springer-gray mt-1">
                                    Lower numbers appear first
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50/50 shrink-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={submitting || !formData.imageUrl}
                                className="bg-springer-red hover:bg-red-700 text-white min-w-[100px]"
                            >
                                {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                {editingAchiever ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Achiever"
                description="Are you sure you want to delete this achiever?"
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    );
}
