const ApiError = require('../helpers/ApiError');

module.exports = (schema) => {
  return async (req, res, next) => {
    const body = req.body;
    try {
      const result = await schema.validate(body);
      if (result.error) {
        throw result.error.details[0].message;
      }

      return next();
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  };
};
