const Player = require('./PlayerSchema').playerSchema;
const  mongoose  = require("mongoose");

const  Schema  =  mongoose.Schema;
const  gameSchema  =  new Schema({
    name: { type: String },
    currentPlayer: { type: Number },
    players: { type: [Player]}
  });

let  Game  =  mongoose.model("Game", gameSchema);
module.exports  =  Game;
