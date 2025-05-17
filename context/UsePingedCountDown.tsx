import { useContext } from "react";
import { PingedCountDownContext } from "./PingedCountDown";

interface CountDownContextType {
  fixedCount: { name: string; date: string };
  setfixedCount: React.Dispatch<
    React.SetStateAction<{ name: string; date: string }>
  >;
}

export default function usePingedCountDown() {
  const context = useContext(PingedCountDownContext);

  if (!context) {
    throw new Error("Falta contexto Provider");
  }

  const { fixedCount, setfixedCount } = context as CountDownContextType;

  return {
    fixedCount,
    setfixedCount,
  };
}
