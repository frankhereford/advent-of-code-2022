// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_04_input'

const terminalSpeed = 1
const terminalVariability = 1
const mod = 100

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

// ? function which takes an array of sequential numbers and returns an array with the first 3 and the last 3 with an element of '...' in the middle
// * this is an example of why copilot is can be super helpful
// * i wrote the above comment and it just gave me the following function, typed and everything
function summarize (array: number[]) {
  if (array.length <= 6) return array
  return [array[0], array[1], array[2], '...', array[array.length - 3], array[array.length - 2], array[array.length - 1]]
}

function returnOverlap (intervals: number[][]) {
  if (intervals[0] == null || intervals[1] == null) return false

  const firstInterval = new Set(intervals[0])
  const secondInterval = new Set(intervals[1])
  const intersection = [...firstInterval].filter(x => secondInterval.has(x))
  return intersection
}

function checkOverlap (intervals: number[][]) {
  if (intervals[0] == null || intervals[1] == null) return false

  // ! 🎉 This was a happy surprize! I did this and am glad I didn't delete it because it became part 2 as returnOverlap()!
  /*
  // * This was an initial misunderstanding, where I thought I was looking for any overlap
  const firstInterval = new Set(intervals[0])
  const secondInterval = new Set(intervals[1])
  const intersection = [...firstInterval].filter(x => secondInterval.has(x))
  */

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const intersection = intervals[0].every(num => intervals[1]!.includes(num)) || intervals[1].every(num => intervals[0]!.includes(num))

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
    const intervals = input.split(',').map((interval) => numify(interval))
    const overlap = checkOverlap(intervals)
    if ((index % mod) === 0) {
      if (overlap) {
        print(`🏖️ Good news, 🧝 pair #${index}! Y'all have a fully overlapped assignments!\n`)
      } else {
        print(`🧹 Bad news for 🧝 pair #${index}, they have fully non-overlapped assignments.\n`)
      }
    }
    return overlap
  })

  const overlapCount = overlaps.reduce((acc, curr) => curr ? acc + 1 : acc, 0)

  print()
  print(`⭐️ Looks like we have ${overlapCount} pairs of elves with overlapping cleaning assignments.`)
  print()

  const overlapsDetails = lines.map((input, index) => {
    const intervals = input.split(',').map((interval) => numify(interval))
    const overlap = returnOverlap(intervals)
    if (overlap == null || overlap === false) return []
    if ((index % 50) === 0) {
      if (overlap.length > 0) {
        print(`🏖️ Good news, 🧝 pair #${index}! Y'all have an overlap of ${JSON.stringify(summarize(overlap))}.\n`)
      } else {
        print(`🧹 Bad news for 🧝 pair #${index}, they have fully non-overlapped assignments.\n`)
      }
    }
    return overlap.length > 0
  })

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const overlapDetailsCount = overlapsDetails.reduce((accumulator, value) => value ? accumulator + 1 : accumulator, 0)
  print()
  print(`⭐️ It appears that there are ${overlapDetailsCount} pairs of elves with overlapping cleaning assignments.`)
  print()

  return null
}
