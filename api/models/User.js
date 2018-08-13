const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    surname: {type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }

});

module.exports = mongoose.model('User', userSchema);