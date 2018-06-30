	var socket = io();

	socket.on('connect', function(){
		console.log('Connected to server');

		// socket.emit('createEmail', {
		// 	to:'jen@example.com',
		// 	text: 'Hey this is Anddrew'
		// });

		socket.emit('createMessage', {
			from: 'Andrew',
			text: 'Yup, that works'
		})

	});

	socket.on('disconnect',function (){
		console.log('Disconnect from server');
	});

	//Listener for the emit from server
	// socket.on('newEmail', function(email){
	// 	console.log('New email', email);

	// });

	socket.on('newMessage', function(message){
		console.log('newMessage', message);
	});