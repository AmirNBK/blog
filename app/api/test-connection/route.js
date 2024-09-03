import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: 'Connected to Database successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to Database' }, { status: 500 });
  }
}
