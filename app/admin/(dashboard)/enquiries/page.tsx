'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Loader2, Calendar, Mail, Phone, User, MapPin, Clock, FileText, GraduationCap, MessageSquare, Eye } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

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

    // Detail modal states
    const [selectedCampusVisit, setSelectedCampusVisit] = useState<CampusVisit | null>(null);
    const [selectedAdmission, setSelectedAdmission] = useState<AdmissionEnquiry | null>(null);
    const [selectedFees, setSelectedFees] = useState<FeesEnquiry | null>(null);
    const [selectedContact, setSelectedContact] = useState<ContactEnquiry | null>(null);

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
                                            <tr
                                                key={visit._id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => setSelectedCampusVisit(visit)}
                                            >
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
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(visit._id, 'campus');
                                                        }}
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
                                            <tr
                                                key={enquiry._id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => setSelectedAdmission(enquiry)}
                                            >
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
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(enquiry._id, 'admission');
                                                        }}
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
                                            <tr
                                                key={enquiry._id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => setSelectedFees(enquiry)}
                                            >
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
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(enquiry._id, 'fees');
                                                        }}
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
                                            <tr
                                                key={enquiry._id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => setSelectedContact(enquiry)}
                                            >
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
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(enquiry._id, 'contact');
                                                        }}
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
{/* Campus Visit Detail Modal */}
<Dialog open={!!selectedCampusVisit} onOpenChange={() => setSelectedCampusVisit(null)}>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle>Campus Visit Request Details</DialogTitle>
            <DialogDescription>
                Complete information about this campus visit request
            </DialogDescription>
        </DialogHeader>
        {selectedCampusVisit && (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Visitor Name</label>
                        <div className="flex items-center gap-2 mt-1">
                            <User className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedCampusVisit.name}</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Phone Number</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedCampusVisit.phone}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Address</label>
                    <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-springer-red" />
                        <p className="text-sm text-springer-charcoal">{selectedCampusVisit.address}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Preferred Date</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">
                                {format(new Date(selectedCampusVisit.preferredDate), 'MMMM dd, yyyy')}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Time Slot</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">
                                {timeSlotLabels[selectedCampusVisit.preferredTimeSlot]}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Reason for Visit</label>
                    <p className="text-sm text-springer-charcoal mt-1 px-3 py-2 bg-blue-50 text-blue-600 rounded inline-block">
                        {reasonLabels[selectedCampusVisit.reasonForVisit]}
                    </p>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Submitted On</label>
                    <p className="text-sm text-springer-charcoal mt-1">
                        {format(new Date(selectedCampusVisit.createdAt), 'MMMM dd, yyyy \'at\' h:mm a')}
                    </p>
                </div>
            </div>
        )}
    </DialogContent>
</Dialog>

{/* Admission Enquiry Detail Modal */}
<Dialog open={!!selectedAdmission} onOpenChange={() => setSelectedAdmission(null)}>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle>Admission Enquiry Details</DialogTitle>
            <DialogDescription>
                Complete information about this admission enquiry
            </DialogDescription>
        </DialogHeader>
        {selectedAdmission && (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Student Name</label>
                        <div className="flex items-center gap-2 mt-1">
                            <User className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal font-medium">{selectedAdmission.studentName}</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Parent/Guardian Name</label>
                        <div className="flex items-center gap-2 mt-1">
                            <User className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedAdmission.parentName}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Email Address</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedAdmission.email}</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Phone Number</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedAdmission.phone}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Grade/Class</label>
                    <p className="text-sm text-springer-charcoal mt-1 px-3 py-2 bg-green-50 text-green-600 rounded inline-flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {selectedAdmission.grade}
                    </p>
                </div>
                {selectedAdmission.message && (
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Additional Message</label>
                        <p className="text-sm text-springer-charcoal mt-1 p-3 bg-gray-50 rounded">
                            {selectedAdmission.message}
                        </p>
                    </div>
                )}
                <div>
                    <label className="text-sm font-medium text-springer-gray">Submitted On</label>
                    <p className="text-sm text-springer-charcoal mt-1">
                        {format(new Date(selectedAdmission.createdAt), 'MMMM dd, yyyy \'at\' h:mm a')}
                    </p>
                </div>
            </div>
        )}
    </DialogContent>
</Dialog>

{/* Fees Enquiry Detail Modal */}
<Dialog open={!!selectedFees} onOpenChange={() => setSelectedFees(null)}>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle>Fees Enquiry Details</DialogTitle>
            <DialogDescription>
                Complete information about this fees structure request
            </DialogDescription>
        </DialogHeader>
        {selectedFees && (
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-springer-gray">Name</label>
                    <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-springer-red" />
                        <p className="text-sm text-springer-charcoal font-medium">{selectedFees.name}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Email Address</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedFees.email}</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Phone Number</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedFees.phone}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Class/Grade</label>
                    <p className="text-sm text-springer-charcoal mt-1 px-3 py-2 bg-purple-50 text-purple-600 rounded inline-block">
                        {selectedFees.class}
                    </p>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Submitted On</label>
                    <p className="text-sm text-springer-charcoal mt-1">
                        {format(new Date(selectedFees.createdAt), 'MMMM dd, yyyy \'at\' h:mm a')}
                    </p>
                </div>
            </div>
        )}
    </DialogContent>
</Dialog>

{/* Contact Enquiry Detail Modal */}
<Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle>Contact Enquiry Details</DialogTitle>
            <DialogDescription>
                Complete information about this contact message
            </DialogDescription>
        </DialogHeader>
        {selectedContact && (
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-springer-gray">Name</label>
                    <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-springer-red" />
                        <p className="text-sm text-springer-charcoal font-medium">{selectedContact.name}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-springer-gray">Email Address</label>
                        <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-springer-red" />
                            <p className="text-sm text-springer-charcoal">{selectedContact.email}</p>
                        </div>
                    </div>
                    {selectedContact.phone && (
                        <div>
                            <label className="text-sm font-medium text-springer-gray">Phone Number</label>
                            <div className="flex items-center gap-2 mt-1">
                                <Phone className="w-4 h-4 text-springer-red" />
                                <p className="text-sm text-springer-charcoal">{selectedContact.phone}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Subject</label>
                    <div className="flex items-center gap-2 mt-1">
                        <FileText className="w-4 h-4 text-springer-red" />
                        <p className="text-sm text-springer-charcoal font-medium">{selectedContact.subject}</p>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Message</label>
                    <div className="flex items-start gap-2 mt-1">
                        <MessageSquare className="w-4 h-4 text-springer-red mt-1" />
                        <p className="text-sm text-springer-charcoal p-3 bg-gray-50 rounded flex-1">
                            {selectedContact.message}
                        </p>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-springer-gray">Submitted On</label>
                    <p className="text-sm text-springer-charcoal mt-1">
                        {format(new Date(selectedContact.createdAt), 'MMMM dd, yyyy \'at\' h:mm a')}
                    </p>
                </div>
            </div>
        )}
    </DialogContent>
</Dialog>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Delete Enquiry"
                description="Are you sure you want to delete this enquiry?"
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    );
}
