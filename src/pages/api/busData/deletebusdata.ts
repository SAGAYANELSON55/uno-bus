import { connectTo } from "@/helpers/connect-to";
import { Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "PATCH") {
    res.status(402).json({ message: "bad request" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session?.user?.name !== "Admin") {
    res.status(401).json({ message: "not -authorized to perform the action" });
    return;
  }

  const details = await req.body;

  try {
    const client = await connectTo();

    const db = client.db();

    const collection = db.collection<Buses>("Buses");

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
