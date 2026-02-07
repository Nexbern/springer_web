import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { authOptions } from '@/lib/auth';
import { deleteImage, extractPublicIdFromUrl } from '@/lib/cloudinary';

// GET all banners for admin (admin only)
export async function GET(
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
        const banner = await Banner.findById(id);

        if (!banner) {
            return NextResponse.json(
                { error: 'Banner not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ banner }, { status: 200 });
    } catch (error: any) {
        console.error('Get banner error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch banner' },
            { status: 500 }
        );
    }
}

// PUT update banner (admin only)
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

        const { title, message, active, startDate, endDate, image } = await request.json();

        if (!title || !message) {
            return NextResponse.json(
                { error: 'Title and message are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const banner = await Banner.findByIdAndUpdate(
            id,
            {
                title,
                message,
                active,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                image,
            },
            { new: true, runValidators: true }
        );

        if (!banner) {
            return NextResponse.json(
                { error: 'Banner not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Banner updated successfully', banner },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update banner error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update banner' },
            { status: 500 }
        );
    }
}

// DELETE banner (admin only)
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

        const banner = await Banner.findById(id);

        if (!banner) {
            return NextResponse.json(
                { error: 'Banner not found' },
                { status: 404 }
            );
        }

        // Delete image from Cloudinary if exists
        if (banner.image) {
            const publicId = extractPublicIdFromUrl(banner.image);
            if (publicId) {
                try {
                    await deleteImage(publicId);
                } catch (error) {
                    console.error('Failed to delete banner image from Cloudinary:', error);
                }
            }
        }

        await Banner.findByIdAndDelete(id);

        return NextResponse.json(
            { message: 'Banner deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete banner error:', error);
        return NextResponse.json(
            { error: 'Failed to delete banner' },
            { status: 500 }
        );
    }
}
