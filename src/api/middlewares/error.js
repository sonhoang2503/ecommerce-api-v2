const ApiError = require('../helpers/ApiError');

// DATABASE ERROR
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return ApiError.badRequest(message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return ApiError.badRequest(message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return ApiError.badRequest(message);
};

// DEVELOPMENT HANDLER
const sendDevlopmentError = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

// PRODUCTION HANDLER
const sendProductionError = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    if (err.name === 'AuthenticationError') {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
    }

    // Not Operational, unknown error
    console.error('Error :', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// ERROR MIDDLEWARE

const error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    // console.log(err);
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendProductionError(error, req, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendDevlopmentError(err, req, res);
  }
};

// NOTFOUND MIDDLEWARE;

const notfound = (req, res, next) => {
  next(
    ApiError.notfound(
      `Cannot find this ${req.originalUrl} route in the server!`
    )
  );
};

module.exports = { notfound, error };
