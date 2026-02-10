import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import FeesEnquiry from '@/models/FeesEnquiry';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

// Validation schema
const feesEnquirySchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters long')
        .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string()
        .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
    class: z.string().min(1, 'Please select a class'),
});

// GET all fees enquiries (admin only)
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
        const feesEnquiries = await FeesEnquiry.find().sort({ createdAt: -1 });
        return NextResponse.json({ feesEnquiries }, { status: 200 });
    } catch (error: any) {
        console.error('Get fees enquiries error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch fees enquiries' },
            { status: 500 }
        );
    }
}

// POST create fees enquiry (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = feesEnquirySchema.parse(body);

        await connectDB();

        const feesEnquiry = await FeesEnquiry.create(validatedData);

        return NextResponse.json(
            { message: 'Fees enquiry submitted successfully', feesEnquiry },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create fees enquiry error:', error);

        // Handle Zod validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to submit fees enquiry' },
            { status: 500 }
        );
    }
}
