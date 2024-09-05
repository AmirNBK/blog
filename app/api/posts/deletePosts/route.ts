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
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
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

        // Check if the post exists
        const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Check if the current user is the author of the post
        if (post.author.toString() !== decodedToken.userId) {
            return NextResponse.json({ error: 'Not authorized to delete this post' }, { status: 403 });
        }

        // Delete the post
        await db.collection('posts').deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: 'Post deleted successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export function POST() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export function PUT() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
