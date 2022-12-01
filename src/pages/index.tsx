/* eslint-disable no-multiple-empty-lines */
import { type NextPage } from 'next'
import Head from 'next/head'


import Terminal from './components/Terminal'
import SnowfallComponent from './components/Snowfall'
import Clouds from './components/Clouds'
import Barn from './components/Barn'
import { useEffect, useState } from 'react'
import { problemStatement, solution, invocation, terminalSpeed, terminalVariability } from '../utils/day_00'

// * this wacky character is the Unicode "zero width space"
// * it's a "blank" character that isn't whitespace.
// * this "terminal" isn't actually a TTY ... 🙃
const zeroWidthSpace = '\u200B'

const Home: NextPage = () => {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(1 + (Math.random() * 5)))
  const defaultContent = `Last Login: ${date.toLocaleDateString('en-US')} on ttys002
frank@advent-of-code ` + '$' + ` echo; echo '$GIT_MSG $GIT_REPOSITORY'; echo;
${zeroWidthSpace}
View this on GitHub: https://github.com/frankhereford/advent-of-code-2022
${zeroWidthSpace}
frank@advent-of-code $ echo; echo $PROBLEM_STATEMENT; echo;
${zeroWidthSpace}
${problemStatement}
${zeroWidthSpace}
frank@advent-of-code $ `

  const [content, setContent] = useState(defaultContent)

  function print (line?: string) {
    if (line == null) {
      setContent(c => c + zeroWidthSpace + '\n')
    } else setContent(c => c + `${line}` + '\n')
  }

  useEffect(() => {
    async function runSolution () {
      setContent(c => c + ' ' + invocation + '\n')
      await solution(print)
    }
    runSolution().catch(e => console.error(e))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['just-once'])

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
        <Clouds opacity={25} windChangeDelay={15} windChangeVariability={1}></Clouds>
        <SnowfallComponent plane='distant'></SnowfallComponent>
        <SnowfallComponent plane='midground'></SnowfallComponent>
        <Terminal content={content} speed={terminalSpeed ?? 2} variability={terminalVariability ?? 3}></Terminal>
        <SnowfallComponent plane='foreground'></SnowfallComponent>
        <Barn></Barn>
      </main>
    </>
  )
}

export default Home
