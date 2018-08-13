const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({

    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true, unique: true }

});

module.exports = mongoose.model('Team', teamSchema);