/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_05_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 5 task: Channel your inner shipping yard and help the elves figure out what is where.'
const invocation = '️/legacy/bin/turing thisSideUp.tape'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

interface Move {
  quantity: number
  origin: number
  destination: number
}

function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  // stacks are going to be index 0 on the bottom
  let stacks = parseBoxes(lines, print)

  print()
  const instructions = parseInstructions(lines, print)
  print()

  const organizedStacksPartOne = processInstructionsOneByOne(instructions, stacks, print)
  const topCratesPartOne = organizedStacksPartOne.map((stack, index) => {
    return stack.pop()
  })

  print()
  print(`The top crates are ${topCratesPartOne.join('')}.`)
  print()

  print()
  print('🏗️ Install the CrateMover 9001. It\'s over 9000!')
  print()

  // fresh stacks
  stacks = parseBoxes(lines, print)

  const organizedStacksPartTwo = processInstructions9001(instructions, stacks, print)
  // console.table(organizedStacksPartTwo)

  const topCratesPartTwo = organizedStacksPartTwo.map((stack, index) => {
    return stack.pop()
  })

  print()
  print(`The top crates are ${topCratesPartTwo.join('')}.`)
  print()

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}

// pre part 1 solve, i bet the twist is they get a crane upgrade and can move multiple at once


function processInstructionsOneByOne (instructions: Move[], stacks: string[][], print: (line?: string) => void) {
  instructions.map((instruction, index) => {
    const { quantity, origin, destination } = instruction
    const message = `Moving ${quantity} from ${origin} to ${destination}`
    if (index % 50 === 0) print(message + '\n')
    for (let i = 0; i < quantity; i++) {
      const box = stacks[origin]!.pop()
      stacks[destination]!.push(box!)
    }
    return true
  })
  return stacks
}

function processInstructions9001 (instructions: Move[], stacks: string[][], print: (line?: string) => void) {
  instructions.map((instruction, index) => {
    const { quantity, origin, destination } = instruction
    const message = `Moving ${quantity} from ${origin} to ${destination}`
    if (index % 50 === 0) print(message + '\n')

    console.log(message)
    console.table(stacks)
    const inFlightBoxes: string[] = []
    for (let i = 0; i < quantity; i++) {
      inFlightBoxes.unshift(stacks[origin]!.pop() ?? '')
    }
    console.table(inFlightBoxes)
    for (let i = 0; i < quantity; i++) {
      stacks[destination]?.push(inFlightBoxes.shift()!)
    }
    console.table(stacks)
    console.log('🔥')
    return true
  })
  return stacks
}
/*

    console.log('inFlightBoxes: ', inFlightBoxes)
    for (let i = quantity; i > 0; i--) {
      stacks[destination]?.push(inFlightBoxes.shift() ?? '')
    }
    //stacks[destination]?.concat(inFlightBoxes)
    console.table(stacks)
*/

function parseInstructions (lines: string[], print: (line?: string) => void) {
  const moves: Move[] = []
  lines.map((input, index) => {
    const movePattern = /move (\d+) from (\d+) to (\d+)/
    const moveResult = input.match(movePattern)
    if (moveResult !== null) {
      const move = {
        quantity: parseInt(moveResult[1] ?? '0'),
        origin: parseInt(moveResult[2] ?? '0') - 1, // make instructions zero-indexed
        destination: parseInt(moveResult[3] ?? '0') - 1
      }
      moves.push(move)
    }
    return true
  })
  return moves
}

function parseBoxes (lines: string[], print: (line?: string) => void) {
  const stacks: string[][] = []

  lines.map((input, index) => {
    // eslint-disable-next-line no-useless-escape
    const isBoxRow = /[\[\]]+/
    const result = input.match(isBoxRow)
    if (isBoxRow != null) {
      if (result == null) return false
      const piles = input.match(/.{1,4}/g)
      const letters = piles?.map((pile, index) => {
        return pile[1] === ' ' ? null : pile[1]
      })
      letters?.map((letter, index) => {
        if (letter == null) return false
        if (stacks[index] == null) stacks[index] = []
        if (index % 3 === 0) {
          print(`I think ${letter} goes into stack ${index}.\n`)
        }
        stacks[index]?.unshift(letter)
        return true
      })
    }
    return true
  })
  return stacks
}

