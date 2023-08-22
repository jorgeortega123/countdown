
import React, { createContext, useState, useContext, useEffect } from "react";

interface UserProps {
  name?: string;
  email?: string;
  password?: string;
  verified?: boolean;
}

interface MainContextProps {
  isLogin: boolean;
  setisLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setsuccessLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setmustReloadUser: React.Dispatch<React.SetStateAction<boolean>>;
  successLogin: boolean;
  mustReloadUser: boolean;
  userInfo: UserProps;
  isLoaded: boolean;
  logOut: () => void;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const useMainContext = (): MainContextProps => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a FormProvider");
  }
  return context;
};

export const MainProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isLoaded, setisLoaded] = useState(false);
  const [isLogin, setisLogin] = useState<boolean>(false);
  const [successLogin, setsuccessLogin] = useState(false);
  const [mustReloadUser, setmustReloadUser] = useState(false);
  const [userInfo, setuserInfo] = useState<UserProps>({
    name: "",
    email: "",
    password: "",
    verified: false,
  });
  // const { message } = useMessage();

  const logOut = () => {};

  return (
    <MainContext.Provider
      value={{
        isLogin,
        setisLogin,
        successLogin,
        setsuccessLogin,
        setmustReloadUser,
        mustReloadUser,
        userInfo,
        logOut,
        isLoaded,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
