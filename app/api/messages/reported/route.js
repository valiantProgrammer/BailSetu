import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import connectDB from '../../login/mongoose';

export const dynamic = 'force-dynamic';
const uri = process.env.MONGODB_URI_2 || process.env.MONGODB_URI || 'mongodb://localhost:27017';
let client;
const dbName = 'chatProject';

async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
  }
  if (!client.topology?.isConnected()) await client.connect();
  return client.db(dbName);
}

// GET: Only reported messages
export async function GET() {
  await connectDB();
  const db = await getDb();

  const reported = await db
    .collection('messages')
    .find({ reports: { $exists: true, $not: { $size: 0 } } })
    .sort({ 'reports.createdAt': -1 })
    .toArray();

  return NextResponse.json(reported);
}