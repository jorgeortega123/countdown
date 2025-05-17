import { useForm, Controller } from "react-hook-form";
import { addToast, Button, DatePicker, Input } from "@heroui/react";
import {
  now,
  getLocalTimeZone,
  parseDate,
  toCalendarDateTime,
} from "@internationalized/date";
import { createCountDownByUser } from "../../db/functions";
import usePingedCountDown from "../../context/UsePingedCountDown";
import { formatoTipadoFecha, FormValues } from "../../interface/date";
import useCountDown from "../../hooks/useCountDown";
import useUser from "../../context/useUser";

export default function AddCountDown3({
  onOpenChange,
}: {
  onOpenChange: () => void;
}) {
  const { setReloadCounts, reloadCounts } = useUser();
  const { setfixedCount } = usePingedCountDown();
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      startDate: now(getLocalTimeZone()),
      name: "",
      endDate: now(getLocalTimeZone()).add({ days: 1 }),
    },
  });
  const { addCountDown } = useCountDown();

  const onSubmit = async (data: FormValues) => {
    addCountDown({ data: data, onOpenChange: onOpenChange });
    setfixedCount({
      date: toCalendarDateTime(data.endDate).toString(),
      name: data.name,
    });
    setReloadCounts(!reloadCounts);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl mx-auto flex flex-col gap-6"
    >
      <div className=" input-container rounded-xl border-[#3f3f46] hover:border-gray-500 flex flex-col border-2  relative p-[3px]">
        <p className="text-[1rem] top-[-2px] absolute  px-2 pt-1">
          Nombre <span className="text-red-500">*</span>
        </p>
        {/* <Input
          label="Email"
          placeholder="Enter your email"
          size={"lg"}
          type="email"
          className={`h-[40px] mt-[15px] px-2 ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="Ej: Cumpleaños de Juan"
          {...register("name", {
            required: "El nombre del evento es obligatorio",
            minLength: {
              value: 3,
              message: "Mínimo 3 caracteres",
            },
          })}
        /> */}
        <input
          {...register("name", {
            required: "El nombre del evento es obligatorio",
            minLength: {
              value: 3,
              message: "Mínimo 3 caracteres",
            },
          })}
          className={`h-[40px]  mt-[15px] px-2 ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="Ej: Cumpleaños de Juan"
        />
        {errors.name && (
          <p className="text-red-500 text-sm px-3 ">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/*       
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "Fecha de inicio es requerida" }}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              label="Fecha de inicio"
              variant="bordered"
              hideTimeZone
              showMonthAndYearPickers
            />
          )}
        /> */}

        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "Fecha final es requerida",
            validate: (endDate) => {
              const startDate = watch("startDate");
              const comparison = endDate.compare(startDate);

              if (comparison === 0) {
                return "Las fechas no pueden ser iguales";
              }
              if (comparison < 0) {
                return "La fecha final debe ser posterior a la fecha de inicio";
              }
              return true; // Válido
            },
          }}
          render={({ field, fieldState }) => (
            <div>
              <DatePicker
                size="lg"
                {...field}
                label="Fecha final"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      <Button
        color="secondary"
        type="submit"
        className="px-6 py-2 text-zinc-50"
        disabled={!!errors.endDate}
      >
        Agregar
      </Button>
    </form>
  );
}
