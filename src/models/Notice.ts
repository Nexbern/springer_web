import mongoose, { Schema, model, models } from 'mongoose';

export interface INotice {
    _id: string;
    title: string;
    content: string;
    date: Date;
    pdfUrl?: string;
    pdfFileName?: string;
    createdAt: Date;
    updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot be more than 200 characters'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        pdfUrl: {
            type: String,
            required: false,
        },
        pdfFileName: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
NoticeSchema.index({ date: -1 });
NoticeSchema.index({ createdAt: -1 });

const Notice = models.Notice || model<INotice>('Notice', NoticeSchema);

export default Notice;
