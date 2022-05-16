const catchAsyncExp = require('../helpers/catchAsync');
const productService = require('../services/product.service');

exports.getAllProducts = catchAsyncExp(async (req, res, next) => {
  const products = await productService.getAllProducts(req.query);
  res.status(200).json({
    status: 'success',
    products: products,
  });
});

exports.getProduct = catchAsyncExp(async (req, res, next) => {
  const product = await productService.getProduct(req.params.id);

  res.status(200).json({
    status: 'success',
    product: product,
  });
});

exports.createProduct = catchAsyncExp(async (req, res, next) => {
  const product = await productService.createProduct(req.body);

  res.status(200).json({
    status: 'success',
    product: product,
  });
});

exports.updateProduct = catchAsyncExp(async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    product: product,
  });
});

exports.deleteProduct = catchAsyncExp(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);

  res.status(204).json({
    status: 'success',
    message: 'Product deleted successfully',
  });
});

exports.updateProductImagesCloud = catchAsyncExp(async (req, res, next) => {
  await productService.uploadProductImagesCloud(req.files);
  console.log(req.body);
  next();
});
