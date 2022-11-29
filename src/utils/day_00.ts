export const terminalSpeed = 1
export const terminalVariability = 3

// ! imaginary problem for imaginary day 0
// * print pascal's triangle to the terminal n times, each time printing n rows
// * let n = 20
const n = 20

// * the invocation is just a joke 🤪
/// * there's no perl running here... but it'd be a lot cooler if there was!
export const invocation = '/usr/bin/perl -w ./pascal4lyfe.pl'

// * the entry point for the solution, taking one argument
// * print is used to "print" a line to the "terminal"
export function solution (print: (line: string) => void) {
  for (let i = 1; i <= n; i++) {
    printPascalsTriangle(print, i)
  }
}

function printPascalsTriangle (print: (line: string) => void, n: number) {
  let line = ''

  for (let i = 0; i < n; i++) {
    let C = 1 // used to represent C(line, i)
    for (let j = 1; j <= i; j++) {
      line += String(C) + ' '
      C = (C * (i - j)) / j
    }
    line += '\n'
  }
  print(line)
}
