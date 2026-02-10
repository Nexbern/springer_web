import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import CampusVisit from '@/models/CampusVisit';
import { authOptions } from '@/lib/auth';

// DELETE campus visit by ID (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        await connectDB();

        const campusVisit = await CampusVisit.findByIdAndDelete(id);

        if (!campusVisit) {
            return NextResponse.json(
                { error: 'Campus visit not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Campus visit deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete campus visit error:', error);
        return NextResponse.json(
            { error: 'Failed to delete campus visit' },
            { status: 500 }
        );
    }
}
