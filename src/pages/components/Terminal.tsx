import { useState } from "react";

export default function Terminal() {
  const [isShown, setIsShown] = useState(true);

  function close () {
    setIsShown(false);
  }

  const date = new Date().toLocaleDateString("en-US")
  const backgroundColor = 'bg-[#000000bb]'
  return (
    <>
      {isShown && (
        <div className="z-[40] absolute top-[5%] right-[5%] w-[70%] mx-auto  drop-shadow-[10px_10px_15px_rgba(0,0,0,0.5)] ">
          <div className={"w-full shadow-2xl subpixel-antialiased rounded h-[70vh] " + backgroundColor + " border-black mx-auto"}>
            <div className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black" id="headerTerminal">
              <div className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3" id="closebtn" onClick={close}>
              </div>
              <div className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3" id="minbtn">
              </div>
              <div className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3" id="maxbtn">
              </div>
              <div className="mx-auto pr-16" id="terminaltitle">
                <p className="text-center text-sm">Terminal</p>
              </div>

            </div>
            <div className={"pl-1 pt-1 h-auto  text-green-200 font-mono text-xs "} id="console">
              <p className="pb-1">Last login: {date} on ttys002</p>
              <p className="pb-1">frank@advent-of-code $ echo &quot;$GIT_MSG $GIT_REPOSITORY&quot;</p>
              <p className="pb-1">Fork this on GitHub: <a target='_github' href='https://github.com/frankhereford/advent-of-code-2022'>https://github.com/frankhereford/advent-of-code-2022</a></p>
              <p className="pb-1">frank@advent-of-code $</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}