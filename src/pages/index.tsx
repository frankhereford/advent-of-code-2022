/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from 'next'
import NoSSR from 'react-no-ssr'
import AdventOfCode from './components/AdventOfCode'
import day00 from '../utils/day_00'
import day01 from '../utils/day_01'
import day02 from '../utils/day_02'
import day03 from '../utils/day_03'
import day04 from '../utils/day_04'
import day05 from '../utils/day_05'
import day06 from '../utils/day_06'
import day07 from '../utils/day_07'
import day08 from '../utils/day_08'
import day09 from '../utils/day_09'
import day10 from '../utils/day_10'
import day11 from '../utils/day_11'
import day12 from '../utils/day_12'
import day13 from '../utils/day_13'
import day14 from '../utils/day_14'
import day15 from '../utils/day_15'
import day16 from '../utils/day_16'
import day17 from '../utils/day_17'
import day18 from '../utils/day_18'
import day19 from '../utils/day_19'
import day20 from '../utils/day_20'
import day21 from '../utils/day_21'
import day22 from '../utils/day_22'
import day23 from '../utils/day_23'
import day24 from '../utils/day_24'
import day25 from '../utils/day_25'

import { useState, createContext } from 'react'

// TODO this is repeated in the AdventOfCode.tsx component ..
interface day {
  problemStatement: string
  solution: (print: (line?: string | null) => void) => Promise<void>
  invocation: string
  terminalSpeed?: number
  terminalVariability?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const DayPicker = createContext((day: number) => {})

const Home: NextPage = () => {
  // * Number of stars to render
  const stars = 3
  // * Default day to load           👇
  const [day, setDay] = useState<day>(day03)
  const [render, setRender] = useState(0)

  function makeDay (makeDay: number) {
    if (makeDay === 0) { setDay(day00) }
    if (makeDay === 1) { setDay(day01) }
    if (makeDay === 2) { setDay(day02) }
    if (makeDay === 3) { setDay(day03) }
    if (makeDay === 4) { setDay(day04) }
    if (makeDay === 5) { setDay(day05) }
    if (makeDay === 6) { setDay(day06) }
    if (makeDay === 7) { setDay(day07) }
    if (makeDay === 8) { setDay(day08) }
    if (makeDay === 9) { setDay(day09) }
    if (makeDay === 10) { setDay(day10) }
    if (makeDay === 11) { setDay(day11) }
    if (makeDay === 12) { setDay(day12) }
    if (makeDay === 13) { setDay(day13) }
    if (makeDay === 14) { setDay(day14) }
    if (makeDay === 15) { setDay(day15) }
    if (makeDay === 16) { setDay(day16) }
    if (makeDay === 17) { setDay(day17) }
    if (makeDay === 18) { setDay(day18) }
    if (makeDay === 19) { setDay(day19) }
    if (makeDay === 20) { setDay(day20) }
    if (makeDay === 21) { setDay(day21) }
    if (makeDay === 22) { setDay(day22) }
    if (makeDay === 23) { setDay(day23) }
    if (makeDay === 24) { setDay(day24) }
    if (makeDay === 25) { setDay(day25) }
    setRender(r => r + 1)
  }

  return (
    <DayPicker.Provider value={makeDay}>
      <NoSSR>
        <AdventOfCode day={day} stars={stars} reRender={render} />
      </NoSSR>
    </DayPicker.Provider>
  )
}

export default Home
