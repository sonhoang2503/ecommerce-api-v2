const User = require('../models/user.model');
const ApiError = require('../helpers/ApiError');

exports.registerUser = async (data) => {
  try {
    const { email } = data;
    const user = await User.findOne({ email: email });

    if (user) {
      throw ApiError.badRequest('Email already exists! Please try again');
    }
    const newUser = await User.create(data);
    return newUser;
  } catch (err) {
    throw err;
  }
};

exports.updateUserVerified = async (user) => {
  try {
    user.isVerified = true;
    await user.save({
      validateBeforeSave: false,
      new: true,
    });

    return user;
  } catch (err) {
    throw err;
  }
};

exports.updateUserPassword = async (user, data) => {
  console.log(user, data);
  try {
    if (!(await user.comparePassword(data.currentPassword, user.password))) {
      console.log('error');
      throw ApiError.unauthorized('Your current password is incorrect!');
    }

    user.password = data.password;
    user.passwordConfirm = data.passwordConfirm;
    await user.save({
      validateBeforeSave: true,
      new: true,
    });
    return user;
  } catch (err) {
    throw err;
  }
};

exports.resetUserPassword = async (user, data) => {
  try {
    user.password = data.password;
    user.passwordConfirm = data.passwordConfirm;
    await user.save({
      new: true,
      validateBeforeSave: true,
    });

    return user;
  } catch (err) {
    throw err;
  }
};
