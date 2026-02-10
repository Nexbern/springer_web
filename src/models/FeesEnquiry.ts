import mongoose, { Schema, model, models } from 'mongoose';

export interface IFeesEnquiry {
    _id: string;
    name: string;
    email: string;
    phone: string;
    class: string;
    status: 'new' | 'in-progress' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
}

const FeesEnquirySchema = new Schema<IFeesEnquiry>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        class: {
            type: String,
            required: [true, 'Class is required'],
            trim: true,
        },
        status: {
            type: String,
            default: 'new',
            enum: ['new', 'in-progress', 'resolved'],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
FeesEnquirySchema.index({ createdAt: -1 });
FeesEnquirySchema.index({ status: 1 });
FeesEnquirySchema.index({ email: 1 });

const FeesEnquiry = models.FeesEnquiry || model<IFeesEnquiry>('FeesEnquiry', FeesEnquirySchema);

export default FeesEnquiry;
