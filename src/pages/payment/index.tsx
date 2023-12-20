import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Payment from "@/components/payment/payment";

function payment() {
  return <Payment />;
}

export default payment;

//restrict the access to the user page for admin session and check for valid user session
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination:
          "/auth?message=Please%20log%20in%20to%20access%20this%20page",
        permanent: false,
      },
    };
  }

  if (session && session?.user?.name === "Admin") {
    return {
      redirect: {
        destination: "/roleError",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
