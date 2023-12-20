import { connectTo } from "@/helpers/connect-to";
import { BookingLog, Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

//api to add booking data to the server
async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "PUT") {
    res.status(402).json({ message: "bad request" });
    return;
  }

  //check for valid admin session
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "not -authorized to perform the action" });
    return;
  }

  const bookingData = await req.body;

  try {
    const client = await connectTo();

    const db = client.db();

    const collection = db.collection<BookingLog>("Booking");

    const data = await collection.insertOne(bookingData);

    const response = data.acknowledged;

    res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
