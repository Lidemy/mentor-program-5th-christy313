/* eslint-disable */

let id = 1
let todoCount = 0
let incomplete = 0

const template =
  `<div class="todo list-group-item align-items-baseline {restore}">
    <input type="checkbox" id="todo-{id}" class="mark"></input>
    <div class="todo-content">{content}</div>
    <button class="btn delete">delete</button>
  </div>`

const searchParams = new URLSearchParams(window.location.search)
const todoId = searchParams.get('id')

if (todoId) {
  $.getJSON(`https://mentor-program.co/mtr04group6/christy/week12/hw2/api_get_todo.php?id=${todoId}`,
    (data) => {
      const todos = JSON.parse(data.data.todo)
      restoreTodos(todos)
    })
}

$('.btn-add').click(() => {
  addNewTodo()
})

$('.new-todo').keydown((e) => {
  if (e.key === 'Enter') {
    addNewTodo()
  }
})

// 刪除 todo
$('.todo-list').on('click', '.delete', (e) => {
  const todo = $(e.target).parent()
  todo.remove()
  todoCount -= 1
  if (!todo.hasClass('checked')) {
    incomplete -= 1
  }
  Counter()
})

// 標記完成/未完成
$('.todo-list').on('click', '.mark', (e) => {
  const todo = $(e.target).parent()
  if (todo.hasClass('checked')) {
    todo.removeClass('checked')
    incomplete += 1
  } else {
    todo.addClass('checked')
    incomplete -= 1
  }
  Counter()
})

// 刪除已完成 todo
$('.clear-completed').click(() => {
  $('.checked').remove()
})

// 顯示所有 todo
$('.filter-all').click(() => {
  $('.todo').show()
})

// 顯示未完成 todo
$('.filter-active').click(() => {
  $('.todo').show()
  $('.checked').hide()
})

// 顯示完成的 todo
$('.filter-completed').click(() => {
  $('.todo').hide()
  $('.checked').show()
})

$('.btn-save').click(() => {
  const todos = []
  $('.todo').each((i, element) => {
    const isChecked = $(element).find('.mark')
    const content = $(element).find('.todo-content')
    todos.push({
      id: isChecked.attr('id').replace('todo-', ''),
      content: content.text(),
      isDone: $(element).hasClass('checked')
    })
  })
  const data = JSON.stringify(todos)
  $.ajax({
    type: 'POST',
    url: 'https://mentor-program.co/mtr04group6/christy/week12/hw2/api_add_todo.php',
    data: {
      todo: data
    },
    success: (res) => {
      console.log('res', res)
      const resId = res.id
      window.location = `index.html?id=${resId}`
    },
    error: () => {
      alert('err')
    }
  })
})

function escape(toOutput) {
  return toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F')
}

function addNewTodo() {
  const value = $('.new-todo').val()
  if (!value) return
  $('.todo-list').append(
    template
      .replace('{content}', escape(value))
      .replace(/{id}/g, id)
  )
  id += 1
  todoCount += 1
  incomplete += 1
  Counter()
  $('.new-todo').val('')
}

function Counter() {
  $('.item-count').text(incomplete)
}

function restoreTodos(todos) {
  if (todos.length === 0) return
  id = parseInt(todos[todos.length - 1].id) + 1
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i]
    $('.todo-list').append(
      template
        .replace('{content}', escape(todo.content))
        .replace(/{id}/g, todo.id)
        .replace('{restore}', todo.isDone ? 'checked' : '')
    )
    let todoCount = 0
    todoCount++
    if (todo.isDone) {
      $(`#todo-${todo.id}`).prop('checked', true)
    }
    if (!todo.isDone) {
      incomplete += 1
    }
  }
  Counter()
}
