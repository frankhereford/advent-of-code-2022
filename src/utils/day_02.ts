// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_02_input'
import { append } from './helpers'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 2 task: Get super good at RPS using the encrypted guide from the elves.'
const invocation = '️/usr/local/bin/lolcode iCanHasCheeseburgerRPS.lol'

async function solution (print: (line?: string) => void) {
  print(scoreRPS(input))
}

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

const mod = 100

interface OutcomeMap {
  [key: string]: string
}

const outcomeMap: OutcomeMap = {
  X: 'lose',
  Y: 'draw',
  Z: 'win'
}

interface Play {
  [key: string]: number
}

const plays: Play = {
  X: 1,
  Y: 2,
  Z: 3
}

interface inputMap {
  [key: string]: string
}

const shapeMap: inputMap = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
}

interface backMap {
  [key: string]: string
}

const backwardsShapeMap: backMap = {
  rock: 'X',
  paper: 'Y',
  scissors: 'Z'
}

function scoreGame (them: string, me: string) {
  const lose = 0
  const draw = 3
  const win = 6

  if (shapeMap[them] === shapeMap[me]) return draw
  if (shapeMap[them] === 'rock' && shapeMap[me] === 'paper') return win
  if (shapeMap[them] === 'rock' && shapeMap[me] === 'scissors') return lose
  if (shapeMap[them] === 'scissors' && shapeMap[me] === 'paper') return lose
  if (shapeMap[them] === 'scissors' && shapeMap[me] === 'rock') return win
  if (shapeMap[them] === 'paper' && shapeMap[me] === 'scissors') return win
  if (shapeMap[them] === 'paper' && shapeMap[me] === 'rock') return lose

  return 0
}

function computeExpectedPlay (them: string, outcome: string) {
  if (outcome === 'X') { // lose
    if (shapeMap[them] === 'rock') return backwardsShapeMap.scissors
    if (shapeMap[them] === 'paper') return backwardsShapeMap.rock
    if (shapeMap[them] === 'scissors') return backwardsShapeMap.paper
  }
  if (outcome === 'Y') { // draw
    if (shapeMap[them] === 'rock') return backwardsShapeMap.rock
    if (shapeMap[them] === 'paper') return backwardsShapeMap.paper
    if (shapeMap[them] === 'scissors') return backwardsShapeMap.scissors
  }
  if (outcome === 'Z') { // win
    if (shapeMap[them] === 'rock') return backwardsShapeMap.paper
    if (shapeMap[them] === 'paper') return backwardsShapeMap.scissors
    if (shapeMap[them] === 'scissors') return backwardsShapeMap.rock
  }
}

function scoreRPS (input: string) {
  let output = ''
  const lines = input.split('\n')
  const scores = lines.map((line, index) => {
    const letters = line.split(' ')
    if (letters[0] == null || letters[1] == null) return 0
    const playScore = plays[letters[1]] ?? 0
    const outcomeScore = scoreGame(letters[0], letters[1])
    if (index % mod === 0) {
      output = append(output, `Round ${index}: ${letters[0]} vs ${letters[1]} → ${playScore} + ${outcomeScore} = ${playScore + outcomeScore}\n`)
    }
    const score = playScore + outcomeScore
    return score
  })

  const totalScore = scores.reduce((a, b) => a + b, 0)
  output = append(output, `⭐️ Total score: ${totalScore}`, true)

  const partTwoScores = lines.map((line, index) => {
    const letters = line.split(' ')
    if (letters[0] == null || letters[1] == null) return 0
    const myPlay = computeExpectedPlay(letters[0], letters[1]) ?? ''
    const playScore = plays[myPlay] ?? 0
    const outcomeScore = scoreGame(letters[0], myPlay)
    if (index % mod === 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      output = append(output, `Round ${index}: They play ${letters[0]}/${shapeMap[letters[0]]!}, I need to ${outcomeMap[letters[1]]!}, so I play ${myPlay}/${shapeMap[myPlay]!}. Scores: ${playScore} + ${outcomeScore} = ${playScore + outcomeScore}\n`)
    }
    const score = playScore + outcomeScore
    return score
  })

  const totalScorePartTwo = partTwoScores.reduce((a, b) => a + b, 0)
  output = append(output, `⭐️ Total score part two: ${totalScorePartTwo}`, true)

  // * don't set the pad argument here
  output = append(output, 'frank@advent-of-code $')
  return output
}

// TODO really need to figure out global typing
const day = {
  problemStatement,
  solution,
  invocation,
  terminalSpeed,
  terminalVariability
}

export default day
