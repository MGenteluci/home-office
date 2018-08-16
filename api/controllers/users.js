const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Method to create a new user
 */
exports.signUp = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({ error: err });
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                password: hash,
                team: req.body.team
            });

            user.save()
            .then(result => {
                res.status(201).json({ message: 'User created!' , user: result });
            })
            .catch(err => {
                res.status(500).json({ error: err })
            });
        }
    });
};

/**
 * Method to login
 */
exports.signIn = (req, res, next) => {

    User.find({ username: req.body.username })
    .populate('team')
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({ message: 'Unauthorized access'});
            }
            if(result){
                const token = jwt.sign({ username: user[0].username, id: user[0]._id }, process.env.JWT_KEY,{
                    expiresIn: '1h'
                });

                return res.status(200).json({
                    message: 'Authentication succeeded',
                    token: token,
                    user: user
                });
            }
            res.status(401).json({ message: 'Unauthorized access' });
        });

    })
    .catch(err => res.status(500).json({ message: 'Unauthorized access' }));

};

exports.removeUser = (req, res, next) => {
    
    User.remove({ _id: req.params.id })
    .exec()
    .then(result => res.status(200).json({ message: 'User deleted' }))
    .catch(err => res.status(500).json({ error: err }));

};

exports.getAllUsers = (req, res, next) => {
    User.find()
    .populate('team')
    .sort({name: 'asc'})
    .exec()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err }));
};

exports.updateUsersTeam = (req, res, next) => {

    User.update({ _id: req.body.userId }, { $set: { team: req.body.teamId }})
    .exec()
    .then(result => res.status(202).json({ message: 'Team added' }))
    .catch(err => res.status(500).json({ error: err }));

};