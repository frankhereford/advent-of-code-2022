/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sign } from 'crypto'
import { tinyInput, input, testInput } from './day_10_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 10 task: Introduce the tragedy..'
const invocation = '️/legacy/bin/shakespeare fairVerona.script'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

interface Register {
  [key: string]: number
}

function checkCycle (registers: Register, cycle: number, signalStrengths: number[]) {
  if (((cycle - 20)) % 40 === 0) {
    console.log('cycle: ', cycle, ' registers: ', registers)
    const signalStrength = cycle * registers.x!
    console.log(`signal Strength for ${cycle}:  ${signalStrength}`)
    signalStrengths.push(signalStrength)
    console.log('')
  }
}

function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')


  const signalStrengths: number[] = []

  let cycle = 0
  const registers: Register = { x: 1 }
  lines.map((line, index) => {
    const pattern = /(\w+) *([-\d]*)/ // funny little 0 or more quantifier on a space char there
    const instruction = line.match(pattern)
    if (instruction![1]! === 'noop') {
      cycle++
      checkCycle(registers, cycle, signalStrengths)
    } else if (instruction![1]!.startsWith('add')) {
      const pattern = /add(\w+)/
      const register = instruction![1]!.match(pattern)
      const opLength = 2
      for (let i = 0; i < opLength - 1; i++) {
        cycle++
        checkCycle(registers, cycle, signalStrengths)
      }
      cycle++
      const scalar = parseInt(instruction![2]!)
      console.log(`adding ${scalar} to ${register![1]!}`)
      registers[register![1]!] = registers[register![1]!]! + scalar
      checkCycle(registers, cycle, signalStrengths)
    }




    return true
  })

  // sum an array of numbers
  const sum = signalStrengths.reduce((a, b) => a + b, 0)
  console.log(sum)



  console.log('cycle finished: ', cycle)
  console.log('registers: ', registers)


  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
