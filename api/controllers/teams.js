const mongoose = require('mongoose');
const Team = require('../models/Team');

exports.create = (req, res, next) => {

    let team = new Team({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        teamChatUrl: req.body.teamChatUrl,
        email: req.body.email
    })

    team.save()
    .then(result => {
        res.status(201).json({ message: 'Team created', result: result })
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.findAll = (req, res, next) => {

    Team.find()
    .exec()
    .then(teams => res.status(200).json(teams))
    .catch(err => res.status(500).json({ error: err }));
};

exports.update = (req, res, next) => {

    const toUpdate = {};

    for(const ops of req.body)
        toUpdate[ops.key] = ops.value; 

    Team.update({ _id: req.params.id }, { $set: toUpdate })
    .then(result => res.status(202).json({ message: 'Updated' }))
    .catch(err => res.status(500).json(err));
};