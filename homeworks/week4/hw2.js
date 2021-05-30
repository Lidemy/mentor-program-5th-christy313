const request = require('request')
const process = require('process')

const action = process.argv[2]
const params = process.argv[3]

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

switch (action) {
  case 'list':
    listBook()
    break
  case 'read':
    readBook(params)
    break
  case 'delete':
    deleteBook(params)
    break
  case 'create':
    createBook(params)
    break
  case 'update':
    updateBook(params, process.argv[4])
    break
  default:
    console.log('Available commands: list, read, delete, create and update')
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
      console.log(book.name)
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
      console.log('刪除成功', book)
    })
}

function createBook(name) {
  request.post(
    {
      url: `${API_ENDPOINT}/books`,
      form: {
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
      console.log('新增成功', book)
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
      console.log('更新成功', book)
    })
}
