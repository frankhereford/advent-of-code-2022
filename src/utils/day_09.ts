/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_09_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 9 task: Something about string theory, you are not really sure.. 🧶🤔'
const invocation = '️/sbin/boltzmanBrain -i /dev/universe -f reality[rope] -i state.json -o futureDeltaT.next'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function puzzleFunction (input: string, print: (line?: string) => void) {




  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
