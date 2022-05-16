const path = require('path');
const express = require('express');
const session = require('./session.config');
const passport = require('passport');
const pug = require('pug');
const morgan = require('morgan');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const router = require('../api/routes/index');
const { error, notfound } = require('../api/middlewares/error');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

// VIEW TEMPLATE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/api/views'));

// CORS config
app.use(cors());

// EXPRESS PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SECURE APP
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// SESSION
app.use(session());
// PASSPORT
require('./passport.config');
app.use(passport.initialize());
app.use(passport.session());

// ROUTER
app.get('/', (req, res, next) => {
  res.status(200).json({
    message: `Welcome back `,
  });
});
app.use('/api/v2', router);
app.all('*', notfound);
app.use(error);

module.exports = app;
