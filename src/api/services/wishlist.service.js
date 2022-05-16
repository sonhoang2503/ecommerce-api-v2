const ApiError = require('../helpers/ApiError');
const WishList = require('../models/wishlist.model');

exports.getUserWishList = async (id) => {
  try {
    let wishlist = await WishList.findOne({ userId: id });
    if (!wishlist) {
      wishlist = await WishList.create({
        userId: id,
        products: [],
      });
    }

    return wishlist;
  } catch (err) {
    throw err;
  }
};

exports.updateWishList = async (productId, userId) => {
  try {
    const wishlist = await WishList.findOne({ userId: userId });
    let wishListItems = wishlist.products;
    if (wishlist.products.includes(productId)) {
      wishListItems = wishListItems.filter((el) => el.toString() !== productId);
    } else {
      wishListItems.push(productId);
    }

    const updateWistList = await WishList.findByIdAndUpdate(
      wishlist.id,
      { products: wishListItems },
      { runValidators: true, new: true }
    );

    return updateWistList;
  } catch (err) {
    throw err;
  }
};
