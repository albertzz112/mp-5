
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function connectToDB() {
    const client = await clientPromise;
    return client.db();
}

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>;
}