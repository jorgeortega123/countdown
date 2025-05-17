import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import usePingedCountDown from "../context/UsePingedCountDown";
import { fechaFormateada } from "../components/FechaFormateada";
import { Alert } from "@heroui/react";
import { PingedIcon } from "../styles/Icons";

export default function Countdown({
  fixed = false,
  init,
  init_data,
  finish,
  mini,
  showLines,
  data,
}) {
  const [show, setshow] = useState(true);
  const { fixedCount, setfixedCount } = usePingedCountDown();
  const [date, setdate] = useState({});
  const [loading, setloading] = useState(false);
  const [hidden, sethidden] = useState(false);
  useEffect(() => {
    const interval = setInterval(count, 1000);
    return () => clearInterval(interval);
  });

  var b = init ? dayjs(dayjs(init_data).$d) : dayjs(dayjs().$d);
  var a = finish
    ? dayjs(dayjs(fixed ? fixedCount.date : finish).$d)
    : dayjs(dayjs().endOf("year").$d);

  // if (a.isBefore(b)) {
  //   sethidden(true);
  //   // console.log("La fecha ya ha pasado.");
  // }

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
    if (a.isBefore(b)) {
      setdate({ days: `00`, hours: `00`, minutes: `00`, secs: `00` });
      
      setloading(true);
      return;
    }
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
  // if (b.isAfter(a)) {
  //   return <>asdasd</>;
  // }
  const logicaComponenteDia = () => {
    const calcularTiempoRestante = () => {
      const ahora = new Date();
      const fechaDestino = new Date(a);
      const diferenciaMs = fechaDestino - ahora;

      if (diferenciaMs <= 0) {
        setshow(false);
        return "La fecha ya ha pasado";
      }

      const segundosTotales = Math.floor(diferenciaMs / 1000);
      const minutosTotales = Math.floor(segundosTotales / 60);
      const horasTotales = Math.floor(minutosTotales / 60);
      const diasTotales = Math.floor(horasTotales / 24);
      const añosTotales = Math.floor(diasTotales / 365);

      const segundos = segundosTotales % 60;
      const minutos = minutosTotales % 60;
      const horas = horasTotales % 24;
      const dias = diasTotales % 365;

      if (diasTotales > 365) {
        // Más de 1 año
        return `Falta ${añosTotales} años y ${dias} días`;
      } else if (horasTotales > 48) {
        // Más de 48 horas (2+ días)
        return `Falta ${diasTotales} día(s) y ${horas} hora(s)`;
      } else if (horasTotales > 24) {
        // Entre 24 y 48 horas (1-2 días)
        return `Falta 1 día, ${horas} hora(s) y ${minutos} minuto(s)`;
      } else {
        // Menos de 24 horas
        return `${horasTotales}:${minutos
          .toString()
          .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
      }
    };

    return <>{calcularTiempoRestante()}</>;
  };
  if (!show) return;
  if (hidden) return <>El tiempo de este contador ya pasó</>;
  if (mini)
    return (
      <>
        <Alert
          className="cursor-pointer hover:bg-zinc-900 transition-all"
          onClick={() => setfixedCount({ name: data.name, date: data.endDate })}
          endContent={<PingedIcon />}
          hideIcon
          color="default"
          description={logicaComponenteDia(finish)}
          title={data.name}
          variant="faded"
        />
        {/* <div className="">
          <p className="text-left text-gray-200 font-medium">{data.name}</p>
        </div>

        <p> {}</p> */}
      </>
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
