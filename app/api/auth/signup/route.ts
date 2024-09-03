import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey1234567890';

export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const client = await connectToDatabase();
        const db = client.db('blogCluster');
        const result = await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({ message: 'User created successfully!', token });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
