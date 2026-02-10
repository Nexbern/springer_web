'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Loader2, Calendar, Mail, Phone, User, MapPin, Clock, FileText, GraduationCap, MessageSquare } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CampusVisit {
    _id: string;
    name: string;
    phone: string;
    address: string;
    preferredDate: string;
    preferredTimeSlot: string;
    reasonForVisit: string;
    status: string;
    createdAt: string;
}

interface AdmissionEnquiry {
    _id: string;
    studentName: string;
    parentName: string;
    email: string;
    phone: string;
    grade: string;
    message?: string;
    status: string;
    createdAt: string;
}

interface FeesEnquiry {
    _id: string;
    name: string;
    email: string;
    phone: string;
    class: string;
    status: string;
    createdAt: string;
}

interface ContactEnquiry {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

const timeSlotLabels: Record<string, string> = {
    morning: 'Morning (9-11 AM)',
    midday: 'Midday (11 AM-1 PM)',
    afternoon: 'Afternoon (1-3 PM)',
};

const reasonLabels: Record<string, string> = {
    admission: 'Admission Enquiry',
    fee: 'Fee Structure',
    infrastructure: 'Infrastructure',
    teacher: 'Teacher Interaction',
    other: 'Other',
};

export default function EnquiriesPage() {
    const [campusVisits, setCampusVisits] = useState<CampusVisit[]>([]);
    const [admissionEnquiries, setAdmissionEnquiries] = useState<AdmissionEnquiry[]>([]);
    const [feesEnquiries, setFeesEnquiries] = useState<FeesEnquiry[]>([]);
    const [contactEnquiries, setContactEnquiries] = useState<ContactEnquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: string } | null>(null);

    useEffect(() => {
        fetchAllEnquiries();
    }, []);

    const fetchAllEnquiries = async () => {
        try {
            const [campusRes, admissionRes, feesRes, contactRes] = await Promise.all([
                fetch('/api/campus-visits'),
                fetch('/api/admission-enquiries'),
                fetch('/api/fees-enquiries'),
                fetch('/api/contact-enquiries'),
            ]);

            const [campusData, admissionData, feesData, contactData] = await Promise.all([
                campusRes.json(),
                admissionRes.json(),
                feesRes.json(),
                contactRes.json(),
            ]);

            setCampusVisits(campusData.campusVisits || []);
            setAdmissionEnquiries(admissionData.admissionEnquiries || []);
            setFeesEnquiries(feesData.feesEnquiries || []);
            setContactEnquiries(contactData.contactEnquiries || []);
        } catch (error) {
            console.error('Failed to fetch enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: string, type: string) => {
        setDeleteTarget({ id, type });
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            const endpoints: Record<string, string> = {
                campus: `/api/campus-visits/${deleteTarget.id}`,
                admission: `/api/admission-enquiries/${deleteTarget.id}`,
                fees: `/api/fees-enquiries/${deleteTarget.id}`,
                contact: `/api/contact-enquiries/${deleteTarget.id}`,
            };

            const response = await fetch(endpoints[deleteTarget.type], {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete enquiry');
            }

            await fetchAllEnquiries();
        } catch (error) {
            alert('Failed to delete enquiry');
        } finally {
            setIsDeleteDialogOpen(false);
            setDeleteTarget(null);
        }
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
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-springer-charcoal">
                    Enquiries Management
                </h1>
                <p className="text-springer-gray mt-1">
                    View and manage all enquiries from different sections
                </p>
            </div>

            {/* Tabs for different enquiry types */}
            <Tabs defaultValue="campus" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="campus">
                        Campus Visits ({campusVisits.length})
                    </TabsTrigger>
                    <TabsTrigger value="admission">
                        Admissions ({admissionEnquiries.length})
                    </TabsTrigger>
                    <TabsTrigger value="fees">
                        Fees ({feesEnquiries.length})
                    </TabsTrigger>
                    <TabsTrigger value="contact">
                        Contact ({contactEnquiries.length})
                    </TabsTrigger>
                </TabsList>

                {/* Campus Visits Tab */}
                <TabsContent value="campus">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Visitor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Visit Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Reason
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {campusVisits.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-springer-gray">
                                                No campus visit requests yet
                                            </td>
                                        </tr>
                                    ) : (
                                        campusVisits.map((visit) => (
                                            <tr key={visit._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-springer-red" />
                                                        <div>
                                                            <div className="text-sm font-medium text-springer-charcoal">
                                                                {visit.name}
                                                            </div>
                                                            <div className="text-xs text-springer-gray flex items-center gap-1 mt-1">
                                                                <MapPin className="w-3 h-3" />
                                                                {visit.address.substring(0, 30)}...
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-gray flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {visit.phone}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-charcoal flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 text-springer-red" />
                                                        {format(new Date(visit.preferredDate), 'MMM dd, yyyy')}
                                                    </div>
                                                    <div className="text-xs text-springer-gray flex items-center gap-1 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {timeSlotLabels[visit.preferredTimeSlot]}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                                                        {reasonLabels[visit.reasonForVisit]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-springer-gray">
                                                    {format(new Date(visit.createdAt), 'MMM dd, yyyy')}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteClick(visit._id, 'campus')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                {/* Admission Enquiries Tab */}
                <TabsContent value="admission">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Student
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Parent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Grade
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {admissionEnquiries.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-springer-gray">
                                                No admission enquiries yet
                                            </td>
                                        </tr>
                                    ) : (
                                        admissionEnquiries.map((enquiry) => (
                                            <tr key={enquiry._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-springer-charcoal">
                                                        {enquiry.studentName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-gray">
                                                        {enquiry.parentName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-gray flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {enquiry.email}
                                                    </div>
                                                    <div className="text-xs text-springer-gray flex items-center gap-1 mt-1">
                                                        <Phone className="w-3 h-3" />
                                                        {enquiry.phone}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
                                                        <GraduationCap className="w-3 h-3 mr-1" />
                                                        {enquiry.grade}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-springer-gray">
                                                    {format(new Date(enquiry.createdAt), 'MMM dd, yyyy')}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteClick(enquiry._id, 'admission')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                {/* Fees Enquiries Tab */}
                <TabsContent value="fees">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Class
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {feesEnquiries.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-springer-gray">
                                                No fees enquiries yet
                                            </td>
                                        </tr>
                                    ) : (
                                        feesEnquiries.map((enquiry) => (
                                            <tr key={enquiry._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-springer-charcoal">
                                                        {enquiry.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-gray flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {enquiry.email}
                                                    </div>
                                                    <div className="text-xs text-springer-gray flex items-center gap-1 mt-1">
                                                        <Phone className="w-3 h-3" />
                                                        {enquiry.phone}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">
                                                        {enquiry.class}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-springer-gray">
                                                    {format(new Date(enquiry.createdAt), 'MMM dd, yyyy')}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteClick(enquiry._id, 'fees')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                {/* Contact Enquiries Tab */}
                <TabsContent value="contact">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Message
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-springer-gray uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {contactEnquiries.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-springer-gray">
                                                No contact enquiries yet
                                            </td>
                                        </tr>
                                    ) : (
                                        contactEnquiries.map((enquiry) => (
                                            <tr key={enquiry._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-springer-charcoal">
                                                        {enquiry.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-gray flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {enquiry.email}
                                                    </div>
                                                    {enquiry.phone && (
                                                        <div className="text-xs text-springer-gray flex items-center gap-1 mt-1">
                                                            <Phone className="w-3 h-3" />
                                                            {enquiry.phone}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-charcoal flex items-center gap-1">
                                                        <FileText className="w-3 h-3 text-springer-red" />
                                                        {enquiry.subject}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-springer-gray line-clamp-2 max-w-xs">
                                                        {enquiry.message}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-springer-gray">
                                                    {format(new Date(enquiry.createdAt), 'MMM dd, yyyy')}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteClick(enquiry._id, 'contact')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Enquiry"
                description="Are you sure you want to delete this enquiry? This action cannot be undone."
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    );
}
