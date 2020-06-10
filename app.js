const express = require('express');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const app = express();

app.use(express.json()); // req.body is set
app.use(express.urlencoded({ extended: true })); // url encoded payload key=value&key=value
app.use(express.static('public'));

app.set('view engine', 'pug'); // express internally load pug with this.
app.set('views', './views'); // optionally change the path

// 3rd party middleware like helmet,morgan.

// configuration we have npm rc and npm config.
// dont put password on config files. We store password in environment varibale
// like export app_password=1234
// read them with config custom-environmnet-variables
console.log(`App Name ${config.get('name')}`);
console.log(`App Name ${config.get('mail.host')}`);

console.log('Node ENV ', process.env.NODE_ENV); // undefined.

console.log('Express ', app.get('env')); // development.

// debug statements. debug npm package. We use by setting environmnet variable.
// export DEBUG=app:startup,app:db export DEBUG=app:*, DEBUG=app:* nodemon index.js
if (app.get('env') === 'development') {
	startupDebugger('Started');
}

dbDebugger('Connected with db');

// Templating engines -> PUG or JADE, Mustache, EJS

app.use((req, res, next) => {
	console.log('Logging');
	next();
});

app.get('/', (req, res) => {
	// res.send([1, 2, 3, 4, 5]);
	res.render('index', { title: 'express App', message: 'Hello' });
});

app.listen(10202, () => console.log('server started on port 6000'));
