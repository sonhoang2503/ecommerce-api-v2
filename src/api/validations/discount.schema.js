const joi = require('joi');
module.exports = joi.object({
  amountDiscount: joi.number().max(50).required().messages({
    'string.emty': `Please provide amount of discount`,
    'number.max': `Amount discount must be less than 50`,
  }),
  remaining: joi.number().required().messages({
    'string.empty': `Please provide total of discounts`,
  }),
});
