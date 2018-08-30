const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./api/conf/database');

const teamRoutes = require('./api/routes/teams');
const userRoutes = require('./api/routes/users');
const homeOficeRoutes = require('./api/routes/homeOffices');
const roleRoutes = require('./api/routes/roles');

db.conn;

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

app.use('/teams', teamRoutes);
app.use('/users', userRoutes);
app.use('/homeOffices', homeOficeRoutes);
app.use('/roles', roleRoutes);

app.get('/', (req, res, next) => res.status(204).json());

app.use((req, res, next) => res.status(404).json({ message: 'Not found' }));

module.exports = app;