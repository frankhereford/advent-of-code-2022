/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { debug } from 'console'
import { input, testInput } from './day_08_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 8: This one goes out to Jennifer Miller @ UT. She introduced me to ATD, and she taught me that Canada (Charlie!) invented GIS in their forestry service around 1963. 💯\n\nSee this article by the late, great Roger Tomlinson: https://www.esri.com/news/arcnews/fall12articles/origins-of-the-canada-geographic-information-system.html'
const invocation = '️cat ./sightLines.survey > /dev/theodolite # 📕 we lost the manual some ways back...'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(testInput, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function partOne (lines: string[], print: (line?: string) => void) {
  // 🤖 make a typescript array of arrays of numbers
  const numbers = lines.map(line => line.split('').map(n => parseInt(n)))

  const isVisible = lines.map(line => line.split('').map(n => false))

  // * 👀 down via a file
  let y = 0
  for (let x = 0; x < numbers[y]!.length; x++) { // the column
    let tallestTreeSeen = -1 // i like this to make every edge tree visible
    for (let y = 0; y < numbers.length; y++) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        const msg = `Looking down file ${x}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible\n`
        if (x % 20 === 0 && y % 20 === 0) print(msg)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  // * 👀 right via a rank
  let x = 0
  for (let y = 0; y < numbers[x]!.length; y++) { // the column
    let tallestTreeSeen = -1
    for (let x = 0; x < numbers.length; x++) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        const msg = `Looking right rank ${y}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible\n`
        if (x % 20 === 0 && y % 20 === 0) print(msg)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  // * 👀 up via a file
  y = 0
  for (let x = 0; x < numbers[y]!.length; x++) { // the column
    let tallestTreeSeen = -1
    for (let y = numbers.length - 1; y >= 0; y--) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        const msg = `Looking up via file ${x}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible\n`
        if ((x - numbers.length) % 10 === 0 && (y - numbers.length) % 10 === 0) print(msg)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  // * 👀 left via a rank
  x = 0
  for (let y = 0; y < numbers[x]!.length; y++) { // the column
    let tallestTreeSeen = -1
    for (let x = numbers.length - 1; x >= 0; x--) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        const msg = `Looking left via rank ${y}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible\n`
        if (x % 10 === 0 && y % 10 === 0) print(msg)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  // 🤖 count the number of trues in a two dimensional array
  const count = isVisible.reduce((acc, row) => {
    return acc + row.reduce((acc, cell) => {
      return acc + (cell ? 1 : 0)
    }, 0)
  }, 0)

  print(`⭐️ ${count} trees are visible from the perimeter of the forest`)
  return count
}

function partTwo (lines: string[], print: (line?: string) => void) {
  // 🤖 make a typescript array of arrays of numbers
  const numbers = lines.map(line => line.split('').map(n => parseInt(n)))


  const y = 0
  for (let x = 0; x < numbers[y]!.length; x++) { // the column
    for (let y = 0; y < numbers.length - 1; y++) {
      const msg = `Inspecting from tree ${y} ${x}\n`
      console.log('')
      console.log(msg)
      print(msg)

      const localHeight = numbers[y]![x]!

      // // * 👀 look down
      // let seeDistanceDown = 0
      // let maxHeightSeenDown = -1
      // let finished = false
      // if (numbers[y + 1]![x]! < localHeight) seeDistanceDown = seeDistanceDown + 1
      // for (let yPeek = y + 1; yPeek < numbers.length - 1; yPeek++) {
      //   if (!finished) {
      //     if (numbers[yPeek]![x]! > maxHeightSeenDown) {
      //       finished = true
      //     }
      //     seeDistanceDown = seeDistanceDown + 1 // where is the ++ operator, for real?
      //     maxHeightSeenDown = numbers[yPeek]![x]!
      //   }
      //   const msg = `Looking down from ${y} ${x} at ${yPeek} ${x}\n`
      //   print(msg)
      //   console.log(`seenCount(${yPeek},${x}) = (height: ${numbers[yPeek]![x]!}): max height seen: ${maxHeightSeenDown} / seenDistance: ${seeDistanceDown}`)
      // }
      // console.log('final seenCountDown: ', seeDistanceDown)


      // // * 👀 look right
      // let seeDistanceRight = 0
      // let maxHeightSeenRight = -1
      // let finished = false

      // if (numbers[y]![x + 1]! < localHeight) seeDistanceRight = seeDistanceRight + 1
      // for (let xPeek = x + 1; xPeek < numbers.length - 1; xPeek++) {
      //   console.log(`Inspecting ${y} ${xPeek}`)
      //   if (!finished) {
      //     if (numbers[y]![xPeek]! >= maxHeightSeenRight) {
      //       finished = true
      //     }
      //     seeDistanceRight = seeDistanceRight + 1
      //     maxHeightSeenRight = numbers[y]![xPeek]!
      //     console.log(`seenCount(${y},${xPeek}) = (height: ${numbers[y]![xPeek]!}): max height seen: ${maxHeightSeenRight} / seenDistance: ${seeDistanceRight}`)
      //   }
      // }
      // console.log('final seenCountRight: ', seeDistanceRight)







    }
  }



  console.table(numbers)
}


function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  partOne(lines, print)
  print()

  partTwo(lines, print)
  print()

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
