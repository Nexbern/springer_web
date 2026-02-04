'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Upload failed');
            }

            const data = await response.json();
            setPreview(data.url);
            onChange(data.url);
        } catch (error: any) {
            console.error('Upload error:', error);
            alert(error.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onRemove) {
            onRemove();
        }
    };

    return (
        <div className="space-y-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
            />

            {preview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-springer-red hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-12 h-12 text-springer-gray animate-spin" />
                            <p className="text-sm text-springer-gray">Uploading...</p>
                        </>
                    ) : (
                        <>
                            <Upload className="w-12 h-12 text-springer-gray" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-springer-charcoal">
                                    Click to upload image
                                </p>
                                <p className="text-xs text-springer-gray mt-1">
                                    PNG, JPG, WEBP up to 5MB
                                </p>
                            </div>
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
