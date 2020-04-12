const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http')
const socketServer =require('socket.io')

const app = express();

const gameModel = require('../models/GameModel')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

require('./routes/gameRoutes')(app);

// MONGOOSE CONNECT
// ===========================================================================
const connectionString = 'mongodb+srv://ckreeftmeijer:Chr1$tiaan@cluster0-cocre.azure.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connectionString, { useNewUrlParser: true })

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

  socket.on('addItem',(addData)=>{
		var todoItem = new gameModel({
			itemId:addData.id,
			item:addData.item,
			completed: addData.completed
		})

		todoItem.save((err,result)=> {
			if (err) {console.log("---Gethyl ADD NEW ITEM failed!! " + err)}
			else {
				// connections.forEach((currentConnection)=>{
				// 	currentConnection.emit('itemAdded',addData)
				// })
				io.emit('itemAdded',addData)

				console.log({message:"+++Gethyl ADD NEW ITEM worked!!"})
			}
		})
	})

	socket.on('markItem',(markedItem)=>{
		var condition   = {itemId:markedItem.id},
			updateValue = {completed:markedItem.completed}

		gameModel.update(condition,updateValue,(err,result)=>{
			if (err) {console.log("---Gethyl MARK COMPLETE failed!! " + err)}
			else {
				// connections.forEach((currentConnection)=>{
				// 	currentConnection.emit('itemMarked',markedItem)
				// })
				io.emit('itemMarked',markedItem)

				console.log({message:"+++Gethyl MARK COMPLETE worked!!"})
			}
		})
	})

});
