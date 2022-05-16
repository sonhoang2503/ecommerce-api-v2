const joi = require('joi');
module.exports = joi.object({
  name: joi.string().required().max(25).messages({
    'any.required': `Please provide the product name`,
  }),
  price: joi.number().required().messages({
    'any.required': `Please provide the product price`,
  }),
  description: joi.string().max(300).required().messages({
    'any.required': `Please provide the product description`,
    'string.max': `Description can be more than 300 characters`,
  }),
  company: joi
    .string()
    .valid('Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5')
    .required()
    .messages({
      'any.required': `Please provide product company name`,
    }),
  category: joi
    .string()
    .valid('Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5')
    .required()
    .messages({
      'any.required': `Please provide product company name`,
    }),
  stocks: joi.number().required().messages({
    'any.required': `Please provide product inventory`,
  }),
  colors: joi.string().required().messages({
    'any.required': `Please provide the product color`,
  }),
  // product: joi.string().required.messages({}),
  images: joi.array().items(joi.string()),
  product: joi.string().required().messages({}),
});
