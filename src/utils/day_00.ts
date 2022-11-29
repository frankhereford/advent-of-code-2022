export const terminalSpeed = 1
export const terminalVariability = 3
export const invocation = '/usr/bin/perl -w ./pascal4lyfe.pl'

// * imaginary problem:
// * print pascal's triangle to the terminal n times, each time printing n rows
// * let n = 20

const n = 20

export function solution (printFn: (line: string) => void) {
  for (let i = 1; i <= n; i++) {
    printPascalsTriangle(printFn, i)
  }
}

function printPascalsTriangle (printFn: (line: string) => void, n: number) {
  let line = ''

  for (let i = 0; i < n; i++) {
    let C = 1 // used to represent C(line, i)
    for (let j = 1; j <= i; j++) {
      line += String(C) + ' '
      C = (C * (i - j)) / j
    }
    line += '\n'
  }
  printFn(line)
}
