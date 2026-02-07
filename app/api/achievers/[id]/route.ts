import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import StudentAchiever from '@/models/StudentAchiever';
import { authOptions } from '@/lib/auth';
import { deleteImage, extractPublicIdFromUrl } from '@/lib/cloudinary';

// GET single student achiever (public)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const achiever = await StudentAchiever.findById(id);

        if (!achiever) {
            return NextResponse.json(
                { error: 'Student achiever not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ achiever }, { status: 200 });
    } catch (error: any) {
        console.error('Get achiever error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch achiever' },
            { status: 500 }
        );
    }
}

// PUT update student achiever (admin only)
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

        const { name, imageUrl, heading, description, order } = await request.json();

        if (!name || !imageUrl || !heading || !description) {
            return NextResponse.json(
                { error: 'Name, image, heading, and description are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const achiever = await StudentAchiever.findByIdAndUpdate(
            id,
            {
                name,
                imageUrl,
                heading,
                description,
                order: order || 0,
            },
            { new: true, runValidators: true }
        );

        if (!achiever) {
            return NextResponse.json(
                { error: 'Student achiever not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Student achiever updated successfully', achiever },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update achiever error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update achiever' },
            { status: 500 }
        );
    }
}

// DELETE student achiever (admin only)
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

        const achiever = await StudentAchiever.findById(id);

        if (!achiever) {
            return NextResponse.json(
                { error: 'Student achiever not found' },
                { status: 404 }
            );
        }

        if (achiever.imageUrl) {
            const publicId = extractPublicIdFromUrl(achiever.imageUrl);
            if (publicId) {
                try {
                    await deleteImage(publicId);
                } catch (error) {
                    console.error('Failed to delete achiever image from Cloudinary:', error);
                }
            }
        }

        await StudentAchiever.findByIdAndDelete(id);

        return NextResponse.json(
            { message: 'Student achiever deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete achiever error:', error);
        return NextResponse.json(
            { error: 'Failed to delete achiever' },
            { status: 500 }
        );
    }
}
