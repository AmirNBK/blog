import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey1234567890';

interface DecodedToken extends JwtPayload {
    userId: string;
}

export async function DELETE(request: Request) {
    try {
        // Extract the user ID from the request URL
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        let decodedToken: DecodedToken;

        try {
            decodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;
        } catch (error) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        // Check if the current user is an admin
        const adminUser = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
        if (!adminUser || !adminUser.isAdmin) {
            return NextResponse.json({ error: 'Not authorized to delete users' }, { status: 403 });
        }

        // Check if the user to be deleted exists
        const userToDelete = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (!userToDelete) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete the user
        await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

        return NextResponse.json({ message: 'User deleted successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
