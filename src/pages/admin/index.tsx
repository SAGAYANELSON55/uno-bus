import React, { useEffect } from "react";
import Home from "@/components/home-page/home-page";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchData } from "@/store/data/bus-details";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Admin = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return <Home />;
};

export default Admin;

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
