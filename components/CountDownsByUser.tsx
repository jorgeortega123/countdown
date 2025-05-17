import React, { useEffect, useState } from "react";
import useUser from "../context/useUser";
import Countdown from "../src/Countdown";
import { Alert } from "@heroui/react";
import IniciarSesiónDesdeContador from "./Actions/IniciarSesiónDesdeContador";
import AgregarCountDown from "./Modals/AgregarCountDown";

export default function CountDownsByUser() {
  const { isLogin } = useUser();
  const { userCountDowns, reloadCounts } = useUser();
  const [countdowns, setCountdowns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userCountDowns();
        console.log("data", data);
        setCountdowns(data || []);
      } catch (error) {
        console.error("Error fetching countdowns:", error);
        setCountdowns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reloadCounts]);

  if (loading) return <div>Cargando...</div>;
  if (!isLogin) return <IniciarSesiónDesdeContador />;
  if (countdowns.length == 0)
    return (
      <Alert
        variant="faded"
        title={"Comienza agregando un contador regresivo"}
        description={"Todos lo que agregues aparecerá aqui"}
        endContent={<AgregarCountDown />}
      >
        {" "}
      </Alert>
    );
  return (
    <div className=" p-3 flex flex-col gap-3">
      <p>
        Tus contadores{" "}
        <span className="text-zinc-100 px-3 border rounded-xl border-zinc-800">
          {countdowns.length}
        </span>
      </p>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {countdowns
          .slice()
          .reverse()
          .map((count, index) => (
            //@ts-ignore
            <Countdown
              key={index + "keyCount"}
              mini
              data={count}
              finish={count.endDate}
            />
          ))}
      </div>
    </div>
  );
}
