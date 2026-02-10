import mongoose, { Schema, model, models } from 'mongoose';

export interface IContactEnquiry {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'in-progress' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
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
            trim: true,
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
            maxlength: [200, 'Subject cannot be more than 200 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            maxlength: [2000, 'Message cannot be more than 2000 characters'],
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
ContactEnquirySchema.index({ createdAt: -1 });
ContactEnquirySchema.index({ status: 1 });
ContactEnquirySchema.index({ email: 1 });

const ContactEnquiry = models.ContactEnquiry || model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);

export default ContactEnquiry;
