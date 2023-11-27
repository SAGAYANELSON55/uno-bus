import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/header";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchData } from "@/store/data/bus-details";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // const router = useRouter();

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault();
  //     event.returnValue = "Are you sure you want to leave?";
  //   };

  //   const handleUnload = () => {};

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("unload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("unload", handleUnload);
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
