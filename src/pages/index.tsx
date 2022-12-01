import type { NextPage } from 'next'
import NoSSR from 'react-no-ssr'
import AdventOfCode from './components/AdventOfCode'
import day00 from '../utils/day_00'
import day01 from '../utils/day_01'
import { useState, createContext } from 'react'

// ! this is repeated in the AdventOfCode.tsx component ..
interface day {
  problemStatement: string
  solution: (print: (line?: string) => void) => Promise<void>
  invocation: string
  terminalSpeed?: number
  terminalVariability?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const DayPicker = createContext((day: number) => {})

const Home: NextPage = () => {
  const [day, setDay] = useState<day>(day01)
  const [render, setRender] = useState(0)

  function makeDay (makeDay: number) {
    if (makeDay === 0) { setDay(day00) }
    if (makeDay === 1) { setDay(day01) }
    setRender(r => r + 1)
  }

  return (
    <DayPicker.Provider value={makeDay}>
      <NoSSR>
        <AdventOfCode day={day} stars={1} reRender={render} />
      </NoSSR>
    </DayPicker.Provider>
  )
}

export default Home
