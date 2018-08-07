const mongoose = require('mongoose');

const homeOfficeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    day: { type: Date, required: true }
});

module.exports = mongoose.model('HomeOffice', homeOfficeSchema);