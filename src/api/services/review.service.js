const ApiError = require('../helpers/ApiError');
const Review = require('../models/review.model');
const ApiFeatures = require('../helpers/ApiFeatures');

exports.getAllReviews = async (query) => {
  try {
    const features = new ApiFeatures(Review.find({}), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    return doc;
  } catch (err) {
    throw err;
  }
};

exports.createReview = async (data) => {
  try {
    const existedReivew = await Review.findOne({
      product: data.product,
      user: data.user,
    });

    if (existedReivew) {
      throw ApiError.badRequest('You have already reviewed this product');
    }

    const newReivew = await Review.create(data);
    return newReivew;
  } catch (err) {
    throw err;
  }
};

exports.getAllReviewsOneProduct = async (productId) => {
  const reviews = await Review.find({
    product: productId,
  });

  return reviews;
};

exports.getReview = async (id) => {
  try {
    const review = await Review.findById(id);
    if (!review) {
      throw ApiError.notfound(`No review found with this id ${id}`);
    }

    return review;
  } catch (err) {
    throw err;
  }
};

exports.updateReview = async (id, data) => {
  try {
    const review = await Review.findByIdAndUpdate(id, data, { new: true });
    if (!review) {
      throw ApiError.notfound(`No review found with this id ${id}`);
    }
    return review;
  } catch (err) {
    throw err;
  }
};

exports.deleteReview = async (id) => {
  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      throw ApiError.notfound(`No review found with this id ${id}`);
    }
  } catch (err) {
    throw err;
  }
};
