
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(__dirname + '/../public');//server old way
console.log(publicPath);

var app = express();
var server = http.createServer(app);
//app.listen already calls this behind the scene

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');


	socket.emit('newMessage', {
		from: 'John',
		text: 'See you then',
		createAt: 123123
	});

	//socket.emit from Admin text Welcome to the chat app
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chap app'
	});


	//socket.broadcase.emit from Admin text New user joined
	socket.broadcast.emit('newMessage',{
		from: 'Admin',
		text: 'New user joined',
		createAt: new Date().getTime()
	});

	//Listener
	socket.on('createMessage', (message)=>{
		console.log('createMessage', message);
		io.emit('newMessage', {
			from:message.from,
			text:message.text,
			createAt: new Date().getTime()
		});
		//Who it gets send to except the person
		// socket.broadcase.emit('newMessage', {
		// 	from:message.from,
		// 	text:message.text,
		// 	createAt: new Date().getTime()
		// });


	});

	socket.on('disconnect', () => {
		console.log('User was disconnect');
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});