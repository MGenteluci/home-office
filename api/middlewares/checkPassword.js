const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (req, res, next) => {

    let userId = req.body.userId;
    let pwd = req.body.password;

    User.findById(userId)
    .exec()
    .then(user => {
        if(!user)
            return res.status(401).json({ message: 'Unauthorized access' });

        bcrypt.compare(pwd, user.password, (err, result) => {           
            if(result)
                return next();
            
            return res.status(401).json({ message: 'Unauthorized access' });
        });

    })
    .catch(err => res.status(500).json({ error: err }));

};