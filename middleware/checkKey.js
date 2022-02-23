const User = require('../models/user');
const moment = require('moment');

exports.checkKey = async(req, res, next) => {
    if (req.path.startsWith("/api/auth")) {
        next();
    } else {
        let docs;

        if (!req.headers.id || !req.headers.authorization) {
            res.status(401).json({ error: `Headers are missing` });
            return;
        }

        try {
            docs = await User.findOne({ userIdCard: req.headers.id });
        } catch (err) {
            res.status(500).json({ error: `Check key Error :  ${err}` });
            return;
        }

        if (docs) {
            let userDetails = docs;
            const userDateTimeKey = userDetails.userDateTimeKey / 60;
            const now = moment().unix() / 60
            if (userDetails.userKey == 0) {
                res.status(401).json({ error: `User, You dont have key - ask for key` });
            } else if (req.headers.authorization == userDetails.userKey) {
                if (userDetails.userKey != 0 && (now - userDateTimeKey <= 10))
                    next();
                else {
                    res.status(401).json({ error: `User, more than 10 minutes have passed since you started using the key - ask for a new one` });
                }
            } else {
                res.status(401).json({ error: `User, key doesnt match` });
            }

        } else {
            res.status(404).json({ error: `User with id : ${req.headers.id} not found` });
        }
    }
}