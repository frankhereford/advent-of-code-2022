export const terminalSpeed = 2
export const terminalVariability = 3
export const invocation = '/usr/bin/perl -w ./pascal4lyfe.pl'

export function solution (printFn: (line: string) => void) {
  for (let i = 1; i <= 20; i++) {
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
