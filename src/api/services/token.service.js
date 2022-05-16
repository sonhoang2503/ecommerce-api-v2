const Token = require('../models/token.model');
const { generateToken } = require('../helpers/generateCode');
const ApiError = require('../helpers/ApiError');

exports.createTokenVerify = async (userId) => {
  try {
    const token = generateToken();
    await Token.create({
      userId: userId,
      token: token,
      expires: Date.now() + 15 * 60 * 1000,
    });
    return token;
  } catch (err) {
    throw err;
  }
};

exports.createTokenReset = async (userId) => {
  try {
    const token = generateToken();
    await Token.create({
      userId: userId,
      token: token,
      expires: Date.now() + 15 * 60 * 1000,
    });

    return token;
  } catch (err) {
    throw err;
  }
};

exports.validateToken = async (userId, token) => {
  try {
    const validToken = await Token.findOne({
      userId: userId,
      token: token,
      expires: { $gt: Date.now() },
    });

    if (!validToken) {
      throw ApiError.badRequest(
        'Link is invalid or has expired! Please try again'
      );
    }

    return validToken;
  } catch (err) {
    throw err;
  }
};

exports.removeToken = async (id) => {
  try {
    await Token.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};
