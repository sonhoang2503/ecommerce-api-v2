const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide voucher code'],
      unique: true,
    },
    isPercent: {
      type: Boolean,
      required: true,
      default: true,
    },
    amountDiscount: {
      type: Number,
      required: [true, 'Please provide discount amount'],
    },
    remaining: {
      type: Number,
      required: [true, 'Please provide remaining amount'],
    },
    expiresDate: {
      type: Date,
      required: [true, 'Please provide voucher expires date'],
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Discount = mongoose.model('Discount', DiscountSchema);
module.exports = Discount;
