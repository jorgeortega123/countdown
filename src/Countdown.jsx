import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function Countdown({
  init,
  init_data,
  finish,
  mini,
  showLines,
}) {
  const [date, setdate] = useState({});
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const interval = setInterval(count, 1000);
    return () => clearInterval(interval);
  });
  var b = init ? dayjs(dayjs(init_data).$d) : dayjs(dayjs().$d);
  var a = finish ? dayjs(dayjs(finish).$d) : dayjs(dayjs().endOf("year").$d);
  //  if (init){
  //   console.log("MENOr",b)
  //   console.log("MAYOR",a)
  //   console.log("ASDSADAS", init)}

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

    if (days) {
  
    }
    setdate({ days: days, hours: hours, minutes: minutes, secs: seconds });
    setloading(true);
  };
  //  setInterval(count, 1000);
  if (b.isAfter(a)) { 
    return <>asdasd</>
  }
  if (mini)
    return (
      <p>
        {date.days}:{date.hours}:{date.minutes}:{date.secs}
      </p>
    );
  return (
    <div className="flex  items-center h-full">
      {!loading ? (
        <div className="animate-pulse w-[100vh] h-[20vh] max-h-[15vh] bg-[#1e2120]"></div>
      ) : (
        <div className="flex  items-center">
          <div className="relative countdown-container-number days">
            {date.days}
            {showLines && (
              <p className="absolute w-full text-center font-under-word-countdow">
                Days
              </p>
            )}
          </div>
          <div className="relative dots-main">:</div>
          <div className="relative countdown-container-number  hours">
            {date.hours}
            {showLines && (
              <p className="absolute w-full text-center  font-under-word-countdow">
                Hours
              </p>
            )}
          </div>
          <div className="relative dots-main">:</div>
          <div className="relative countdown-container-number  minutes">
            {date.minutes}
            {showLines && (
              <p className="absolute w-full text-center  font-under-word-countdow">
                Minutes
              </p>
            )}
          </div>
          <div className="relative dots-main">:</div>
          <div className="relative  countdown-container-number sec">
            {date.secs}
            {showLines && (
              <p className="absolute w-full text-center font-under-word-countdow">
                Seconds
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
