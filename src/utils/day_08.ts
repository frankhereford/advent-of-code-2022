/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_08_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 8: This one goes out to Jennifer Miller @ UT. She introduced me to ATD, and she taught me that Canada (Charlie!) invented GIS in their forestry service around 1963. 💯\n\nSee this article by the late, great Roger Tomlinson: https://www.esri.com/news/arcnews/fall12articles/origins-of-the-canada-geographic-information-system.html'
const invocation = '️cat ./sightLines.survey > /dev/theodolite # 📕 we lost the manual some ways back...'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  // 🤖 make a typescript array of arrays of numbers
  const numbers = lines.map(line => line.split('').map(n => parseInt(n)))

  const isVisible = lines.map(line => line.split('').map(n => false))

  // * 👀 down via a file
  let y = 0
  for (let x = 0; x < numbers[y]!.length; x++) { // the column
    let tallestTreeSeen = -1 // i like this to make every edge tree visible
    for (let y = 0; y < numbers.length; y++) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        console.log(`Looking down file ${x}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible`)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  console.table(isVisible)

  // * 👀 right via a rank
  let x = 0
  for (let y = 0; y < numbers[x]!.length; y++) { // the column
    let tallestTreeSeen = -1
    for (let x = 0; x < numbers.length; x++) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        console.log(`Looking right rank ${y}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible`)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  console.table(isVisible)

  // * 👀 up via a file
  y = 0
  for (let x = 0; x < numbers[y]!.length; x++) { // the column
    let tallestTreeSeen = -1 // i like this to make every edge tree visible
    for (let y = numbers.length - 1; y >= 0; y--) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        console.log(`Looking up file ${x}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible`)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  console.table(isVisible)

  // * 👀 right via a rank
  x = 0
  for (let y = 0; y < numbers[x]!.length; y++) { // the column
    let tallestTreeSeen = -1
    for (let x = numbers.length - 1; x >= 0; x--) {
      if (numbers[y]![x]! > tallestTreeSeen) {
        console.log(`Looking right rank ${y}: Tree[${y}][${x}]: ${numbers[y]![x]!} is visible`)
        isVisible[y]![x] = true
        tallestTreeSeen = numbers[y]![x]!
      }
    }
  }

  console.table(isVisible)

  // count the number of trues in a two dimensional array
  const count = isVisible.reduce((acc, row) => {
    return acc + row.reduce((acc, cell) => {
      return acc + (cell ? 1 : 0)
    }, 0)
  }, 0)

  console.log(count)


  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
