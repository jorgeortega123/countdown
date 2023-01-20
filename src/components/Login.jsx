import React from "react";

export default function Login({setshowLogin}) {

  
  return (
    <>
      <div
        className="absolute w-full h-screen bg-[#14141498] z-[4] flex items-center justify-center"
      >
        <div onClick={()=>setshowLogin(false)} className="absolute w-full h-screen bg-transparent z-[-1]"></div>
        <div className="relative main-login-container w-[270px] min-h-[500px] bg-[#141414fb] border-[1px] border-[#0a7fdff6]">
          <p  onClick={()=>setshowLogin(false)} className="absolute right-0 p-2 px-3 text-red-700">X</p>
          <p className="text-center py-2 font-bold">Log in</p>
          <div className="px-7 mt-[45%]">
            <div className="container-user-login">
              <p className="text-color">User</p>
              <input
                className="max-w-full border-[1px] input-container-login"
                type="text"
              />
            </div>
          </div>
          <div className="px-7">
            <div className="container-user-login">
              <p className="text-color">Password</p>
              <input
                className="max-w-full border-[1px] input-container-login"
                type="text"
              />
            </div>
          </div>
          <div className="mx-auto w-full flex my-6">
            <button className=" border-[2px] border-[#97979767] hover:border-[#cfcfcf67] h-[26px] w-[100px]  rounded-[6px] mx-auto">
              Log in
            </button>
          </div>

          <div className="absolute bottom-0  hover:text-[#cececed5]  text-[#7e7e7ed5] text-[.9rem] text-center max-w-full rounded-[8px] px-2 mx-4 my-6 mb-9 h-9 leading-4 border-[1px] border-[#e7e7e760]">
            Create yor account to keep your countdowns everywhere
          </div>
        </div>
      </div>
    </>
  );
}
