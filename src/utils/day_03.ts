/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_03_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 3 task: The packs are not packed right! Help the elves get organized.'
const invocation = '️/bin/lua packPacks.lua'
const mod = 20

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

interface Letter {
  [key: string]: number
}

function scoreLetter (letterArg: string) {
  const scores: Letter = {}
  for (let i = 1; i <= 26; i++) {
    const letter = String.fromCharCode(i + 96)
    scores[letter] = i
  }
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(i + 65)
    scores[letter] = i + 1 + 26
  }
  return scores[letterArg] ?? 0
}

function intersectRow (line: string) {
  const leftString = line.slice(0, line.length / 2)
  const rightString = line.slice(line.length / 2, line.length)
  const left = new Set(leftString.split(''))
  const right = new Set(rightString.split(''))
  const intersection = [...left].filter(x => right.has(x))
  return intersection[0] ?? ''
}

function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')
  const scores = lines.map((line, index) => {
    const intersection = intersectRow(line)
    const score = scoreLetter(intersection)
    if ((index % mod) === 0) {
      print(`Pack #${index}: I shook it real hard, and I got out two ${intersection} letters worth ${score}.\n`)
    }
    return score
  })
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const sum = scores.reduce((a, b) => {
    if (a == null || b == null) return 0
    return a + b
  }, 0)
  print()
  print(`⭐️ The backpack priority initial scan reads: ${sum}\n`)
  print()

  const chunks = []
  for (let i = 0; i < lines.length; i += 3) {
    const chunk = lines.slice(i, i + 3)
    chunks.push(chunk)
  }
  const badgeScores = chunks.map((chunk, index) => {
    const uno = new Set(chunk[0])
    const dos = new Set(chunk[1])
    const tres = new Set(chunk[2])
    const [badge] = [uno, dos, tres].reduce((a, b) => new Set([...a].filter(x => b.has(x))))
    if ((index % 10) === 0) {
      print(`Group #${index} has the common item ${badge ?? ''} worth ${scoreLetter(badge ?? '')}.\n`)
    }
    return scoreLetter(badge ?? '')
  })

  const answer = badgeScores.reduce((partialSum, a) => partialSum + a, 0)
  print()
  print(`⭐️ By groups, the badge priority scan reads: ${answer}\n`)

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
