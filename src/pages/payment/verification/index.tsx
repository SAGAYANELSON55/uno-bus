import PaymentCompleted from "@/components/payment/paymentcompleted";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const index = () => {
  return <PaymentCompleted />;
};

export default index;

//restrict the access to the user page for admin session and check for valid user session
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
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
