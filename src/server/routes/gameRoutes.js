// /routes/gameRoutes.js
const mongoose = require('mongoose');
const Game = mongoose.model('Game');

module.exports = (app) => {

  app.get(`/api/games`, async (req, res) => {
    console.log(1)
    let games = await Game.find();
    console.log(2)
    return res.status(200).send(games);
  });

  app.get(`/api/game/:name`, async (req, res) => {
    const {name} = req.params;
    let games = await Game.findOne({name});
    return res.status(200).send(games);
  });

  app.post(`/api/game`, async (req, res) => {
    let game = await Game.create(req.body);
    return res.status(201).send({
      error: false,
      game
    })
  })

  app.put(`/api/game/:id`, async (req, res) => {
    const {id} = req.params;

    let game = await Game.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      game
    })

  });

  app.delete(`/api/game/:id`, async (req, res) => {
    const {id} = req.params;

    let game = await Game.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      game
    })

  })

}
