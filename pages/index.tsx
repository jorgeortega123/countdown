import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import dayjs from "dayjs";
import Countdown from "../src/Countdown";
import HolidayApi from "../src/HolidayApi";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="max-w-screen">
      <div className="text-[55px] lg:text-[270px] p-12">
        <p className="text-[20px] py-0 my-0">Next year countdown</p>
        <Countdown />
        <HolidayApi></HolidayApi>
      </div>
    </div>
  );
}
