import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
    try {
        // Parse the URL to get the query parameters
        const url = new URL(request.url);
        const postId = url.searchParams.get('postId');

        // Validate postId
        if (!postId || !ObjectId.isValid(postId)) {
            return NextResponse.json({ error: 'Invalid or missing postId' }, { status: 400 });
        }

        // Connect to the database
        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        // Fetch comments for the specific post
        const comments = await db.collection('comments')
            .find({ postId: new ObjectId(postId) })
            .sort({ createdAt: -1 }) // Sort by most recent
            .toArray();

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export function POST() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
