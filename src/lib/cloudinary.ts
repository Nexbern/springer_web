import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload image to Cloudinary
 * @param file - Base64 encoded image or file path
 * @param folder - Folder name in Cloudinary
 * @param resourceType - Resource type: 'image', 'raw', or 'auto'
 * @param additionalOptions - Additional Cloudinary upload options
 * @returns Cloudinary upload result with secure_url
 */
export async function uploadImage(
    file: string,
    folder: string = 'springer-school',
    resourceType: 'image' | 'raw' | 'auto' = 'auto',
    additionalOptions: any = {}
) {
    try {
        const uploadOptions: any = {
            folder,
            resource_type: resourceType,
            ...additionalOptions,
        };

        // Only apply transformations for images
        if (resourceType === 'image' || resourceType === 'auto') {
            uploadOptions.transformation = [
                { width: 1200, height: 1200, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ];
        }

        const result = await cloudinary.uploader.upload(file, uploadOptions);
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload file');
    }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Public ID of the image to delete
 */
export async function deleteImage(publicId: string) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image');
    }
}

/**
 * Extract public ID from a Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if not found
 */
export function extractPublicIdFromUrl(url: string): string | null {
    try {
        if (!url) return null;

        // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/public_id.jpg
        // Split by '/upload/'
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;

        // Remove versioning (e.g., v12345/) and extension
        const path = parts[1].split('/').slice(1).join('/'); // Remove version part
        const publicId = path.substring(0, path.lastIndexOf('.'));

        return publicId;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
}
