// LIOJ 1004
const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  const n = lines[0]
  for (let i = 1; i <= n; i++) {
    const temp = lines[i].split(' ')
    const a = temp[0]
    const b = temp[1]
    const p = Number(temp[2])
    console.log(compare(a, b, p))
  }
}

function compare(a, b, p) {
  if (a === b) return 'DRAW'

  if (p === -1) {
    const temp = a
    a = b
    b = temp
  }

  const lengthA = a.length
  const lengthB = b.length

  if (lengthA !== lengthB) {
    return lengthA > lengthB ? 'A' : 'B'
  }
  return a > b ? 'A' : 'B'
}
