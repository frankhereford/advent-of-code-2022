/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_01_input'

// * input parameters from the AoC website for the puzzle

// ! Required: These variables define the typing speed and variability in speed on the "terminal"
export const terminalSpeed = 0.1
export const terminalVariability = 0

// * need to define this so the program introduces itself
// ! Required
export const problemStatement = 'Task: Figure out which elf\'s pack to raid for tasty snacks.\n\nNB: I\'ll only be printing every tenth debugging output line to make the terminal output more readable.'

// * the invocation is just a joke 🤪
/// * there's no perl running here... but it'd be a lot cooler if there was!
// ! Required
export const invocation = '/usr/bin/postscript ./snacks4TheCrew.ps # 🖨️'

// * the entry point for the solution, taking one argument
// * print is used to "print" a line to the "terminal"
// ! Required
export async function solution (print: (line?: string) => void) {
  print(findMostCalories(input))
}

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function findMostCalories (input: string) {
  let output = ''
  const lines = input.split('\n')
  // console.log(lines)

  output = output + 'Parsing Input\nE: '
  const elves: number[] = []
  let counter = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      // output = output + `\nNew Elf #${counter}\n`
      if ((i % 10) === 0) {
        output = output + '\nE: '
      }
      counter++
    } else {
      const lineCalories = parseInt(lines[i] ?? '0') ?? 0
      // output = output + `New snack for Elf #${counter} with ${lineCalories} calories.` + '\n'
      if ((i % 10) === 0) {
        output = output + '.'
      }
      elves[counter] = (elves[counter] ?? 0) + lineCalories
    }
  }

  output = output + '\n'

  let heaviestElf = 0
  let heaviestAmount = 0
  for (let i = 0; i < elves.length; i++) {
    // console.log('checking elf', i, 'with', elves[i])
    if ((i % 10) === 0) {
      output = output + `Checking Elf #${i} with ${elves[i]!} calories.\n`
    }
    if (elves[i]! > heaviestAmount) {
      heaviestAmount = elves[i]!
      heaviestElf = i
    }
  }
  output = output + `\n⭐️Elf #${heaviestElf} has the most calories with ${heaviestAmount} calories.` + '\n'

  return output
}
