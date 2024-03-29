// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fs, vol } from 'memfs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input, testInput } from './day_07_input'

const terminalSpeed = 1
const terminalVariability = 1

const problemStatement = 'Day 7 task: You know, nothing big, just reinvent `ncdu`, for Christmas\' sake.'
const invocation = '️du -Aachk / # Gesundheit'

async function solution (print: (line?: string | null) => void) {
  print() // blank line
  print(await puzzleFunction(input, print))
  print('frank@advent-of-code $')
}

const day = { problemStatement, solution, invocation, terminalSpeed, terminalVariability }
export default day

// * 👇 Functions and/or whatever is helpful to get the actual job done down here 👇

// 🤖 function which returns n bytes of zeros
const getZeros = (n: number) => {
  let data = ''
  for (let i = 0; i < n; i++) {
    data = data + '0'
  }
  return data
}

// recursion in recursion 🎲
// 🤖 function which returns the size of a directory including its subdirectories and files in bytes
const getDirSize = (dir: string) => {
  const files = fs.readdirSync(dir)
  let size = 0
  for (const file of files) {
    // * ☠️ Yikes
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
    const filePath = `${dir}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
      size += stats.size
    } else if (stats.isDirectory()) {
      size += getDirSize(filePath)
    }
  }
  return size
}

interface Directory {
  filePath: string
  size: number
}

// 🤖 function which removes all the null entries from an array
// ! any ... don't use this. type it. but it's not horribly wrong here...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeUndefined = (arr: any[]) => {
  return arr.filter((item) => item !== null)
}

const walkTreeForSize = (dir: string, directories: Directory[]) => {
  const files = fs.readdirSync(dir)
  // for (const file of files) {
  files.forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
    const filePath = `${dir}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      const size = getDirSize(filePath)
      directories = walkTreeForSize(filePath, directories)
      return directories.push({ filePath, size })
    } else {
      return directories
    }
  })
  // * we don't count root in the sum
  // directories.push({ filePath: '/', size: getDirSize('/') })

  return removeUndefined(directories)
}

async function createFiles (lines: string[]) {
  let pwd = ''
  // eslint-disable-next-line @typescript-eslint/return-await
  return Promise.all(lines.map((line, index) => {
    const inputPattern = /^(\${0,1})\s*(\S+)\s*(\S*)\s*(\S*).*/ // Why do regexes have to look like line noise?
    const directive = line.match(inputPattern)
    if (directive == null) return Promise.resolve
    if (directive[2] === 'cd') {
      if (directive[3] === '/') {
        pwd = ''
      } else if (directive[3] === '..') {
        pwd = pwd.split('/').slice(0, -1).join('/')
      } else {
        // * lesson learned here: the ! operator is not a TS cheat; sometimes you just know it's not null and this is how you say it.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pwd = `${pwd}/${directive[3]!}`
        fs.mkdirSync(pwd, { recursive: true }) // * mkdir is idempotent
      }
    } else if (directive[2] === 'dir' && directive[3] != null) {
      const foundDir = `${pwd}/${directive[3]}`
      fs.mkdirSync(foundDir, { recursive: true })
    } else if (directive[2] === 'ls') {
      return Promise.resolve()
    } else if (directive[2] != null && directive[3] != null) {
      const filename = `${pwd}/${directive[3]}`
      const size = parseInt(directive[2])
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return fs.promises.writeFile(filename, getZeros(size))
      // * a cool thing we have going for us is that directories always exist when we create files in them ❄️
    }
    return Promise.resolve
  }))
}

async function puzzleFunction (input: string, print: (line?: string) => void) {
  const lines = input.split('\n')

  createFiles(lines)
    // ! this is tempting! don't do it. use the fs api.
    // .then(() => {
    //   console.log(vol.toJSON())
    // })
    .then(async () => {
      const directories = walkTreeForSize('/', [])
      const size = directories.reduce((acc, dir) => {
        if (dir.size <= 100000) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          return acc + dir.size
        }
        return acc
      }, 0)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      print(`\n⭐️ Sum of directory sizes: ${size.toString()}\n`)
    })
    .then(() => {
      const totalSize = getDirSize('/')
      const availableSize = 70000000 - totalSize
      const threshold = 30000000 - availableSize
      const directories = walkTreeForSize('/', []).sort((a, b) => {
        return a.size - b.size
      })
      const target = directories.find((dir) => {
        return dir.size >= threshold
      })

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      print(`\n⭐️ Best directory to delete: ${target.filePath} of size ${target.size}\n`)
    })
    .catch((err) => {
      console.log(err)
    })

  // * return null here to get that extra space before the waiting terminal prompt
  return null
}
