// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_12_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 12 task: Introduce the tragedy..'
const invocation = '️/legacy/bin/shakespeare fairVerona.script'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

function puzzleFunction (input: string, print: (line?: string) => void) {
  const intro = [
    'Two households, both alike in dignity,',
    'In fair Verona, where we lay our scene,',
    'From ancient grudge break to new mutiny,',
    'Where civil blood makes civil hands unclean.',
    'From forth the fatal loins of these two foes',
    'A pair of star-cross\'d lovers take their life;',
    'Whose misadventured piteous overthrows',
    'Do with their death bury their parents\' strife.',
    'The fearful passage of their death-mark\'d love,',
    'And the continuance of their parents\' rage,',
    'Which, but their children\'s end, nought could remove,',
    'Is now the two hours\' traffic of our stage;',
    'The which if you with patient ears attend,',
    'What here shall miss, our toil shall strive to mend.'
  ]
  intro.map((line) => {
    print(line + '\n')
    return true
  })

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
