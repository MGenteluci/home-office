const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * Request to create a new user
 * bcrypt used to hash the password
 * @method POST
 */
router.post('/signup', (req, res, next) => {
    
    User.find({ username: req.body.username })
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({ message: 'Username already in use! '});
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({ error: err });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        surname: req.body.surname,
                        username: req.body.username,
                        password: hash
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
        }
    });

});

/**
 * Request to login
 * @method POST
 */
router.post('/signin', (req, res, next) => {

    User.find({ username: req.body.username })
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
                    token: token
                });
            }
            res.status(401).json({ message: 'Unauthorized access' });
        });

    })
    .catch(err => res.status(500).json({ message: 'Unauthorized access' }));

});

/**
 * Request to delete an User
 * @method DELETE
 * @param id
 */
router.delete('/:id', (req, res, next) => {
    
    User.remove({ _id: req.params.id })
    .exec()
    .then(result => res.status(200).json({ message: 'User deleted' }))
    .catch(err => res.status(500).json({ error: err }));

});

/**
 * Request to fetch all users
 * @method GET
 */
router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;