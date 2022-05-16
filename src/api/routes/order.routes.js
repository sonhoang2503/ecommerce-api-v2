const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controller');
const { auth, role } = require('../middlewares/auth');
const validate = require('../middlewares/validateData');
const order = require('../validations/order.schema');

router.use(auth);
router.get('/my-orders', orderCtrl.getCurrentUserOrder);
router
  .route('/')
  .post(validate(order), orderCtrl.createOrder)
  .get(role('admin'), orderCtrl.getAllOrders);

router.use(role('admin'));
router.patch('/:id/delivered', orderCtrl.updateOrderToDelivered);
router.patch('/:id/paid', orderCtrl.updateOrderToPaid);
router.route('/:id').get(orderCtrl.getOrder);

module.exports = router;
