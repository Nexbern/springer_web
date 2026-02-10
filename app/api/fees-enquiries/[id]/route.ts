import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import FeesEnquiry from '@/models/FeesEnquiry';
import { authOptions } from '@/lib/auth';

// DELETE fees enquiry by ID (admin only)
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

        const feesEnquiry = await FeesEnquiry.findByIdAndDelete(id);

        if (!feesEnquiry) {
            return NextResponse.json(
                { error: 'Fees enquiry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Fees enquiry deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete fees enquiry error:', error);
        return NextResponse.json(
            { error: 'Failed to delete fees enquiry' },
            { status: 500 }
        );
    }
}
