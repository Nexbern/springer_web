import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import StudentAchiever from '@/models/StudentAchiever';
import { authOptions } from '@/lib/auth';

// GET all student achievers (public)
export async function GET() {
    try {
        await connectDB();
        const achievers = await StudentAchiever.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ achievers }, { status: 200 });
    } catch (error: any) {
        console.error('Get achievers error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch achievers' },
            { status: 500 }
        );
    }
}

// POST create student achiever (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, imageUrl, heading, description, order } = await request.json();

        if (!name || !imageUrl || !heading || !description) {
            return NextResponse.json(
                { error: 'Name, image, heading, and description are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const achiever = await StudentAchiever.create({
            name,
            imageUrl,
            heading,
            description,
            order: order || 0,
        });

        return NextResponse.json(
            { message: 'Student achiever created successfully', achiever },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create achiever error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create achiever' },
            { status: 500 }
        );
    }
}
