const ApiError = require('../helpers/ApiError');
const Product = require('../models/product.model');
const ApiFeatures = require('../helpers/ApiFeatures');
const cloudinary = require('../../config/cloudinary.config');

exports.createProduct = async (data) => {
  try {
    const product = await Product.create(data);
    return product;
  } catch (err) {
    throw err;
  }
};

exports.getAllProducts = async (query) => {
  try {
    const features = new ApiFeatures(Product.find({}), query)
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

exports.getProduct = async (id) => {
  try {
    const product = await Product.findById(id).populate({ path: 'reviews' });
    if (!product)
      throw ApiError.notfound(`No product found with this id ${id}`);

    return product;
  } catch (err) {
    throw err;
  }
};

exports.deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw ApiError.notfound(`No product found with this id ${id}`);
    }
  } catch (err) {
    throw err;
  }
};

exports.updateProduct = async (id, data) => {
  try {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      throw ApiError.notfound(`No product found with this id ${id}`);
    }

    return product;
  } catch (err) {
    throw err;
  }
};

exports.uploadProductImagesCloud = async (req) => {
  try {
    if (req.files) {
      const imagePath = [];
      const files = req.files;
      files.forEach((file) => {
        imagePath.push(file.path);
      });

      req.body.images = await Promise.all(
        imagePath.map(async (filePath) => {
          const result = await cloudinary.uploader.upload(filePath, {
            format: 'jpg',
          });
          return result.secure_url;
        })
      );
    } else {
      req.body.images = [];
    }
  } catch (err) {
    throw err;
  }
};
