const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http')
const socketServer =require('socket.io')
const path = require('path');

const app = express();

mongoose.set('useFindAndModify', false)
const gameModel = require('../models/GameModel')
const Game = mongoose.model('Game');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


require('./routes/gameRoutes')(app);

// Serve the static files from the React app
// app.use('/', express.static('build'));
app.use(express.static(__dirname))  //here is important thing - no static directory, because all static :)

// Handles any requests that don't match the ones above

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../../build/')});
});



// MONGOOSE CONNECT
// ===========================================================================
const connectionString = 'mongodb+srv://ckreeftmeijer:Chr1$tiaan@cluster0-cocre.azure.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connectionString, {
  useNewUrlParser: true ,
  useUnifiedTopology: true,
})

var db = mongoose.connection
db.on('error', ()=> {console.log( '--- FAILED to connect to mongoose')})
db.once('open', () => {
	console.log( '+++ connected to mongoose')
})

var server = http.createServer(app);
var io = socketServer(server);
server.listen(8080)


/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connections = [];
io.on('connection', function (socket) {
	console.log("Connected to Socket!!"+ socket.id)
	connections.push(socket)
	socket.on('disconnect', function(){
		console.log('Disconnected - '+ socket.id);
	});

	socket.on('updateGame', (game) => {
		console.log(game)
		Game.findByIdAndUpdate(game._id, game).then(
			data => io.emit('gameUpdated', game)
		)
	})

});
