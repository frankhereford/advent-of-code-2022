/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_07_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 7 task: You know, nothing big, just reinvent `ncdu`, for Christmas\'s sake.'
const invocation = '️/bin/sh rm.sh'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

// ! Prediction before laying in any code: The twist is to execute the fewest instructions possible to achieve n% disk capacity.

function puzzleFunction (input: string, print: (line?: string) => void) {



  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
