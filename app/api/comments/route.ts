import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey1234567890';

interface DecodedToken extends JwtPayload {
    userId: string;
}

export async function POST(request: Request) {
    const { content, author, postId } = await request.json();

    try {
        const client = await connectToDatabase();
        const db = client.db('blogCluster');

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

        if (!content || !author || !postId) {
            return NextResponse.json({ error: 'Content, author, and postId are required' }, { status: 400 });
        }

        const comment = {
            content,
            author,
            postId,
            createdAt: new Date(),
            userId: decodedToken.userId 
        };

        await db.collection('comments').insertOne(comment);

        return NextResponse.json({ message: 'Comment posted successfully!' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
