const crypto = require('crypto');
var voucher_codes = require('voucher-code-generator');

exports.generateToken = () => {
  const random = crypto.randomBytes(32).toString('hex');
  const token = crypto.createHash('sha256').update(random).digest('hex');
  return token;
};

exports.generateDiscountCode = () => {
  const code = voucher_codes.generate({
    length: 10,
  });
  // console.log(code);
  return code;
};
