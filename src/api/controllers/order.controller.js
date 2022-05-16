const catchAsyncExp = require('../helpers/catchAsync');
const orderService = require('../services/order.service');

exports.getAllOrders = catchAsyncExp(async (req, res, next) => {
  const orders = await orderService.getAllOrders(req.query);

  res.status(200).json({
    status: 'success',
    orders: orders,
  });
});

exports.createOrder = catchAsyncExp(async (req, res, next) => {
  const order = await orderService.createOrder(req.user.id, req.body);

  res.status(200).json({
    status: 'success',
    order: order,
  });
});

exports.getOrder = catchAsyncExp(async (req, res, next) => {
  const order = await orderService.getOrder(req.params.id);

  res.status(200).json({
    status: 'success',
    order: order,
  });
});

exports.getCurrentUserOrder = catchAsyncExp(async (req, res, next) => {
  const orders = await orderService.getCurrentUserOrders(req.user.id);

  res.status(200).json({
    status: 'success',
    orders: orders,
  });
});

exports.updateOrderToDelivered = catchAsyncExp(async (req, res, next) => {
  const order = await orderService.updateOrderToDelivered(req.params.id);
  res.status(200).json({
    status: 'success',
    order: order,
  });
});

exports.updateOrderToPaid = catchAsyncExp(async (req, res, next) => {
  const order = await orderService.updateOrderToDelivered(req.params.id);
  res.status(200).json({
    status: 'success',
    order: order,
  });
});
