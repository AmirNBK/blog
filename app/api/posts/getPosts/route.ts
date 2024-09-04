import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        const posts = await db.collection('posts').find().toArray();

        const authorIds = posts.map(post => post.author);
        const authors = await db.collection('users').find({ _id: { $in: authorIds } }).toArray();

        const authorMap = authors.reduce((acc, author) => {
            acc[author._id.toString()] = author;
            return acc;
        }, {} as { [key: string]: any });

        const postsWithAuthors = posts.map(post => ({
            ...post,
            author: authorMap[post.author.toString()] || null,
        }));

        return NextResponse.json(postsWithAuthors);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
