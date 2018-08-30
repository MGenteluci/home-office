const mongoose = require('mongoose');

let conn;

/**
 * NODE_ENV = PRODUCTION
 */
/*
conn = mongoose.connect(`mongodb+srv://mgenteluci:${process.env.ATLAS_PWD}@home-office-cwlyr.mongodb.net/test?retryWrites=true`, 
{ useNewUrlParser: true } )
.then(result => console.log('Connected!'))
.catch(err => console.log('Could not connect to mongo database!'));
*/


/**
 * NODE_ENV = DEVELOPMENT
 */

 if(process.env.NODE_ENV === 'test'){
    conn = mongoose.connect(`mongodb://localhost:27017/dev-home-office-test`, { useNewUrlParser: true });
 }else{
    conn = mongoose.connect(`mongodb://localhost:27017/dev-home-office`, { useNewUrlParser: true });
 }



module.exports = conn;