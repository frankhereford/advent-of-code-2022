/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_06_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 6 task: Introduce the tragedy..'
const invocation = '️/legacy/bin/shakespeare fairVerona.script'

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
