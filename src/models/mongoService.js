const Game = require('./GameSchema');

const connectionString = 'mongodb+srv://ckreeftmeijer:Chr1$tiaan@cluster0-cocre.azure.mongodb.net/test?retryWrites=true&w=majority'
const mongoose = require('mongoose')

async function createGame(name) {
  return new Game({
    name,
    currentPlayer: 0,
    players: [
      {name: 'Player 1', score: 501},
      {name: 'Player 2', score: 501}
    ],
    created: Date.now()
  }).save()
}

async function findGame(name) {
  return await Game.findOne({ name })
}

;(async () => {
  const connector = mongoose.connect(connectionString)
  const gamename = 'test' // add proces stuff

  let game = await connector.then(async () => {
    return findGame(gamename)
  })

  if (!game) {
    game = await createGame(gamename)
  }

  console.log(game)
  process.exit(0)
})()
