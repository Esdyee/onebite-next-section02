import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayoutOneBite || ((page) => page);
  return (
    <>
      <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
        {/* <Component {...pageProps} /> */}
      </GlobalLayout>
    </>
  );
}
