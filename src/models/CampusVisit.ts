import mongoose, { Schema, model, models } from 'mongoose';

export interface ICampusVisit {
    _id: string;
    name: string;
    phone: string;
    address: string;
    preferredDate: Date;
    preferredTimeSlot: 'morning' | 'midday' | 'afternoon';
    reasonForVisit: 'admission' | 'fee' | 'infrastructure' | 'teacher' | 'other';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const CampusVisitSchema = new Schema<ICampusVisit>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
            maxlength: [500, 'Address cannot be more than 500 characters'],
        },
        preferredDate: {
            type: Date,
            required: [true, 'Preferred date is required'],
        },
        preferredTimeSlot: {
            type: String,
            required: [true, 'Preferred time slot is required'],
            enum: ['morning', 'midday', 'afternoon'],
        },
        reasonForVisit: {
            type: String,
            required: [true, 'Reason for visit is required'],
            enum: ['admission', 'fee', 'infrastructure', 'teacher', 'other'],
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
CampusVisitSchema.index({ createdAt: -1 });
CampusVisitSchema.index({ status: 1 });
CampusVisitSchema.index({ preferredDate: 1 });

const CampusVisit = models.CampusVisit || model<ICampusVisit>('CampusVisit', CampusVisitSchema);

export default CampusVisit;
