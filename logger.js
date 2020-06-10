// Module wrapper function.
const url = '';
const EventEmitter = require('events');

class Logger extends EventEmitter {
	log(message) {
		console.log(message);
		//console.log(exports);
		//console.log(module.exports === exports);

		// raise an event.
		this.emit('messageLogged', { id: 1, url: 'url' });
	}
}

module.exports = Logger;
