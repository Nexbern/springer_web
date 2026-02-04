import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: NextRequest) {
    try {
        const { username, password, name } = await request.json();

        // Validation
        if (!username || !password || !name) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (username.length < 3) {
            return NextResponse.json(
                { error: 'Username must be at least 3 characters' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: username.toLowerCase() });

        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Username already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new admin
        const admin = await Admin.create({
            username: username.toLowerCase(),
            password: hashedPassword,
            name,
        });

        return NextResponse.json(
            {
                message: 'Admin registered successfully',
                admin: {
                    id: admin._id,
                    username: admin.username,
                    name: admin.name,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to register admin' },
            { status: 500 }
        );
    }
}
