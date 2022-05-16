const ApiError = require('../helpers/ApiError');

exports.auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return next(ApiError.forbidden('Please log in before access this route!'));
  }
};

exports.role = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden('You do not have permission to access this route')
      );
    }

    return next();
  };
};
