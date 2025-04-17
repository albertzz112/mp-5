// lib/db.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

let cachedDb: MongoClient | null = null;

export async function connectToDB() {
    if (!cachedDb) {
        cachedDb = await client.connect();
    }
    return cachedDb.db();
}
