import React from "react";
import Booking from "@/components/buses-layout/booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const BookingPage = () => {
  return (
    <div>
      <Booking />
    </div>
  );
};

export default BookingPage;

//restrict the access to the user page for admin session
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.name === "Admin") {
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
