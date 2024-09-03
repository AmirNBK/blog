import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        const posts = await db.collection('posts').find().toArray();

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
