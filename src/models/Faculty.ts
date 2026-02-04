import mongoose, { Schema, model, models } from 'mongoose';

export interface IFaculty {
    _id: string;
    name: string;
    experience: number;
    subject: string;
    description: string;
    image: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const FacultySchema = new Schema<IFaculty>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        experience: {
            type: Number,
            required: [true, 'Experience is required'],
            min: [0, 'Experience cannot be negative'],
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
            maxlength: [100, 'Subject cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [500, 'Description cannot be more than 500 characters'],
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
            trim: true,
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
FacultySchema.index({ order: 1 });
FacultySchema.index({ subject: 1 });

const Faculty = models.Faculty || model<IFaculty>('Faculty', FacultySchema);

export default Faculty;
