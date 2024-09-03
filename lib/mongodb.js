import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://AmirNBK:Z6pX25nuNM2GQtSa@blogcluster.fazzt.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        serverSelectionTimeoutMS: 30000,
    }
});

export async function connectToDatabase() {
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        console.log('Connected to MongoDB successfully!');
        return client;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

export default client;
