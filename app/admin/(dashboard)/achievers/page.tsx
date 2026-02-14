'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Button } from '@/components/ui/button';

const achieverSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    heading: z.string().min(1, 'Heading is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().min(1, 'Achiever image is required'),
    order: z.number(),
});

type AchieverFormData = z.infer<typeof achieverSchema>;

interface Achiever {
    _id: string;
    name: string;
    heading: string;
    description: string;
    image?: string;
    order?: number;
    createdAt: string;
}

export default function AchieversManagementPage() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAchiever, setEditingAchiever] = useState<Achiever | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [achieverToDelete, setAchieverToDelete] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<AchieverFormData>({
        resolver: zodResolver(achieverSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            heading: '',
            description: '',
            image: '',
            order: 0,
        }
    });

    const achieverImage = watch('image');

    useEffect(() => {
        fetchAchievers();
    }, []);

    const fetchAchievers = async () => {
        try {
            const response = await fetch('/api/achievers');
            const data = await response.json();
            // Map imageUrl to image for consistency with the schema
            const formattedAchievers = data.achievers.map((ach: any) => ({
                ...ach,
                image: ach.imageUrl,
            }));
            setAchievers(formattedAchievers || []);
        } catch (error) {
            console.error('Failed to fetch achievers:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: AchieverFormData) => {
        try {
            const url = editingAchiever
                ? `/api/achievers/${editingAchiever._id}`
                : '/api/achievers';
            const method = editingAchiever ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, imageUrl: data.image }), // Send imageUrl to API
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save achiever');
            }

            await fetchAchievers();
            handleCloseModal();
        } catch (error: any) {
            alert(error.message || 'Failed to save achiever');
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

    const handleEdit = (achiever: Achiever) => {
        setEditingAchiever(achiever);
        reset({
            name: achiever.name,
            heading: achiever.heading,
            description: achiever.description,
            image: achiever.image || '',
            order: achiever.order || 0,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingAchiever(null);
        reset({
            name: '',
            heading: '',
            description: '',
            image: '',
            order: 0,
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
            <div className="flex lg:flex-row flex-col gap-4 lg:items-center items-start justify-between mb-6">
                <div>
                    <h1 className="lg:text-2xl text-xl font-semibold text-springer-charcoal">
                        Student Achievers Management
                    </h1>
                    <p className="text-springer-gray lg:text-base text-sm lg:mt-1 mt-0">
                        Manage student achievements and accomplishments
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 lg:px-4 lg:py-2 px-3 py-1.5 bg-springer-red text-white rounded-lg hover:bg-red-700 transition lg:text-base text-sm"
                >
                    <Plus className="lg:w-5 lg:h-5 w-4 h-4" />
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
                                    src={achiever.image || '/placeholder.png'}
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

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Student Name *
                                </label>
                                <input
                                    {...register('name')}
                                    className={`w-full placeholder:text-sm px-4 py-2 border rounded-lg outline-none transition ${errors.name
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter student name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Student Image *
                                </label>
                                <ImageUpload
                                    value={achieverImage}
                                    onChange={(url) => setValue('image', url, { shouldValidate: true })}
                                    onRemove={() => setValue('image', '', { shouldValidate: true })}
                                />
                                {errors.image && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.image.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Heading *
                                </label>
                                <input
                                    {...register('heading')}
                                    className={`w-full placeholder:text-sm px-4 py-2 border rounded-lg outline-none transition ${errors.heading
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="e.g., Class 10 Topper, State Level Cricket"
                                />
                                {errors.heading && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.heading.message}</p>
                                )}
                                <p className="text-xs text-springer-gray mt-1">
                                    Mention class for academic achievements or sport name for sports achievements
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Description *
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows={2}
                                    className={`w-full placeholder:text-sm px-4 py-2 border rounded-lg outline-none resize-none transition ${errors.description
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Describe the achievement (e.g., marks obtained, tournament details)"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.description.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    {...register('order', { valueAsNumber: true })}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.order
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="0"
                                />
                                {errors.order && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.order.message}</p>
                                )}
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
