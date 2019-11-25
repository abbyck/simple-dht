const express = require('express');
const bodyParser = require('body-parser');

const client = require('./src/middleware/connectRedis');
const UpdateSelf = require('./src/middleware/updateTable');
const Log = require('./src/middleware/log');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Log);

// prefer POST to / for connectivity check
app.get('/', (req, res, next) => {
    res.json({
        status: 'connected',
    });
});

//update requestee ip address in datastore for every other POST request
app.use(UpdateSelf);

//to check connection
app.post('/', (req, res, next) => {
    res.json({
        status: 'connected',
    });
});

app.post('/search', (req, res, next) => {
    client.hmget(req.body.searchUserid, 'ipaddr', 'lastupdated', (err, replies) => {
        console.log(replies);
        if (replies[0] == null || replies[1] == null) {
            res.json({
                status: 0,
            });
        } else {
            res.json({
                status: 1,
                userid: req.body.searchUserid,
                ipaddr: replies[1],
                lastUpdated: replies[2],
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
