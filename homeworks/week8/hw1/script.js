const apiURL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errMessage = '系統不穩定，請再試一次'

document.querySelector('.draw__btn').addEventListener('click', () => {
  const req = new XMLHttpRequest()
  req.open('GET', apiURL, true)

  req.onload = () => {
    if (req.status >= 200 && req.status < 400) {
      const json = JSON.parse(req.responseText)

      let result
      try {
        result = json.prize
      } catch (err) {
        alert(errMessage)
        console.log(err)
        return
      }

      let className
      let title

      switch (result) {
        case 'FIRST':
          className = 'first-prize'
          title = '恭喜你中頭獎了！日本東京來回雙人遊！'
          break

        case 'SECOND':
          className = 'second-prize'
          title = '恭喜你中二獎！90 吋電視一台！'
          break

        case 'THIRD':
          className = 'third-prize'
          title = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
          break

        case 'NONE':
          className = 'none-prize'
          title = '銘謝惠顧'
          break
      }
      document.querySelector('.draw').classList.add(className)
      document.querySelector('.prize__title').innerText = title
      document.querySelector('.draw__content').classList.add('hide')
      document.querySelector('.prize__des').classList.remove('hide')
    } else alert(errMessage)
  }

  req.onerror = () => {
    alert(errMessage)
  }
  req.send()
})

document.querySelector('.prize__btn').addEventListener('click', () => location.reload())
