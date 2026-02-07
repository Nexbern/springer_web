'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';
import ImageUpload from '@/components/admin/ImageUpload';
import { Switch } from '@/components/ui/switch';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Button } from '@/components/ui/button';

const bannerSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    active: z.boolean(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    image: z.string().min(1, 'Banner image is required'),
});

type BannerFormData = z.infer<typeof bannerSchema>;

interface Banner {
    _id: string;
    title: string;
    message: string;
    active: boolean;
    startDate?: string;
    endDate?: string;
    image?: string;
    createdAt: string;
}

export default function BannersManagementPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<BannerFormData>({
        resolver: zodResolver(bannerSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            message: '',
            active: false,
            startDate: '',
            endDate: '',
            image: '',
        }
    });

    const bannerImage = watch('image');
    const bannerActive = watch('active');

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch('/api/admin/banners');
            const data = await response.json();
            setBanners(data.banners || []);
        } catch (error) {
            console.error('Failed to fetch banners:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: BannerFormData) => {
        try {
            const url = editingBanner
                ? `/api/banners/${editingBanner._id}`
                : '/api/banners';
            const method = editingBanner ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save banner');
            }

            await fetchBanners();
            handleCloseModal();
        } catch (error: any) {
            alert(error.message || 'Failed to save banner');
        }
    };

    const handleDeleteClick = (id: string) => {
        setBannerToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!bannerToDelete) return;

        try {
            const response = await fetch(`/api/banners/${bannerToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete banner');
            }

            await fetchBanners();
        } catch (error) {
            alert('Failed to delete banner');
        } finally {
            setIsDeleteDialogOpen(false);
            setBannerToDelete(null);
        }
    };

    const handleToggleActive = async (banner: Banner) => {
        try {
            const response = await fetch(`/api/banners/${banner._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...banner, active: !banner.active }),
            });

            if (!response.ok) {
                throw new Error('Failed to update banner');
            }

            await fetchBanners();
        } catch (error) {
            alert('Failed to update banner');
        }
    };

    const handleEdit = (banner: Banner) => {
        setEditingBanner(banner);
        reset({
            title: banner.title,
            message: banner.message,
            active: banner.active,
            startDate: banner.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : '',
            endDate: banner.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : '',
            image: banner.image || '',
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBanner(null);
        reset({
            title: '',
            message: '',
            active: false,
            startDate: '',
            endDate: '',
            image: '',
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
                        Banners Management
                    </h1>
                    <p className="text-springer-gray mt-1">
                        Manage admission banners and popups
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-springer-red text-white rounded-lg hover:bg-springer-red/80 transition"
                >
                    <Plus className="w-5 h-5" />
                    Create Banner
                </button>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.length === 0 ? (
                    <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-springer-gray">
                            No banners found. Create your first banner!
                        </p>
                    </div>
                ) : (
                    banners.map((banner) => (
                        <div
                            key={banner._id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                            {banner.image && (
                                <div className="relative h-40 bg-gray-100">
                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-springer-charcoal">
                                        {banner.title}
                                    </h3>
                                    <Switch
                                        checked={banner.active}
                                        onCheckedChange={() => handleToggleActive(banner)}
                                    />
                                </div>
                                <p className="text-sm text-springer-gray mb-3 line-clamp-2">
                                    {banner.message}
                                </p>
                                {(banner.startDate || banner.endDate) && (
                                    <div className="text-xs text-springer-gray mb-3">
                                        {banner.startDate && (
                                            <div>Start: {format(new Date(banner.startDate), 'MMM dd, yyyy')}</div>
                                        )}
                                        {banner.endDate && (
                                            <div>End: {format(new Date(banner.endDate), 'MMM dd, yyyy')}</div>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(banner)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(banner._id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
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
                            {editingBanner ? 'Edit Banner' : 'Create Banner'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Banner Title *
                                </label>
                                <input
                                    {...register('title')}
                                    className={`w-full placeholder:text-sm px-4 py-2 border rounded-lg outline-none transition ${errors.title
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter banner title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Message *
                                </label>
                                <textarea
                                    {...register('message')}
                                    rows={3}
                                    className={`w-full placeholder:text-sm px-4 py-2 border rounded-lg outline-none resize-none transition ${errors.message
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter banner message"
                                />
                                {errors.message && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Banner Image *
                                </label>
                                <ImageUpload
                                    value={bannerImage}
                                    onChange={(url) => setValue('image', url, { shouldValidate: true })}
                                    onRemove={() => setValue('image', '', { shouldValidate: true })}
                                />
                                {errors.image && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.image.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        Start Date (Optional)
                                    </label>
                                    <input
                                        type="date"
                                        {...register('startDate')}
                                        className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.startDate
                                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                            }`}
                                    />
                                    {errors.startDate && (
                                        <p className="mt-1 text-xs text-red-500 font-medium">{errors.startDate.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        End Date (Optional)
                                    </label>
                                    <input
                                        type="date"
                                        {...register('endDate')}
                                        className={`w-full px-4 py-2 border rounded-lg outline-none transition ${errors.endDate
                                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                            }`}
                                    />
                                    {errors.endDate && (
                                        <p className="mt-1 text-xs text-red-500 font-medium">{errors.endDate.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <h4 className="text-sm font-medium text-springer-charcoal">Active Status</h4>
                                    <p className="text-xs text-gray-500 mt-1">Control visibility on homepage</p>
                                </div>
                                <Switch
                                    checked={bannerActive}
                                    onCheckedChange={(checked) => setValue('active', checked, { shouldValidate: true })}
                                />
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
                                {editingBanner ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Banner"
                description="Are you sure you want to delete this banner?"
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    );
}
