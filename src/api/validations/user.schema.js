const joi = require('joi');
exports.register = joi.object({
  username: joi.string().required().messages({
    'any.required': `Username is required`,
  }),
  email: joi.string().email().required().messages({
    'string.empty': `Email  is required`,
    'string.email': `Please provide a valid email`,
  }),
  password: joi.string().min(6).required().messages({
    'string.empty': `Password is required`,
    'string.min': `Password needs to be at least 6 characters`,
    'any.required': `Password is required`,
  }),
  passwordConfirm: joi.string().valid(joi.ref('password')).required().messages({
    'string.empty': `Password confirm is required`,
    'any.only': `Password confirm need to be the same!`,
    'any.required': `Password confirm is required`,
  }),
  photo: joi.string(),
  phoneNumber: joi.number().min(9).max(12),
});

exports.password = joi.object({
  password: joi.string().required().messages({
    'string.empty': `Password is required`,
  }),
  passwordConfirm: joi.string().valid(joi.ref('password')).required().messages({
    'string.empty': `Password confirm is required`,
    'any.only': `Password confirm need to be the same!`,
  }),
});

exports.email = joi.object({
  email: joi.string().email().required().messages({
    'string.empty': `Email  is required`,
    'string.email': `Please provide a valid email`,
  }),
});
