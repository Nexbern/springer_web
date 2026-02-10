import mongoose, { Schema, model, models } from 'mongoose';

export interface IAdmissionEnquiry {
    _id: string;
    studentName: string;
    parentName: string;
    email: string;
    phone: string;
    grade: string;
    message?: string;
    status: 'new' | 'in-progress' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
}

const AdmissionEnquirySchema = new Schema<IAdmissionEnquiry>(
    {
        studentName: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
            maxlength: [100, 'Student name cannot be more than 100 characters'],
        },
        parentName: {
            type: String,
            required: [true, 'Parent name is required'],
            trim: true,
            maxlength: [100, 'Parent name cannot be more than 100 characters'],
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
        grade: {
            type: String,
            required: [true, 'Grade is required'],
            trim: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: [1000, 'Message cannot be more than 1000 characters'],
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
AdmissionEnquirySchema.index({ createdAt: -1 });
AdmissionEnquirySchema.index({ status: 1 });
AdmissionEnquirySchema.index({ email: 1 });

const AdmissionEnquiry = models.AdmissionEnquiry || model<IAdmissionEnquiry>('AdmissionEnquiry', AdmissionEnquirySchema);

export default AdmissionEnquiry;
