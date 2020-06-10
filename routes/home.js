const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	// res.send([1, 2, 3, 4, 5]);
	res.render('index', { title: 'express App', message: 'Hello' });
});

module.exports = router;
