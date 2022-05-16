const mongoose = require('mongoose');
const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Token belong to user'],
  },
  token: {
    type: String,
    required: [true],
  },
  expires: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
