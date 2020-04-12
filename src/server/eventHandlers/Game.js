// socket.on("create game", function(name) {
//     console.log("game name: "  +  name);
//     //broadcast message to everyone in port:5000 except yourself.
//     socket.broadcast.emit("received", { name: name  });
//
//     //save chat to the database
//     connect.then(db  =>  {
//     console.log("connected correctly to the server");
//
//     let newGame  =  new GameSchema(name);
//     newGame.save();
//     });
// });

var Chat = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        message: message.bind(this) // use the bind function to access this.app
        ping:    ping.bind(this)    // and this.socket in events
    };
}

// Events

function

function message(text) {
    // Broadcast message to all sockets
    this.app.allSockets.emit('message', text);
});

function ping() {
    // Reply to sender
    this.socket.emit('message', 'PONG!');
});

module.exports = Chat;
