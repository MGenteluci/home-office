const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String
    }

});

module.exports = mongoose.model('Role', roleSchema);