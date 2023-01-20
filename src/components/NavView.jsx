import React from "react";

export default function NavView({setshowLogin}) {
  return (
    <div>
      <div className="border-b-[1px] border-[#414141c7] h-[52px] items-center flex justify-between">
        <div className="relative flex items-center mb-[-4px]">
          <p className="font-bold text-[1.2rem] px-2">Countdown</p>
          <div className="ml-[1rem] flex space-x-3 text-[.9rem]">
            <a href="#addcount">Agregar</a>
          </div>
        </div>
        <p className="pr-3">  Log in</p>
        {/* <p onClick={()=>setshowLogin(true)} className="pr-3">Log in</p> */}
        {/* <div class="nav-button-burguer relative flex flex-col space-y-2">
        <span id="nav-1-button" class="nav-button "></span>
        <span id="nav-2-button" class="nav-button"></span>
        <span id="nav-3-button" class="nav-button"></span>
    </div>  */}
      </div>
    </div>
  );
}
