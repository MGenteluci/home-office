const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middlewares/check-auth');
const checkDate = require('../middlewares/check-date');

const HomeOffice = require('../models/HomeOffice');
const User = require('../models/User');

/**
 * Request to fetch all Home Offices
 * @method GET
 */
router.get('/', (req, res, next) => {
    HomeOffice.find()
    .select('name day')
    .sort({day: 'asc'})
    .exec()
    .then(results => {
        res.format({
            json: () => {
                res.status(200).json(results);
            },
            html: () => {
                User.find()
                .sort({name: 'asc'})
                .exec()
                .then(users => res.render('homeOffices', {
                    homeOffices: results,
                    error: '',
                    users: users
                }))
                .catch(err => res.status(500).json(err))
            }
        });
    })
    .catch(err => res.status(500).json({ error: err }));
});

/**
 * Request to add a new Home Office
 * @method POST
 */
router.post('/', checkDate, (req, res, next) => {
    let dia = req.body.day.split('-');
    dia = new Date(dia);

    const homeOffice = new HomeOffice({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        day: dia
    });

    homeOffice.save()
    .then(result => {
        res.format({
            json: () =>{
                res.status(201).json({ message: 'Home Office added' });
            },
            html: () => {
                res.redirect('/homeOffices');
            }
        });
    })
    .catch(err => {
        res.format({
            json: () => {
                res.status(500).json({ error: err });
            },
            html: () => res.redirect('/homeOffices', { errors: 'Campos precisam ser preenchidos '})
        });
    });
});

/**
 * Request to remove a Home Office from html FORM
 * IT'S NOT RECOMMENDED TO REMOVE ANY DATA USING GET METHOD
 * @method GET
 */
router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    HomeOffice.remove({ _id: id })
    .exec()
    .then(result => {
        res.format({
            json: () => {
                res.status(200).json({ message: 'Home Office deleted'});
            },
            html: () => {
                res.redirect('/homeOffices');
            }
        });
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;