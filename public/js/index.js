	var socket = io();

	socket.on('connect', function(){
		console.log('Connected to server');
	});

	socket.on('disconnect',function (){
		console.log('Disconnect from server');
	});

	socket.on('newMessage', function (message) {
		var formattedTime = moment(message.createdAt).format('h:mm a');
  		var template = jQuery('#message-template').html();	
  		var html = Mustache.render(template, {
  			text: message.text, 
  			from: message.from,
  			createAt: formattedTime
  		});
  		jQuery('#messages').append(html);
  		
  		// var li = jQuery('<li></li>');
  		// li.text(`${message.from} ${formattedTime}: ${message.text}`);
  		// jQuery('#messages').append(li);
	});


	jQuery('#message-form').on('submit', function (e) {
  		e.preventDefault();


  		var messageTextbox = jQuery('[name=message]');
  		socket.emit('createMessage', {
   		 	from: 'User',
   			text: messageTextbox.val()
		}, function () {

			messageTextbox.val('');

  		});
	});

	socket.on('newLocationMessage', function(message){

		var formattedTime = moment(message.createdAt).format('h:mm a');
  		var template = jQuery('#location-message-template').html();	
  		var html = Mustache.render(template, {

  			from: message.from,
  			url: message.url,
  			createAt: formattedTime
  		});
  		jQuery('#messages').append(html);

	});

	var locationButton = jQuery('#send-location');


	locationButton.on('click', function(){
		if(!navigator.geolocation) {
			return alter('Geolocation not supportd by your browser');
		}

		locationButton.attr('disabled', 'disabled').text('Sending location...');


		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disbaled').text('Send Location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function() {
		    locationButton.removeAttr('disbaled').text('Send Location');
			alert('Unable to fetch locaiton');
		});
	});	