import { connectTo } from "@/helpers/connect-to";
import { BookingLog, Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

//api to fetch booking details from the server

async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  //check for valid admin session

  const session = await getServerSession(req, res, authOptions);

  if (!session || session?.user?.name !== "Admin") {
    res.status(401).json({ message: "not-authorized to perform the action" });
    return;
  }

  try {
    const client = await connectTo();

    const db = client.db();

    if (req.method === "GET") {
      const data = await db.collection<Buses>("Booking").find({}).toArray();

      res
        .status(200)
        .json({ message: "data updated successfully", data: data });
    } else if (req.method === "PATCH") {
      const detail = req.body;
      const response = await db
        .collection<Buses>("Booking")
        .findOneAndDelete({ uid: detail.uid });

      res.status(200).json({ message: "booking deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
