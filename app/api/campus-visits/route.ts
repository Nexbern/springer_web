import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import CampusVisit from '@/models/CampusVisit';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

// Validation schema
const campusVisitSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    phone: z.string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number is too long')
        .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
    address: z.string().min(10, 'Please provide a complete address').max(500, 'Address is too long'),
    preferredDate: z.string().min(1, 'Please select a preferred visit date'),
    preferredTimeSlot: z.enum(['morning', 'midday', 'afternoon']),
    reasonForVisit: z.enum(['admission', 'fee', 'infrastructure', 'teacher', 'other']),
});

// GET all campus visits (admin only)
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
        const campusVisits = await CampusVisit.find().sort({ createdAt: -1 });
        return NextResponse.json({ campusVisits }, { status: 200 });
    } catch (error: any) {
        console.error('Get campus visits error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch campus visits' },
            { status: 500 }
        );
    }
}

// POST create campus visit (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = campusVisitSchema.parse(body);

        await connectDB();

        const campusVisit = await CampusVisit.create({
            ...validatedData,
            preferredDate: new Date(validatedData.preferredDate),
        });

        return NextResponse.json(
            { message: 'Campus visit request submitted successfully', campusVisit },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create campus visit error:', error);

        // Handle Zod validation errors
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to submit campus visit request' },
            { status: 500 }
        );
    }
}
