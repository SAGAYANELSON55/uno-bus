import { hashPassword } from "../../../helpers/auth";
import { connectTo } from "@/helpers/connect-to";
import { NextApiRequest, NextApiResponse } from "next";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(501).json({ message: "Bad Request" });
    return;
  }

  

  const { email, password, name } = req.body;
  console.log(email);

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid user credentials, Password should be atleast 7 characters",
    });
    return;
  }

  try {
    const client = await connectTo();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      res.status(401).json({
        message: "user already registered try login or use another email",
      });
      throw new Error("user already registered try login or use another email");
    }

    let result;

    const hashedPassword = await hashPassword(password);
    if (name === "BusAdmin") {
      result = await db
        .collection("users")
        .insertOne({ email, password: hashedPassword, name, isAdmin: true });
    } else {
      result = await db
        .collection("users")
        .insertOne({ email, password: hashedPassword, name, isAdmin: false });
    }

    res.status(201).json({ message: "User Created!!!" });
    const response = result.acknowledged;
    console.log(response);
    // return response;
  } catch (error) {
    res.status(500).json({
      message: "Unable to add the user try again after some time",
    });
  }
}

export default handler;
