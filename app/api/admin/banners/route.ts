import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET all banners for admin (admin only)
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
        const banners = await Banner.find().sort({ createdAt: -1 });

        return NextResponse.json({ banners }, { status: 200 });
    } catch (error: any) {
        console.error('Get all banners error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch banners' },
            { status: 500 }
        );
    }
}
