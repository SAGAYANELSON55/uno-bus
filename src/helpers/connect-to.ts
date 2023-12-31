import { MongoClient } from "mongodb";
import { userData } from "@/models/util";

let cachedClient: MongoClient | null = null;
export async function connectTo(): Promise<MongoClient> {
  const uri = process.env.MONGO_URI!;
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();

  cachedClient = client;

  return client;
}

