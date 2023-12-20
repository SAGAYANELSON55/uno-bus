import { connectTo } from "@/helpers/connect-to";
import { Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "GET") {
    res.status(402).json({ message: "bad request" });
    return;
  }

  const client = await connectTo();

  const db = client.db();

  const data = await db.collection<Buses>("Buses").find({}).toArray();

  res.status(200).json({ buses: data[0].buses, model: data[0].model });
}

export default handler;
