import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let client;

export async function getCollection() {
  if (!client) {
    client = new MongoClient(uri);
  }
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db("BailSETU").collection("ipc_sections");
}
