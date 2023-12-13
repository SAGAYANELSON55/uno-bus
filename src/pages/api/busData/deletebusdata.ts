// import { connectTo } from "@/helpers/connect-to";
// import { Buses } from "@/models/bus-data";
// import { NextApiRequest, NextApiResponse } from "next";

// async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<Array<Buses> | undefined> {
//   if (req.method !== "PATCH") {
//     res.status(402).json({ message: "bad request" });
//     return;
//   }

//   const updatedData = await req.body;

//   console.log(updatedData[0]);

//   try {
//     const client = await connectTo();

//     const db = client.db();

//     const collection = db.collection<Buses>("Buses");
//     console.log("working on database");
//     const data = await collection.findOneAndDelete({
//       "buses.busNo": updatedData[0].busNo,
//     });

//     const response = data.buses;

//     res.status(200).json({ message: "data updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// }

// export default handler;