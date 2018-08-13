const Team = require('../models/Team');

module.exports = (req, res, next) => {

    Team.findOne({ name: req.body.name })
    .exec()
    .then(team => {
        if(team)
            return res.status(226).json({ message: 'Name already used' });

        next();
    })
    .catch(err => res.status(500).json({ error: err }));
};