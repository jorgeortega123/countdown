import React, { createContext, useContext, useEffect, useState } from "react";

export const PingedCountDownContext = createContext({});

export default function PingedCountDownContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fixedCount, setfixedCount] = useState({ name: "", date: "" });

  useEffect(() => {
    if (!fixedCount.name) return;
    localStorage.setItem("anchor", JSON.stringify(fixedCount));
  }, [fixedCount]);

  useEffect(() => {
    const ultimoContador = localStorage.getItem("anchor");
    if (ultimoContador) {
      var local = JSON.parse(ultimoContador);
      setfixedCount({ ...local });
    }
  }, []);

  return (
    <PingedCountDownContext.Provider
      value={{ fixedCount: fixedCount, setfixedCount: setfixedCount }}
    >
      {children}
    </PingedCountDownContext.Provider>
  );
}
