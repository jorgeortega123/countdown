import { toCalendarDateTime } from "@internationalized/date";
import { formatoTipadoFecha } from "../interface/date";

export const fechaFormateada = (data: any) => {
  console.log(data);
  try {
    // alert(data);
    // 1. Convertir a CalendarDateTime
    const calendarDateTime = toCalendarDateTime(data).toString();

    // 2. Obtener el Date object directamente si es posible
    // (dependiendo de lo que devuelva toCalendarDateTime)
    const fechaObj = new Date(calendarDateTime);

    // 3. Formatear según configuración
    return fechaObj.toLocaleDateString("es-ES", formatoTipadoFecha);
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return "Fecha inválida";
  }
};
