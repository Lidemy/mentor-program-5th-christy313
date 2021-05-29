const request = require('request')
const process = require('process')

const name = process.argv[2]

request(`https://restcountries.eu/rest/v2/name/${name}`,
  (error, response, body) => {
    if (error) {
      console.log('error')
      return
    }
    let str
    try {
      str = JSON.parse(body)
    } catch (error) {
      console.log(error)
      return
    }

    if (str.statusCode === 404) {
      console.log('找不到國家資訊')
      return
    }

    for (let i = 0; i < str.length; i++) {
      console.log('============')
      console.log('國家：'`${str[i].name}`)
      console.log('首都：'`${str[i].capital}`)
      console.log('貨幣：'`${str[i].currencies[0].code}`)
      console.log('國碼：'`${str[i].callingCodes[0]}`)
    }
  })
