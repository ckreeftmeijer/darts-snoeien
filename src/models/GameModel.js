const Player = require('./PlayerModel');
const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;

const playerSchema  =  new Schema({
      name: { type: String },
      score: { type: Number },
  });

const  gameSchema  =  new Schema({
    name: { type: String },
    currentPlayer: { type: Number },
    players: [playerSchema]
  });

let  Game  =  mongoose.model("Game", gameSchema);

Game.create = (body) => {
  return new Game({
    name: body.name,
    currentPlayer: 0,
    players: [
      new Player({name: 'Player 1', score: 501}),
      new Player({name: 'Player 2', score: 501}),
    ],
  }).save()
}


module.exports  =  Game;
