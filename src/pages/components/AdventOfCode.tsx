import { useEffect, useState } from 'react'
import Head from 'next/head'

import PuzzlePicker from './PuzzlePicker'
import Terminal from './Terminal'
import SnowfallComponent from './Snowfall'
import Clouds from './Clouds'
import Barn from './Barn'

// * this wacky character is the Unicode "zero width space"
// * it's a "blank" character that isn't whitespace.
// * this "terminal" isn't actually a TTY ... 🙃
const zeroWidthSpace = '\u200B'

// TODO this is repeated in the index.tsx page
interface day {
  problemStatement: string
  solution: (print: (line?: string | null) => void) => Promise<void>
  invocation: string
  terminalSpeed?: number
  terminalVariability?: number
}

export default function AdventOfCode (props: { day: day, stars: number, reRender?: number }) {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(1 + (Math.random() * 5)))
  const defaultContent = `Last Login: ${date.toLocaleDateString('en-US')} on ttys002
frank@advent-of-code ` + '$' + ` echo; echo '$GIT_MSG $GIT_REPOSITORY'; echo;
${zeroWidthSpace}
View this on GitHub: https://github.com/frankhereford/advent-of-code-2022
${zeroWidthSpace}
frank@advent-of-code $ echo; echo $PROBLEM_STATEMENT; echo;
${zeroWidthSpace}
${props.day?.problemStatement}
${zeroWidthSpace}
frank@advent-of-code $ `

  const [content, setContent] = useState(defaultContent)
  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    async function runSolution () {
      if (firstTime) {
        setContent(c => c + ' ' + props.day?.invocation + '\n')
        setFirstTime(false)
      } else {
        setContent(c => c + '\n' + 'echo; echo $PROBLEM_STATEMENT; echo;\n' + props.day?.problemStatement + '\n' + 'frank@advent-of-code $ ' + props.day?.invocation + '\n')
      }
      await props.day?.solution(print)
    }
    runSolution().catch(e => console.error(e))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.day, props.reRender])

  function print (line?: string | null) {
    if (line == null) {
      setContent(c => c + zeroWidthSpace + '\n')
    } else setContent(c => c + `${line}`)
  }
  return (
    <>
      <Head>
        <title>️Snowday!</title>
        <meta name="description" content="2022 Advent of Code Attempts" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center h-100vh bg-gradient-to-b from-[#c2c5be] to-[#E2E2E2]">
        <PuzzlePicker numberStars={props.stars} spread={50} spinFactor={45}></PuzzlePicker>
        <Clouds opacity={20} windChangeDelay={15} windChangeVariability={1}></Clouds>
        <SnowfallComponent plane='distant'></SnowfallComponent>
        <SnowfallComponent plane='midground'></SnowfallComponent>
        <Terminal content={content} speed={props.day?.terminalSpeed ?? 2} variability={props.day?.terminalVariability ?? 3}></Terminal>
        <SnowfallComponent plane='foreground'></SnowfallComponent>
        <Barn></Barn>
      </main>
    </>
  )
}
