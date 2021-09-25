import $ from 'jquery'
import { getComments, addComments } from './api'
import { appendCommentToDOM } from './utils'
import { getForm, getLoadMoreButton } from './templates'

export function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let lastId = null
  let isEnd = false
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  formClassName = `${siteKey}-add-comment-form`
  commentsSelector = '.' + commentsClassName
  formSelector = '.' + formClassName

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  const commentDOM = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', '.' + loadMoreClassName, () => {
    getNewComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentDOM, newCommentData, true)
    })
  })

  function getNewComments() {
    const commentDOM = $(commentsSelector)
    $('.' + loadMoreClassName).hide()
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      const comments = data.discussions
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment)
      }
      if (comments.length === 0) {
        isEnd = true
        $('.' + loadMoreClassName).hide()
      } else {
        lastId = comments[comments.length - 1].id
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    })
  }
}
