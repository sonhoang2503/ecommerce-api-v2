const joi = require('joi');
const singleItem = joi.object({
  product: joi.string().required().messages({
    'string.base': `"product" should be a type of 'text'`,
    'string.empty': `"product" cannot be an empty field`,
    'any.required': `"product" is a required field`,
  }),
  color: joi.string().required().messages({
    'string.base': `"color" should be a type of 'text'`,
    'string.empty': `"color" cannot be an empty field`,
    'any.required': `"color" is a required field`,
  }),
  amount: joi.number().required().messages({
    'number.base': `"amount" should be a type of 'number'`,
    'number.empty': `"amount" cannot be an empty field`,
    'any.required': `"amount" is a required field`,
  }),
});

const shippingAddress = joi.object({
  address: joi.string().required().messages({
    'string.base': `"address" should be a type of 'text'`,
    'string.empty': `"address" cannot be an empty field`,
    'any.required': `"address" is a required field`,
  }),
  city: joi.string().required().messages({
    'string.base': `"city" should be a type of 'text'`,
    'string.empty': `"city" cannot be an empty field`,
    'any.required': `"city" is a required field`,
  }),
  postalCode: joi.number().required().messages({
    'number.base': `"amount" should be a type of 'number'`,
    'number.empty': `"amount" cannot be an empty field`,
    'any.required': `"amount" is a required field`,
  }),
  country: joi.string().required().messages({
    'string.base': `"country" should be a type of 'text'`,
    'string.empty': `"country" cannot be an empty field`,
    'any.required': `"country" is a required field`,
  }),
});

module.exports = joi.object({
  tax: joi.number().required().messages({
    'number.base': `"tã" should be a type of 'number'`,
    'number.empty': `"tã" cannot be an empty field`,
    'any.required': `"tã" is a required field`,
  }),
  shipping_fee: joi.number().required().messages({
    'number.base': `"shipping fee" should be a type of 'number'`,
    'number.empty': `"shipping fee" cannot be an empty field`,
    'any.required': `"shipping fee" is a required field`,
  }),
  paymentMethod: joi.string().required().messages({
    'string.base': `"paymnet" should be a type of 'text'`,
    'string.empty': `"paymnet" cannot be an empty field`,
    'any.required': `"paymnet" is a required field`,
  }),
  cartItems: joi.array().items(singleItem).required(),
  shippingAddress: shippingAddress,
});
