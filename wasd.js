// test-mongo.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://albertzz:idontcare112@cluster0.hpxadhz.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB!");
    } catch (e) {
        console.error("❌ Connection failed:", e.message);
    } finally {
        await client.close();
    }
}

run();
