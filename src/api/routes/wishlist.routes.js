const express = require('express');
const router = express.Router();
const wishlistCtrl = require('../controllers/wishlist.controller');
const { auth } = require('../middlewares/auth');

router.use(auth);
router
  .route('/')
  .get(wishlistCtrl.getUserWishList)
  .patch(wishlistCtrl.updateWishList);

module.exports = router;
