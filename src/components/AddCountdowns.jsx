import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Parse from 'parse/dist/parse.min.js';
const PARSE_APPLICATION_ID = 'BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f';
const PARSE_HOST_URL = 'https://parseapi.back4app.com';
const PARSE_JAVASCRIPT_KEY = '4wPYRKbpTJeCdmFNaS31AiQZ8344aaYubk6Uo8VW';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
export default function AddCountdowns({ setreloadCount, reloadCount }) {
  const [showEmail, setshowEmail] = useState(false);
  const [currentlyEmail, setcurrentlyEmail] = useState("");
  const [showMensaje, setshowMensaje] = useState();
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
    var [year, month, day] = [
      dayjs().get("year"),
      dayjs().get("month"),
      dayjs().get("date"),
    ];
    console.log(year, month, day);
    var [hour, minute] = [d.getHours(), d.getMinutes()];
    if (month < 10) {
      if (month === 0) month = 1;
      month = `0` + month;
    }
    if (day < 10) {
      if (day === 0) day = 1;
      day = `0` + day;
    }
    if (hour < 10) {
      if (hour === 0) hour = 1;
      hour = `0` + hour;
    }
    if (minute < 10) {
      if (minute === 0) minute = 1;
      minute = `0` + minute;
    }
    const init_day = year + "-" + month + "-" + day;
    const actualHour = hour + ":" + minute;
    setinformation((prevState) => ({
      ...prevState,
      hour_init: actualHour,
      hour_finish: actualHour,
      init: init_day,
      date: init_day,
    }));
  }, []);
  // const togle = () => {
  //   setshowEmail(!showEmail);
  //   unirElementos(showEmail, "sent_email");
  // };
  // const verifyEmail = () => {
  //   var { email } = JSON.parse(localStorage.getItem("token"));
  //   if (email) {
  //     setcurrentlyEmail({ email });
  //   }
  // };
  const unirElementos = (valor, cabecera) => {
    setinformation((prevState) => ({ ...prevState, [cabecera]: valor }));
  };
  const addButton = () => {
    var cache = JSON.parse(localStorage.getItem("counts"));
    var { name, date, hour_finish, init, hour_init } = information;
    //     date = date
    // init = init
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
    // if (cache) {
    //   cache.push(information);
    //   localStorage.setItem("counts", JSON.stringify(cache));
    // } else {
    //   localStorage.setItem("counts", JSON.stringify([information]));
    // }
    // setshowMensaje("Added success");
    // setreloadCount(!reloadCount);
    
    const dataBaseSave = async() => {
      //verify user
      let user = "jorge593s"
      const query = new Parse.Query('users');
      query.equalTo('userId', user);
      const infoUser = await query.first()
      // setshowMensaje(infoUser);
      if (infoUser === undefined || infoUser === "") { 
        setshowMensaje("User not found")
      } else { 
        setshowMensaje(infoUser.get('userName'))
      }
      
    };
    dataBaseSave()
  };

  return (
    <div id="addcount" className=" p-2 rounded-[6px]  text-white">
      <p className="font-bold">
        Agregar
        <span className="font-normal text-red-500 px-4">{showMensaje}</span>
      </p>
      <div className="my-2 input-container flex flex-col border relative p-[3px]">
        <p className="text-[1rem] top-[-2px] absolute text-above-forms pl-1 pt-1">
          Name of countdown
        </p>
        <input
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
            Start
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
          <p className="text-[1rem] absolute text-above-forms pl-1 pt-1">End</p>
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
      <div
        onClick={() => addButton()}
        className="mx-auto w-full text-center mt-4 "
      >
        <p className="w-full border-[1px] rounded-[6px] py-2 button-form border my-3 rounded-[6px]">
          Add countdown
        </p>
      </div>
      {/* <div className="overflow-hidden">
        <div className="relative flex p-[5px] cursor-pointer">
          <input onChange={() => togle()} className="" type="checkbox" />
          <label className="mt-[7px] px-2" htmlFor="accordion-email">
            Enviar por correo
          </label>
        </div>
        {showEmail && (
          <div v-if="show===true" className="container-email-input my-2 ">
            <p className="text-above-forms">
              Notificar por correo o por mensaje
            </p>
            <input
              className="input-container mr-2  p-2 border"
              type="email"
              onChange={(e) => {
                setcurrentlyEmail(e.target.value);
              }}
              placeholder="example@gmail.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              title="Invalid email address"
              defaultValue={currentlyEmail}
            />
          </div>
        )}
      </div> */}
    </div>
  );
}
