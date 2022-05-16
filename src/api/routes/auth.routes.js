const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validateData');
const { register, password, email } = require('../validations/user.schema');
const authCtrl = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth');

////// REGISTER
router.post('/register', validate(register), authCtrl.register);

/////// VERIFY EMAIL
router.get('/verify-email/:id/:token', authCtrl.verifyEmail);

////// LOGIN

// LOGIN OPTIONS
const redirect = {
  failureRedirect: '/login',
  successRedirect: '/',
};

const googleOption = {
  scope: ['profile', 'email'],
};

const localOption = {
  failWithError: true,
  successRedirect: '/',
};

// LOCAL
router.post('/login', authCtrl.loginLocal(localOption));
// GOOGLE
router.get('/google', authCtrl.loginGoogle(googleOption));
router.get('/google/callback', authCtrl.loginGoogle(redirect));
// FACEBOOK
router.get('/facebook', authCtrl.loginFacebook());
router.get('/facebook/callback', authCtrl.loginFacebook(redirect));

////// LOGOUT
router.get('/logout', authCtrl.logout);

////// PASSWORD
router.post('/forgot-password', validate(email), authCtrl.forgotPassword);
router.patch(
  '/reset-password/:id/:token',
  validate(password),
  authCtrl.resetPassword
);
router.patch('/update-password', auth, authCtrl.updatePassword);

module.exports = router;
