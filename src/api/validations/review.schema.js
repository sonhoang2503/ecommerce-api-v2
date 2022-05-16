const joi = require('joi');
module.exports = joi.object({
  title: joi.string().required().max(100).messages({
    'string.empty': `Please provide title `,
  }),
  review: joi.string().required().messages({
    'string.empty': `Please provide your review`,
  }),
  rating: joi.number().min(1).max(5).required().messages({
    'string.empty': `Please provide your rating`,
    'number.min': `Rating can be less than 1`,
    'number.max': `Rating must be less than 5`,
  }),
  product: joi.string().messages({}),
});
