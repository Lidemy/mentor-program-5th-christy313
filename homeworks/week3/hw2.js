// LIOJ 1025
const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  const data = lines[0].split(' ')
  for (let i = Number(data[0]); i <= Number(data[1]); i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function isNarcissistic(n) {
  const str = n.toString()
  const digits = str.length
  let ans = 0
  for (let i = 0; i < str.length; i++) {
    ans += Number(str[i]) ** digits
  }
  return ans === n
}
