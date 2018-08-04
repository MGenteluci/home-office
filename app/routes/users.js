const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');

/**
 * Request to fetch all users
 * @method GET
 */
router.get('/', (req, res, next) => {
    User.find()
    .select('name day')
    .exec()
    .then(results => {
        res.format({
            json: () => {
                res.status(200).json(results);
            },
            html: () => {
                res.render('users', { users: results, title: 'Home-Office Schedule' });
            }
        });
    })
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Request to add a new user
 * @method POST
 */
router.post('/', (req, res, next) => {
    let dia = req.body.day
    .split('-')
    .reverse();
    const dayFormatted = `${dia[0]}/${dia[1]}/${dia[2]}`;

    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        day: dayFormatted
    });

    user.save()
    .then(result => {
        res.format({
            json: () =>{
                res.status(201).json({ message: 'User added' });
            },
            html: () => {
                res.redirect('/users');
            }
        });
    })
    .catch(err => {
        res.format({
            json: () => {
                res.status(500).json({ error: err });
            },
            html: () => res.redirect('/users', { errors: 'Campos precisam ser preenchidos '})
        });
    });
});

/**
 * Request to remove an user from html FORM
 * IT'S NOT RECOMMENDED TO REMOVE ANY DATA USING GET METHOD
 * @method GET
 */
router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    User.remove({ _id: id })
    .exec()
    .then(result => {
        res.format({
            json: () => {
                res.status(200).json({ message: 'User deleted'});
            },
            html: () => {
                res.redirect('/users');
            }
        });
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;