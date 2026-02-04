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
 * @returns Cloudinary upload result with secure_url
 */
export async function uploadImage(file: string, folder: string = 'springer-school') {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'auto',
            transformation: [
                { width: 1200, height: 1200, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        });
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image');
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
