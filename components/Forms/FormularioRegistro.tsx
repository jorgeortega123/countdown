import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../../db/functions";
import { addToast, Button } from "@heroui/react";
import useUser from "../../context/useUser";

type FormData = {
  email: string;
  name: string;
  password: string;
};

export const FormularioRegistro = ({
  onOpenChange,
}: {
  onOpenChange: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { reloadData, reloadCounts, setReloadCounts } = useUser();

  const onSubmit = async (data: FormData) => {
    const success = await createUser(data);
    if (success.success) {
      addToast({
        color: "success",
        title: `Bienvenido ${data?.name?.split(" ")?.[0]}`,
        promise: new Promise((resolve) => setTimeout(resolve, 100)),
      });
      setReloadCounts(!reloadCounts);
      reset();
      reloadData();
      onOpenChange();
    } else {
      addToast({
        color: "danger",
        title: "No se pudo completar el registro ",
        description: success.message,
        promise: new Promise((resolve) => setTimeout(resolve, 400)),
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-transparent rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-50"
          >
            Correo electrónico
          </label>
          <input
            placeholder="jorgeOrtega123@gmail.com"
            id="email"
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-zinc-700"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-50"
          >
            Nombre
          </label>
          <input
            placeholder="Jorge Ortega"
            id="name"
            type="text"
            {...register("name", {
              required: "El nombre es obligatorio",
              validate: (value: any) =>
                !/\d/.test(value) || "El nombre no debe contener números",
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-zinc-700"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-50"
          >
            Contraseña
          </label>
          <input
            placeholder="****"
            id="password"
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 5,
                message: "La contraseña debe tener al menos 5 caracteres",
              },
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-zinc-700"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          color="secondary"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Registrarse
        </Button>
      </form>
    </div>
  );
};
