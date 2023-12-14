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

  const details = await req.body;

  console.log(details);

  try {
    const client = await connectTo();

    const db = client.db();

    const collection = db.collection<Buses>("Buses");
    console.log("working on database");
    const data = await collection.updateOne(
      { name: "busData" },
      { $pull: { buses: { busNo: details.busNo } } }
    );
    const response = data.acknowledged;

    res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
