/* eslint-disable no-multiple-empty-lines */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_07_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 7 task: You know, nothing big, just reinvent `ncdu`, for Christmas\' sake.'
const invocation = '️du -Aachk / # Gesundheit'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(await puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

async function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')
  console.table(lines)


  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
