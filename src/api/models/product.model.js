const mongoose = require('mongoose');
const slugify = require('slugify');
const Review = require('./review.model');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: String,
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    images: [String],
    company: {
      type: String,
      required: true,
      enum: ['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'],
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Category 1',
        'Category 2',
        'Category 3',
        'Category 4',
        'Category 5',
      ],
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: String,
      required: true,
    },
    stocks: {
      type: Number,
      required: true,
    },
    // variants: [VariantSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

ProductSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

ProductSchema.pre('remove', async function (next) {
  await Review.deleteMany({ product: this._id });
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
