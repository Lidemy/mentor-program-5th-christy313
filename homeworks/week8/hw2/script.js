const req = new XMLHttpRequest()
const topURL = 'https://api.twitch.tv/kraken/games/top?limit=5'

req.open('GET', topURL, true)

req.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
req.setRequestHeader('Client-ID', 'ywbir8sjdqc0x6qxo2ic5cjh4igwl3')

req.onload = () => {
  if (req.status >= 200 && req.status < 400) {
    const games = JSON.parse(req.response).top
    for (let i = 0; i < games.length; i++) {
      const gameName = document.createElement('li')
      gameName.innerText = games[i].game.name
      document.querySelector('.gamelist').appendChild(gameName)
    }
    document.querySelector('h1').innerText = games[0].game.name

    const req2 = new XMLHttpRequest()
    const streamURL = 'https://api.twitch.tv/kraken/streams/?game='
    req2.open('GET', `${streamURL}${encodeURIComponent(games[0].game.name)}`, true)

    req2.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    req2.setRequestHeader('Client-ID', 'ywbir8sjdqc0x6qxo2ic5cjh4igwl3')

    req2.onload = () => {
      if (req2.status >= 200 && req2.status < 400) {
        const streamResult = JSON.parse(req2.response).streams
        for (let i = 0; i < 20; i++) {
          const card = document.createElement('div')
          card.innerHTML = `
<div class="card">
<img src="${streamResult[i].preview.large}">
<div class="card-des">
<div class="card-avatar">
<img src="${streamResult[i].channel.logo}" />
</div>

<div class="card-intro">
<div class="card-title">${streamResult[i].channel.status}</div>
<div class="card-gamer">${streamResult[i].channel.name}</div>
</div>
</div>
</div>`
          document.querySelector('.cards').appendChild(card)
        }
      }
    }
    req2.send()
  }
}

req.send()

document.querySelector('.gamelist').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gameNavList = e.target.innerText
    document.querySelector('h1').innerText = gameNavList
    document.querySelector('.cards').innerHTML = ''

    const req2 = new XMLHttpRequest()
    const streamURL = 'https://api.twitch.tv/kraken/streams/?game='

    req2.open('GET', `${streamURL}${encodeURIComponent(gameNavList)}`, true)

    req2.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    req2.setRequestHeader('Client-ID', 'ywbir8sjdqc0x6qxo2ic5cjh4igwl3')

    req2.onload = () => {
      if (req2.status >= 200 && req2.status < 400) {
        const streamResult = JSON.parse(req2.response).streams
        for (let i = 0; i < 20; i++) {
          const card = document.createElement('div')
          card.innerHTML = `
<div class="card">
<img src="${streamResult[i].preview.large}">
<div class="card-des">
<div class="card-avatar">
<img src="${streamResult[i].channel.logo}" />
</div>

<div class="card-intro">
<div class="card-title">${streamResult[i].channel.status}</div>
<div class="card-gamer">${streamResult[i].channel.name}</div>
</div>
</div>
</div>`
          document.querySelector('.cards').appendChild(card)
        }
      }
    }
    req2.send()
  }
})
