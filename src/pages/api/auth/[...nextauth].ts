import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectTo } from "@/helpers/connect-to";
import { verifyPassword } from "@/helpers/auth";
import { SessionStartegy } from "@/models/util";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" as SessionStartegy },
  jwt: {
    maxAge: 60 * 5,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      type: "credentials",
      async authorize(credentials) {
        const client = await connectTo();

        const db = client.db();

        const userCollection = db.collection("users");

        const user = await userCollection.findOne({
          email: credentials!.email,
        });

        if (!user) {
          console.log("user is not there ");
          return null;
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          console.log("incorrect password");
          return null;
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
};

export default NextAuth(authOptions);
