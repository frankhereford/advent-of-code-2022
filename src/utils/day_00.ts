// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sleep, sleepRandom } from './helpers'

// * input parameters from the AoC website for the puzzle
const n = 10

// ! Required: These variables define the typing speed and variability in speed on the "terminal"
const terminalSpeed = 1
const terminalVariability = 3

// * need to define this so the program introduces itself
// ! Required
const problemStatement = `Task: Print Pascal's triangle to the terminal n times, each time printing n rows.
Let n = ${n}. Good luck!`

// * the invocation is just a joke 🤪
/// * there's no perl running here... but it'd be a lot cooler if there was!
// ! Required
const invocation = `/usr/bin/perl -w ./pascal_4_lyfe.pl --rows ${n}`

// * the entry point for the solution, taking one argument
// * print is used to "print" a line to the "terminal"
// ! Required
async function solution (print: (line?: string) => void) {
  for (let i = 1; i <= n; i++) {
    print() // blank line
    print('n = ' + i.toString())
    const triangle = await printPascalsTriangle(print, i)
    print(triangle)
    await sleep(1) // option: use the sleepRandom function for random variability
  }
}

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

// * you can define whatever other functions you may want to compose and composite
// * for your solution down here.
async function printPascalsTriangle (print: (line?: string) => void, n: number) {
  let line = ''
  for (let i = 0; i <= n; i++) {
    let c = 1
    for (let j = 1; j <= i; j++) {
      line += String(c) + ' '
      c = (c * (i - j)) / j
    }
    line += '\n'
  }
  return line
}

const day = {
  problemStatement,
  solution,
  invocation,
  terminalSpeed,
  terminalVariability
}

export default day
