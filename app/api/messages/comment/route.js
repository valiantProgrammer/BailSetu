import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';
const uri = process.env.MONGODB_URI_2 || process.env.MONGODB_URI || 'mongodb://localhost:27017';
let client;
const dbName = 'chatProject';
let db;

async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
  }
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

export async function PUT(req) {
  try {
    const db = await getDb();
    const body = await req.json();

    const { id, comment, userId, username } = body;

    if (!id || !comment?.trim() || !userId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const collection = db.collection('messages');

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          comments: {
            text: comment.trim(),
            userId,
            username: username || 'Anonymous',
            timestamp: new Date(),
          },
        },
      }
    );

    const updated = await collection.findOne({ _id: new ObjectId(id) });

    if (!updated) {
      return NextResponse.json({ error: 'Message not found after update' }, { status: 404 });
    }

    return NextResponse.json({ message: updated });
  } catch (err) {
    console.error('PUT /api/messages/comment error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
