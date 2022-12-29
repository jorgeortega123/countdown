import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [date, setdate] = useState({});
  useEffect(() => {
    const interval = setInterval(count, 1000);
    return () => clearInterval(interval);
  }, [date]);

  var a = dayjs(dayjs().endOf("year").$d);
  var b = dayjs().$d;
  var [q, w, e, r] = [
    a.diff(b, "days"),
    a.diff(b, "hours"),
    a.diff(b, "minutes"),
    a.diff(b, "seconds"),
  ];
  let hours = w - q * 24,
    minutes = e - w * 60,
    days = q,
    seconds = r - e * 60;
  const count = () => {
    // console.log(hours,minutes,days,seconds)
    if (seconds < 10) seconds = `0` + seconds;
    if (seconds > 59) {
      seconds = `00`;
      minutes++;
    }
    if (minutes < 10) minutes = `0` + minutes;
    if (minutes > 59) {
      minutes = `00`;
      hours++;
    }
    if (hours < 10) hours = `0` + hours;
    if (hours > 24) {
      seconds = `00`;
      minutes = `00`;
      hours = `00`;
      days++;
    }
    if (days < 10) days = `0` + days;

    setdate({ days: days, hours: hours, minutes: minutes, secs: seconds });
  };
  //  setInterval(count, 1000);
  return (
    <div className="flex flex-col items-center justify-center relative">
      <p className="w-[320px] lg:w-[1450px] flex  items-center h-full">
        <span className="days">{date.days}</span> 
        <span className="dots-main">:</span>
        <span className="hours">{date.hours}</span>
        <span className="dots-main">:</span>
        <span className="minutes"> {date.minutes}</span>
        <span className="dots-main">:</span>
        <span className="sec"> {date.secs}</span>
      </p>
      <p className="absolute bottom-0 text-[12px] flex space-x-8 lg:space-x-[260px]">
        <span className="text-under-numbers days lg:text-[45px]"> Days</span>
        <span className="text-under-numbers lg:text-[45px]"> Hours</span>
        <span className="text-under-numbers minutes lg:text-[45px]"> Mins</span>
        <span className="text-under-numbers lg:text-[45px]"> Secs</span>
        
      </p>
    </div>
  );
}
