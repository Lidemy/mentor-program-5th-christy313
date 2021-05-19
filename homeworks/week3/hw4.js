// LIOJ 1030
const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  const str = lines[0]
  if (Palindrome(str) === str) {
    console.log('True')
  } else {
    console.log('False')
  }
}

function Palindrome(str) {
  let result = ''
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i]
  }
  return result
}
