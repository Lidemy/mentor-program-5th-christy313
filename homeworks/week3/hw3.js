// LIOJ 1020
const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    if (isPrime(Number(lines[i]))) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}

function isPrime(n) {
  if (n === 1) {
    return false
  }

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}
