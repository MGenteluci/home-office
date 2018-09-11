const mongoose = require('mongoose');

const conn = mongoose.connect(`${process.env.DB}://${process.env.DB_USER}:${process.env.ATLAS_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`, 
    { useNewUrlParser: true })
.then(result => console.log('Connected!'))
.catch(err => console.log('Could not connect to mongo database!'));

module.exports = conn;