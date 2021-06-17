document
  .querySelector('.create')
  .addEventListener('click', () => {
    const todolist = document.querySelector('.input-todo').value
    if (!todolist) return

    const addNew = document.createElement('div')
    addNew.classList.add('todo')
    addNew.innerHTML =
    `
      <input class="check" type="checkbox">
      <div class="todo-list">${escapeHtml(todolist)}</div>
      <button class="delete">x</button>
    `

    document.querySelector('.content').appendChild(addNew)
    document.querySelector('.input-todo').value = ''
  })

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 刪除功能

document
  .querySelector('.content')
  .addEventListener('click', (e) => {
    const { target } = e
    if (target.classList.contains('delete')) {
      target.parentNode.remove()
      return
    }

    if (target.classList.contains('check')) {
      const chk = target.parentNode.classList
      target.checked ? chk.add('done') : chk.remove('done')
    }
  })
