'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Faculty {
    _id: string;
    name: string;
    degree: string;
    experience: number;
    subject: string;
    description: string;
    image: string;
    order: number;
    createdAt: string;
}

export default function FacultiesManagementPage() {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        degree: '',
        experience: 0,
        subject: '',
        description: '',
        image: '',
        order: 0,
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchFaculties();
    }, []);

    const fetchFaculties = async () => {
        try {
            const response = await fetch('/api/faculties');
            const data = await response.json();
            setFaculties(data.faculties || []);
        } catch (error) {
            console.error('Failed to fetch faculties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.image) {
            alert('Please upload a faculty image');
            return;
        }

        setSubmitting(true);

        try {
            const url = editingFaculty
                ? `/api/faculties/${editingFaculty._id}`
                : '/api/faculties';
            const method = editingFaculty ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save faculty');
            }

            await fetchFaculties();
            handleCloseModal();
        } catch (error: any) {
            alert(error.message || 'Failed to save faculty');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this faculty member?')) return;

        try {
            const response = await fetch(`/api/faculties/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete faculty');
            }

            await fetchFaculties();
        } catch (error) {
            alert('Failed to delete faculty');
        }
    };

    const handleEdit = (faculty: Faculty) => {
        setEditingFaculty(faculty);
        setFormData({
            name: faculty.name,
            degree: faculty.degree,
            experience: faculty.experience,
            subject: faculty.subject,
            description: faculty.description,
            image: faculty.image,
            order: faculty.order,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingFaculty(null);
        setFormData({
            name: '',
            degree: '',
            experience: 0,
            subject: '',
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
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-springer-charcoal">
                        Faculties Management
                    </h1>
                    <p className="text-springer-gray mt-1">
                        Manage faculty members and their profiles
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-springer-red text-white rounded-lg hover:bg-springer-red/80 transition"
                >
                    <Plus className="w-5 h-5" />
                    Add Faculty
                </button>
            </div>

            {/* Faculties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculties.length === 0 ? (
                    <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-springer-gray">
                            No faculty members found. Add your first faculty member!
                        </p>
                    </div>
                ) : (
                    faculties.map((faculty) => (
                        <div
                            key={faculty._id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="relative h-64 bg-gray-100">
                                <img
                                    src={faculty.image}
                                    alt={faculty.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-springer-charcoal text-lg mb-1">
                                    {faculty.name}
                                </h3>
                                <p className="text-xs text-springer-gray mb-2">
                                    {faculty.degree}
                                </p>
                                <p className="text-sm text-springer-red font-medium mb-2">
                                    {faculty.subject}
                                </p>
                                <p className="text-sm text-springer-gray mb-2">
                                    {faculty.experience} years of experience
                                </p>
                                <p className="text-sm text-springer-gray line-clamp-2 mb-4">
                                    {faculty.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(faculty)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faculty._id)}
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
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-springer-charcoal">
                                {editingFaculty ? 'Edit Faculty' : 'Add Faculty'}
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
                                    Faculty Image *
                                </label>
                                <ImageUpload
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                    onRemove={() => setFormData({ ...formData, image: '' })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                                    placeholder="Enter faculty name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Degree *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.degree}
                                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                                    placeholder="e.g., M.Sc., Ph.D., B.Ed."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                                        placeholder="e.g., Mathematics"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                        Experience (years) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-springer-charcoal mb-2">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
                                    placeholder="Brief description about the faculty member"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                                    placeholder="0"
                                />
                                <p className="text-xs text-springer-gray mt-1">
                                    Lower numbers appear first
                                </p>
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
                                    className="px-6 py-2 bg-springer-red text-white rounded-lg hover:bg-springer-red/80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingFaculty ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
