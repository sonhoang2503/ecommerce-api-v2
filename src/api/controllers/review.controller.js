const catchAsyncExp = require('../helpers/catchAsync');
const reviewService = require('../services/review.service');

exports.setProductUserID = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = catchAsyncExp(async (req, res, next) => {
  const reviews = await reviewService.getAllReviews(req.query);

  res.status(200).json({
    status: 'success',
    reviews: reviews,
  });
});

exports.createReview = catchAsyncExp(async (req, res, next) => {
  const review = await reviewService.createReview(req.body);

  res.status(200).json({
    status: 'success',
    review: review,
  });
});

exports.getAllReviewsOneProduct = catchAsyncExp(async (req, res, next) => {
  const reviews = await reviewService.getAllReviewsOneProduct(
    req.params.productId
  );

  res.status(200).json({
    status: 'success',
    reviews: reviews,
  });
});

exports.getReview = catchAsyncExp(async (req, res, next) => {
  const review = await reviewService.getReview(req.params.id);
  res.status(200).json({
    status: 'success',
    review: review,
  });
});

exports.updateReview = catchAsyncExp(async (req, res, next) => {
  const review = await reviewService.updateReview(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    review: review,
  });
});

exports.deleteReview = catchAsyncExp(async (req, res, next) => {
  await reviewService.deleteReview(req.params.id);

  res.status(204).json({
    status: 'success',
    message: 'Review deleted successfully',
  });
});
