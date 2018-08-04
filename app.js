const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRoutes = require('./app/routes/users');

mongoose.connect(`mongodb+srv://mgenteluci:${process.env.ATLAS_PWD}@home-office-cwlyr.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true } )
.then(result => console.log('Connected!'))
.catch(err => console.log('Could not connect to mongo database!'));

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methos', 'GET, PUT, DELETE, POST, PATCH');
        return res.status(200).json({});
    }

    next();
});

app.use('/users', userRoutes);

app.use((req, res, next) => {
    res.format({
        json: () => {
            res.status(404).json({ message: 'Not found' });
        },
        html: () => {
            res.render('404');
        }
    });
});

module.exports = app;