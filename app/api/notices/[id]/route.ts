import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Notice from '@/models/Notice';
import { authOptions } from '@/lib/auth';
import { deleteImage, extractPublicIdFromUrl } from '@/lib/cloudinary';

// GET single notice (public)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const notice = await Notice.findById(id);

        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ notice }, { status: 200 });
    } catch (error: any) {
        console.error('Get notice error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notice' },
            { status: 500 }
        );
    }
}

// PUT update notice (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { title, content, date, pdfUrl, pdfFileName } = await request.json();

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const notice = await Notice.findByIdAndUpdate(
            id,
            {
                title,
                content,
                date: date ? new Date(date) : new Date(),
                pdfUrl,
                pdfFileName,
            },
            { new: true, runValidators: true }
        );

        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Notice updated successfully', notice },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update notice error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update notice' },
            { status: 500 }
        );
    }
}

// DELETE notice (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const notice = await Notice.findById(id);

        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        if (notice.pdfUrl) {
            const publicId = extractPublicIdFromUrl(notice.pdfUrl);
            if (publicId) {
                try {
                    await deleteImage(publicId);
                } catch (error) {
                    console.error('Failed to delete notice PDF from Cloudinary:', error);
                }
            }
        }

        await Notice.findByIdAndDelete(id);

        return NextResponse.json(
            { message: 'Notice deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete notice error:', error);
        return NextResponse.json(
            { error: 'Failed to delete notice' },
            { status: 500 }
        );
    }
}
