/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { tinyInput, input, testInput } from './day_10_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 10 task: Fix your water-logged communications device and read its CRT codes.'
const invocation = '️cat ~/dryRice >> /dev/crt'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

interface Register {
  [key: string]: number
}

function checkCycle (registers: Register, cycle: number, signalStrengths: number[], print: (line?: string) => void) {
  const drawCycle = (cycle) % 40

  if (drawCycle === registers.x || drawCycle - 1 === registers.x || drawCycle + 1 === registers.x) {
    print('#')
  } else {
    print('.')
  }
  if ((drawCycle + 0) % 40 === 39) print()

  cycle = cycle + 1
  if ((cycle === 20) || ((cycle + 20) % 40 === 0)) {
    const signalStrength = cycle * registers.x!
    signalStrengths.push(signalStrength)
  }
}

function puzzleFunction (input: string, print: (line?: string) => void) {
  print('⭐️: The following letters appear on the CRT:\n')
  print('.') // we're off by one in our display, luckily our brain has pretty ok error correction
  const lines = input.split('\n')
  const signalStrengths: number[] = []

  let cycle = 0
  const registers: Register = { x: 1 }
  lines.map((line, index) => {
    const pattern = /(\w+) *([-\d]*)/ // funny little 0 or more quantifier on a space char there
    const instruction = line.match(pattern)
    if (instruction![1]! === 'noop') {
      cycle++
      checkCycle(registers, cycle, signalStrengths, print)
    } else if (instruction![1]!.startsWith('add')) {
      const pattern = /add(\w+)/
      const register = instruction![1]!.match(pattern)
      const opLength = 2
      for (let i = 0; i < opLength - 1; i++) {
        cycle++
        checkCycle(registers, cycle, signalStrengths, print)
      }
      cycle++
      const scalar = parseInt(instruction![2]!)
      registers[register![1]!] = registers[register![1]!]! + scalar
      checkCycle(registers, cycle, signalStrengths, print)
    }
    return true
  })

  const sum = signalStrengths.reduce((a, b) => a + b, 0)
  print(`\n⭐️ The sum of the signal strengths in that odd mod cycle are: ${sum}`)

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
