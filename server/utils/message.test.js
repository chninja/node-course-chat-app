var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=> {
	//no need to create done since its a synchronous message
	it('should generate correct message object', () => {
			//store res in variable
		//assert from match
		//assert text match
		//assert createAt
		var from = 'Jen';
		var text = 'Some message';
		var message = generateMessage(from, text);

		expect(message.createAt).toBeA('number');
		expect(message).toInclude({from, text});

	});
});


describe('generateLocationMessage', ()=> {
	
	it('should generate correct location object object', () => {
	
		var from = 'Deb';
		var latitude = 15;
		var longitude = 19;
		var url = 'https://www.google.com/maps?=q15,19';
		var message = generateLocationMessage(from, latitude,longitude);


		// expect(message.createAt).toBeA('number');
		expect(message).toInclude({from, url});


	});
});