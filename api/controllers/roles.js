const mongoose = require('mongoose');
const Role = require('../models/Role');

exports.create = (req, res, next) => {

    const role = new Role({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    });

    role.save()
    .then(role => res.status(201).json({ message: 'Role created', role: role }))
    .catch(err => res.status(500).json(err));

};

exports.findAll = (req, res, next) => {

    Role.find()
    .exec()
    .then(roles => res.status(200).json(roles))
    .catch(err => res.status(500).json(err));

};