import { connectTo } from "@/helpers/connect-to";
import { Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "PUT") {
    res.status(402).json({ message: "bad request" });
    return;
  }
  const session = await getServerSession(req, res, authOptions);

  if (!session || session?.user?.name !== "Admin") {
    res.status(401).json({ message: "not-authorized to perform the action" });
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
  res.status(200).json({ message: "bus added successfully" });
}

export default handler;
