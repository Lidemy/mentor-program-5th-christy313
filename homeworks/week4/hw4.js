const request = require('request')

request({
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'ywbir8sjdqc0x6qxo2ic5cjh4igwl3'
  }
},
(err, res, body) => {
  if (err) {
    console.log(err)
    return
  }

  let data
  try {
    data = JSON.parse(body)
  } catch (error) {
    console.log(error)
    return
  }
  const games = data.top
  for (let i = 0; i < games.length; i++) {
    console.log(`${games[i].viewers} ${games[i].game.name}`)
  }
}
)
