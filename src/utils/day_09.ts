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
  // console.log(history)
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
  if (history.length % 10 === 0) {
    // print(`State after move ${history.length}:\n`)
    // print(output)
    // print()
  }
}


function puzzleFunction (input: string, print: (line?: string) => void) {
  console.clear()
  const lines = input.split('\n')

  // no code yet prediction: part 2 let's the rope have length n

  const history: Array<{ head: { x: number, y: number }, tail: { x: number, y: number } }> = [{ head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } }]
  console.log(history)
  lines.forEach((line) => {
    if (line == null) return
    // console.log('------')
    console.log('Instruction: ', line)
    const direction = line.split(' ')[0]
    const distance = parseInt(line.split(' ')[1]!)

    for (let scalar = 0; scalar < distance; scalar++) {
      // @rose, i got so burnt by pass by reference here, i'll never recover!! 🔥
      const nextState = _.cloneDeep(history[history.length - 1])

      if (nextState == null) return

      // * update head
      if (direction === 'D') nextState.head = { x: nextState.head.x, y: nextState.head.y + 1 }
      if (direction === 'U') nextState.head = { x: nextState.head.x, y: nextState.head.y - 1 }
      if (direction === 'R') nextState.head = { x: nextState.head.x + 1, y: nextState.head.y }
      if (direction === 'L') nextState.head = { x: nextState.head.x - 1, y: nextState.head.y }

      if (Math.abs(nextState.head.x - nextState.tail.x) > 1 || Math.abs(nextState.head.y - nextState.tail.y) > 1) {
        /* eslint-disable no-multi-spaces */
        if (nextState.head.x === nextState.tail.x && nextState.head.y < nextState.tail.y) nextState.tail =   { x: nextState.tail.x, y: nextState.tail.y - 1 }       // up
        else if (nextState.head.x > nextState.tail.x   && nextState.head.y < nextState.tail.y) nextState.tail =   { x: nextState.tail.x + 1, y: nextState.tail.y - 1 }   // up-right
        else if (nextState.head.x > nextState.tail.x   && nextState.head.y === nextState.tail.y) nextState.tail = { x: nextState.tail.x + 1, y: nextState.tail.y }       // right
        else if (nextState.head.x > nextState.tail.x   && nextState.head.y > nextState.tail.y) nextState.tail =   { x: nextState.tail.x + 1, y: nextState.tail.y + 1 }   // down-right
        else if (nextState.head.x === nextState.tail.x && nextState.head.y > nextState.tail.y) nextState.tail =   { x: nextState.tail.x, y: nextState.tail.y + 1 }       // down
        else if (nextState.head.x < nextState.tail.x   && nextState.head.y > nextState.tail.y) nextState.tail =   { x: nextState.tail.x - 1, y: nextState.tail.y + 1 }   // down-left
        else if (nextState.head.x < nextState.tail.x   && nextState.head.y === nextState.tail.y) nextState.tail = { x: nextState.tail.x - 1, y: nextState.tail.y }       // left
        else if (nextState.head.x < nextState.tail.x   && nextState.head.y < nextState.tail.y) nextState.tail =   { x: nextState.tail.x - 1, y: nextState.tail.y - 1 }   // up-left
        /* eslint-enable no-multi-spaces */
      }

      history.push(nextState)
      visualizeRope(history, print)
      // console.log(history.length, history)
      // console.log('done processing step')
    }
  })

  const tailCoords = history.map((state) => `${state.tail.x},${state.tail.y}`)
  // console.log(tailCoords)
  // reduce an array to the array of every unique coordinate
  const uniqueTailCoords = tailCoords.reduce<string[]>((acc, coord) => {
    if (acc.includes(coord)) return acc
    return [...acc, coord]
  }, [])
  console.log(uniqueTailCoords)
  console.log(uniqueTailCoords.length)



  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
