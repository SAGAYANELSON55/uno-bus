import { connectTo } from "@/helpers/connect-to";
import { BookingLog, Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

//api to delete particular bus data from the server
async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "PATCH") {
    res.status(402).json({ message: "bad request" });
    return;
  }

  //validity check for admin session
  const session = await getServerSession(req, res, authOptions);

  if (!session || session?.user?.name !== "Admin") {
    res.status(401).json({ message: "not -authorized to perform the action" });
    return;
  }

  const details = await req.body;

  try {
    const client = await connectTo();

    const db = client.db();

    const collection1 = db.collection<Buses>("Buses");
    const collection2 = db.collection<BookingLog>("Booking");

    const data = await collection1.updateOne(
      { name: "busData" },
      { $pull: { buses: { busNo: details.busNo } } }
    );

    await collection2.deleteMany({ busNo: details.busNo });

    const response = data.acknowledged;

    res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
