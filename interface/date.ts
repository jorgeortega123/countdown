export const formatoTipadoFecha: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export type FormValues = {
  startDate?: any; // O usa el tipo específico de Hero UI si lo conoces
  endDate: any;
  name: string;
};
