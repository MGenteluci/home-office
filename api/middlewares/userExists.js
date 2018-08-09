const User = require('../models/User');

module.exports = (req, res, next) => {

    User.findOne({ username: req.body.username })
    .then(user => {
        if(user)
            return res.status(226).json({ message: 'Username already in use' });

        next();
    })
    .catch(err => res.status(500).json({ error: err }));

};