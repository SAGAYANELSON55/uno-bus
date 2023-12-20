import Buseslist from "@/components/buses-layout/buses/buses";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

function Buses() {
  return <Buseslist />;
}

export default Buses;

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
