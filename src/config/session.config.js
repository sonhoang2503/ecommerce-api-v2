const session = require('express-session');
const MongoDBsession = require('connect-mongodb-session')(session);

const sessionStore = new MongoDBsession({
  uri: process.env.DATABASE_URI,
  collection: 'session',
});

const options = {
  store: sessionStore,
  secret: 'sessionsecret',
  resave: false,
  saveUninitialized: false,
  name: 'sessionId',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax',
  },
};

module.exports = () => session(options);
