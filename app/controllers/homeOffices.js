const HomeOffice = require('../models/HomeOffice');
const User = require('../models/User');

exports.formError = (req, res, next, errMessage) => {

    HomeOffice.find()
    .sort({day: 'asc'})
    .exec()
    .then(results => {
        User.find()
        .sort({name: 'asc'})
        .exec()
        .then(users => {
            res.render('homeOffices', {
                homeOffices: results,
                error: errMessage,
                users: users
            });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
}