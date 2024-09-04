import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const postId = url.searchParams.get('postId');

        if (!postId || !ObjectId.isValid(postId)) {
            return NextResponse.json({ error: 'Invalid or missing postId' }, { status: 400 });
        }

        const client = await connectToDatabase();
        const db = client.db('blogCluster');

        const comments = await db.collection('comments')
            .find({ postId: new ObjectId(postId) })
            .sort({ createdAt: -1 })
            .toArray();

        const userIds = comments.map(comment => comment.userId);
        const uniqueUserIds = [...new Set(userIds)].map(id => new ObjectId(id));

        const users = await db.collection('users')
            .find({ _id: { $in: uniqueUserIds } })
            .toArray();

        const userMap = users.reduce((map, user) => {
            map[user._id.toString()] = user;
            return map;
        }, {});

        const commentsWithAuthor = comments.map(comment => ({
            ...comment,
            authorName: userMap[comment.userId]?.name || 'Unknown'
        }));

        return NextResponse.json(commentsWithAuthor, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export function POST() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
