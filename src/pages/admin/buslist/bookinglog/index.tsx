import Bookinglogs from "@/components/admin/bookings";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const Bookings = () => {
  return <Bookinglogs />;
};

export default Bookings;

// server side validity check for admin session
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.name !== "Admin") {
    return {
      redirect: {
        destination: "/denied",
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
