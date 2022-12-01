import type { NextPage } from 'next'
import AdventOfCode from './components/AdventOfCode'
import day00 from '../utils/day_00'

interface day {
  problemStatement: string
  solution: (print: (line?: string) => void) => Promise<void>
  invocation: string
  terminalSpeed?: number
  terminalVariability?: number
}

const Home: NextPage = () => {
  const day: day = day00

  return (
    <AdventOfCode day={day} />
  )
}

export default Home
