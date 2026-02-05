import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { authOptions } from '@/lib/auth';

// GET active banners (public)
export async function GET() {
    try {
        await connectDB();
        const now = new Date();

        const banners = await Banner.find({
            active: true,
            $and: [
                {
                    $or: [
                        { startDate: { $exists: false } },
                        { startDate: { $lte: now } }
                    ]
                },
                {
                    $or: [
                        { endDate: { $exists: false } },
                        { endDate: { $gte: now } }
                    ]
                }
            ]
        }).sort({ createdAt: -1 });

        return NextResponse.json({ banners }, { status: 200 });
    } catch (error: any) {
        console.error('Get banners error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch banners' },
            { status: 500 }
        );
    }
}

// POST create banner (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { title, message, active, startDate, endDate, image } = await request.json();

        if (!title || !message) {
            return NextResponse.json(
                { error: 'Title and message are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const banner = await Banner.create({
            title,
            message,
            active: active || false,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            image,
        });

        return NextResponse.json(
            { message: 'Banner created successfully', banner },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create banner error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create banner' },
            { status: 500 }
        );
    }
}
