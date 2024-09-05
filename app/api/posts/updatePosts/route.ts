import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey1234567890';

interface DecodedToken extends JwtPayload {
    userId: string;
}

export async function PUT(request: Request) {
    try {
        // Extract the post ID from the request URL
        const url = new URL(request.url);
        const slug = url.searchParams.get('slug');

        // Extract data from the request body
        const { title, content } = await request.json();


        // Validate required fields
        if (!slug || !title || !content) {
            return NextResponse.json({ error: 'title and content are required' }, { status: 400 });
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
        const post = await db.collection('posts').findOne({ _id: new ObjectId(slug) });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Check if the current user is the author of the post
        if (post.author.toString() !== decodedToken.userId) {
            return NextResponse.json({ error: 'Not authorized to update this post' }, { status: 403 });
        }

        // Update the post
        await db.collection('posts').updateOne(
            { _id: new ObjectId(slug) },
            { $set: { title, content } }
        );

        return NextResponse.json({ message: 'Post updated successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export function POST() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export function DELETE() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
