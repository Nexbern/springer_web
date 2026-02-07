import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Faculty from '@/models/Faculty';
import { authOptions } from '@/lib/auth';
import { deleteImage, extractPublicIdFromUrl } from '@/lib/cloudinary';

// GET single faculty (public)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const faculty = await Faculty.findById(id);

        if (!faculty) {
            return NextResponse.json(
                { error: 'Faculty not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ faculty }, { status: 200 });
    } catch (error: any) {
        console.error('Get faculty error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch faculty' },
            { status: 500 }
        );
    }
}

// PUT update faculty (admin only)
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

        const { name, degree, experience, subject, description, image, order } = await request.json();

        if (!name || !degree || !experience || !subject || !description || !image) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const faculty = await Faculty.findByIdAndUpdate(
            id,
            {
                name,
                degree,
                experience,
                subject,
                description,
                image,
                order: order || 0,
            },
            { new: true, runValidators: true }
        );

        if (!faculty) {
            return NextResponse.json(
                { error: 'Faculty not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Faculty updated successfully', faculty },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update faculty error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update faculty' },
            { status: 500 }
        );
    }
}

// DELETE faculty (admin only)
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

        const faculty = await Faculty.findById(id);

        if (!faculty) {
            return NextResponse.json(
                { error: 'Faculty not found' },
                { status: 404 }
            );
        }

        // Delete image from Cloudinary
        if (faculty.image) {
            const publicId = extractPublicIdFromUrl(faculty.image);
            if (publicId) {
                try {
                    await deleteImage(publicId);
                } catch (error) {
                    console.error('Failed to delete faculty image from Cloudinary:', error);
                }
            }
        }

        await Faculty.findByIdAndDelete(id);

        return NextResponse.json(
            { message: 'Faculty deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete faculty error:', error);
        return NextResponse.json(
            { error: 'Failed to delete faculty' },
            { status: 500 }
        );
    }
}
