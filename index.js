/* global
console.log();
setTimeout();
clearTimeout();
setInterval();
clearInterval();
*/
var message = '';
console.log(global.message);
//console.log(module);

const Logger = require('./middleware/logger');
const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');

const logger = new Logger();
logger.log('Hello');

let pathObj = path.parse(__filename);
console.log(pathObj);
console.log(os.version());

const files = fs.readdirSync('./');
console.log(files);

// fs.readdir("./", (err, files) => {
//   if (err) console.log("Error ", err);
//   else console.log("Results ", files);
// });

// register a listener.
logger.on('messageLogged', (arg) => {
	console.log('Listener called with Argument ', arg);
});

logger.log('Message');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.write('Hello World');
		res.end();
	}

	if (req.url === '/api/courses') {
		res.write(JSON.stringify([1, 2, 3, 4]));
		res.end();
	}
});

//server.on("connection", (soc) => console.log("Connecton ", soc));
server.listen(4000);

console.log('Listening on port 4000');
