const mongoose = require('mongoose');
const HomeOffice = require('../models/HomeOffice');
const moment = require('moment');
moment.locale('pt-br')

exports.getAllHomeOffices = (req, res, next) => {
    HomeOffice.find()
    .select('_id day')
    .populate({ path: 'user', populate: { path: 'team' }})
    .sort({day: 'asc'})
    .exec()
    .then(homeOffices => res.status(200).json(homeOffices))
    .catch(err => res.status(500).json({ error: err }));
};

exports.getAllHomeOfficesFromTodayAndBeyond = (req, res, next) => {
    let today = new Date();    
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), -3, 0, 0, 0);

    HomeOffice.find({ day: {$gte: today} })
    .select('_id day')
    .populate({ path: 'user', populate: { path: 'team' }})
    .sort({day: 'asc'})
    .exec()
    .then(homeOffices => res.status(200).json(homeOffices))
    .catch(err => res.status(500).json({ error: err }));
};

exports.removeHomeOffice = (req, res, next) => {
    const id = req.params.id;
    HomeOffice.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json({ message: 'Home Office deleted'}))
    .catch(err => res.status(500).json({ error: err }));
};

exports.addHomeOffice = (req, res, next) => {
    const homeOffice = new HomeOffice({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        name: req.body.name,
        day: new Date(req.body.day)
    });

    homeOffice.save()
    .then(result => res.status(201).json({ message: 'Home Office added' }))
    .catch(err => res.status(500).json({ error: err }));
};

exports.updateHomeOfficeDay = (req, res, next) => {
    HomeOffice.update({ _id: req.params.id }, { $set: { day: req.body.day } })
    .exec()
    .then(result => res.status(202).json({ message: 'Home Office updated' }))
    .catch(err => res.status(500).json({ error: err }));
};