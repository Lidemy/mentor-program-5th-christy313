/* eslint-disable */

function escape(toOutput){
  return toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F')
}

function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card mt-3 mb-3">
      <div class="card-body">
        <h5 class="card-title">${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
  `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}

function getCommentsAPI(siteKey, before, cb) {
  let url = `https://mentor-program.co/mtr04group6/christy/week12/hw1/api_comments.php?site_key=${siteKey}`
  
  if (before) {
    url += `&before=${before}`
  }
  $.ajax({
    url
  }).done((data) => {
    cb(data)
  })
}

const siteKey = 'christy'
const loadMoreButtonHTML = '<button class="btn btn-primary load-more mt-3">載入更多</button>'
let lastId = null
let isEnd = false

$(document).ready(() => {
  const commentDOM = $('.comments')
  getComments()

  $('.comments').on('click', '.load-more', () => {
    getComments()
  })

  $('.add-comment-form').submit((e) => {
    e.preventDefault()
    const newCommentData = {
      site_key: 'christy',
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val()
    }
    $.ajax({
      type: 'POST',
      url: 'https://mentor-program.co/mtr04group6/christy/week12/hw1/api_add_comments.php',
      data: newCommentData
    }).done(function(data) {
      if (!data.ok) {
        alert(data.message)
        return
      }
      nickname: $('input[name=nickname]').val('')
      content: $('textarea[name=content]').val('')
      appendCommentToDOM(commentDOM, newCommentData, true)
    })
  })
})

function getComments() {
  const commentDOM = $('.comments')
  $('.load-more').hide()
  if (isEnd) {
    return
  }
  getCommentsAPI(siteKey, lastId, data => {
    if (!data.ok) {
      alert(data.message)
      return
    }

    const comments = data.discussions
    for (const comment of comments) {
      appendCommentToDOM(commentDOM,comment)
    }
    if (comments.length === 0) {
      isEnd = true
      $('.load-more').hide()
    } else {
      lastId = comments[comments.length - 1].id
      $('.comments').append(loadMoreButtonHTML)
    }
  })
}