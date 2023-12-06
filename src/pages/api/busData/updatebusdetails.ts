import { connectTo } from "@/helpers/connect-to";
import { Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "PATCH") {
    res.status(402).json({ message: "bad request" });
    return;
  }

  const updatedData = req.body;

  console.log("working on database");

  try {
    const client = await connectTo();

    const db = client.db();

    const data = await db
      .collection<Buses>("Buses")
      .findOneAndUpdate(
        { "buses.busNo": updatedData.busNo },
        { $set: { "buses.$": updatedData } }
      );

    res.status(200).json({ buses: data[0].buses });
  } catch (error) {
    res.status(500).json({ message: "Error while updating data" });
  }
}

export default handler;
