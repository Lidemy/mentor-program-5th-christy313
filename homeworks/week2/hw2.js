一開始的想法是有三種可能，大寫直接回傳；小寫換大寫再回傳；不是英文字母直接回傳
後來發現這想法有點多餘，所以用了下面的第二個方式
看完解答以後發現都不夠直接 

1.
function capitalize(str) {
    if (str[0] >= 'A' && str[0] <= 'Z') {
        return str
    } else if (str[0] >= 'a' && str[0] <= 'z') {
        return str[0].toUpperCase() + str.slice(1)
    } else return str
  }
  
console.log(capitalize('hello'))

2. 
function capitalize(str) {
    if (str[0] >= 'a' && str[0] <= 'z') {
      return str[0].toUpperCase() + str.slice(1)
    } else return str
  }
  
console.log(capitalize('hello'));