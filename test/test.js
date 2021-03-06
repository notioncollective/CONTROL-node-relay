var door = require('../app/controllers/door');

describe('CONTROL node relay: serial port', function() {
	describe('Door control', function(){
		it('Should be able to connect to given port', function(done){
			door.listen('/dev/tty.usbmodem241441', {}, done);
		});

		it('Should be able to find a matching port', function(done){
			door.listen(null, {}, done);
		});

		it('Should be able to recieve data', function(done){
			door.listen();
			door.events.once('data', done);
		});

		it('should be able to ping the aruino and get a response', function(done){
			throw new Error('not yet implemented');
		});

		it('should recieve an id from the control unit when card is swiped', function(done) {
			throw new Error('not yet implemented');
		});
	});
});