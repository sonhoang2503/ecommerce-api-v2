const catchAsyncExp = require('../helpers/catchAsync');
const ApiError = require('../helpers/ApiError');
const userService = require('../services/user.service');

// ADMIN
exports.getAllUsers = catchAsyncExp(async (req, res, next) => {
  const users = await userService.getAllUsers(req.query);
  res.status(200).json({
    status: 'success',
    users: users,
  });
});

exports.getUser = catchAsyncExp(async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    status: 'success',
    user: user,
  });
});

exports.updateUser = catchAsyncExp(async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    user: user,
  });
});

exports.deleteUser = catchAsyncExp(async (req, res, next) => {
  await userService.deleteUser(req.params.id);

  res.status(204).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

// CUSTOMER PROFILE

exports.getProfile = catchAsyncExp(async (req, res, next) => {
  const currentUser = await userService.getProfile(req.user._id);

  res.status(200).json({
    status: 'success',
    user: currentUser,
  });
});

exports.updateProfile = catchAsyncExp(async (req, res, next) => {
  console.log(req.files);
  const user = await userService.updateProfile(req, req.user.id);

  res.status(200).json({
    status: 'success',
    user: user,
  });
});

exports.deleteProfile = catchAsyncExp(async (req, res, next) => {
  await userService.deleteProfile(req.user.id);
  res.status(204).json({
    status: 'success',
    message: 'User deactive ',
  });
});
