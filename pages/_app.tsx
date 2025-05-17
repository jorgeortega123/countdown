import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import PingedCountDownContextComponent from "../context/PingedCountDown";
import UserProvider from "../context/UserContext";
import { ToastProvider } from "@heroui/toast";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <HeroUIProvider>
          <ToastProvider />
          <PingedCountDownContextComponent>
            <main className="dark text-foreground bg-background">
              <Component {...pageProps} />
            </main>
          </PingedCountDownContextComponent>
        </HeroUIProvider>
      </UserProvider>
    </>
  );
}
