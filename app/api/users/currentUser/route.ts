import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey1234567890';

interface DecodedToken extends JwtPayload {
    userId: string;
}

export async function GET(request: Request) {
    try {
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

        if (!decodedToken) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
