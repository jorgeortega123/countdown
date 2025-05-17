import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCountDownsByUser,
  usuarioProps,
  verifyUserGetToken,
} from "../db/functions";

export const UserContext = createContext({});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reloadCounts, setReloadCounts] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [user, setUser] = useState<usuarioProps>();

  useEffect(() => {
    logicaDeCarga();
  }, []);
  const userCountDowns = async (): Promise<any[] | undefined> => {
    const res = await getCountDownsByUser();
    if (!res.success) return [];
      
     return res.data;
  };

  const logicaDeCarga = async () => {
    const res = await verifyUserGetToken();
    if (res == null) return;
    setUser(res);
    setisLogin(true);
  };

  const reloadData = () => {
    logicaDeCarga();
  };

  return (
    <UserContext.Provider
      value={{
        isLogin: isLogin,
        user: user,
        reloadData: reloadData,
        reloadCounts: reloadCounts,
        userCountDowns: userCountDowns,
        setReloadCounts: setReloadCounts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
