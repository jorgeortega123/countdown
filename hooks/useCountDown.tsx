import React from "react";
import { formatoTipadoFecha, FormValues } from "../interface/date";
import { createCountDownByUser } from "../db/functions";
import { addToast } from "@heroui/react";
import usePingedCountDown from "../context/UsePingedCountDown";
import {
  now,
  getLocalTimeZone,
  parseDate,
  toCalendarDateTime,
} from "@internationalized/date";
export default function useCountDown() {
  // const { fixedCount, setfixedCount } = usePingedCountDown();
  const addCountDown = async ({
    data,
    onOpenChange,
  }: {
    data: FormValues;
    onOpenChange?: () => void;
  }) => {
    if (!data.endDate || !data.startDate) {
      console.error("Error: Fechas no definidas");
      return;
    }

    if (data.endDate.compare(data.startDate) <= 0) {
      console.error("Error: La fecha final es anterior a la de inicio");
      return;
    }
    const result = await createCountDownByUser({
      nameCountDown: data.name,
      startDate: toCalendarDateTime(data.startDate).toString(),
      endDate: toCalendarDateTime(data.endDate).toString(),
    });
    if (!result.success) {
      addToast({
        color: "warning",
        title: "Se agregó el contador de manera local",
        description: "Inicia sesión para guardarlo en la nube",
        promise: new Promise((resolve) => setTimeout(resolve, 100)),
      });
      return;
    }
    // setfixedCount({
    //   date: toCalendarDateTime(data.endDate).toString(),
    //   name: data.name.toString(),
    // });
    const sr = toCalendarDateTime(data.endDate).toString();
    const fechaFinalFormateada = new Date(sr);
    const fechaFinalFormateadaa = fechaFinalFormateada.toLocaleDateString(
      "es-ES",
      formatoTipadoFecha
    );
    addToast({
      color: "success",
      title: "Contador agregado ",
      description: `Terminará el ${fechaFinalFormateadaa}`,
      promise: new Promise((resolve) => setTimeout(resolve, 1000)),
    });
    onOpenChange?.();
    console.log("Válido:", {
      start: data.startDate.toString(),
      end: data.endDate.toString(),
    });
  };

  return {
    addCountDown,
  };
}
