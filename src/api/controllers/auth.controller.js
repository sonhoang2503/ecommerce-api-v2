const passport = require('passport');
const catchAsyncExp = require('../helpers/catchAsync');
const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const Email = require('../helpers/Email');
const { verifyUrl, resetUrl } = require('../helpers/url');

// REGISTER
exports.register = catchAsyncExp(async (req, res, next) => {
  // console.log(req.body);
  const newUser = await authService.registerUser(req.body);
  // console.log(process.env.NODE_ENV);
  const { id } = newUser;
  const token = await tokenService.createTokenVerify(id);

  const url = verifyUrl(req, id, token);
  await new Email(newUser, url).sendVerifyEmail();

  res.status(201).json({
    message:
      'Thanks you for signing up! Please check your email for verification !',
    name: newUser.username,
    email: newUser.email,
  });
});

exports.verifyEmail = catchAsyncExp(async (req, res, next) => {
  const { token, id } = req.params;

  const user = await userService.getUserById(id);
  const validToken = await tokenService.validateToken(id, token);

  const verifiedUser = await authService.updateUserVerified(user);
  await tokenService.removeToken(validToken.id);

  res.status(201).json({
    message: 'Success verify user',
    user: verifiedUser,
  });
});

// LOGIN
exports.loginLocal = (option) => {
  return passport.authenticate('local', option);
};

exports.loginGoogle = (option) => {
  return passport.authenticate('google', option);
};

exports.loginFacebook = (option) => {
  return passport.authenticate('facebook', option);
};

// LOGIN USER
exports.loginUser = (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      current: req.user,
    });
  } else {
    res.status(204).json({
      message: 'No login user',
    });
  }
};

// LOGOUT
exports.logout = (req, res, next) => {
  req.logOut();
  res.status(204).json({ message: 'success logout' });
};

// UPDATE PASSWORD
exports.updatePassword = catchAsyncExp(async (req, res, next) => {
  const { id } = req.user;
  const user = await userService.getUserById(id);

  const updateUser = await authService.updateUserPassword(user, req.body);

  res.status(200).json({
    status: 'success',
    user: updateUser.email,
  });
});

// FORGET + RESET PASSWORD
exports.forgotPassword = catchAsyncExp(async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);

  const { id } = user;
  const token = await tokenService.createTokenReset(id);

  const url = resetUrl(req, id, token);
  await new Email(user, url).sendPasswordReset();

  res.status(200).json({
    status: 'success',
    message: 'Reset-link was sent to your email!',
  });
});

exports.resetPassword = catchAsyncExp(async (req, res, next) => {
  const { token, id } = req.params;

  const user = await userService.getUserById(id);
  const validToken = await tokenService.validateToken(id, token);

  const updateUser = await authService.resetUserPassword(user, req.body);
  await tokenService.removeToken(validToken.id);

  res.status(200).json({
    status: 'success',
    message: 'Reset password successfully',
  });
});
