const User = require('../api/models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// LOCAL STRATEGY
const localFields = {
  usernameField: 'email',
  passwordField: 'password',
};

passport.use(
  new LocalStrategy(localFields, async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username }).select('+password');
      if (!user) {
        return done(null, false);
      }
      if (await user.comparePassword(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v2/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { _json: data } = profile;
      const existedUser = await User.findOne({ googleId: data.sub });

      if (existedUser) {
        return done(null, existedUser);
      }

      const newUser = await new User({
        username: data.name,
        email: data.email,
        googleId: data.sub,
        isVerified: true,
      });

      await newUser.save({ validateBeforeSave: false });

      return done(null, newUser);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/v2/auth/facebook/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      const { _json: data } = profile;

      const existedUser = await User.findOne({ facebookId: data.id });
      if (existedUser) {
        return done(null, existedUser);
      }

      const newUser = await new User({
        username: data.name,
        isVerified: true,
        facebookId: data.id,
      });

      await newUser.save({ validateBeforeSave: false });
      return done(null, newUser);
    }
  )
);

//  req.session.passport.user

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//  req.user

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
