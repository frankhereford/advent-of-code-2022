/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_04_input'

const terminalSpeed = 1
const terminalVariability = 1
const mod = 10

const problemStatement = 'Day 4 task: The elves are lazy, but lazy like programmers. Help them find the best way to clean the unloading space.'
const invocation = '️cat cleaningTaskSuperposition.qBits > /proc/quantumCPU'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function checkOverlap (intervals: number[][]) { 
  // console.log(intervals)
  if (intervals[0] == null || intervals[1] == null) return false

  /*
  // * This was an initial misunderstanding, where I thought I was looking for any overlap
  const firstInterval = new Set(intervals[0])
  const secondInterval = new Set(intervals[1])
  const intersection = [...firstInterval].filter(x => secondInterval.has(x))
  */

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const intersection = intervals[0].every(num => intervals[1]!.includes(num)) || intervals[1].every(num => intervals[0]!.includes(num)) 
  // console.log(intersection)

  return intersection
}

function numify (input: string) {
  const interval = input.split('-').map((num) => parseInt(num)).sort((a, b) => a - b)
  if (interval[0] == null || interval[1] == null) return []
  const plots = []
  for (let i = interval[0]; i <= interval[1]; i++) {
    plots.push(i)
  }
  return plots
}

function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')
  const overlaps = lines.map((input, index) => {
    // console.log(input)
    const intervals = input.split(',').map((interval) => numify(interval))
    const overlap = checkOverlap(intervals)
    if ((index % mod) === 0) {
      if (overlap) {
        print(`🏖️ Good news, 🧝 #${index}! Y'all have a fully overlapped assignments!\n`)
      } else {
        print(`🧹 Bad news for 🧝 pair #${index}, they have non-fully overlapped assignments.\n`)
      }
    }
    return overlap
  })

  const overlapCount = overlaps.reduce((acc, curr) => curr ? acc + 1 : acc, 0)

  print()
  print(`⭐️ Looks like we have ${overlapCount} pairs of elves with overlapping cleaning assignments.`)

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
