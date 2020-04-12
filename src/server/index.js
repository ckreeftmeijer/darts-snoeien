const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

const  GameSchema  = require("../models/GameSchema");
const  connect  = require("./dbconnect");

// const  GameEvents  = require("./eventHandlers/Game");

app.use(express.static(path.join(__dirname, '../../build')));
console.log(__dirname)
app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));

// // sockets test
// io.on('connection', socket => socket.emit('hello', { message: 'hello from server!' }));

//setup event listener
io.on("connection", socket  =>  {
    console.log("user connected");
    socket.on("disconnect", function() {
    console.log("user disconnected");
    });

    io.sockets.on('connection', function (socket) {
  });
});

io.on("create game", function(name) {
    console.log("game name: "  +  name);
    //broadcast message to everyone in port:5000 except yourself.
    io.broadcast.emit("received", { name: name  });

    //save chat to the database
    connect.then(db  =>  {
    console.log("connected correctly to the server");

    let newGame  =  new GameSchema(name);
    newGame.save();
    });
});



server.listen(port);
