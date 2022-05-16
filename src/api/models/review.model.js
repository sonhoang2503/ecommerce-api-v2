const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
    },
    review: {
      type: String,
      required: [true, 'Review cannot be emty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to an user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

ReviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate([
    {
      path: 'user',
      select: 'name photo',
    },
    {
      path: 'product',
      select: 'name ',
    },
  ]);
  next();
});

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        numsRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        ratingsAverage: stats[0].avgRating,
        ratingsQuantity: stats[0].numsRating,
      }
    );
  } else {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        ratingsAverage: 0,
        ratingsQuantity: 0,
      }
    );
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
