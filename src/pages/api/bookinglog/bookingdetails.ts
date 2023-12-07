import { connectTo } from "@/helpers/connect-to";
import { Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "PUT") {
    res.status(402).json({ message: "bad request" });
    return;
  }

  const bookingData = await req.body;

  try {
    const client = await connectTo();

    const db = client.db();

    const collection = db.collection<Buses>("Booking");
    console.log("working on database");
    const data = await collection.insertOne(bookingData);

    const response = data.acknowledged;
    console.log(response);

    res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
