/* eslint-disable no-multiple-empty-lines */

import { fs } from 'memfs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_07_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 7 task: You know, nothing big, just reinvent `ncdu`, for Christmas\' sake.'
const invocation = '️du -Aachk / # Gesundheit'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(await puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

async function createFiles (lines: string[]) {
  let pwd = ''
  lines.forEach(line => {
    const inputPattern = /^(\${0,1})\s*(\S+)\s*(\S*)\s*(\S*).*/ // Why do regexes have to look like line noise?
    const directive = line.match(inputPattern)
    // console.log(directive)
    if (directive == null) return
    if (directive[2] === 'cd') {
      if (directive[3] === '/') {
        pwd = ''
      } else if (directive[3] === '..') {
        pwd = pwd.split('/').slice(0, -1).join('/')
        // console.log('up a dir')
      } else {
        // * lesson learned here: the ! operator is not a TS cheat; sometimes you just know it's not null and this is how you say it.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pwd = `${pwd}/${directive[3]!}`
        // console.log('down a dir')
      }
      // console.log(`pwd: ${pwd}`)
    }
  })
}

async function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  await createFiles(lines)

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
