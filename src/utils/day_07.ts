/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fs } from 'memfs'
import { input, testInput } from './day_07_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 7 task: You know, nothing big, just reinvent `ncdu`, for Christmas\' sake.'
const invocation = '️du -Aachk / # Gesundheit'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

// ! Prediction before laying in any code: The twist is to execute the fewest instructions possible to achieve n% disk capacity.


function puzzleFunction(input: string, print: (line?: string) => void) {
  const lines = input.split('\n')
}

/*
function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  const fileSystem = {}
  const pwd = ['/'] // we start at the root of the file system

  let currentOperation: string | null = null
  lines.map((line, index) => {
    console.log('')
    console.log('line: ', line)

    const inputPattern = /^(\${0,1})\s*(\S+)\s*(\S*)\s*(\S*).*/ // Why do regexes have to look like line noise?
    const result = line.match(inputPattern)
    if (result == null) return false

    if (result[1] === '$') {
      // command
      console.log('incoming command', result[2])
      currentOperation = null
      if (result[2] === 'cd') {
        console.log('📂')
      } else if (result[2] === 'ls') {
        console.log('📋')
        currentOperation = 'ls'
        // list
      }
    } else {
      console.log(`Current operation: ${currentOperation ?? ''}`)
      // result
    }
    return true
  })


  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
*/