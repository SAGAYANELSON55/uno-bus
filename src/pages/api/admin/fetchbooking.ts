import { connectTo } from "@/helpers/connect-to";
import { BookingLog, Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectTo();

    const db = client.db();

    if (req.method === "GET") {
      const data = await db.collection<Buses>("Booking").find({}).toArray();
      console.log(2);

      res
        .status(200)
        .json({ message: "data updated successfully", data: data });
    } else if (req.method === "PATCH") {
      const detail = req.body;
      const response = await db
        .collection<Buses>("Booking")
        .findOneAndDelete({ uid: detail.uid });

      console.log("patch");

      res.status(200).json({ message: "booking deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
