const Client = require('./connectRedis');

const self = (req, res, next) => {
    Client.hmset(req.body.userid, ["ipaddr", req.ip, "lastupdated", Date()]);
    next();
};

module.exports = self;
