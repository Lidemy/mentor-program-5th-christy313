export function getForm(className, commentsClassName) {
  return `
    <div>
      <form class="${className}">
        <div class="form-group">
          <label class="mt-3">暱稱</label>
          <input name="nickname" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label class="mt-3">留言內容</label>
          <textarea name="content" class="form-control mt-3" placeholder="Leave a comment here" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">送出</button>
      </form>
      <div class="${commentsClassName}">
      </div>
    </div>
  `
}

export function getLoadMoreButton(className) {
  return `<button class="btn btn-primary ${className} mt-3">載入更多</button>`
}
