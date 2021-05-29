const request = require('request')

request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) {
      console.log('error:', error)
      return
    }

    let obj
    try {
      obj = JSON.parse(body)
    } catch (error) {
      console.log(error)
      return
    }

    for (let i = 0; i < obj.length; i++) {
      console.log(`${obj[i].id} ${obj[i].name}`)
    }
  })
