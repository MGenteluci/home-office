const User = require('../models/User');

/**
 * Middleware to check if the username received from body is taken
 * if true send a json response to the user telling he can't use that username
 * if false, create the user
 */
module.exports = (req, res, next) => {

    User.findOne({ username: req.body.username })
    .then(user => {
        if(user)
            return res.status(226).json({ message: 'Username already in use' });

        next();
    })
    .catch(err => res.status(500).json({ error: err }));

};