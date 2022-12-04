/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_04_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 4 task: The elves are lazy, but lazy like programmers. Help them find the best way to clean the unloading space.'
const invocation = '️cat cleaningTaskSuperposition.qBits > /proc/quantumCPU'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function puzzleFunction (input: string, print: (line?: string) => void) {



  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
