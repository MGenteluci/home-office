const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./app/conf/database');

const homeOficeRoutes = require('./app/routes/homeOffices');
const userRoutes = require('./app/routes/users');

db.conn;

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST, PATCH');
        return res.status(200).json({});
    }

    next();
});

app.use('/homeOffices', homeOficeRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res, next) => {
    res.format({
        json: () => {
            res.status(200).json({ message: 'Index page, no json content available here' });
        },
        html: () => {
            res.render('index');
        }
    });
});

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