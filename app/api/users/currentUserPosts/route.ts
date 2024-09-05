import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        // Get userId from decoded token
        const userId = decodedToken.userId;

        // Fetch posts for the specific user
        const posts = await db.collection('posts').find({ author: new ObjectId(userId) }).toArray();

        // Get unique author IDs from posts
        const authorIds = [...new Set(posts.map(post => post.author.toString()))];

        // Fetch author details
        const authors = await db.collection('users').find({ _id: { $in: authorIds.map(id => new ObjectId(id)) } }).toArray();

        // Create a map of authorId to author name
        const authorMap = authors.reduce((acc, author) => {
            acc[author._id.toString()] = author.name;
            return acc;
        }, {} as { [key: string]: string });

        // Attach author names to posts
        const postsWithAuthors = posts.map(post => ({
            ...post,
            authorName: authorMap[post.author.toString()] || 'Unknown'
        }));


        return NextResponse.json(postsWithAuthors, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export function POST() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
