import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Notice from '@/models/Notice';
import { authOptions } from '@/lib/auth';

// GET all notices (public)
export async function GET() {
    try {
        await connectDB();
        const notices = await Notice.find().sort({ date: -1, createdAt: -1 });
        return NextResponse.json({ notices }, { status: 200 });
    } catch (error: any) {
        console.error('Get notices error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notices' },
            { status: 500 }
        );
    }
}

// POST create notice (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { title, content, date } = await request.json();

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const notice = await Notice.create({
            title,
            content,
            date: date ? new Date(date) : new Date(),
        });

        return NextResponse.json(
            { message: 'Notice created successfully', notice },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create notice error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create notice' },
            { status: 500 }
        );
    }
}
