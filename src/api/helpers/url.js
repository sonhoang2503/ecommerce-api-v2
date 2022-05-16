exports.verifyUrl = (req, userId, verifyToken) => {
  return `${req.protocol}://${req.get(
    'host'
  )}/api/v2/auth/verify-email/${userId}/${verifyToken}`;
};

exports.resetUrl = (req, userId, resetToken) => {
  return `${req.protocol}://${req.get(
    'host'
  )}/api/v2/auth/reset-password/${userId}/${resetToken}`;
};
