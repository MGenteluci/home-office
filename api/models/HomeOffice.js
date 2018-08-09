const mongoose = require('mongoose');

const homeOfficeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    day: { type: Date, required: true }
});

module.exports = mongoose.model('HomeOffice', homeOfficeSchema);