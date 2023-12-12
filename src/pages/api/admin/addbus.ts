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

  const bus = req.body;

  console.log(bus);

  const client = await connectTo();

  const db = client.db();

  const data = await db
    .collection<Buses>("Buses")
    .updateOne({ name: "busData" }, { $push: { buses: bus } });
  console.log(data.acknowledged);
  ///working on the api resolve
}

export default handler;
