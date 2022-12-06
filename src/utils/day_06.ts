/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_06_input'

const terminalSpeed = 1
const terminalVariability = 1

// ! don't forget this!
const problemStatement = 'Day 6 task: You remember your college 📻 HAM radio club fondly and quickly decode the signal from the noise.'
const invocation = '️cat prismaticArrangement.blocks > /dev/laserProc'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function puzzleFunction (input: string[], print: (line?: string) => void) {

  // const signalStartingPositions = input.map((signal, index) => {
  //   print('📡 Signal: ' + signal + '\n')
  //   const letters = signal.split('')
  //   for (let i = 4; i <= letters.length; i++) {
  //     const potentialMarker = letters.slice(i - 4, i)
  //     // 🤖 compute how many elements of an array are unique
  //     const unique = potentialMarker.filter((v, i, a) => a.indexOf(v) === i)
  //     if (unique.length === 4) {
  //       console.log('found it!', i)
  //       print(`🛰️ Signal Acquired! Start-of-Packet 🎫 found as ${potentialMarker.join('')} at position ${i}.\n`)
  //       return i
  //     }
  //   }
  // })

  const messageStartingPositions = input.map((signal, index) => {
    print('📡 Signal: ' + signal + '\n')
    const letters = signal.split('')
    for (let i = 14; i <= letters.length; i++) {
      const potentialMarker = letters.slice(i - 14, i)
      // 🤖 compute how many elements of an array are unique
      const unique = potentialMarker.filter((v, i, a) => a.indexOf(v) === i)
      if (unique.length === 14) {
        console.log('found it!', i)
        print(`✉️ Message Acquired! Start-of-Packet 🎫 found as ${potentialMarker.join('')} at position ${i}.\n`)
        return i
      }
    }
    return true
  })
  console.log('Message starting positions:', messageStartingPositions)

  console.log('Final: ', messageStartingPositions)
  // const lines = input.split('\n')
  // console.table(lines)


  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
