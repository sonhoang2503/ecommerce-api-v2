const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'UserId owning this wishlist is required',
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;
