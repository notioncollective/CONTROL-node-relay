module.exports = function(app){
	var dashboard = require('../app/controllers/dashboard')
		, door = require('../app/controllers/door')
		, osc = require('../app/controllers/osc')
		, soundEvents = require('../app/controllers/sound-events');



	// dashboard
	app.namespace('/', function() {

	});

	// soundEvents
	app.namespace('/soundEvents', function(){

	});

};
