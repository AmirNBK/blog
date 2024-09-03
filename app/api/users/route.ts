import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await connectToDatabase();
        const db = client.db('blogCluster');
        const users = await db.collection('users').find({}).toArray();

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve users' }, { status: 500 });
    }
}
