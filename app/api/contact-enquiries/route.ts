import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import ContactEnquiry from '@/models/ContactEnquiry';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

// Validation schema
const contactEnquirySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject is too long'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
});

// GET all contact enquiries (admin only)
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
        const contactEnquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
        return NextResponse.json({ contactEnquiries }, { status: 200 });
    } catch (error: any) {
        console.error('Get contact enquiries error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact enquiries' },
            { status: 500 }
        );
    }
}

// POST create contact enquiry (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = contactEnquirySchema.parse(body);

        await connectDB();

        const contactEnquiry = await ContactEnquiry.create(validatedData);

        return NextResponse.json(
            { message: 'Contact enquiry submitted successfully', contactEnquiry },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create contact enquiry error:', error);

        // Handle Zod validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to submit contact enquiry' },
            { status: 500 }
        );
    }
}
