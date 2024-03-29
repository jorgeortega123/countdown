import Countdown from "../src/Countdown";
import Login from "../src/components/Login";
import NavView from "../src/components/NavView";
import OthersCountdowns from "../src/components/OthersCountdowns";
import AddCountdowns from "../src/components/AddCountdowns";
import Database from "../src/components/Database";
import { useEffect, useRef, useState } from "react";
import MainScreen from "../src/components/jetMatch/MainScreen";
export default function Home() {
  const [fixedCount, setfixedCount] = useState({ name: "", date: "" });
  const [reloadCount, setreloadCount] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  const [showFullScreen, setshowFullScreen] = useState(false);
  const [rotate, setrotate] = useState(false);
  const containerScren = useRef(null);
  useEffect(() => {
    //@ts-ignore
    var local = JSON.parse(localStorage.getItem("anchor"));
    if (local) {
      setfixedCount({ name: local.name, date: local.date });
    }
    if (showFullScreen) {
      document.getElementById("full")?.requestFullscreen();
      document.body.style.overflow = "hidden";
    } else {
      // document.getElementById("full")?.exitFullscreen();
      document.getElementById("full");
      var event = new KeyboardEvent("keydown", {
        keyCode: 122,
        which: 122,
      });
      document.dispatchEvent(event);
      document.body.style.overflow = "scroll";
    }
  }, [reloadCount, showFullScreen]);

  // const enterFullscreen = () => {
  //   const element = document.documentElement;
  //   if (element.requestFullscreen) {
  //     element.requestFullscreen();
  //   } else if (element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen();
  //   } else if (element.webkitRequestFullscreen) {
  //     element.webkitRequestFullscreen();
  //   } else if (element.msRequestFullscreen) {
  //     element.msRequestFullscreen();
  //   }
  // };

  const exitFullscreen = () => {
    setshowFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    // } else if (document.mozCancelFullScreen) {
    //   document.mozCancelFullScreen();
    // } else if (document.webkitExitFullscreen) {
    //   document.webkitxitFullscreen();
    // } else if (document.msExitFullscreen) {
    //   document.msExitFullscreen();
    // }
  };
  }
  return (
    <>
      <div id="full" className="max-w-screen relative">
        {showFullScreen && (
          <div className="absolute w-full h-screen bg-[#141414] z-[7]">
            <button className="border" onClick={exitFullscreen}>
              Salir de pantalla completa
            </button>

            <div className="  h-full flex justify-center items-center z-[5]">
              <div
                onClick={() => setrotate(!rotate)}
                className="absolute bottom-0 sm:hidden"
              >
                <p>Rotar 90</p>
              </div>
              <div
                className={`relative counter-font ${
                  rotate ? "rotate-90 text-[26vw]" : " title-count "
                }  `}
              >
                <p
                  className={`absolute text-center w-full mx-auto my-auto  font-[normal] ${
                    rotate ? "text-[8vw] top-[-15vw]" : "text-[4vw] top-[-8vw] "
                  } `}
                >
                  {fixedCount.name}
                </p>
                {/* @ts-ignore */}
                <Countdown finish={fixedCount.date} />
              </div>
            </div>
          </div>
        )}

        {/* */}
        {showLogin && <Login setshowLogin={setshowLogin} />}

        <NavView setshowLogin={setshowLogin} />
        <div>
          <div className=" flex flex-col space-y-12">
            <div id="main" className="sticky top-0 z-[3]">
              <div
                id="container-fixed"
                className=" sticky top-0 rounded-[6px]  flex flex-col w-full justify-center p-[3px]   "
              >
                <div className=" main-color-background h-[40vh] z-[1]  rounded-[6px] p-2">
                  <div className=" h-full relative">
                    <div className="absolute w-full flex justify-center">
                      <p className="text-xl ">{fixedCount.name}</p>
                    </div>

                    <div className=" counter-font title-count h-full flex justify-center items-center ">
                      {/* @ts-ignore */}
                      <Countdown finish={fixedCount.date} showLines={"true"} />
                    </div>
                    <div
                      ref={containerScren}
                      onClick={() => setshowFullScreen(true)}
                      className="absolute right-[2px] bottom-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill:#fff"
                        fill="#fff"
                        height="48"
                        width="46"
                      >
                        <path d="M10 38v-9.65h3V35h6.65v3Zm0-18.35V10h9.65v3H13v6.65ZM28.35 38v-3H35v-6.65h3V38ZM35 19.65V13h-6.65v-3H38v9.65Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="othersectoin"
              className="flex flex-col justify-center items-center"
            >
              <div className="max-w-[1000px]">
                <div>
                  <Database></Database>
                </div>
                <div className="relative h-[20px]">
                  <p className=" font-bold absolute top-0 bg-[#181818] h-[24px] z-[2] px-2 w-max">
                    Another countdowns
                  </p>
                  <div className="absolute top-[10px] w-full bg-[#adadad93] h-[2px] z-[1]"></div>
                </div>
                <OthersCountdowns
                  reloadCount={reloadCount}
                  setreloadCount={setreloadCount}
                />
                <AddCountdowns
                  reloadCount={reloadCount}
                  setreloadCount={setreloadCount}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border w-full">
          {/* <MainScreen></MainScreen> */}
        </div>
        <div
          id="footer"
          className="bg-[#0909096e] w-full h-[200px] px-6 py-4 flex"
        >
          <div>
            <p className="py-2 font-bold">Countdown</p>
            <div className="">
              {" "}
              Made by <span> Jorge Ortega</span>
              <p>Another proyect to portfolio</p>
            </div>

            <p className="absolute bottom-0 left-0 px-1 text-[13px]">
              Want to see more proyects like this ?{" "}
              <a
                href="https://jorge-ortega.pages.dev/"
                target={"_blank"}
                rel="noreferrer "
                className="underline"
              >
                Click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
