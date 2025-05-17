import { Input } from "@heroui/react";
import dayjs from "dayjs";
import React from "react";
import { text } from "stream/consumers";
import useCountDown from "../hooks/useCountDown";
import {
  getLocalTimeZone,
  now,
  toCalendarDateTime,
} from "@internationalized/date";
import usePingedCountDown from "../context/UsePingedCountDown";
import useUser from "../context/useUser";

type DayjsUnit =
  | "millisecond"
  | "seconds"
  | "minutes"
  | "hour"
  | "days"
  | "week"
  | "month"
  | "year"
  | "date";
interface OptionsProps {
  time: number;
  unit: DayjsUnit;
  text: string;
}
export default function QuickAddCountDown() {
  const { reloadCounts, setReloadCounts } = useUser();
  const { fixedCount, setfixedCount } = usePingedCountDown();
  const options: OptionsProps[] = [
    {
      time: 1,
      text: "min",
      unit: "minutes",
    },
    {
      time: 3,
      text: "mins",
      unit: "minutes",
    },
    {
      time: 5,
      text: "mins",
      unit: "minutes",
    },
    {
      time: 15,
      text: "mins",
      unit: "minutes",
    },
    {
      time: 1,
      text: "días",
      unit: "days",
    },
  ];

  const handleClickOnOptions = (item: OptionsProps) => {
    const { addCountDown } = useCountDown();
    //@ts-ignore
    // now(getLocalTimeZone()).add({ days: 1 }),

    //
    //  const finishDate = dayjs().add(item.time, item.unit).toDate();
    const finishDate = now(getLocalTimeZone()).add({ [item.unit]: item.time });
    const startDate = now(getLocalTimeZone());
    const nameCountDown = `${item.time}${item.unit}`;
    // console.log(finishDate);
    addCountDown({
      data: {
        startDate: startDate,
        endDate: finishDate,
        name: nameCountDown,
      },
    });
    // console.log(finishDate);
    setfixedCount({
      date: toCalendarDateTime(finishDate).toString(),
      name: nameCountDown,
    });
    setReloadCounts(!reloadCounts);

    // return finishDate;
  };
  return (
    <div className="w-full max-w-max flex gap-3 items-center pr-7 border-2 border-zinc-800 rounded-2xl">
      {/* <div>
        <Input
          isClearable
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          label="Nombre"
          placeholder="Un nombre rápido..."
          radius="lg"
          // startContent={
          //   <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          // }
        />
      </div> */}
      {options.map((option) => (
        <div
          onClick={() => handleClickOnOptions(option)}
          className="bg-zinc-800 hover:bg-zinc-700 cursor-pointer px-2.5 py-0.5 rounded-xl"
        >
          {option.time} {option.text}
        </div>
      ))}
    </div>
  );
}
