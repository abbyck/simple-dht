const log = (req, res, next) => {
	let ip = req.ip;
    console.log(`request to ${req.originalUrl} from ${ip}\n`);
    next();
};

module.exports = log;
