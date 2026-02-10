import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import AdmissionEnquiry from '@/models/AdmissionEnquiry';
import { authOptions } from '@/lib/auth';

// DELETE admission enquiry by ID (admin only)
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

        const admissionEnquiry = await AdmissionEnquiry.findByIdAndDelete(id);

        if (!admissionEnquiry) {
            return NextResponse.json(
                { error: 'Admission enquiry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Admission enquiry deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete admission enquiry error:', error);
        return NextResponse.json(
            { error: 'Failed to delete admission enquiry' },
            { status: 500 }
        );
    }
}
