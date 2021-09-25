// show top games in navbar
const apiURL = 'https://api.twitch.tv/kraken/'
const header = {
  headers: {
    'Client-ID': 'ywbir8sjdqc0x6qxo2ic5cjh4igwl3',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}
const streamTemplate = `
  <div class="card">
    <img src="$preview">
    <div class="card-des">
      <div class="card-avatar">
        <img src="$logo" />
      </div>
      <div class="card-intro">
        <div class="card-title">$status</div>
        <div class="card-gamer">$name</div>
      </div>
    </div>
  </div>
`
// get top 5 games
async function getTopGames() {
  const response = await fetch(`${apiURL}games/top`, header)
  const result = await response.json()
  return result
}

// get streams
async function getStreams(gameName) {
  const response = await fetch(`${apiURL}streams/?game=${encodeURIComponent(gameName)}`, header)
  const result = await response.json()
  return result
}

async function updateStreams(gameName) {
  try {
    const result = await getStreams(gameName)
    for (let i = 0; i < 20; i++) {
      const card = document.createElement('div')
      const streamData = result.streams[i]
      card.innerHTML = streamTemplate
        .replace('$preview', streamData.preview.large)
        .replace('$logo', streamData.channel.logo)
        .replace('$status', streamData.channel.status)
        .replace('$name', streamData.channel.name)
      document.querySelector('.cards').appendChild(card)
    }
  } catch (err) {
    console.log(err)
  }
}

async function runTopGames() {
  try {
    const result = await getTopGames()
    for (let i = 0; i < 5; i++) {
      const element = document.createElement('li')
      element.innerText = result.top[i].game.name
      document.querySelector('.gamelist').appendChild(element)
    }
    document.querySelector('h1').innerText = result.top[0].game.name
    updateStreams(result.top[0].game.name)
  } catch (err) {
    console.log(err)
  }
}
runTopGames()

document.querySelector('.gamelist').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gameNavList = e.target.innerText
    document.querySelector('h1').innerText = gameNavList
    document.querySelector('.cards').innerHTML = ''
    updateStreams(gameNavList)
  }
})
