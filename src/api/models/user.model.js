const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  image: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  // Check if password is modified
  if (!this.isModified('password')) return next();
  // Hash new password
  this.password = await bcrypt.hash(this.password, 13);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.comparePassword = async (
  loginPassword,
  hashedPasswordDB
) => {
  return await bcrypt.compare(loginPassword, hashedPasswordDB);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
