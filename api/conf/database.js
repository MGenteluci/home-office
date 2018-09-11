const mongoose = require('mongoose');

let conn;

if(process.env.NODE_ENV === 'production'){
    
    conn = mongoose.connect(`mongodb+srv://mgenteluci:${process.env.ATLAS_PWD}@home-office-cwlyr.mongodb.net/test?retryWrites=true`, 
    { useNewUrlParser: true } )
    .then(result => console.log('Connected!'))
    .catch(err => console.log('Could not connect to mongo database!'));

}else if(process.env.NODE_ENV === 'test'){

    conn = mongoose.connect(`mongodb://localhost:27017/hoffice-test`, { useNewUrlParser: true });
 }else{
     
    conn = mongoose.connect(`mongodb://localhost:27017/hoffice`, { useNewUrlParser: true });
 }

module.exports = conn;