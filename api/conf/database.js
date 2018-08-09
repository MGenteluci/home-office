const mongoose = require('mongoose');

/**
 * NODE_ENV = PRODUCTION
 */
/*
const conn = mongoose.connect(`mongodb+srv://mgenteluci:${process.env.ATLAS_PWD}@home-office-cwlyr.mongodb.net/test?retryWrites=true`, 
{ useNewUrlParser: true } )
.then(result => console.log('Connected!'))
.catch(err => console.log('Could not connect to mongo database!'));
*/


/**
 * NODE_ENV = DEVELOPMENT
 */

const conn = mongoose.connect(`mongodb://localhost:27017/dev-home-office`, { useNewUrlParser: true });


module.exports = conn;