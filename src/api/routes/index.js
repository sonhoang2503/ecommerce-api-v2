const express = require('express');
const router = express.Router();

// ROUTER
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const discountRouter = require('./discount.routes');
const orderRouter = require('./order.routes');
const productRouter = require('./product.routes');
const reviewRouter = require('./review.routes');
const wishlistRouter = require('./wishlist.routes');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/discount', discountRouter);
router.use('/order', orderRouter);
router.use('/review', reviewRouter);
router.use('/wishlist', wishlistRouter);

module.exports = router;
