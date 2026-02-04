import mongoose, { Schema, model, models } from 'mongoose';

export interface IBanner {
    _id: string;
    title: string;
    message: string;
    active: boolean;
    startDate?: Date;
    endDate?: Date;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            maxlength: [500, 'Message cannot be more than 500 characters'],
        },
        active: {
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        image: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
BannerSchema.index({ active: 1, startDate: 1, endDate: 1 });

const Banner = models.Banner || model<IBanner>('Banner', BannerSchema);

export default Banner;
