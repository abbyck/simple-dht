const redis = require('redis');

const client = redis.createClient();
client.on('connect', () => {
    console.log('connected to redis\n');
});

module.exports = client;