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
  try {
    const client = await connectTo();

    const db = client.db();

    const data = await db.collection<Buses>("Booking").find({}).toArray();

    console.log(data);

    res.status(200).json({ message: "data updated successfully", data: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
