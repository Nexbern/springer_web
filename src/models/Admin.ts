import mongoose, { Schema, model, models } from 'mongoose';

export interface IAdmin {
    _id: string;
    username: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [50, 'Username cannot be more than 50 characters'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
AdminSchema.index({ username: 1 });

const Admin = models.Admin || model<IAdmin>('Admin', AdminSchema);

export default Admin;
