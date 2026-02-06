import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = formData.get('type') as string; // 'image' or 'pdf'

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        if (type === 'pdf') {
            if (file.type !== 'application/pdf') {
                return NextResponse.json(
                    { error: 'File must be a PDF' },
                    { status: 400 }
                );
            }
            // Validate PDF file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'PDF file size must be less than 10MB' },
                    { status: 400 }
                );
            }
        } else {
            // Default to image validation
            if (!file.type.startsWith('image/')) {
                return NextResponse.json(
                    { error: 'File must be an image' },
                    { status: 400 }
                );
            }
            // Validate image file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'Image file size must be less than 5MB' },
                    { status: 400 }
                );
            }
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const folder = type === 'pdf' ? 'springer-school/notices' : 'springer-school';
        const resourceType = type === 'pdf' ? 'raw' : 'image';

        // For PDFs, we need to preserve the format
        const additionalOptions: any = {};

        // Add format for PDFs to ensure proper file extension
        if (type === 'pdf') {
            additionalOptions.format = 'pdf';
            additionalOptions.public_id = `notice_${Date.now()}`;
        }

        const result = await uploadImage(base64, folder, resourceType, additionalOptions);

        return NextResponse.json(
            {
                message: `${type === 'pdf' ? 'PDF' : 'Image'} uploaded successfully`,
                url: result.secure_url,
                publicId: result.public_id,
                fileName: file.name,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload file' },
            { status: 500 }
        );
    }
}
