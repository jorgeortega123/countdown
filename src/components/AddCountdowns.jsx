import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Parse from "parse/dist/parse.min.js";

export default function AddCountdowns({ setreloadCount, reloadCount }) {
  const [showEmail, setshowEmail] = useState(false);
  const [currentlyEmail, setcurrentlyEmail] = useState("");
  const [showMensaje, setshowMensaje] = useState("");
  const [information, setinformation] = useState({
    email: "",
    name: "",
    init: "",
    hour_init: "",
    date: "",
    hour_finish: "",
    sent_email: false,
  });

  useEffect(() => {
    const d = new Date();
    const year = dayjs().get("year");
    let month = dayjs().get("month");
    let day = dayjs().get("date");

    if (month < 10) {
      if (month === 0) month = 1;
      month = `0${month}`;
    }

    if (day < 10) {
      if (day === 0) day = 1;
      day = `0${day}`;
    }

    let hour = d.getHours();
    let minute = d.getMinutes();

    if (hour < 10) {
      if (hour === 0) hour = 1;
      hour = `0${hour}`;
    }

    if (minute < 10) {
      if (minute === 0) minute = 1;
      minute = `0${minute}`;
    }

    const init_day = `${year}-${month}-${day}`;
    const actualHour = `${hour}:${minute}`;

    setinformation((prevState) => ({
      ...prevState,
      hour_init: actualHour,
      hour_finish: actualHour,
      init: init_day,
      date: init_day,
    }));
  }, []);

  const unirElementos = (valor, cabecera) => {
    setinformation((prevState) => ({ ...prevState, [cabecera]: valor }));
  };

  const addButton = (event) => {
    event.preventDefault();

    var cache = JSON.parse(localStorage.getItem("counts"));
    var { name, date, hour_finish, init, hour_init } = information;

    date = date + " " + hour_finish;
    init = init + " " + hour_init;
    information.date = date;
    information.init = init;

    if (date === "" || date === undefined) {
      setshowMensaje("Specify end of date");
      return;
    } else if (name === "") {
      setshowMensaje("Name missing");
      return;
    }

    const dataBaseSave = async () => {
      let user = "jorge593";
      const query = new Parse.Query("users");
      query.equalTo("userId", user);
      const infoUser = await query.first();

      if (infoUser === undefined || infoUser === "") {
        setshowMensaje("User not found");
      } else {
        setshowMensaje(infoUser.get("userName"));
      }
    };

    dataBaseSave();
  };

  const agregarCountdown = (event) => {
    event.preventDefault();
    var { name, date, hour_finish, init, hour_init } = information;
  };

  return (
    <form className=" px-2 sm:px-0" onSubmit={addButton}>
      <div className="text-[14px] bg-gray-800 border-gray-950 rounded-[6px] text-white p-2">
        <p className="font-bold">
          Agregar un evento personalizado
          <span className="font-normal text-red-500 px-4">{showMensaje}</span>
        </p>
        <div className="my-2 input-container flex flex-col border relative p-[3px]">
          <p className="text-[1rem] top-[-2px] absolute text-above-forms pl-1 pt-1">
            Nombre
          </p>
          <input
            required
            onChange={(e) => {
              unirElementos(e.target.value, "name");
            }}
            className="h-[40px] mt-[15px] px-2"
            placeholder="123"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 my-2 ">
          <div className=" input-container flex flex-col border relative p-[3px]">
            <p className="text-[1rem] absolute text-above-forms pl-1 pt-1">
              Inicio (Opcional)
            </p>
            <input
              onChange={(e) => {
                unirElementos(e.target.value, "init");
              }}
              className="h-[40px] mt-[22px] px-2"
              type="date"
              placeholder="12/12/2012"
              defaultValue={information.init}
            />
          </div>
          <div className="input-container flex flex-col border relative p-[3px]">
            <p className="text-[1rem] absolute text-above-forms pl-1 pt-1">
              Final
            </p>
            <input
              onChange={(e) => {
                unirElementos(e.target.value, "date");
              }}
              className="h-[40px] mt-[22px] px-2"
              type="date"
              placeholder="12/12/2012"
              defaultValue={information.init}
            />
          </div>
          <div className="flex justify-center ">
            <p className="px-1">Hour:</p>
            <input
              onChange={(e) => {
                unirElementos(e.target.value, "hour_init");
              }}
              type="time"
              className="border-[1px] rounded-[6px] px-1 border-[#2c2c2cf6] hover:border-[#fff]"
              defaultValue={information.hour_init}
              name=""
              id=""
            />
          </div>
          <div className="flex justify-center">
            <p className="px-1">Hour:</p>
            <input
              onChange={(e) => {
                unirElementos(e.target.value, "hour_finish");
              }}
              type="time"
              className="border-[1px] rounded-[6px] px-1 border-[#2c2c2cf6] hover:border-[#fff]"
              defaultValue={information.hour_finish}
              name=""
              id=""
            />
          </div>
        </div>
        <div className="mx-auto w-full text-center mt-4 ">
          <button
            type="submit"
            className="w-full border-[1px] rounded-[6px] py-2 button-form border my-3 rounded-[6px]"
          >
            Add countdown
          </button>
        </div>
      </div>
    </form>
  );
}
