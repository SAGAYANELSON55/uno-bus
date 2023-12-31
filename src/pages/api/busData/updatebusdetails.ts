import { connectTo } from "@/helpers/connect-to";
import { Buses } from "@/models/bus-data";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

//api to add the updated bus data after payment confirmation
async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Array<Buses> | undefined> {
  if (req.method !== "PATCH") {
    res.status(402).json({ message: "bad request" });
    return;
  }

  //validity check for valid user session
  const session = getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "not-authorized to perform the action" });
    return;
  }

  const updatedData = await req.body;

  try {
    const client = await connectTo();

    const db = client.db();

    const collection = db.collection<Buses>("Buses");

    const data = await collection.findOneAndUpdate(
      { "buses.busNo": updatedData[0].busNo },
      { $set: { "buses.$": updatedData[0] } }
    );

    const response = data.buses;

    res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
