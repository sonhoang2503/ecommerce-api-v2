const catchAsyncExp = require('../helpers/catchAsync');
const wishlistService = require('../services/wishlist.service');

exports.getUserWishList = catchAsyncExp(async (req, res, next) => {
  const wishlist = await wishlistService.getUserWishList(req.user.id);

  res.status(200).json({
    status: 'success',
    wishlist,
  });
});

exports.updateWishList = catchAsyncExp(async (req, res, next) => {
  const { productId } = req.body;

  const updateWishList = await wishlistService.updateWishList(
    productId,
    req.user.id
  );

  res.status(200).json({
    status: 'success',
    wishlist: updateWishList,
  });
});
