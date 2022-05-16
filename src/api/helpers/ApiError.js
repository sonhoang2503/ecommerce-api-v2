class ApiError {
  constructor(statusCode, message) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static unauthorized(msg) {
    return new ApiError(401, msg);
  }

  static forbidden(msg) {
    return new ApiError(403, msg);
  }

  static notfound(msg) {
    return new ApiError(404, msg);
  }

  static requestTimeout(msg) {
    return new ApiError(408, msg);
  }

  static internalError(msg) {
    return new ApiError(500, msg);
  }
}

module.exports = ApiError;
