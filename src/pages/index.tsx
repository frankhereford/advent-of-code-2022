import type { NextPage } from 'next'
import AdventOfCode from './components/AdventOfCode'
import day00 from '../utils/day_00'
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
  const [day, setDay] = useState<day>(day00)
  const [render, setRender] = useState(0)

  function makeDay (makeDay: number) {
    console.log('makeDay input: ', makeDay)
    console.log(typeof makeDay)
    if (makeDay === 0) { console.log('setting day to 0'); setDay(day00) }
    setRender(r => r + 1)
  }

  return (
    <DayPicker.Provider value={makeDay}>
      <AdventOfCode day={day} stars={10} reRender={render} />
    </DayPicker.Provider>
  )
}

export default Home
