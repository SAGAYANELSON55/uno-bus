import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/header";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
