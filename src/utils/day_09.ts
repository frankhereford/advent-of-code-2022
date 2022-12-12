/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_09_input'
import _ from 'lodash'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 9 task: Something about string theory, you are not really sure.. 🧶🤔'
const invocation = '️sudo /sbin/boltzmannBrain -i /dev/universe -f reality[rope] -i state.json -o futureDeltaT.next'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇


function visualizeRope (history: Array<{ head: { x: number, y: number }, tail: { x: number, y: number } }>, print: (line?: string) => void) {
  // 🤖 find the largest value of history.head[x] and history.head[y]
  console.log(history)
  const maxHeadX = Math.max(...history.map((state) => state.head.x))
  const maxHeadY = Math.max(...history.map((state) => state.head.y))
  const minHeadX = Math.min(...history.map((state) => state.head.x))
  const minHeadY = Math.min(...history.map((state) => state.head.y))
  const maxTailX = Math.max(...history.map((state) => state.tail.x))
  const maxTailY = Math.max(...history.map((state) => state.tail.y))
  const minTailX = Math.min(...history.map((state) => state.tail.x))
  const minTailY = Math.min(...history.map((state) => state.tail.y))

  const maxX = Math.max(maxHeadX, maxTailX)
  const maxY = Math.max(maxHeadY, maxTailY)
  const minX = Math.min(minHeadX, minTailX)
  const minY = Math.min(minHeadY, minTailY)

  // console.log('maxX: ', maxX)
  // console.log('maxY: ', maxY)
  // console.log('minX: ', minX)
  // console.log('minY: ', minY)


  let output = ''
  const grid: string[][] = []
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (grid[x] == null) grid[x] = []
      if (x === history[history.length - 1]!.head.x && y === history[history.length - 1]!.head.y) {
        grid[x]![y] = 'H'
        output += 'H'
      } else if (x === history[history.length - 1]!.tail.x && y === history[history.length - 1]!.tail.y) {
        grid[x]![y] = 'T'
        output += 'T'
      } else {
        grid[x]![y] = '.'
        output += '.'
      }
    }
    output += '\n'
  }

  console.log(output)
}


function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  // no code yet prediction: part 2 let's the rope have length n

  const history: Array<{ head: { x: number, y: number }, tail: { x: number, y: number } }> = [{ head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } }]
  // console.log(history)
  lines.forEach((line) => {
    if (line == null) return
    // console.log('------')
    console.log('Instruction: ', line)
    const direction = line.split(' ')[0]
    const distance = parseInt(line.split(' ')[1]!)

    // * most recent state of head
    const xHead = history[history.length - 1]!.head.x
    const yHead = history[history.length - 1]!.head.y
    const xTail = history[history.length - 1]!.tail.x
    const yTail = history[history.length - 1]!.tail.y


    for (let scalar = 0; scalar <= distance; scalar++) {
      // @rose, i got so burnt by pass by reference here, i'll never recover!! 🔥
      const nextState = _.cloneDeep(history[history.length - 1])
      if (direction === 'D') nextState!.head = { x: xHead, y: yHead + scalar }
      if (direction === 'U') nextState!.head = { x: xHead, y: yHead - scalar }
      if (direction === 'R') nextState!.head = { x: xHead + scalar, y: yHead }
      if (direction === 'L') nextState!.head = { x: xHead - scalar, y: yHead }
      nextState!.tail = { x: xTail, y: yTail }
      history.push(nextState!)
      visualizeRope(history, print)
    }
  })

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
