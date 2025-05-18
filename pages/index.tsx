import Countdown from "../src/Countdown";
import NavView from "../src/components/NavView";
import OthersCountdowns from "../src/components/OthersCountdowns";
import { useEffect, useRef, useState } from "react";
import usePingedCountDown from "../context/UsePingedCountDown";
import AgregarCountDown from "../components/Modals/AgregarCountDown";
import QuickAddCountDown from "../components/QuickAddCountDown";
import CountDownsByUser from "../components/CountDownsByUser";

export default function Home() {
  const { fixedCount, setfixedCount } = usePingedCountDown();
  const [reloadCount, setreloadCount] = useState(false);
  const [showFullScreen, setshowFullScreen] = useState(false);
  const [rotate, setrotate] = useState(false);
  const containerScren = useRef(null);
  const currentDate: Date = new Date();

  const fullYear: number = currentDate.getFullYear();

  useEffect(() => {
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

  const exitFullscreen = () => {
    setshowFullScreen(false);
    if (document.exitFullscreen) {
      try {
        document.exitFullscreen();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div id="full" className="max-w-screen  relative px">
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
                <Countdown fixed data={fixedCount} finish={fixedCount.date} />
              </div>
            </div>
          </div>
        )}

        {/* */}

        <NavView />
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
                      <Countdown data={fixedCount} finish={fixedCount.date} />
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
              className="flex gap-3 flex-col justify-center items-center"
            >
              <div className="max-w-[1000px] flex gap-3 flex-col">
                <QuickAddCountDown />
                {/* <div>
                    <Database></Database>
                  </div> */}

                <CountDownsByUser />

                <OthersCountdowns
                  reloadCount={reloadCount}
                  setreloadCount={setreloadCount}
                />
                {/* <AddCountdowns
                  reloadCount={reloadCount}
                  setreloadCount={setreloadCount}
                />  */}
                <AgregarCountDown />
              </div>
            </div>
          </div>
        </div>
        <div className="border w-full lg:w-[60%] mx-auto mt-8 mb-2">
          {/* <MainScreen></MainScreen> */}
        </div>
        <footer className=" h-[200px] w-full mx-auto items-center justify-center px-6 py-4 flex">
          <div className="text-[1.3rem]">
            © Copyright {fullYear}. Hecho por{" "}
            <a
              rel="noreferrer"
              target="_blank"
              className="underline"
              href="https://jorgeortega.vercel.app/"
            >
              Jorge Ortega
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
