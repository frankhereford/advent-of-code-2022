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
  print(puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇


function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  // stacks are going to be index 0 on the bottom
  const stacks = parseBoxes(lines, print)
  console.table(stacks)

  const instructions = parseInstructions(lines, print)
  console.table(instructions)

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}

function parseInstructions (lines: string[], print: (line?: string) => void) {
  interface Move {
    quantity: number
    origin: number
    destination: number
  }

  const moves: Move[] = []
  lines.map((input, index) => {
    const movePattern = /move (\d+) from (\d+) to (\d+)/
    const moveResult = input.match(movePattern)
    if (moveResult !== null) {
      const move = {
        quantity: parseInt(moveResult[1] ?? '0'),
        origin: parseInt(moveResult[2] ?? '0'),
        destination: parseInt(moveResult[3] ?? '0')
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

