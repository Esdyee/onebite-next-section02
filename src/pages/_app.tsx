import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayoutOneBite?: (page: React.ReactNode) => React.ReactNode;
}

export default function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout }) {
  // const getLayout = Component.getLayoutOneBite; // 그냥 이렇게만 보내면 getLayoutOneBite가 없으면 에러가 발생함.
  const getLayout = Component.getLayoutOneBite || ((page: React.ReactNode) => page);
    return (
    <>
      <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
        {/* <Component {...pageProps} /> */}
      </GlobalLayout>
    </>
  );
}
