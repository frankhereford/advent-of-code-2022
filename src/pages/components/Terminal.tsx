/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import _ from 'lodash'

interface Props {
  content: string
  speed?: number
  variability?: number
}

function getNewText (printed: string, content: string) {
  // eslint-disable-next-line no-useless-escape
  let escapedPrinted = printed.replace(/\$/g, '\\$')
  escapedPrinted = escapedPrinted.replace(/'/g, '\\\'')
  const pattern = `^${escapedPrinted}([\\s\\S]*)`
  const regex = new RegExp(pattern)
  const results = regex.exec(content)
  if (results == null) { return '' }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return results[1]
}

export default function Terminal (props: Props) {
  const [isShown, setIsShown] = useState(true)

  // what is printed, as a string, not split into arrays
  const [printedContentString, setPrintedContentString] = useState('')
  // the next character to add to what has been printed
  const [nextCharacter, setNextCharacter] = useState('')
  // the shown content, split into arrays line by line
  const [presentationContent, setPresentationContent] = useState<string[]>([])

  // how fast the terminal should print
  const [delay, setDelay] = useState(50)
  // is the terminal currently printing, meaning is there a work queue
  const [isPlaying, setIsPlaying] = useState(true)

  useInterval(
    () => {
      const newText = getNewText(printedContentString, props.content)

      if (newText == null) return
      if (newText[0] == null) return

      const nextLetter = newText[0]

      const localPresentationContent = _.cloneDeep(presentationContent)

      if (nextLetter.includes('\n')) {
        localPresentationContent.push('')
        setPresentationContent(localPresentationContent)
        setPrintedContentString(localPresentationContent.join('\n'))
        return
      }

      // add the new letter to the end of the last line
      if (localPresentationContent.length > 0) {
        localPresentationContent[localPresentationContent.length - 1] += nextLetter
      } else localPresentationContent.push(nextLetter)

      const variability = props.variability ?? 1.5
      const generalSpeed = props.speed ?? 4
      setDelay(Math.exp(Math.random() * variability) * generalSpeed)
      setPrintedContentString(localPresentationContent.join('\n'))
      setPresentationContent(localPresentationContent)
    },
    isPlaying ? delay : null
  )

  function close () {
    setIsShown(false)
  }

  const backgroundColor = 'bg-[#000000bb]'

  return (
    <>
      {isShown && (
        <div className="overflow-hidden z-[40] absolute top-[5%] right-[5%] w-[70%] mx-auto drop-shadow-[10px_10px_15px_rgba(0,0,0,0.5)] ">
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
              {presentationContent.map((line, index) => (
                <p key={index} className="pb-1">{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
