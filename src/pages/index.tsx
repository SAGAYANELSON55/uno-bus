import Head from "next/head";
import Home from "@/components/home-page/home-page";
import { Inter } from "next/font/google";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { fetchData } from "@/store/data/bus-details";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
