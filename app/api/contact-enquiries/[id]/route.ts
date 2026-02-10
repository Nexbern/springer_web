import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import ContactEnquiry from '@/models/ContactEnquiry';
import { authOptions } from '@/lib/auth';

// DELETE contact enquiry by ID (admin only)
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

        const contactEnquiry = await ContactEnquiry.findByIdAndDelete(id);

        if (!contactEnquiry) {
            return NextResponse.json(
                { error: 'Contact enquiry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Contact enquiry deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete contact enquiry error:', error);
        return NextResponse.json(
            { error: 'Failed to delete contact enquiry' },
            { status: 500 }
        );
    }
}
