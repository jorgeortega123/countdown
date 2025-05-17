//@ts-ignore
import Parse from "parse/dist/parse.min.js";
import { customAlphabet } from "nanoid";
import dayjs from "dayjs";
import useUser from "../context/useUser";
import { addToast } from "@heroui/react";
import { toCalendarDateTime } from "@internationalized/date";
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = process.env.NEXT_PUBLIC_APPLICATION_ID;
const PARSE_HOST_URL = "https://parseapi.back4app.com";
const PARSE_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_JS_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const verifyUserFromCache = async (): Promise<usuarioProps | null> => {
  const tokenCache = localStorage.getItem("token");
  if (!tokenCache) {
    return null;
  } else {
    // return await verifyUserFromDb(tokenCache);
    return { userId: tokenCache };
  }
};

export interface countDownProps {
  startDate: string;
  endDate: string;
  nameCountDown: string;
  createdBy?: string;
}

export interface promiseProps {
  success: boolean;
  message: string;
}
export interface usuarioProps {
  name?: string;
  email?: string;
  defaultPassword?: string;
  userId: string;
}
export const verifyUserGetToken = async (): Promise<usuarioProps | null> => {
  const tokenFromLocal = localStorage.getItem("token");
  if (!tokenFromLocal) {
    return null;
  }

  try {
    const query = new Parse.Query("usuarios");
    query.equalTo("userId", tokenFromLocal);
    const results = await query.find();

    if (results.length > 0) {
      const user = results[0]; // Tomamos el primer resultado
      console.log(user);
      return {
        userId: user.get("userId"),
        defaultPassword: user.get("defaultPassword"),
        email: user.get("email"),
        name: user.get("name"),
      };
    }
    return null;
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
};
const verifyUserFromDb = async (
  token: string
): Promise<usuarioProps | null> => {
  try {
    const query = new Parse.Query("usuarios");
    query.equalTo("userId", token);
    const results = await query.find();
    if (results.id) {
      return {
        userId: token,
      };
    }
    return null;
  } catch (error: Parse.Error) {
    console.log(
      "Error al buscar el usuario: " + error.code + " " + error.message
    );
    localStorage.setItem("token", "");
    return null;
  }
};
export const createUser = async (userData: {
  email: string;
  name: string;
  password: string;
}): Promise<{ success: boolean; message: string }> => {
  const responses = await verifyUserFromCache();
  if (responses != null) {
    return {
      success: false,
      message: "Usuario ya verificado",
    };
  }
  // const countDowns = new Parse.Query("conteos");
  //   countDowns.equalTo("createdBy", user.userId);
  const verifyUser = new Parse.Query("usuarios");
  verifyUser.equalTo("email", userData.email);
  const user = await verifyUser.first();
  if (user) {
    // alert(user.get("userId"));
    const token = user.get("userId");
    localStorage.setItem("token", token);
    return { success: true, message: `Bienvenido ${user.get("name")}` };
  }

  const newUser = new Parse.Object("usuarios");
  const nanoid = customAlphabet("1234567890abcdef", 6);
  const tokenUser = nanoid();
  newUser.set("userId", tokenUser);
  newUser.set("email", userData.email);
  newUser.set("name", userData.name);
  newUser.set("defaultPassword", userData.password);

  try {
    const result = await newUser.save();
    console.log("New object created with objectId: " + result.id);
    localStorage.setItem("token", tokenUser);
    return {
      success: true,
      message: "Usuario creado correctamente",
    };
  } catch (error: any) {
    console.error(
      "Failed to create new object, with error code: " + error.message
    );
    return {
      success: false,
      message: `Error al crear el usuario: ${error.message}`,
    };
  }
};

export const getCountDownsByUser = async () => {
  const user = await verifyUserFromCache();
  if (user == null)
    return {
      success: false,
      message: "Error con la autenticación del usuario",
    };
  try {
    const arr = [];
    const countDowns = new Parse.Query("conteos");
    countDowns.equalTo("createdBy", user.userId);
    const results = await countDowns.find();
    for (const object of results) {
      arr.push({
        startDate: object.get("startDate"),
        endDate: object.get("endDate"),
        name: object.get("nameCountDown"),
      });
    }
    return {
      success: true,
      message: "Datos obtenidos",
      data: arr,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener datos del usuario",
    };
  }
};

export const createCountDownByUser = async (
  userData: countDownProps
): Promise<promiseProps> => {
  const { startDate, createdBy, endDate, nameCountDown } = userData;
  const user = await verifyUserFromCache();
  if (user == null)
    return {
      success: false,
      message: "Error con la autenticación del usuario",
    };

  try {
    const newCountDown = new Parse.Object("conteos");
    newCountDown.set("nameCountDown", nameCountDown);
    newCountDown.set("startDate", startDate);
    newCountDown.set("endDate", endDate);
    newCountDown.set("createdBy", user.userId);
    // newCountDown.set("nameCountDown", nameCountDown);
    // newCountDown.set("startDate", new Date(startDate));
    // newCountDown.set("endDate", new Date(endDate));
    // newCountDown.set("createdBy", user.userId);
    await newCountDown.save();
    return {
      success: true,
      message: "Se creo el countdown" + newCountDown.id,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "InValido" + error,
    };
  }
};

export const fetchSegment = async (): Promise<any> => {
  const tokenCache = localStorage.getItem("token");
  var res = await verifyUserFromCache();
  if (res) {
    try {
      const query = new Parse.Query("counts");
      query.equalTo("userId", tokenCache);
      const results = await query.find();
      console.log(results);
      return results;
    } catch (error: Parse.Error) {
      console.log("Error al obtener usuarios:", error);
      return false;
    }
  } else {
    console.log("Token de usuario no se encontró en DB");
    return null;
  }
};

export const updateSegment = async ({
  idSegment,
  current,
}: {
  idSegment: string;
  current: number;
}): Promise<void> => {
  if (await verifyUserFromCache()) {
    const tokenCache = localStorage.getItem("token");
    const userDb = new Parse.Query("counts");
    const fecha = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    try {
      var segmentEdit = await userDb.get(idSegment);
      segmentEdit.set("objectId", idSegment);
      const current = parseInt(segmentEdit.get("currentNumber"));
      const newCurrent = current + 1;
      segmentEdit.set("updateTimerAt", fecha);
      segmentEdit.set("currentNumber", newCurrent);
      let result = await segmentEdit.save();
      console.log("New object created with objectId: " + result.id);
    } catch (error: Parse.Error) {
      alert("Failed to create new object, with error code: " + error.message);
    }
  } else {
    alert("Token de usuario no se encontro en DB");
  }
};

export const fetchObjectById = async (objectId: string): Promise<any> => {
  var res = await verifyUserFromCache();
  if (res) {
    try {
      const query = new Parse.Query("counts");
      const object = await query.get(objectId);
      const values = object.toJSON();
      console.log("Valores del objeto:", values);
      return values;
    } catch (error: Parse.Error) {
      console.log("Error al obtener el objeto:", error);
    }
  } else {
    console.log("Token de usuario no se encontro en DB");
  }
};

export const closeLog = () => {
  localStorage.setItem("token", "");
  addToast({
    color: "success",
    title: "Se cerró la sesión ",
    description: "Vuelve pronto!",
    promise: new Promise((resolve) => setTimeout(resolve, 800)),
  });
};

export const updateUserNameById = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<boolean> => {
  const tokenCache = localStorage.getItem("token");
  const query = new Parse.Query("users");
  query.equalTo("userId", tokenCache);

  try {
    const user = await query.first();
    if (user) {
      user.set("email", data.email);
      user.set("password", data.password);
      user.set("name", data.name);
      user.set("isVerified", true);
      await user.save();
      console.log("Nombre actualizado correctamente");
      return true;
    } else {
      console.log("Usuario no encontrado");
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar el nombre del usuario:", error);
    return false;
  }
};

export const loginByEmail = async (
  email: string,
  pass: string
): Promise<boolean> => {
  var onError = false;
  var userId = null;
  const query = new Parse.Query("users");
  query.equalTo("email", email);

  try {
    const user = await query.first();
    if (user) {
      var password = user.get("password");
      userId = user.get("userId");
      if (pass != password) onError = true;
      localStorage.setItem("token", userId);
      console.log("Usuario encontrado");
      onError = false;
    } else {
      console.log("Usuario no encontrado");
      onError = true;
    }
  } catch (error) {
    console.error("Error al actualizar el nombre del usuario:", error);
    onError = true;
  }

  console.log(onError, userId);
  return onError;
};

export const getUserDataById = async (): Promise<any> => {
  const tokenCache = localStorage.getItem("token");
  if (!tokenCache) return null;
  const query = new Parse.Query("users");

  try {
    query.equalTo("userId", tokenCache);
    const user = await query.first();
    if (user) {
      const userData = {
        name: user.get("name"),
        email: user.get("email"),
        verified: user.get("isVerified"),
        password: user.get("password"),
      };
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar los datos del usuario:", error);
    return null;
  }
};
