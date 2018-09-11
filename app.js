const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./api/conf/database');

const teamRoutes = require('./api/routes/teams');
const userRoutes = require('./api/routes/users');
const homeOficeRoutes = require('./api/routes/homeOffices');
const roleRoutes = require('./api/routes/roles');

db.conn;

if(process.env.NODE_ENV !== 'test')
    app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/teams', teamRoutes);
app.use('/users', userRoutes);
app.use('/homeOffices', homeOficeRoutes);
app.use('/roles', roleRoutes);

app.get('/author', (req, res, next) => res.status(200).json({ author: 'Matheus Genteluci' }));

app.use((req, res, next) => res.status(404).json({ message: 'Not found' }));

module.exports = app;