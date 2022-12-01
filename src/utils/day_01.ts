/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_01_input'

// * input parameters from the AoC website for the puzzle

// ! Required: These variables define the typing speed and variability in speed on the "terminal"
const terminalSpeed = 0.1
const terminalVariability = 0

// * need to define this so the program introduces itself
// ! Required
const problemStatement = 'Task: Figure out which elves\' packs are best to raid for tasty snacks.\n\nNB: I\'ll only be printing every tenth debugging output line to make the terminal output more readable.'

// * the invocation is just a joke 🤪
/// * there's no perl running here... but it'd be a lot cooler if there was!
// ! Required
const invocation = '/usr/bin/postscript ./snacks4TheCrew.ps # 🖨️'

// * the entry point for the solution, taking one argument
// * print is used to "print" a line to the "terminal"
// ! Required
async function solution (print: (line?: string) => void) {
  print(findMostCalories(input))
}

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function findMostCalories (input: string) {
  let output = ''
  const lines = input.split('\n')
  // console.log(lines)

  output = output + 'Parsing Input\nE0: '
  const elves: number[] = []
  let counter = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      // output = output + `\nNew Elf #${counter}\n`
      counter++
      if ((counter % 10) === 0) {
        output = output + `\nE${counter}: `
      }
    } else {
      const lineCalories = parseInt(lines[i] ?? '0') ?? 0
      // output = output + `New snack for Elf #${counter} with ${lineCalories} calories.` + '\n'
      if ((counter % 10) === 0) {
        output = output + '.'
      }
      elves[counter] = (elves[counter] ?? 0) + lineCalories
    }
  }

  interface elf {
    id: number
    calories: number
  }

  const elfObjects: elf[] = []

  for (let i = 0; i < elves.length; i++) {
    elfObjects.push({ id: i, calories: elves[i] ?? 0 })
  }
  elfObjects.sort((a, b) => b.calories - a.calories)
  // console.log(elfObjects)

  // ? 👇 I really don't understand how to do this right with arrays of unknown length
  // ? which is like the best thing about arrays! I'm not going to count up the input to
  // ? put a length on the array, am i? could i?

  output = output + `\n⭐️Elf #${elfObjects[0]!.id} has the most calories with ${elfObjects[0]!.calories} calories.` + '\n'

  const topThreeSnackmasters = elfObjects.slice(0, 3).map((elf) => elf.calories).reduce((partialSum, a) => partialSum + a, 0)

  output = output + `\n⭐️The top three snack-masters have ${topThreeSnackmasters} calories between them.\n`

  // 👇 Naive solution, but it works (for part one, only though) 👇
  /*
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
  */

  output = output + 'frank@advent-of-code $'
  return output
}

// TODO really need to figure out global typing
const day = {
  problemStatement,
  solution,
  invocation,
  terminalSpeed,
  terminalVariability
}

export default day
