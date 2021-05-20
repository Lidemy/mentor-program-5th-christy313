// LIOJ 1021
const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  const n = Number(lines[0])
  let result = ''
  for (let i = 0; i < n; i++) {
    result += '*'
    console.log(result)
  }
}
