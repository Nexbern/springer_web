import mongoose, { Schema, model, models } from 'mongoose';

export interface IStudentAchiever {
    _id: string;
    name: string;
    imageUrl: string;
    heading: string;
    description: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const StudentAchieverSchema = new Schema<IStudentAchiever>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        heading: {
            type: String,
            required: [true, 'Heading is required'],
            trim: true,
            maxlength: [200, 'Heading cannot be more than 200 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [500, 'Description cannot be more than 500 characters'],
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
StudentAchieverSchema.index({ order: 1 });
StudentAchieverSchema.index({ createdAt: -1 });

const StudentAchiever = models.StudentAchiever || model<IStudentAchiever>('StudentAchiever', StudentAchieverSchema);

export default StudentAchiever;
