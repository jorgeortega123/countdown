import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainProvider } from "../context/MainContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Component {...pageProps} />
    </MainProvider>
  );
}
