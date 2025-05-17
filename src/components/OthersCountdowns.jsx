import dayjs from "dayjs";
import React, { useEffect } from "react";
import events from "../../events";
import Countdown from "../../src/Countdown";
import usePingedCountDown from "../../context/UsePingedCountDown";
export default function OthersCountdowns({ setreloadCount, reloadCount }) {
  const { fixedCount, setfixedCount } = usePingedCountDown();
  useEffect(() => {
    var userCounts = JSON.parse(localStorage.getItem("counts"));
    if (!userCounts) {
      console.log("notihng");
      return;
    }
    console.log(events);
    for (let x = 0; x < userCounts.length; x++) {
      console.log(userCounts[x]);
      events[events.length - 1].dates.push(userCounts[x]);
      console.log(userCounts[x]);
    }
  }, [reloadCount]);

  const color = ["#f708ff", "#08c5ff", "#09e12f", "#09e1ff"];
  const anchorCount = (segment, count) => {
    console.log(segment, count);
    localStorage.setItem("anchor", JSON.stringify(count));

    setfixedCount(count);
    setreloadCount(!reloadCount);
  };
  return (
    <div>
      {events.map((data, index) => (
        <div
          key={"coutndown-container" + index}
          className={`ml-[-8px] my-3 px-3 py-4  border-l-[2px] border-[${color[index]}]`}
        >
          <div className="h-[42px]">
            <div className="relative z-[0] w-max">
              <div
                className={`border absolute bottom-[-6px] left-[-11px]  border-[${color[index]}] `}
              ></div>
              <span className="capitalize ">{data.title}</span>
            </div>
          </div>
          <div className="grid other-counts-component grid-cols-2 sm:grid-cols-2 gap-3">
            {data.dates.map((e, indexx) => {
              var init_date = dayjs();
              var finish_date = dayjs(dayjs(e.date).$d);
              if (init_date.isAfter(finish_date)) {
                return <></>;
              }
              return (
                <>
                  {e.init ? (
                    <Countdown
                      init_data={e.init}
                      init={true}
                      finish={e.date}
                      mini={true}
                      showLines={false}
                      data={e}
                    />
                  ) : (
                    <Countdown
                      data={e}
                      finish={e.date}
                      mini={true}
                      showLines={false}
                    />
                  )}
                </>
                // <div
                //   key={"coutndown" + indexx}
                //   onClick={() => anchorCount(data, e)}
                //   title="anchor"
                //   id="father-anim"
                //   className={`mx-auto relative overflow-hidden text-center border-component-etc border rounded-[10px] border-gray-800 px-1 w-full hover:border-[${
                //     color[index] + "91"
                //   }]`}
                // >
                //   <div
                //     id="child-anim"
                //     className={` absolute invisible h-full flex items-center justify-center capitalize text-[${color[index]}] left-0`}
                //   >
                //     <svg
                //       xmlns="http://www.w3.org/2000/svg"
                //       viewBox="0 0 46 46"
                //       height="26"
                //       width="26"
                //       fill={`${color[index]}`}
                //     >
                //       <path d="M24 44q-3.3 0-6.525-1.2-3.225-1.2-5.775-3.15-2.55-1.95-4.125-4.4Q6 32.8 6 30.25v-5l6.75 5.05-2.9 2.9q1.55 2.9 5.3 5.175T22.5 40.9V21.5H16v-3h6.5v-3.7q-1.9-.7-2.95-2.1-1.05-1.4-1.05-3.2 0-2.3 1.625-3.9T24 4q2.3 0 3.9 1.6t1.6 3.9q0 1.8-1.05 3.2-1.05 1.4-2.95 2.1v3.7H32v3h-6.5v19.4q3.6-.25 7.35-2.525 3.75-2.275 5.3-5.175l-2.9-2.9L42 25.25v5q0 2.55-1.575 5t-4.125 4.4q-2.55 1.95-5.775 3.15Q27.3 44 24 44Zm0-32q1.05 0 1.775-.75.725-.75.725-1.75 0-1.05-.725-1.775Q25.05 7 24 7q-1 0-1.75.725T21.5 9.5q0 1 .75 1.75T24 12Z" />
                //     </svg>
                //   </div>

                // </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
