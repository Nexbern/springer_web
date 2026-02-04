import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Faculty from '@/models/Faculty';
import { authOptions } from '../auth/[...nextauth]/route';

// GET all faculties (public)
export async function GET() {
    try {
        await connectDB();
        const faculties = await Faculty.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ faculties }, { status: 200 });
    } catch (error: any) {
        console.error('Get faculties error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch faculties' },
            { status: 500 }
        );
    }
}

// POST create faculty (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, experience, subject, description, image, order } = await request.json();

        if (!name || !subject || !description || !image) {
            return NextResponse.json(
                { error: 'Name, subject, description, and image are required' },
                { status: 400 }
            );
        }

        if (experience === undefined || experience < 0) {
            return NextResponse.json(
                { error: 'Valid experience is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const faculty = await Faculty.create({
            name,
            experience,
            subject,
            description,
            image,
            order: order || 0,
        });

        return NextResponse.json(
            { message: 'Faculty created successfully', faculty },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create faculty error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create faculty' },
            { status: 500 }
        );
    }
}
