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
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇


interface Coordinate { x: number, y: number }
type Rope = Coordinate[]
type RopeHistory = Rope[]

function visualizeRope (history: RopeHistory, print: (line?: string) => void, ropeLength: number) {

  console.log('history for viz: ', history[history.length - 1]!)

  const maxX = Math.max(...history.map((rope) => Math.max(...rope.map((coordinate) => coordinate.x))))
  const maxY = Math.max(...history.map((rope) => Math.max(...rope.map((coordinate) => coordinate.y))))
  const minX = Math.min(...history.map((rope) => Math.min(...rope.map((coordinate) => coordinate.x))))
  const minY = Math.min(...history.map((rope) => Math.min(...rope.map((coordinate) => coordinate.y))))



  // // 🤖 find the largest value of history.head[x] and history.head[y]
  // const maxHeadX = Math.max(...history.map((state) => state.head.x))
  // const maxHeadY = Math.max(...history.map((state) => state.head.y))
  // const minHeadX = Math.min(...history.map((state) => state.head.x))
  // const minHeadY = Math.min(...history.map((state) => state.head.y))
  // const maxTailX = Math.max(...history.map((state) => state.tail.x))
  // const maxTailY = Math.max(...history.map((state) => state.tail.y))
  // const minTailX = Math.min(...history.map((state) => state.tail.x))
  // const minTailY = Math.min(...history.map((state) => state.tail.y))

  // const maxX = Math.max(maxHeadX, maxTailX)
  // const maxY = Math.max(maxHeadY, maxTailY)
  // const minX = Math.min(minHeadX, minTailX)
  // const minY = Math.min(minHeadY, minTailY)

  console.log('maxX: ', maxX)
  console.log('maxY: ', maxY)
  console.log('minX: ', minX)
  console.log('minY: ', minY)


  // let output = ''
  const grid: string[][] = Array(maxX + 1).fill(Array(maxY + 1).fill('.'))

  // console.table(grid)

  /*
  // for (let i = ropeLength - 1; i >= 0; i--) {
  //   console.log('knot: ', i)
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (grid[x] == null) grid[x] = []
      for (let i = ropeLength - 1; i >= 0; i--) {
        if (x === history[history.length - 1]![i]!.x && y === history[history.length - 1]![i]!.y) {
          console.log('i: ', i)
          grid[x]![y] = String(i)
          // output += String(i)
        }
        // else {
        //   grid[x]![y] = '.'
        //   // output += '.'
        // }
      }
    }
    // output += '\n'
  }
  // }
  */


  // console.log(output)
  // if (history.length % 10 === 0) {
  //   print(`State after move ${history.length}:\n`)
  //   print(output)
  //   print()
  // }
}



function simulateRope (lines: string[], print: (line?: string) => void, ropeLength: number) {


  // console.log('ropeLength: ', ropeLength)
  const history: RopeHistory = [Array(ropeLength).fill({ x: 0, y: 0 })]
  // console.log(history)
  // console.log(history[0])

  lines.forEach((line) => {
    if (line == null) return
    const direction = line.split(' ')[0]
    const distance = parseInt(line.split(' ')[1]!)

    // console.log('Instruction: ', line)

    for (let scalar = 0; scalar < distance; scalar++) {
      // @rose, i got so fooled by pass by reference here, i'll never recover!! 🔥
      const nextState = _.cloneDeep(history[history.length - 1])

      // console.log('nextState: ', nextState)

      if (nextState == null) return
      if (nextState[0] == null) return

      // * update head, note that we work with an inverted y-axis
      if (direction === 'D') nextState[0] = { x: nextState[0].x, y: nextState[0].y + 1 }
      if (direction === 'U') nextState[0] = { x: nextState[0].x, y: nextState[0].y - 1 }
      if (direction === 'R') nextState[0] = { x: nextState[0].x + 1, y: nextState[0].y }
      if (direction === 'L') nextState[0] = { x: nextState[0].x - 1, y: nextState[0].y }

      for (let i = 1; i <= ropeLength - 1; i++) {
        if (nextState[i] == null) return
        if (nextState[i - 1] == null) return
        // console.log(`Rope Piece (being pulled): ${i}`)
        if (Math.abs(nextState[i - 1]!.x - nextState[i]!.x) > 1 || Math.abs(nextState[i - 1]!.y - nextState[i]!.y) > 1) {
          /* eslint-disable no-multi-spaces */
          if (nextState[i - 1]!.x === nextState[i]!.x      && nextState[i - 1]!.y < nextState[i]!.y)   nextState[i] = { x: nextState[i]!.x,     y: nextState[i]!.y - 1 }   // up
          else if (nextState[i - 1]!.x > nextState[i]!.x   && nextState[i - 1]!.y < nextState[i]!.y)   nextState[i] = { x: nextState[i]!.x + 1, y: nextState[i]!.y - 1 }   // up-right
          else if (nextState[i - 1]!.x > nextState[i]!.x   && nextState[i - 1]!.y === nextState[i]!.y) nextState[i] = { x: nextState[i]!.x + 1, y: nextState[i]!.y     }   // right
          else if (nextState[i - 1]!.x > nextState[i]!.x   && nextState[i - 1]!.y > nextState[i]!.y)   nextState[i] = { x: nextState[i]!.x + 1, y: nextState[i]!.y + 1 }   // down-right
          else if (nextState[i - 1]!.x === nextState[i]!.x && nextState[i - 1]!.y > nextState[i]!.y)   nextState[i] = { x: nextState[i]!.x,     y: nextState[i]!.y + 1 }   // down
          else if (nextState[i - 1]!.x < nextState[i]!.x   && nextState[i - 1]!.y > nextState[i]!.y)   nextState[i] = { x: nextState[i]!.x - 1, y: nextState[i]!.y + 1 }   // down-left
          else if (nextState[i - 1]!.x < nextState[i]!.x   && nextState[i - 1]!.y === nextState[i]!.y) nextState[i] = { x: nextState[i]!.x - 1, y: nextState[i]!.y     }   // left
          else if (nextState[i - 1]!.x < nextState[i]!.x   && nextState[i - 1]!.y < nextState[i]!.y)   nextState[i] = { x: nextState[i]!.x - 1, y: nextState[i]!.y - 1 }   // up-left
          /* eslint-enable no-multi-spaces */
        }
      }

      history.push(nextState)
      // visualizeRope(history, print, ropeLength)
    }
  })

  const tailCoords = history.map((state) => `${state[state.length - 1]!.x},${state[state.length - 1]!.y}`)
  // console.log(tailCoords)
  const uniqueTailCoords = tailCoords.reduce<string[]>((acc, coord) => {
    if (acc.includes(coord)) return acc
    return [...acc, coord]
  }, [])
  // console.log(uniqueTailCoords)
  return uniqueTailCoords.length
}


function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  // no code yet prediction: part 2 let's the rope have length n

  const partOne = simulateRope(lines, print, 2)
  const partTwo = simulateRope(lines, print, 10)

  print('Being able to calculate the state of the entire universe in a deterministic manner, the Boltzmann Brain has no use for logging output. However, it does observe the following:\n')
  print()
  print(`⭐️ Part 1, the tail visited ${partOne} unique coordinates.\n`)
  print()
  print(`⭐️ Part 2, the tail visited ${partTwo} unique coordinates.\n`)
  print()
  print('The brain does make the assertion also that it will revisit this problem when it has more time to think about it.\n')


  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
