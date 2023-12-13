import Head from "next/head";
import Home from "@/components/home-page/home-page";
import { Inter } from "next/font/google";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { fetchData } from "@/store/data/bus-details";
import { useEffect } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Bus ticket booking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.name === "Admin") {
    return {
      redirect: {
        destination: "/admin",
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
