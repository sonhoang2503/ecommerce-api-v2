const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const { auth, role } = require('../middlewares/auth');
const validate = require('../middlewares/validateData');
const product = require('../validations/product.schema');
const { uploadMultipleImages } = require('../helpers/multer');
const reviewRouter = require('./review.routes');

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get(productCtrl.getAllProducts)
  .post(auth, role('admin'), validate(product), productCtrl.createProduct);

router
  .route('/:id')
  .get(productCtrl.getProduct)
  .patch(
    auth,
    role('admin'),
    uploadMultipleImages,
    productCtrl.updateProductImagesCloud,
    productCtrl.updateProduct
  )
  .delete(auth, role('admin'), productCtrl.deleteProduct);

module.exports = router;
