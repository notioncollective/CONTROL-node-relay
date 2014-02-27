var EventEmitter = require('events').EventEmitter
	, events = new EventEmitter()
	, _ = require('underscore')
	, noop = function(){}
	, serialPort = require('serialport')
	, SerialPort = serialPort.SerialPort
	, manufacturerRegExp = /Arduino/ 
	, comNameRegExp = /usbmodem\d+/
	, connection
	, defaults = {
		baudeRate: 9600
	};


function listen (port, options, callback) {
	options = _.defaults((options || {}), defaults);
	callback = callback || noop;

	findPort(port, function(err, port) {
		if(err) {
			callback(err);
			return;
		}

		// open the connection
		connection = new SerialPort(port, options);

		// on connection open
		connection.once('open', function(){
			console.info('Serial connection open on port '+port+', baude rate '+options.baudeRate);
			events.emit('open');
			callback();
		});
		connection.on('data', function(data) {
			console.info('Serial data recieved!');
			events.emit('data', data);
		});
		connection.on('close', function() {
			console.info('Serial connection closed')
		});
		connection.on('error', function(err) {
			console.error('Serial connection error:', err);
		});


	});

}


// find a port that matches
// the common arduino signature
function findPort (port, callback) {

	if(port) {
		callback(null, port);
		return;
	}

	// if no port assigned, try and find one
	// get ports
	serialPort.list(function(err, ports) {
		if(err) {
			callback(err);
			return;
		}
		// look for one that matches
		ports.forEach(function(portObj) {
			if(
				comNameRegExp.test(portObj.comName)
				&& manufacturerRegExp.test(portObj.manufacturer)
			) {
				// it only lists /dev/cu.portname, not /dev/tty.portname
				// so we're doing a replace
				port = portObj.comName.replace('cu', 'tty');
			}
		});

		if(!port) {
			callback(new Error('Port not found! Are you plugged in?'));
		} else {
			callback(null, port);
		}

	});

}

module.exports = exports = {
	listen: listen,
	findPort: findPort,
	events: events
}