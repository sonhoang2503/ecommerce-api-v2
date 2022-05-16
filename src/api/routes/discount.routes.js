const express = require('express');
const router = express.Router();
const discountCtrl = require('../controllers/discount.controller');
const { auth, role } = require('../middlewares/auth');
const validate = require('../middlewares/validateData');
const discount = require('../validations/discount.schema');

router.use(auth);

router.post('/apply-discount', discountCtrl.applyDiscount);

router.use(role('admin'));
router
  .route('/')
  .get(discountCtrl.getAllDiscounts)
  .post(validate(discount), discountCtrl.createDiscount);

router
  .route('/:id')
  .get(discountCtrl.getDiscount)
  .patch(discountCtrl.updateDiscount)
  .delete(discountCtrl.deleteDiscount);

module.exports = router;
