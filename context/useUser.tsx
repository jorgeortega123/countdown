import { useContext } from "react";
import { PingedCountDownContext } from "./PingedCountDown";
import { getCountDownsByUser, usuarioProps } from "../db/functions";
import { UserContext } from "./UserContext";

interface PropsUserCount {
  name: string;
  date: string;
}

interface useUserProps {
  isLogin: boolean;
  user: usuarioProps;
  reloadData: () => void;
  reloadCounts: any;
  setReloadCounts: any;
  userCountDowns: () => PropsUserCount[];
}

export default function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Falta contexto Provider");
  }
  const { isLogin, user, reloadData, setReloadCounts, reloadCounts, userCountDowns } =
    context as useUserProps;

  return {
    isLogin,
    user,
    reloadCounts,
    reloadData,
    setReloadCounts,
    userCountDowns,
  };
}
