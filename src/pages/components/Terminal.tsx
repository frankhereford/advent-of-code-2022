import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

interface Props {
  content: string
  speed?: number
}

function getNewText (printed: string, content: string) {
  // eslint-disable-next-line no-useless-escape
  // ! 💀 You have to work around `.` not matching newlines...
  // ! JavaScript ... you are a mess.
  const pattern = `^${printed}([\\s\\S]*)`
  const regex = new RegExp(pattern)
  const results = regex.exec(content)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return results![0]
}

export default function Terminal (props: Props) {
  const [isShown, setIsShown] = useState(true)

  const [printed, setPrinted] = useState('')
  const [toPrint, setToPrint] = useState('')
  const [shownContent, setShownContent] = useState<string[]>([])

  const [delay] = useState(150)
  const [isPlaying, setIsPlaying] = useState(false)

  useInterval(
    () => {
      console.log('tick')
    },
    isPlaying ? delay : null
  )

  useEffect(() => {
    const newText = getNewText(printed, props.content)
    console.log('newText: ', newText)

    if (newText[0] == null) return

    setToPrint(newText[0])
  }, [printed, props.content])

  function close () {
    setIsShown(false)
  }

  const backgroundColor = 'bg-[#000000bb]'

  return (
    <>
      {isShown && (
        <div className="z-[40] absolute top-[5%] right-[5%] w-[70%] mx-auto  drop-shadow-[10px_10px_15px_rgba(0,0,0,0.5)] ">
          <div className={'w-full shadow-2xl subpixel-antialiased rounded h-[70vh] ' + backgroundColor + ' border-black mx-auto'}>
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
            <div className={'pl-1 pt-1 h-auto  text-green-200 font-mono text-xs '} id="console">
              {shownContent.map((line, index) => (
                <p key={index} className="pb-1">{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
