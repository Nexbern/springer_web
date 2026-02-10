import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import AdmissionEnquiry from '@/models/AdmissionEnquiry';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

// Validation schema
const admissionEnquirySchema = z.object({
    studentName: z.string().min(2, 'Student name must be at least 2 characters').max(100, 'Student name is too long'),
    parentName: z.string().min(2, 'Parent name must be at least 2 characters').max(100, 'Parent name is too long'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    grade: z.string().min(1, 'Please select a grade'),
    message: z.string().max(1000, 'Message is too long').optional(),
});

// GET all admission enquiries (admin only)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const admissionEnquiries = await AdmissionEnquiry.find().sort({ createdAt: -1 });
        return NextResponse.json({ admissionEnquiries }, { status: 200 });
    } catch (error: any) {
        console.error('Get admission enquiries error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch admission enquiries' },
            { status: 500 }
        );
    }
}

// POST create admission enquiry (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = admissionEnquirySchema.parse(body);

        await connectDB();

        const admissionEnquiry = await AdmissionEnquiry.create(validatedData);

        return NextResponse.json(
            { message: 'Admission enquiry submitted successfully', admissionEnquiry },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create admission enquiry error:', error);

        // Handle Zod validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to submit admission enquiry' },
            { status: 500 }
        );
    }
}
