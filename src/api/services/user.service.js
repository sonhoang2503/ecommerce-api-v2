const User = require('../models/user.model');
const ApiError = require('../helpers/ApiError');
const ApiFeatures = require('../helpers/ApiFeatures');
const cloudinary = require('../../config/cloudinary.config');

// ADMIN
exports.getUserById = async (id) => {
  try {
    const user = User.findById(id).select('+password');
    if (!user) {
      throw ApiError.badRequest(`No user found with this id ${id}`);
    }
    return user;
  } catch (err) {
    throw err;
  }
};

exports.getUserByEmail = async (data) => {
  try {
    const user = await User.findOne({ email: data });
    if (!user) {
      throw ApiError.badRequest(`No user found with this email`);
    }
    return user;
  } catch (err) {
    throw err;
  }
};

exports.getAllUsers = async (query) => {
  try {
    const features = new ApiFeatures(User.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    return doc;
  } catch (err) {
    throw err;
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw ApiError.notfound(`No user found with this id ${id}`);
    }
  } catch (err) {
    throw err;
  }
};

exports.updateUser = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw ApiError.notfound(`No user found with this id ${id}`);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

// CUSTOMER

exports.getProfile = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw ApiError.notfound(`No found user with id ${id}`);
    return user;
  } catch (err) {
    throw err;
  }
};

exports.updateProfile = async (req, userId) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      throw ApiError.badRequest('This route is not for password updates!');
    }

    let user = await User.findById(userId);
    if (req.file) {
      console.log(req.file);
      if (user.cloudinaryId) {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'ecommerce/v2/users/',
        width: 500,
        height: 500,
        format: 'jpeg',
      });

      const data = {
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
      };
      user = await User.findByIdAndUpdate(userId, data, {
        runValidators: true,
        new: true,
      });
    }

    return user;
  } catch (err) {
    throw err;
  }
};

exports.deleteProfile = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw ApiError.notfound(`No found user with id ${id}`);
  } catch (err) {
    throw err;
  }
};
