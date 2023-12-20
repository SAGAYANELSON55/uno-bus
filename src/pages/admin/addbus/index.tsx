import AddbusForm from "@/components/admin/addbus-form";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const AddBusPage = () => {
  return <AddbusForm />;
};

export default AddBusPage;

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
