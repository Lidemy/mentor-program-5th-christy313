const request = require('request')
const process = require('process')

const action = process.argv[2]
const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

if (action === 'list') {
  listBook()
} else if (action === 'read') {
  readBook(process.argv[3])
} else if (action === 'delete') {
  deleteBook(process.argv[3])
} else if (action === 'create') {
  createBook(process.argv[3])
} else if (action === 'update') {
  updateBook(process.argv[3], process.argv[4])
} else {
  console.log('error')
}

function listBook() {
  request(`${API_ENDPOINT}/books?_limit=20`,
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
}

function readBook(id) {
  request(`${API_ENDPOINT}/books/${id}`,
    (error, response, body) => {
      if (error) {
        console.log('error:', error)
        return
      }

      let book
      try {
        book = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }
      console.log(book)
    })
}

function deleteBook(id) {
  request.delete(`${API_ENDPOINT}/books/${id}`,
    (error, response, body) => {
      if (error) {
        console.log('error:', error)
        return
      }

      let book
      try {
        book = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }
      console.log(book)
    })
}

function createBook(name) {
  request.post(
    {
      url: `${API_ENDPOINT}/books`,
      form: {
        id: '',
        name: process.argv[3]
      }
    },
    (error, response, body) => {
      if (error) {
        console.log('error:', error)
        return
      }

      let book
      try {
        book = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }
      console.log(book)
    }
  )
}

function updateBook(id, name) {
  request.patch(
    {
      url: `${API_ENDPOINT}/books/${id}`,
      form: {
        name
      }
    },

    (error, response, body) => {
      if (error) {
        console.log('error:', error)
        return
      }

      let book
      try {
        book = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }
      console.log(book)
    })
}
