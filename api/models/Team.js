const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({

    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true, unique: true },
    teamChatUrl: { type: String }

});

module.exports = mongoose.model('Team', teamSchema);