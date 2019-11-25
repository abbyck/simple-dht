const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();

let client = redis.createClient();

client.on('connect', () => {
    console.log('connected to redis\n');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    let ip = req.ip;
    console.log(`request to / from ${ip}\n`);
    res.json({
        status: 'connected',
    });
});

app.get('/search/:userHash', (req, res, next) => {
	let ip = req.ip;
	console.log(`request to /search/:userHash from ${ip}\n`);
    let userHash = req.params.userHash;
    console.log(ip);
    console.log(userHash);
    res.json({
		userHash,
		available: ip
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
