// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_06_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 6 task: You remember your college 📻 HAM radio club fondly and quickly decode the signal from the noise.'
const invocation = '️cat prismaticArrangement.blocks > /dev/laserProc'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

// 🤖 function to return the first 15 characters of a string then ... then the last 15 characters
function truncate (str: string) {
  return str.length > 30 ? str.substr(0, 15) + '...' + str.substr(str.length - 15) : str
}

function puzzleFunction (input: string[], print: (line?: string) => void) {
  input.map((signal, index) => {
    print('📡 Signal: ' + truncate(signal) + '\n')
    const letters = signal.split('')
    for (let i = 4; i <= letters.length; i++) {
      const potentialMarker = letters.slice(i - 4, i)
      if (i % 100 === 0) {
        print(`🔎 Checking potential marker #${i}): ${potentialMarker.join('-')}\n`)
      }
      // 🤖 compute how many elements of an array are unique
      const unique = potentialMarker.filter((v, i, a) => a.indexOf(v) === i)
      if (unique.length === 4) {
        print(`⭐️ 🛰️ Signal Acquired! Start-of-Packet 🎫 found as ${potentialMarker.join('')} at position ${i}.\n`)
        print()
        return i
      }
    }
    return true
  })

  print()

  input.map((signal, index) => {
    print('📡 Signal: ' + truncate(signal) + '\n')
    const letters = signal.split('')
    for (let i = 14; i <= letters.length; i++) {
      const potentialMarker = letters.slice(i - 14, i)
      if (i % 100 === 0) {
        print(`🔎 Checking potential marker #${i}): ${potentialMarker.join('-')}\n`)
      }
      // 🤖 compute how many elements of an array are unique
      const unique = potentialMarker.filter((v, i, a) => a.indexOf(v) === i)
      if (unique.length === 14) {
        print(`️⭐️ 📡Message Acquired! Start-of-Packet 🎫 found as ${potentialMarker.join('')} at position ${i}.\n`)
        print()
        return i
      }
    }
    return true
  })

  return null
}
