'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, Loader2, MapPin, Phone, User, FileText } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Validation schema
const campusVisitSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    phone: z.string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number is too long')
        .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
    address: z.string().min(10, 'Please provide a complete address').max(500, 'Address is too long'),
    preferredDate: z.string().min(1, 'Please select a preferred visit date'),
    preferredTimeSlot: z.enum(['morning', 'midday', 'afternoon'], {
        message: 'Please select a time slot'
    }),
    reasonForVisit: z.enum(['admission', 'fee', 'infrastructure', 'teacher', 'other'], {
        message: 'Please select a reason for visit'
    }),
});

type CampusVisitFormData = z.infer<typeof campusVisitSchema>;

interface CampusVisitDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CampusVisitDialog({ open, onOpenChange }: CampusVisitDialogProps) {
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<CampusVisitFormData>({
        resolver: zodResolver(campusVisitSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            phone: '',
            address: '',
            preferredDate: '',
            preferredTimeSlot: undefined,
            reasonForVisit: undefined,
        }
    });

    const onSubmit = async (data: CampusVisitFormData) => {
        try {
            // TODO: Replace with actual API call when backend is ready
            console.log('Campus Visit Form Data:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitSuccess(true);

            // Reset form after 2 seconds and close dialog
            setTimeout(() => {
                reset();
                setSubmitSuccess(false);
                onOpenChange(false);
            }, 2000);
        } catch (error: any) {
            alert(error.message || 'Failed to submit campus visit request');
        }
    };

    const handleCloseDialog = () => {
        if (!isSubmitting) {
            reset();
            setSubmitSuccess(false);
            onOpenChange(false);
        }
    };

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogContent className="max-w-2xl h-[92vh] flex flex-col p-0 overflow-hidden gap-0">
                <DialogHeader className="p-6 border-b shrink-0">
                    <DialogTitle className="font-semibold text-springer-charcoal">
                        Book Campus Visit
                    </DialogTitle>
                    <p className="text-sm text-springer-gray mt-2">
                        Fill out the form below to schedule your campus visit. We'll get back to you shortly.
                    </p>
                </DialogHeader>

                {submitSuccess ? (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-springer-charcoal mb-2">
                                Request Submitted Successfully!
                            </h3>
                            <p className="text-springer-gray">
                                We'll contact you soon to confirm your campus visit.
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            {/* Name Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-springer-charcoal mb-2">
                                    <User className="w-4 h-4 text-springer-red" />
                                    Full Name *
                                </label>
                                <input
                                    {...register('name')}
                                    className={`w-full placeholder:text-sm px-4 py-2.5 border rounded-lg outline-none transition ${errors.name
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-springer-charcoal mb-2">
                                    <Phone className="w-4 h-4 text-springer-red" />
                                    Phone Number *
                                </label>
                                <input
                                    {...register('phone')}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={10}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        e.target.value = value;
                                        register('phone').onChange(e);
                                    }}
                                    className={`w-full placeholder:text-sm px-4 py-2.5 border rounded-lg outline-none transition ${errors.phone
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone.message}</p>
                                )}
                            </div>

                            {/* Address Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-springer-charcoal mb-2">
                                    <MapPin className="w-4 h-4 text-springer-red" />
                                    Address *
                                </label>
                                <textarea
                                    {...register('address')}
                                    rows={3}
                                    className={`w-full placeholder:text-sm px-4 py-2.5 border rounded-lg outline-none resize-none transition ${errors.address
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                    placeholder="Enter your complete address"
                                />
                                {errors.address && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.address.message}</p>
                                )}
                            </div>

                            {/* Preferred Date Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-springer-charcoal mb-2">
                                    <Calendar className="w-4 h-4 text-springer-red" />
                                    Preferred Visit Date *
                                </label>
                                <input
                                    type="date"
                                    {...register('preferredDate')}
                                    min={today}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${errors.preferredDate
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                />
                                {errors.preferredDate && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.preferredDate.message}</p>
                                )}
                            </div>

                            {/* Preferred Time Slot Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-springer-charcoal mb-2">
                                    <Clock className="w-4 h-4 text-springer-red" />
                                    Preferred Time Slot *
                                </label>
                                <select
                                    {...register('preferredTimeSlot')}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${errors.preferredTimeSlot
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                >
                                    <option value="">Select a time slot</option>
                                    <option value="morning">Morning (9:00 AM - 11:00 AM)</option>
                                    <option value="midday">Midday (11:00 AM - 1:00 PM)</option>
                                    <option value="afternoon">Afternoon (1:00 PM - 3:00 PM)</option>
                                </select>
                                {errors.preferredTimeSlot && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.preferredTimeSlot.message}</p>
                                )}
                            </div>

                            {/* Reason for Visit Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-springer-charcoal mb-2">
                                    <FileText className="w-4 h-4 text-springer-red" />
                                    Reason for Visit *
                                </label>
                                <select
                                    {...register('reasonForVisit')}
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${errors.reasonForVisit
                                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-300 focus:ring-2 focus:ring-springer-red focus:border-transparent'
                                        }`}
                                >
                                    <option value="">Select a reason</option>
                                    <option value="admission">Admission Enquiry</option>
                                    <option value="fee">Fee Structure</option>
                                    <option value="infrastructure">Infrastructure</option>
                                    <option value="teacher">Teacher Interaction</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.reasonForVisit && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.reasonForVisit.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50/50 shrink-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseDialog}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                className="bg-springer-red hover:bg-red-700 text-white min-w-[120px]"
                            >
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
