const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http')
const https = require('https');
const socketServer =require('socket.io')
const path = require('path');
const fs = require( 'fs' );

const app = express();
// Heroku uses the $PORT environment variable, and it is dynamic
const PORT = process.env.PORT || 8080;

mongoose.set('useFindAndModify', false)
const gameModel = require('../models/GameModel')
const Game = mongoose.model('Game');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


require('./routes/gameRoutes')(app);

app.use('/.well-known', express.static('.well-known'));
app.use(express.static(__dirname, { dotfiles: 'allow' } ));

// Serve the static files from the React app
app.use('/', express.static('build'));

// Handles any requests that don't match the ones above
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

// var server = https.createServer({
//     key: fs.readFileSync('/etc/letsencrypt/live/domain.name/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/domain.name/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/domain.name/chain.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// },app);
// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

var server = https.createServer(credentials,app);
var io = socketServer(server);
server.listen(PORT)


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
