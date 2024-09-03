import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/lib/models/Post';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey1234567890';

interface DecodedToken extends JwtPayload {
    userId: string;
}

export async function POST(request: Request) {
    const { title, content, publishDate } = await request.json();

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
        

        const post = new Post({
            title,
            content,
            publishDate: publishDate || new Date(),
            author: decodedToken.userId,
            comments: [],
        });

        await db.collection('posts').insertOne(post);

        return NextResponse.json({ message: 'Post created successfully!', post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
