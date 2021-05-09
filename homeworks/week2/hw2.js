function capitalize(str) {
  if (str[0] >= 'a' && str[0] <= 'z') {
    return str[0].toUpperCase() + str.slice(1)
  } else return str
}
console.log(capitalize('hello'))
