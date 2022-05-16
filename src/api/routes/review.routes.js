const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewCtrl = require('../controllers/review.controller');
const { auth, role } = require('../middlewares/auth');
const validate = require('../middlewares/validateData');
const review = require('../validations/review.schema');

router
  .route('/')
  .get(reviewCtrl.getAllReviews)
  .post(
    auth,
    validate(review),
    reviewCtrl.setProductUserID,
    reviewCtrl.createReview
  );

router.use(auth);

router
  .route('/:id')
  .get(reviewCtrl.getReview)
  .patch(reviewCtrl.updateReview)
  .delete(reviewCtrl.deleteReview);

module.exports = router;
