const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const HomeOffice = require('../models/HomeOffice');

/**
 * Request to fetch all users
 * @method GET
 */
router.get('/', (req, res, next) => {
    HomeOffice.find()
    .select('name day')
    .exec()
    .then(results => {
        res.format({
            json: () => {
                res.status(200).json(results);
            },
            html: () => {
                res.render('homeOffices', { homeOffices: results });
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

    const homeOffice = new HomeOffice({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        day: dayFormatted
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
 * Request to remove an user from html FORM
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