import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Faculty from '@/models/Faculty';
import { authOptions } from '../../auth/[...nextauth]/route';
import { deleteImage } from '@/lib/cloudinary';

// GET single faculty (public)
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const faculty = await Faculty.findById(params.id);

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
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, experience, subject, description, image, order } = await request.json();

        if (!name || !subject || !description || !image) {
            return NextResponse.json(
                { error: 'Name, subject, description, and image are required' },
                { status: 400 }
            );
        }

        if (experience === undefined || experience < 0) {
            return NextResponse.json(
                { error: 'Valid experience is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const faculty = await Faculty.findByIdAndUpdate(
            params.id,
            {
                name,
                experience,
                subject,
                description,
                image,
                order,
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
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const faculty = await Faculty.findById(params.id);

        if (!faculty) {
            return NextResponse.json(
                { error: 'Faculty not found' },
                { status: 404 }
            );
        }

        // Delete image from Cloudinary
        if (faculty.image) {
            try {
                const publicId = faculty.image.split('/').pop()?.split('.')[0];
                if (publicId) {
                    await deleteImage(`springer-school/${publicId}`);
                }
            } catch (error) {
                console.error('Failed to delete image from Cloudinary:', error);
            }
        }

        await Faculty.findByIdAndDelete(params.id);

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
