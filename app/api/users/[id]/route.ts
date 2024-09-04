import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
    try {
        // Extract userId from the request URL
        const url = new URL(request.url);
        const userId = url.pathname.split('/')[3]; // Extract userId from the path

        // Validate userId
        if (!userId || !ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid or missing userId' }, { status: 400 });
        }

        // Connect to the database
        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        // Fetch user details, excluding the password field
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } } // Exclude the password field
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Fetch posts by the user
        const posts = await db.collection('posts').find({ author: new ObjectId(userId) }).toArray();

        // Fetch author names for each post
        const postsWithAuthorNames = await Promise.all(
            posts.map(async (post) => {
                const author = await db.collection('users').findOne(
                    { _id: new ObjectId(userId) },
                    { projection: { name: 1 } } // Fetch only the author's name
                );
                
                return {
                    ...post,
                    authorName: author?.name || 'Unknown', // Add author name to the post
                };
            })
        );

        // Combine user details and posts
        const userDetails = {
            ...user,
            posts: postsWithAuthorNames,
        };

        return NextResponse.json(userDetails, { status: 200 });
    } catch (error) {
        console.error('Error fetching user details and posts:', error);
        return NextResponse.json({ error: 'Failed to fetch user details and posts' }, { status: 500 });
    }
}

export function POST() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export function PUT() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export function DELETE() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
