const mongoose = require('mongoose');
const Team = require('../models/Team');

exports.addTeam = (req, res, next) => {

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

exports.getAllTeams = (req, res, next) => {

    Team.find()
    .exec()
    .then(teams => res.status(200).json(teams))
    .catch(err => res.status(500).json({ error: err }));
};

exports.updateTeamChatUrl = (req, res, next) => {

    Team.update({ _id : req.body.id }, { $set: { teamChatUrl: req.body.teamChatUrl } })
    .exec()
    .then(result => res.status(202).json({ message: 'Chat\'s URL Updated' }))
    .catch(err => res.status(500).json({ error: err }));

};

exports.updateEmail = (req, res, next) => {

    Team.update({ _id : req.body.id }, { $set: { email: req.body.email } })
    .exec()
    .then(result => res.status(202).json({ message: 'Email updated' }))
    .catch(err => res.status(500).json({ error: err }));

};