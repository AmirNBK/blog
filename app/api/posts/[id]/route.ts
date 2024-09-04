import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Adjust the path as necessary
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const client = await connectToDatabase();
        const db = client.db('blogCluster'); // Replace with your database name

        // Fetch the post
        const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Fetch the author details
        const author = await db.collection('users').findOne({ _id: new ObjectId(post.author) });

        // Include author name in the post data
        const postWithAuthor = {
            ...post,
            authorName: author?.name || 'Unknown Author'
        };

        return NextResponse.json(postWithAuthor, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
